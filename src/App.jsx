import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshow from "./components/Tvshow";
import People from "./components/People";
import Moviedetails from "./components/Moviedetails";
import Persondetails from "./components/Persondetails";
import Tvdetails from "./components/Tvdetails";
import Trailer from "./partials/Trailer";

function App() {
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<Moviedetails />} />
        <Route path="/tv" element={<Tvshow />} />
        <Route path="/tv/details/:id" element={<Tvdetails />} />
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<Persondetails />} />
        
        {/* Dynamic trailer route for movie and TV categories */}
        <Route path="/:category/details/:id/trailer" element={<Trailer />} />
      </Routes>
    </div>
  );
}

export default App;
