import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";
import { Input } from "@/components/ui/input";

// import Sidenav from "./Sidenav";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  const [hidden, sethidden] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const GetSerches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);

      setsearches(data.results);
    } catch (error) {
      console.log("Error :" + error);
    }
  };

  const handleSearchClick = () => {
    setquery("");
    setsearches([]);
    setIsSearchVisible(false); // Hide search bar after result click
  };

  const handlemenu = () => {
    if (hidden === true) {
      sethidden(false);
    } else {
      sethidden(true);
    }
  };

  const handleLinkClick = () => {
    sethidden(true);
  };

  const handleMobileSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    sethidden(true); // Close menu when search is opened
  };

  useEffect(() => {
    GetSerches();
  }, [query]);

  return (
    <div>
      <div className="w-[100%] justify-around gap-10  max-sm:pt-5  h-[8vh]   text-white relative flex mx-auto  items-center">
        <div className="flex items-center">
          {/* <h1 className="text-2xl  font-bold mr-3">
            <i className=" text-white ri-tv-fill"></i>
            <span className=" font-luxora text-2xl">PrimeMax</span>
          </h1> */}
          <img className="w-40" src="Logo.png" alt="" />

          <nav className="flex  max-sm:hidden gap-3">
            <Link
              to="/trending"
              className="hover:bg-[#1980E6] hover:text-white duration-300 rounded-lg p-4 flex "
            >
              {" "}
              <i className="mr-2 ri-fire-fill"></i> Trending
            </Link>
            <Link
              to="/popular"
              className="hover:bg-[#1980E6] hover:text-white duration-300 rounded-lg p-4 flex"
            >
              {" "}
              <i className="mr-2 ri-bard-fill"></i> Popular
            </Link>
            <Link
              to="/movie"
              className="hover:bg-[#1980E6] hover:text-white duration-300 rounded-lg p-4 flex "
            >
              {" "}
              <i className="mr-2 ri-movie-2-ai-fill"></i> Movies
            </Link>
            <Link
              to="/tv"
              className="hover:bg-[#1980E6] hover:text-white duration-300 rounded-lg p-4 flex"
            >
              {" "}
              <i className="mr-2 ri-slideshow-3-fill"></i> Tv Shows
            </Link>
            <Link
              to="/person"
              className="hover:bg-[#1980E6] hover:text-white duration-300 rounded-lg p-4 flex"
            >
              <i className="mr-2 ri-team-fill"></i> People
            </Link>
          </nav>
        </div>

        {/* Desktop Search */}
        <div className="relative w-full max-sm:hidden max-w-lg">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"></i>
          <Input
            placeholder="Search movies, TV shows, people..."
            onChange={(e) => setquery(e.target.value)}
            value={query}
            className="w-full pr-10 pl-10"
          />
          {query.length > 0 && (
            <i
              onClick={() => setquery("")}
              className="absolute top-1/2 -translate-y-1/2 right-3 text-2xl text-gray-400 hover:text-red-500 cursor-pointer ri-close-fill"
            ></i>
          )}
          {/* Search Results Dropdown */}
          {searches.length > 0 && (
            <div className="absolute z-[100] mt-2 w-full max-h-[50vh] overflow-auto bg-[#1b2027] rounded shadow-lg">
              {searches.map((s, i) => (
                <Link
                  to={`/${s.media_type}/details/${s.id}`}
                  key={i}
                  onClick={handleSearchClick}
                  className="flex items-center p-3 border-b border-zinc-700 hover:bg-zinc-300 hover:text-black transition-all"
                >
                  <img
                    src={
                      s.backdrop_path || s.profile_path
                        ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`
                        : noimage
                    }
                    alt={s.title || s.name || "Not available"}
                    className="w-16 h-16 object-cover rounded mr-4 shadow-md"
                  />
                  <span className="font-medium line-clamp-1">
                    {s.title || s.name || s.original_name || s.original_title}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex gap-5 justify-center items-center">
          <i
            onClick={handleMobileSearch}
            className="text-2xl md:hidden lg:hidden cursor-pointer ri-search-line"
          ></i>
          <i
            onClick={handlemenu}
            className="text-2xl md:hidden lg:hidden cursor-pointer ri-menu-line"
          ></i>
        </div>

        {/* Mobile Search */}
        {isSearchVisible && (
          <div className="fixed left-0 right-0 top-[8vh] p-4 bg-[#111418] z-50 md:hidden lg:hidden">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"></i>
              <Input
                placeholder="Search movies, TV shows, people..."
                onChange={(e) => setquery(e.target.value)}
                value={query}
                className="w-full pr-10 pl-10"
                autoFocus
              />
              {query.length > 0 && (
                <i
                  onClick={() => setquery("")}
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-2xl text-gray-400 hover:text-red-500 cursor-pointer ri-close-fill"
                ></i>
              )}
            </div>
            {searches.length > 0 && (
              <div className="mt-2 max-h-[50vh] overflow-auto bg-[#1b2027] rounded shadow-lg">
                {searches.map((s, i) => (
                  <Link
                    to={`/${s.media_type}/details/${s.id}`}
                    key={i}
                    onClick={handleSearchClick}
                    className="flex items-center p-3 border-b border-zinc-700 hover:bg-zinc-300 hover:text-black transition-all"
                  >
                    <img
                      src={
                        s.backdrop_path || s.profile_path
                          ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`
                          : noimage
                      }
                      alt={s.title || s.name || "Not available"}
                      className="w-16 h-16 object-cover rounded mr-4 shadow-md"
                    />
                    <span className="font-medium line-clamp-1">
                      {s.title || s.name || s.original_name || s.original_title}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        <div
          className={
            hidden === false
              ? "block fixed w-full left-0 z-50 max-sm:flex max-sm:flex-col top-[8vh] bg-[#111418]"
              : "hidden"
          }
        >
          <Link
            onClick={handleLinkClick}
            to="/trending"
            className="hover:bg-[#1980E6] hover:text-white duration-300 rounded-lg p-4 flex"
          >
            <i className="mr-2 ri-fire-fill"></i> Trending
          </Link>
          <Link
            onClick={handleLinkClick}
            to="/popular"
            className="hover:bg-[#1980E6] hover:text-white duration-300 rounded-lg p-4 flex"
          >
            <i className="mr-2 ri-bard-fill"></i> Popular
          </Link>
          <Link
            onClick={handleLinkClick}
            to="/movie"
            className="hover:bg-[#1980E6] hover:text-white duration-300 rounded-lg p-4 flex"
          >
            <i className="mr-2 ri-movie-2-ai-fill"></i> Movies
          </Link>
          <Link
            onClick={handleLinkClick}
            to="/tv"
            className="hover:bg-[#1980E6] hover:text-white duration-300 rounded-lg p-4 flex"
          >
            <i className="mr-2 ri-slideshow-3-fill"></i> Tv Shows
          </Link>
          <Link
            onClick={handleLinkClick}
            to="/person"
            className="hover:bg-[#1980E6] hover:text-white duration-300 rounded-lg p-4 flex"
          >
            <i className="mr-2 ri-team-fill"></i> People
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topnav;
