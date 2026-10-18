class FetchCoverArtJob < ApplicationJob
  queue_as :default
  def perform(record)
    image_url = CoverArtService.new(title: record.title, artist: record.artist_name).get_image_url
    record.update!(image_url: image_url) if image_url.present?
  end
end
