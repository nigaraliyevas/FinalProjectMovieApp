import { useState, useEffect } from "react";
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
    id: id,
    name: "",
    duration: "",
    summary: "",
    releasedDate: "",
    imdbRate: "",
    isFree: "",
    originalLanguageId: "",
    genreIds: [],
    tagIds: [],
    countryIds: [],
    actorIds: [],
  });

  const [movieFile, setMovieFile] = useState(null);
  const [trailerFile, setTrailerFile] = useState(null);
  const [thumbImageBase64, setThumbImageBase64] = useState(null);
  const [thumbImagePreview, setThumbImagePreview] = useState(null);
  const [bgImageBase64, setBgImageBase64] = useState(null);
  const [bgImagePreview, setBgImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (movieData) {
      setMovieDetails({
        id: id,
        name: movieData.name,
        duration: movieData.duration,
        summary: movieData.summary,
        releasedDate: movieData.releasedDate,
        imdbRate: Number(movieData.imdbRate),
        isFree: movieData.isFree,
        originalLanguage: { id: movieData.originalLanguageId },
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

  const photoUpload = (e, setImageBase64, setPreview) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader && file) {
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setImageBase64(base64String);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", movieDetails.id);
    formData.append("Name", movieDetails.name);
    formData.append("Duration", movieDetails.duration);
    formData.append("Summary", movieDetails.summary);
    formData.append("releasedDate", movieDetails.releasedDate);
    formData.append("isFree", movieDetails.isFree);
    formData.append("IMDBRate", movieDetails.imdbRate);
    movieDetails.tagIds.forEach(tagId => formData.append("TagIds", tagId));
    movieDetails.actorIds.forEach(actorId => formData.append("ActorIds", actorId));
    movieDetails.genreIds.forEach(genreId => formData.append("GenreIds", genreId));
    movieDetails.countryIds.forEach(countryId => formData.append("CountryIds", countryId));
    formData.append("OriginalLanguage.Id", movieDetails.originalLanguageId);

    // Add video file and images as part of formData
    if (movieFile) {
      formData.append("MovieURLUpload", movieFile);
    }
    if (trailerFile) {
      formData.append("MovieTrailerURLUpload", trailerFile);
    }
    if (thumbImageBase64) {
      formData.append("ThumbImgUpload", thumbImageBase64);
    }
    if (bgImageBase64) {
      formData.append("ThumbBgImgUpload", bgImageBase64);
    }

    for (let pair of formData.entries()) {
      console.log(typeof pair[1]);
    }
    try {
      await updateMovie({ id, formData }).unwrap();
      alert("Movie updated successfully");
      navigate(`/movies/${id}`);
    } catch (error) {
      console.error("Failed to update the movie", error);
      console.error("Response data:", error.data); // Log more info if available
      alert("Failed to update the movie");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        {/* Movie name */}
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={movieDetails.name} onChange={handleInputChange} required />
        </div>

        {/* Duration */}
        <div className="form-group">
          <label>Duration:</label>
          <input type="text" name="duration" value={movieDetails.duration} onChange={handleInputChange} />
        </div>

        {/* Summary */}
        <div className="form-group">
          <label>Summary:</label>
          <textarea name="summary" value={movieDetails.summary} onChange={handleInputChange} required />
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
          <input name="movieURLUpload" type="file" accept="video/*" onChange={e => handleFileChange(e, setMovieFile)} />
        </div>

        <div className="form-group">
          <label>Movie Trailer File (Video):</label>
          <input name="movieTrailerURLUpload" type="file" accept="video/*" onChange={e => handleFileChange(e, setTrailerFile)} />
        </div>

        {/* Thumbnail images */}
        <div className="form-group">
          <label>Thumbnail Image:</label>
          <input type="file" accept="image/*" onChange={e => photoUpload(e, setThumbImageBase64, setThumbImagePreview)} />
          {thumbImagePreview && <img src={thumbImagePreview} alt="Thumbnail Preview" />}
        </div>

        <div className="form-group">
          <label>Background Image:</label>
          <input type="file" accept="image/*" onChange={e => photoUpload(e, setBgImageBase64, setBgImagePreview)} />
          {bgImagePreview && <img src={bgImagePreview} alt="Background Preview" />}
        </div>

        {/* Genre checkboxes */}
        <div className="form-group">
          <label>Genres:</label>
          {genresData?.map(genre => (
            <div key={genre.id}>
              <input type="checkbox" value={genre.id} checked={movieDetails.genreIds.includes(genre.id)} onChange={e => handleCheckboxChange(e, "genreIds")} />
              {genre.name}
            </div>
          ))}
        </div>

        {/* Tag checkboxes */}
        <div className="form-group">
          <label>Tags:</label>
          {tagsData?.map(tag => (
            <div key={tag.id}>
              <input type="checkbox" value={tag.id} checked={movieDetails.tagIds.includes(tag.id)} onChange={e => handleCheckboxChange(e, "tagIds")} />
              {tag.name}
            </div>
          ))}
        </div>

        {/* Country checkboxes */}
        <div className="form-group">
          <label>Countries:</label>
          {countriesData?.map(country => (
            <div key={country.id}>
              <input type="checkbox" value={country.id} checked={movieDetails.countryIds.includes(country.id)} onChange={e => handleCheckboxChange(e, "countryIds")} />
              {country.name}
            </div>
          ))}
        </div>

        {/* Actor checkboxes */}
        <div className="form-group">
          <label>Actors:</label>
          {actorsData?.map(actor => (
            <div key={actor.id}>
              <input type="checkbox" value={actor.id} checked={movieDetails.actorIds.includes(actor.id)} onChange={e => handleCheckboxChange(e, "actorIds")} />
              {actor.fullName}
            </div>
          ))}
        </div>

        {/* Original Language Select */}
        <div className="form-group">
          <label>Original Language:</label>
          <select name="originalLanguageId" value={movieDetails.originalLanguageId} onChange={handleInputChange}>
            <option value="" disabled>
              Select Language
            </option>
            {languagesData?.map(language => (
              <option key={language.id} value={language.id}>
                {language.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Movie"}
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
