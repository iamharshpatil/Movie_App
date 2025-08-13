import { useNavigate } from "react-router-dom";
import { useEffect, useState,lazy } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "../utils/axios";

const Topnav = lazy(() => import("../partials/Topnav"));
const Dropdown = lazy(() => import("../partials/Dropdown"));
const Cards = lazy(() => import("../partials/Cards"));
const Loading = lazy(() => import("../components/Loading"));

const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("week");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  document.title = "PrimeMax | Trending "

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);

      if(data.results.length > 0) {
            settrending((prevState)=>[...prevState, ...data.results])
            setpage(page +1);

      }else{
           sethasMore(false);
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refershHandler = ()=>{
    if(trending.length === 0){
        GetTrending();
    }else{
         setpage(1);
         settrending([]);
         GetTrending();
    }
  }

  useEffect(() => {
    refershHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen px-[8%] max-sm:px-[4%] bg-[#111418] h-screen">
      <div className="flex max-sm:flex-col max-sm:gap-4 justify-between px-5 max-sm:px-2">
        <h1 className="text-2xl my-5 max-sm:my-2 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="text-2xl hover:text-[#1980E6] ri-arrow-left-line"
          ></i>{" "}
          Trending
        </h1>

        <div className="flex max-sm:flex max-sm:gap-2 items-center">

          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(value) => setcategory(value)}
          />
          <div className="w-[2%] max-sm:hidden"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(value) => setduration(value)}
          />
        </div>
      </div>

        <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<div className="w-full flex justify-center p-4">
            <div className="w-10 h-10 border-4 border-[#1980E6] border-t-transparent rounded-full animate-spin"></div>
          </div>}
        className="max-sm:mt-2"
        >

      <Cards data={trending} title={category} />
        </InfiniteScroll>


    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
