import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateMovieMutation, useGetMovieByIdQuery } from "../../features/movies/moviesApi";
import { useGetActorsQuery } from "../../features/actors/actorsApi";
import { useGetTagsQuery } from "../../features/tags/tagsApi";
import { useGetGenresQuery } from "../../features/genres/genresApi";
import { useGetCountriesQuery } from "../../features/countries/countriesApi";
import { useGetLanguagesQuery } from "../../features/languages/languageApi";
import "./MovieUpdate.css";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: movieData } = useGetMovieByIdQuery(id);
  const { data: genresData } = useGetGenresQuery();
  const { data: tagsData } = useGetTagsQuery();
  const { data: countriesData } = useGetCountriesQuery();
  const { data: actorsData } = useGetActorsQuery();
  const { data: languagesData } = useGetLanguagesQuery();
  const [updateMovie] = useUpdateMovieMutation();
  const [movieUrl, setMovieUrl] = useState(null);
  const [movieTrailerUrl, setMovieTrailerUrl] = useState(null);
  const [movieImg, setMovieImg] = useState(null);
  const [movieBgImg, setMovieBgImg] = useState(null);
  const [movieDetails, setMovieDetails] = useState({
    name: "",
    duration: "",
    summary: "",
    releasedDate: "",
    imdbRate: "",
    movieURLUpload: null,
    movieTrailerURLUpload: null,
    thumbImgUpload: null,
    thumbBgImgUpload: null,
    isFree: false,
    originalLanguageId: "",
    genreIds: [],
    tagIds: [],
    countryIds: [],
    actorIds: [],
  });

  useEffect(() => {
    if (movieData) {
      setMovieDetails({
        name: movieData.name,
        duration: movieData.duration,
        summary: movieData.summary,
        releasedDate: movieData.releasedDate,
        imdbRate: Number(movieData.imdbRate),
        isFree: movieData.isFree,
        originalLanguageId: movieData.originalLanguageId,
        genreIds: movieData.genres.map(genre => genre.id),
        tagIds: movieData.tags.map(tag => tag.id),
        countryIds: movieData.countries.map(country => country.id),
        actorIds: movieData.actors.map(actor => actor.id),
        movieTrailerURLUpload: null,
        movieURLUpload: null,
        thumbImgUpload: null,
        thumbBgImgUpload: null,
      });
    }
  }, [movieData]);

  const handleInputChange = e => {
    setMovieDetails({
      ...movieDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = e => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setMovieDetails(prev => ({
        ...prev,
        [e.target.name]: reader.result.split(",")[1], // Only get base64 part
      }));
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const photoUpload1 = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader && file) {
      reader.onloadend = () => setMovieImg(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const photoUpload2 = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader && file) {
      reader.onloadend = () => setMovieBgImg(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const videoUpload1 = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader && file) {
      reader.onloadend = () => setMovieUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const videoUpload2 = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader && file) {
      reader.onloadend = () => setMovieTrailerUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleVideoUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setMovieDetails(prev => ({
        ...prev,
        [e.target.name]: reader.result.split(",")[1], // Only get base64 part
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleCheckboxChange = (e, listName) => {
    const { value, checked } = e.target;
    setMovieDetails(prevState => {
      const selectedList = prevState[listName];
      if (checked) {
        return {
          ...prevState,
          [listName]: [...selectedList, parseInt(value)],
        };
      } else {
        return {
          ...prevState,
          [listName]: selectedList.filter(id => id !== parseInt(value)),
        };
      }
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // Call the updateMovie mutation with movieDetails
      movieDetails.movieTrailerURLUpload = movieTrailerUrl;
      movieDetails.movieURLUpload = movieUrl;
      movieDetails.thumbImgUpload = movieImg;
      movieDetails.thumbBgImgUpload = movieImg;
      await updateMovie({ id, ...movieDetails }).unwrap();
      alert("Movie updated successfully");
      navigate(`/movies/${id}`);
    } catch (error) {
      console.error("Failed to update the movie", error);
      console.log(movieDetails);

      alert("Failed to update the movie");
    }
  };

  return (
    <div className="form-container">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit} method="">
        {/* Movie name */}
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={movieDetails.name} onChange={handleInputChange} />
        </div>

        {/* Duration */}
        <div className="form-group">
          <label>Duration:</label>
          <input type="text" name="duration" value={movieDetails.duration} onChange={handleInputChange} />
        </div>

        {/* Summary */}
        <div className="form-group">
          <label>Summary:</label>
          <textarea name="summary" value={movieDetails.summary} onChange={handleInputChange} />
        </div>

        {/* Released date */}
        <div className="form-group">
          <label>Released Date:</label>
          <input type="date" name="releasedDate" value={movieDetails.releasedDate} onChange={handleInputChange} />
        </div>

        {/* IMDB rate */}
        <div className="form-group">
          <label>IMDB Rate:</label>
          <input type="number" name="imdbRate" value={movieDetails.imdbRate} onChange={handleInputChange} />
        </div>

        {/* File uploads */}
        <div className="form-group">
          <label>Movie File (Video):</label>
          <input type="file" name="movieURLUpload" onChange={videoUpload1} accept="video/*" />
        </div>

        <div className="form-group">
          <label>Movie Trailer File (Video):</label>
          <input type="file" name="movieTrailerURLUpload" onChange={videoUpload2} accept="video/*" />
        </div>

        {/* Images */}
        <div className="form-group">
          <label>Thumbnail Image (Base64):</label>
          <input type="file" name="thumbImgUpload" onChange={photoUpload1} accept="image/*" />
        </div>

        <div className="form-group">
          <label>Background Image (Base64):</label>
          <input type="file" name="thumbBgImgUpload" onChange={photoUpload2} accept="image/*" />
        </div>

        {/* Is free */}
        <div className="form-group">
          <label>Is Free:</label>
          <input type="checkbox" name="isFree" checked={movieDetails.isFree} onChange={() => setMovieDetails({ ...movieDetails, isFree: !movieDetails.isFree })} />
        </div>

        {/* Original language */}
        <div className="form-group">
          <label>Original Language:</label>
          <select name="originalLanguageId" value={movieDetails.originalLanguageId} onChange={handleInputChange}>
            {languagesData &&
              languagesData.map(lang => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
          </select>
        </div>

        {/* Genres */}
        <div className="form-group">
          <label>Genres:</label>
          {genresData &&
            genresData.map(genre => (
              <div key={genre.id}>
                <input type="checkbox" value={genre.id} checked={movieDetails.genreIds.includes(genre.id)} onChange={e => handleCheckboxChange(e, "genreIds")} />
                <label>{genre.name}</label>
              </div>
            ))}
        </div>

        {/* Tags */}
        <div className="form-group">
          <label>Tags:</label>
          {tagsData &&
            tagsData.map(tag => (
              <div key={tag.id}>
                <input type="checkbox" value={tag.id} checked={movieDetails.tagIds.includes(tag.id)} onChange={e => handleCheckboxChange(e, "tagIds")} />
                <label>{tag.name}</label>
              </div>
            ))}
        </div>

        {/* Countries */}
        <div className="form-group">
          <label>Countries:</label>
          {countriesData &&
            countriesData.map(country => (
              <div key={country.id}>
                <input type="checkbox" value={country.id} checked={movieDetails.countryIds.includes(country.id)} onChange={e => handleCheckboxChange(e, "countryIds")} />
                <label>{country.name}</label>
              </div>
            ))}
        </div>

        {/* Actors */}
        <div className="form-group">
          <label>Actors:</label>
          {actorsData &&
            actorsData.map(actor => (
              <div key={actor.id}>
                <input type="checkbox" value={actor.id} checked={movieDetails.actorIds.includes(actor.id)} onChange={e => handleCheckboxChange(e, "actorIds")} />
                <label>{actor.fullName}</label>
              </div>
            ))}
        </div>

        {/* Submit button */}
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
