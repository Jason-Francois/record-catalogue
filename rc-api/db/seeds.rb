# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Seed records for the application
[
  { title: "Doolittle", artist_name: "Pixies", genre: "Rock", release_year: 1989 },
  { title: "Madvillainy", artist_name: "Madvillain", genre: "Hip Hop", release_year: 2004 },
  { title: "Discovery", artist_name: "Daft Punk", genre: "Electronic", release_year: 2001 },
  { title: "Ctrl", artist_name: "SZA", genre: "R&B", release_year: 2017 },
  { title: "Dookie", artist_name: "Green Day", genre: "Punk Rock", release_year: 1994 },
  { title: "Selective Ambient Works 85-92", artist_name: "Aphex Twin", genre: "Electronic", release_year: 1992 },
  { title: "Abbey Road", artist_name: "The Beatles", genre: "Rock", release_year: 1969 },
  { title: "Big Fish Theory", artist_name: "Vince Staples", genre: "Hip Hop", release_year: 2017 },
  { title: "Some Rap Songs", artist_name: "Earl Sweatshirt", genre: "Hip Hop", release_year: 2018 },
  { title: "Disintegration", artist_name: "The Cure", genre: "Goth Rock", release_year: 1989 },
  { title: "Songs in the Key of Life", artist_name: "Stevie Wonder", genre: "Soul", release_year: 1976 },
  { title: "The Miseducation of Lauryn Hill", artist_name: "Lauryn Hill", genre: "Hip Hop", release_year: 1998 },
  { title: "Post", artist_name: "Bjork", genre: "Pop", release_year: 1995 },
  { title: "Back to Black", artist_name: "Amy Winehouse", genre: "Soul", release_year: 2006 },
  { title: "A Love Supreme", artist_name: "John Coltrane", genre: "Jazz", release_year: 1965 },
  { title: "The Black Saint and the Sinner Lady", artist_name: "Charles Mingus", genre: "Jazz", release_year: 1963 },
  { title: "Ten", artist_name: "Pearl Jam", genre: "Grunge", release_year: 1991 },
  { title: "Mezzanine", artist_name: "Massive Attack", genre: "Trip Hop", release_year: 1998 },
  { title: "Black on Both Sides", artist_name: "Mos Def", genre: "Hip Hop", release_year: 1999 },
  { title: "Brat", artist_name: "Charli XCX", genre: "Rock", release_year: 2024 }
].each do |album|
  Record.find_or_create_by!(title: album[:title], artist_name: album[:artist_name]) do |record|
    record.genre = album[:genre]
    record.release_year = album[:release_year]
  end
end
