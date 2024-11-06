import { useEffect, useState } from "react";
import Sidenav from "../partials/Sidenav";
import Topnav from "../partials/Topnav";
import axios from "../utils/axios";
import Header from "../partials/Header";

function Home() {
  document.title = "PrimeMax | Homepage";

  const [wallpaper, setWallpaper] = useState(null);

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);

      // Use Math.floor() to select a random index as an integer
      const randomData = data.results[Math.floor(Math.random() * data.results.length)];

      setWallpaper(randomData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (!wallpaper) {
      GetHeaderWallpaper();
    }
  }, [wallpaper]);

  return wallpaper ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full">
        <Topnav />
        <Header data={wallpaper} />
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  );
}

export default Home;
