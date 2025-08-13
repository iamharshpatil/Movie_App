import { useEffect, useState } from "react";
import { lazy } from "react";
import axios from "../utils/axios";

// const Sidenav = lazy(() => import("../partials/Sidenav"));
// const Topnav = lazy(() => import("../partials/Topnav"));
const Header = lazy(() => import("../partials/Header"));
const HorizontalCards = lazy(() => import("../partials/HorizontalCards"));
const Dropdown = lazy(() => import("../partials/Dropdown"));
const Loading = lazy(() => import("./Loading"));

function Home() {
  document.title = "PrimeMax | Homepage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);

      const randomData =
        data.results[Math.floor(Math.random() * data.results.length)];

      setWallpaper(randomData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const GetTrending = async () => {
    try {
      // console.log("Fetching trending for:", category);
      const { data } = await axios.get(`/trending/${category}/day`);

      settrending(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    GetHeaderWallpaper();
  }, []);

  useEffect(() => {
    GetTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      {/* <Sidenav /> */}
      <div className=" max-sm:w-full w-[100%] h-full overflow-auto overflow-x-hidden">
        
        <div className="flex flex-col max-sm:p-0 px-40 mt-5 items-start justify-center">
          <Header data={wallpaper} />
          <div className="max-sm:gap-25  w-full flex items-center justify-between p-3">
            <h2 className="text-white text-[22px] font-medium leading-tight   pb-3 pt-5">
              Trending
            </h2>

            <Dropdown
              title="Filter"
              options={["movie", "tv", "all"]}
              func={(value) => setcategory(value)}
            />
          </div>
          <HorizontalCards data={trending} />
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
