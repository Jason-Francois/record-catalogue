# Task to update image URLs for records missing them using the CoverArtService service.
# Usage:
#   rake records:update_image_url
# Example:
#   rake records:update_image_url
# This task will iterate through all records that do not 
# have an image URL and attempt to fetch one using 
# the CoverArtService service.


require 'net/http'
require 'uri'
require 'json'

namespace :records do
  desc "Update image URLs for records missing them"
  task update_image_url: :environment do
    records_missing_image_url = Record.where(image_url: [nil, ""])
    records_missing_image_url.each do |record|
      image_url = CoverArtService.new(title: record.title, artist: record.artist_name).get_image_url
      record.update!(image_url: image_url) if image_url
    end
  end
end



