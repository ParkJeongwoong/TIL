import React from "react"
import PropTypes from "prop-types"
import "./Movie.css"
import { Link } from "react-router-dom"

function Movie({ id, year, title, summary, poster, rating, genres }) {
  return (
    <Link to={{
      pathname: `/movie/${id}`,
      state: {
        year,
        title,
        summary,
        poster,
        rating,
        genres,
      }
    }}>
      <div className="movie">
        <img src={poster} alt={title} title={title} />
        <div className="movie__data">
          <h3 className="movie__title">{title}</h3>
          {/* <h5 className="movie__rating">{rating}</h5> */}
          <h5 className="movie__year">{year}</h5>
          <ul className="movie__genres">
            {genres.map((genre, index)=> {
              return <li key={index} className="movie__genre">{genre}</li>
            })}
          </ul>
          {
            summary.length > 140
            ? <p>{summary.slice(0,140)}...</p>
            : <p>{summary}</p>
          }
        </div>
      </div>
    </Link>
    )
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie