# File: api/app/services/genre_canonicalizer.rb
# Purpose: Canonicalize genre names to a standardized format.
# Usage: GenreCanonicalizer.canonicalize("hip hop") => "Hip-Hop"

class GenreCanonicalizer
  GENRE_ALIASES = {
    "hip hop" => "Hip-Hop",
    "hip-hop" => "Hip-Hop",
    "hiphop" => "Hip-Hop",
    "electronic dance music" => "EDM",
    "edm" => "EDM",
    "rhythm and blues" => "R&B",
    "rb" => "R&B",
    "r&b" => "R&B",
    "r and b" => "R&B",
    "dnb" => "Drum & Bass",
    "d&b" => "Drum & Bass",
    "drum n bass" => "Drum & Bass",
    "drum n b" => "Drum & Bass",
    "jungle music" => "Jungle",
    "jungle" => "Jungle",
    "rock" => "Rock",
    "classic rock" => "Classic Rock",
    "rock and roll" => "Rock",
    "rock n roll" => "Rock",
    "rock 'n' roll" => "Rock",
    "indie-rock" => "Indie Rock",
    "indie rock" => "Indie Rock",
    "alt rock" => "Alternative Rock",
    "alt-rock" => "Alternative Rock",
    "alternative" => "Alternative Rock",
    "heavy-metal" => "Heavy Metal",
    "metal music" => "Heavy Metal",
    "pop music" => "Pop",
    "kpop" => "K-Pop",
    "k pop" => "K-Pop",
    "korean pop" => "K-Pop",
    "jpop" => "J-Pop",
    "j pop" => "J-Pop",
    "japanese pop" => "J-Pop",
    "reggae music" => "Reggae",
    "reggaetón" => "Reggaeton",
    "afro beats" => "Afrobeats",
    "afro-beats" => "Afrobeats",
    "house music" => "House",
    "techno music" => "Techno",
    "lofi hip hop" => "Lo-Fi Hip-Hop",
    "lo-fi hip hop" => "Lo-Fi Hip-Hop",
    "lo fi hip-hop" => "Lo-Fi Hip-Hop",
    "synthpop" => "Synth-Pop",
    "synth pop" => "Synth-Pop",
    "singer songwriter" => "Singer-Songwriter",
    "singer/songwriter" => "Singer-Songwriter",
    "ost" => "Soundtrack",
    "original soundtrack" => "Soundtrack",
    "classical music" => "Classical"
  }
  def self.canonicalize(name)
    stripped_name = name&.strip
    if stripped_name.blank?
      return nil
    end
    GENRE_ALIASES[stripped_name&.downcase] || stripped_name
  end
end