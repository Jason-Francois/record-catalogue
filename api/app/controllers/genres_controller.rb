class GenresController < ApplicationController
  # GET /genres
  def index
    @genres = Genre.all
    render json: @genres
  end
end
