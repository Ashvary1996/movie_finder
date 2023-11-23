import React, { useEffect, useState } from "react";
import axios from "axios";

function Movies() {
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("popular");
  const [initialData, setInitialData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);

  const handlePage = (e) => {
    setPage(Number(e.target.innerText));
  };
  const backToHome = () => {
    console.log("backToHome");
    setSearchedData("");
    displayMovie();
  };
  async function displayMovie() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_TMDB_API_URL}/movie/${filter}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-IN&page=${page}&query=${input}`
      );
      setInitialData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSearch(e) {
    setInitialData("");

    try {
      const searchResponse = await axios.get(
        `${process.env.REACT_APP_OMDB_API_URL}/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${input}`
      );

      setSearchedData(searchResponse.data);
      console.log(searchedData);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    displayMovie();
  }, [page, filter]);

  return (
    <div>
      <h1 className="text-lg italic font-bold ">Movies And Series Finder</h1>

      <input
        type="text"
        placeholder="find your movie/series"
        className="rounded p-1 w-[20%]  mt-2 text-center text-smoke bg-yellow-800 font-bold"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && input) {
            handleSearch();
          }
        }}
        value={input}
      />
      <button
        className="bg-gray-600  p-1 pr-4 pl-4 rounded ml-2  hover:bg-orange-950 hover:text-smoke "
        onClick={handleSearch}
        disabled={!input}
      >
        Find
      </button>

      <div className="">
        {!initialData.length &&
        !initialData.results &&
        !searchedData.length ? null : (
          <>
            <div className="text-right p-1 mr-[6%] mb-1">
              <select
                className="select text border-l-amber-900 bg-slate-700 text-smoke hover:cursor-pointer p-1 "
                onChange={(e) => {
                  setFilter(e.target.value);
                  // console.log(filter);
                }}
              >
                <option value="">Filter by</option>
                <option value="popular">Popular</option>
                <option value="now_playing">Now Playing</option>
                <option value="top_rated">Top Rated</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>

            <div className="m-auto   flex flex-wrap gap-5 w-[88%]">
              {initialData.results.map((elem, i) => (
                <div
                  key={i}
                  className="movieSingleBox rounded-lg overflow-hidden"
                >
                  <img
                    className="w-[100%] h-[60%] m-auto mb-2"
                    src={`https://image.tmdb.org/t/p/original/${elem.poster_path}`}
                    alt="img"
                  />
                  <h1 className="mt-5">Title : {elem.title}</h1>
                  <h1>Release date : {elem.release_date}</h1>
                  <h1>Rating : {elem.vote_average.toFixed(1)}</h1>
                  <h1>Language : {elem.original_language}</h1>

                  {/* <p className="" >Title : {elem.overview}</p> */}
                </div>
              ))}
            </div>

            <div className="flex m-auto items-center mx-4 gap-3 justify-center  border bg-slate-800 bg-opacity-50 rounded w-[100%]">
              <p
                className="cursor-pointer"
                onClick={() => {
                  page == 1 ? setPage(1) : setPage(Number(page - 1));
                }}
              >
                Previous
              </p>

              <p className="cursor-pointer" onClick={handlePage}>
                1
              </p>
              <p className="cursor-pointer" onClick={handlePage}>
                2
              </p>
              <p className="cursor-pointer" onClick={handlePage}>
                3
              </p>
              <p className="cursor-pointer " onClick={handlePage}>
                4
              </p>
              <p className="cursor-pointer" onClick={handlePage}>
                5
              </p>
              <p className="bg-slate-700 rounded-full font-bold text-3xl p-2">
                {page}
              </p>
              <p className="cursor-pointer" onClick={handlePage}>
                6
              </p>
              <p className="cursor-pointer" onClick={handlePage}>
                7
              </p>
              <p className="cursor-pointer" onClick={handlePage}>
                8
              </p>
              <p className="cursor-pointer" onClick={handlePage}>
                9
              </p>
              <p className="cursor-pointer" onClick={handlePage}>
                10
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  setPage(Number(page + 1));
                }}
              >
                Next
              </p>
            </div>
          </>
        )}
      </div>
      {/* ///////////////////////////// */}
      <div>
        <div className=" ">
          {!searchedData.length && !searchedData.Search ? null : (
            <>
              <div className="w-[100%]  ">
                <button
                  className="text-right  mr-[6%] mb-2 mt-2 bg-slate-600 text-smoke justify-items-end rounded-full text-sm p-2 hover:text-emerald-200"
                  onClick={backToHome}
                >
                  back To Home
                </button>
              </div>
              <div className="m-auto  flex flex-wrap gap-5 w-[88%]">
                {searchedData.Search.map((elem, i) => (
                  <div key={i} className="movieSingleBox rounded-lg">
                    <img
                      className="w-[100%] h-[60%] m-auto mb-2"
                      src={elem.Poster}
                      alt="img"
                    />
                    <h1>Title : {elem.Title}</h1>
                    <h1>Release Year : {elem.Year}</h1>
                    <h1>Type : {elem.Type}</h1>
                    <h1>Rating : {Math.floor(elem.vote_average)}</h1>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {/* .............. */}
    </div>
  );
}

export default Movies;
