import React, { useEffect, useState } from "react";
import axios from "axios";

function Movies() {
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("popular");
  const [initialData, setInitialData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    if (!searchedData.length) {
      displayMovie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter]);

  const handlePage = (pageNum) => {
    setPage(pageNum);
  };

  const backToHome = () => {
    setSearchedData([]);
    displayMovie();
  };

  const displayMovie = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_TMDB_API_URL}/movie/${filter}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-IN&page=${page}`
      );
      setInitialData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const searchResponse = await axios.get(
        `${process.env.REACT_APP_OMDB_API_URL}/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${input}`
      );
      setSearchedData(searchResponse.data.Search || []);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const renderPagination = () => {
    window.scrollTo({ top: 130, behavior: "smooth" });

    const totalPages = 10;
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      startPage = Math.max(page - Math.floor(maxPagesToShow / 2), 1);
      endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = endPage - maxPagesToShow + 1;
      }
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`p-2 rounded ${
            page === i ? "bg-blue-600" : "bg-gray-700"
          } text-white`}
          onClick={() => handlePage(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          className="p-2 bg-gray-700 text-white rounded"
          onClick={() => handlePage(page > 1 ? page - 1 : 1)}
        >
          Previous
        </button>
        {pages}
        <button
          className="p-2 bg-gray-700 text-white rounded"
          onClick={() => handlePage(page + 1)}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1
        className="text-2xl md:text-4xl font-bold text-center mb-4 cursor-pointer text-amber-400"
        onClick={backToHome}
      >
        Movies And Series Finder
      </h1>

      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          placeholder="Find your movie/series"
          className="rounded p-2 w-full max-w-md text-center text-black"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input) {
              handleSearch();
            }
          }}
          value={input}
        />
        <button
          className="ml-2 p-2 rounded bg-gray-600 text-white hover:bg-orange-700"
          onClick={handleSearch}
          disabled={!input}
        >
          Find
        </button>
      </div>

      {searchedData.length === 0 && (
        <div className="flex justify-end mb-4">
          <select
            className="select p-2 bg-gray-700 text-white"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="popular">Popular</option>
            <option value="now_playing">Now Playing</option>
            <option value="top_rated">Top Rated</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4">
        {searchedData.length === 0 &&
          initialData.results?.map((elem, i) => (
            <div key={i} className="movieSingleBox rounded-lg overflow-hidden">
              <img
                className="w-full h-60 object-cover mb-2"
                src={`https://image.tmdb.org/t/p/original/${elem.poster_path}`}
                alt={elem.title}
              />
              <div className="p-2">
                <h1 className="font-bold text-lg">Title: {elem.title}</h1>
                <p>Release Date: {elem.release_date}</p>
                <p>Rating: {elem.vote_average.toFixed(1)}</p>
                <p>Language: {elem.original_language}</p>
              </div>
            </div>
          ))}

        {searchedData.map((elem, i) => (
          <div key={i} className="movieSingleBox rounded-lg overflow-hidden">
            <img
              className="w-full h-60 object-cover mb-2"
              src={elem.Poster}
              alt={elem.Title}
            />
            <div className="p-2">
              <h1 className="font-bold text-lg">Title: {elem.Title}</h1>
              <p>Release Year: {elem.Year}</p>
              <p>Type: {elem.Type}</p>
            </div>
          </div>
        ))}
      </div>

      {searchedData.length === 0 && renderPagination()}

      {searchedData.length > 0 && (
        <div className="flex justify-end mt-4  ">
          <button
            className="bg-gray-600 text-white p-2 rounded"
            onClick={backToHome}
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}

export default Movies;
