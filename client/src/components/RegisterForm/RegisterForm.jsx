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

  const [movieDetails, setMovieDetails] = useState({
    name: "",
    duration: "",
    summary: "",
    releasedDate: "",
    imdbRate: "",
    isFree: false,
    originalLanguageId: "",
    genreIds: [],
    tagIds: [],
    countryIds: [],
    actorIds: [],
  });

  const [movieFile, setMovieFile] = useState(null);
  const [trailerFile, setTrailerFile] = useState(null);
  const [thumbImage, setThumbImage] = useState(null);
  const [thumbImagePreview, setThumbImagePreview] = useState(null); // For preview
  const [bgImage, setBgImage] = useState(null);
  const [bgImagePreview, setBgImagePreview] = useState(null); // For preview

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
      });
    }
  }, [movieData]);

  const handleInputChange = e => {
    setMovieDetails({
      ...movieDetails,
      [e.target.name]: e.target.value,
    });
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

  const photoUpload = (e, setImage, setPreview) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader && file) {
      reader.onloadend = () => {
        setImage(file); // Set the file itself for submission
        setPreview(reader.result); // Set the preview image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    console.log(formData);

    // Append individual fields
    formData.append("name", movieDetails.name);
    formData.append("duration", movieDetails.duration);
    formData.append("summary", movieDetails.summary);
    formData.append("releasedDate", movieDetails.releasedDate);
    formData.append("imdbRate", movieDetails.imdbRate);
    formData.append("isFree", movieDetails.isFree);
    formData.append("originalLanguageId", movieDetails.originalLanguageId);

    // Append arrays
    movieDetails.genreIds.forEach(id => formData.append("genreIds", id));
    movieDetails.tagIds.forEach(id => formData.append("tagIds", id));
    movieDetails.countryIds.forEach(id => formData.append("countryIds", id));
    movieDetails.actorIds.forEach(id => formData.append("actorIds", id));

    // Append video files
    if (movieFile) {
      formData.append("movieURLUpload", movieFile);
    }
    if (trailerFile) {
      formData.append("movieTrailerURLUpload", trailerFile);
    }

    // Append image files
    if (thumbImage) {
      formData.append("thumbImgUpload", thumbImage);
    }
    if (bgImage) {
      formData.append("thumbBgImgUpload", bgImage);
    }

    try {
      await updateMovie({ id, formData }).unwrap();
      alert("Movie updated successfully");
      navigate(`/movies/${id}`);
    } catch (error) {
      console.error("Failed to update the movie", error);
      alert("Failed to update the movie");
    }
  };

  return (
    <div className="form-container">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
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

        {/* Movie upload */}
        <div className="form-group">
          <label>Movie File (Video):</label>
          <input type="file" accept="video/*" onChange={e => setMovieFile(e.target.files[0])} />
        </div>

        <div className="form-group">
          <label>Movie Trailer File (Video):</label>
          <input type="file" accept="video/*" onChange={e => setTrailerFile(e.target.files[0])} />
        </div>

        {/* Thumbnail images */}
        <div className="form-group">
          <label>Thumbnail Image:</label>
          <input type="file" accept="image/*" onChange={e => photoUpload(e, setThumbImage, setThumbImagePreview)} />
          {thumbImagePreview && <img src={thumbImagePreview} alt="Thumbnail Preview" className="image-preview" />}
        </div>

        <div className="form-group">
          <label>Background Image:</label>
          <input type="file" accept="image/*" onChange={e => photoUpload(e, setBgImage, setBgImagePreview)} />
          {bgImagePreview && <img src={bgImagePreview} alt="Background Preview" className="image-preview" />}
        </div>

        {/* Is free */}
        <div className="form-group">
          <label>Is Free:</label>
          <input type="checkbox" checked={movieDetails.isFree} onChange={() => setMovieDetails({ ...movieDetails, isFree: !movieDetails.isFree })} />
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

        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
