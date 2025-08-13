import { lazy,Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Topnav from "./partials/Topnav";
const Home = lazy(() => import("./components/Home"));
const Trending = lazy(() => import("./components/Trending"));
const Popular = lazy(() => import("./components/Popular"));
const Movie = lazy(() => import("./components/Movie"));
const Tvshow = lazy(() => import("./components/Tvshow"));
const People = lazy(() => import("./components/People"));
const Moviedetails = lazy(() => import("./components/Moviedetails"));
const Persondetails = lazy(() => import("./components/Persondetails"));
const Tvdetails = lazy(() => import("./components/Tvdetails"));
const Notfound = lazy(() => import("./components/Notfound")); 
const Trailer = lazy(() => import("./partials/Trailer"));

function App() {
  return (
    <div className="bg-[#111418]  text-white w-screen h-screen flex-col overflow-x-hidden flex  ">
      <Suspense fallback={<div className="text-white text-xl m-auto"><Loading/></div>}>
      <Topnav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/details/:id" element={<Moviedetails />}>
            <Route path="/movie/details/:id/trailer" element={<Trailer />} />
          </Route>
          <Route path="/tv" element={<Tvshow />} />
          <Route path="/tv/details/:id" element={<Tvdetails />}>
            <Route path="/tv/details/:id/trailer" element={<Trailer />} />
          </Route>
          <Route path="/person" element={<People />} />
          <Route path="/person/details/:id" element={<Persondetails />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
