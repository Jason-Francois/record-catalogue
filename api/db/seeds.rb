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
  { title: "Doolittle", artist_name: "Pixies", release_year: 1989 },
  { title: "Madvillainy", artist_name: "Madvillain", release_year: 2004 },
  { title: "Discovery", artist_name: "Daft Punk", release_year: 2001 },
  { title: "In the Aeroplane Over the Sea", artist_name: "Neutral Milk Hotel", release_year: 1998 },
  { title: "Rumours", artist_name: "Fleetwood Mac", release_year: 1977 },
  { title: "Ctrl", artist_name: "SZA", release_year: 2017 },
  { title: "To Pimp a Butterfly", artist_name: "Kendrick Lamar", release_year: 2015 },
  { title: "Dookie", artist_name: "Green Day", release_year: 1994 },
  { title: "Selective Ambient Works 85-92", artist_name: "Aphex Twin", release_year: 1992 },
  { title: "Abbey Road", artist_name: "The Beatles", release_year: 1969 },
  { title: "Big Fish Theory", artist_name: "Vince Staples", release_year: 2017 },
  { title: "Some Rap Songs", artist_name: "Earl Sweatshirt", release_year: 2018 },
  { title: "Disintegration", artist_name: "The Cure", release_year: 1989 },
  { title: "Songs in the Key of Life", artist_name: "Stevie Wonder", release_year: 1976 },
  { title: "The Miseducation of Lauryn Hill", artist_name: "Lauryn Hill", release_year: 1998 },
  { title: "Post", artist_name: "Bjork", release_year: 1995 },
  { title: "Back to Black", artist_name: "Amy Winehouse", release_year: 2006 },
  { title: "A Love Supreme", artist_name: "John Coltrane", release_year: 1965 },
  { title: "The Black Saint and the Sinner Lady", artist_name: "Charles Mingus", release_year: 1963 },
  { title: "Ten", artist_name: "Pearl Jam", release_year: 1991 },
  { title: "Mezzanine", artist_name: "Massive Attack", release_year: 1998 },
  { title: "Black on Both Sides", artist_name: "Mos Def", release_year: 1999 },
  { title: "Brat", artist_name: "Charli XCX", release_year: 2024 },
  { title: "Future Nostalgia", artist_name: "Dua Lipa", release_year: 2020 },
  { title: "When We All Fall Asleep, Where Do We Go?", artist_name: "Billie Eilish", release_year: 2019 },
].each do |album|
  record = Record.find_or_create_by!(
    title: album[:title],
    artist_name: album[:artist_name]
  ) do |record|
    record.release_year = album[:release_year]
  end

  canonical_genre = GenreCanonicalizer.canonicalize(album[:genre])

  if canonical_genre.present?
    genre = Genre.find_or_create_by!(name: canonical_genre)
    RecordGenre.find_or_create_by!(record: record, genre: genre)
  end
end
