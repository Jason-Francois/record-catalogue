require 'net/http'
require 'uri'
require 'json'

# Finds cover art for an album.
#
# Searches MusicBrainz for matching releases, then asks the Cover Art Archive
# for each release's images until one has art.
#
#   CoverArtService.new(title: "Discovery", artist: "Daft Punk").get_image_url
#   # => "https://coverartarchive.org/release/.../...-500.jpg", or nil
#
# This class never raises for expected failures (no match, no art, network
# trouble). It returns nil, so callers can fall back to a placeholder.
class CoverArtService
  # MusicBrainz rejects (403) requests that don't identify the app and give
  # a way to contact its author.
  HEADERS = {
    "User-Agent" => "HathorRecordCatalogue/0.1 (https://github.com/Jason-Francois)",
    "Accept" => "application/json"
  }.freeze

  MAX_ATTEMPTS = 3          # tries per request before giving up
  MAX_REDIRECTS = 3         # the Cover Art Archive redirects to archive.org
  MUSICBRAINZ_PAUSE = 1     # seconds; MusicBrainz allows about 1 request/second

  # Raised internally for failures worth retrying (HTTP 429 and 5xx).
  class TemporaryError < StandardError; end

  def initialize(title:, artist:)
    @title = title
    @artist = artist
  end

  # Returns an HTTPS URL for the album's cover, or nil if none was found.
  def get_image_url
    release_ids.each do |mbid|
      image_url = cover_for(mbid)
      if image_url
        log("Found cover art", :info)
        return image_url
      end
    end
    log("No cover art found", :info)
    nil
  end

  private

  # Searches MusicBrainz and returns the IDs of matching releases, best match
  # first. One album can have many releases (reissues, regional pressings),
  # and not all of them have cover art.
  def release_ids
    query = URI.encode_www_form(
      query: %(release:"#{@title}" AND artist:"#{@artist}"),
      fmt: "json"
    )
    url = "https://musicbrainz.org/ws/2/release/?#{query}"
    log("Fetching MusicBrainz releases from #{url}", :debug)
    
    data = get_json(url)
    if data && data["releases"] && data["releases"].any?
      data["releases"].map { |release| release["id"] }
    else
      log("No MusicBrainz releases found", :info)
      []
    end
  end

  # Returns the best image URL for one release, or nil if it has no art.
  def cover_for(mbid)
    url = "https://coverartarchive.org/release/#{mbid}"
    data = get_json(url)
    if data && data["images"] && data["images"].any?
      best_image(data["images"])
    else
      log("No cover art found for release #{mbid}", :info)
      nil
    end
  end

  # Picks the front cover's 500px thumbnail, which suits the card size and is
  # much smaller than the original. Falls back to the first image's original
  # if there is no front cover or no 500px version.
  def best_image(images)
    return nil unless images && images.any?
    front_image = images.find { |img| img["front"] }
    if front_image && front_image["thumbnails"] && front_image["thumbnails"]["500"]
      force_https(front_image["thumbnails"]["500"])
    else
      force_https(images.first["image"])
    end
  end

  # The Cover Art Archive can return http:// URLs, which browsers block as
  # mixed content on an https site.
  def force_https(url)
    url&.sub(/\Ahttp:/, "https:")
  end

  # GETs a URL and returns the parsed JSON, or nil on any failure.
  # Follows redirects, and retries timeouts, 429, and 5xx with a growing delay.
  def get_json(url, redirects_left = MAX_REDIRECTS)
    attempts = 0
    begin
      attempts += 1
      response = http_get(URI(url))

      case response
      when Net::HTTPSuccess
        JSON.parse(response.body)
      when Net::HTTPRedirection
        return nil if redirects_left.zero?

        get_json(URI.join(url, response["location"]).to_s, redirects_left - 1)
      when Net::HTTPNotFound
        nil # expected: the release has no cover art
      when Net::HTTPTooManyRequests, Net::HTTPServerError
        raise TemporaryError, "HTTP #{response.code}"
      else
        log("Unexpected HTTP #{response.code} from #{url}", :error)
        nil
      end
    rescue TemporaryError, Net::OpenTimeout, Net::ReadTimeout, SocketError, Errno::ECONNREFUSED => e
      message = "#{e.class}: #{e.message} for #{url} (attempt #{attempts}/#{MAX_ATTEMPTS})"
      if attempts < MAX_ATTEMPTS
        log(message, :warn)
        sleep attempts * 2
        retry
      else
        log("Giving up: #{message}", :error)
      end
      nil
    rescue JSON::ParserError => e
      log("Invalid JSON from #{url}: #{e.message}", :error)
      nil
    end
  end

  # Sends one GET with the shared headers and timeouts.
  def http_get(uri)
    sleep MUSICBRAINZ_PAUSE if uri.host.end_with?("musicbrainz.org")

    request = Net::HTTP::Get.new(uri)
    HEADERS.each { |name, value| request[name] = value }

    Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https",
                    open_timeout: 5, read_timeout: 10) do |http|
      http.request(request)
    end
  end

  # Uses the Rails logger in the app, and stderr when run outside Rails.
  def log(message, level = :warn)
    text = "[#{@title} by #{@artist}] #{message}"
    defined?(Rails) ? Rails.logger.send(level, text) : warn(text)
  end
end
