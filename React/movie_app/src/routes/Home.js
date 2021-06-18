import React from "react"
import axios from "axios"
import Movie from "../components/Movie.js"
import "./Home.css"

class Home extends React.Component{
  state = {
    isLoading: true,
    movies: [],
  }
  fetchMovies = async()=>{ // 비동기 선언
    const {
      data: {
        data: { movies }
      }
    } = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating") // axios를 기다리라는 뜻
    this.setState({movies:movies, isLoading:false})
  }
  componentDidMount() {
    this.fetchMovies()
  }
  render() {
    const { isLoading, movies } = this.state
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">Loading...</span>
          </div>
        ) : (
            <div className="movies">
              {movies.map(movie=>{
                return <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  rating={movie.rating}
                  genres={movie.genres}
                />
              })}
            </div>
        )}
      </section>
    )
  }
}

export default Home