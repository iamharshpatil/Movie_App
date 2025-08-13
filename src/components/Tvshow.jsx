import axios from "../utils/axios";
import { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Loading = lazy(() => import("./Loading"));
const Topnav = lazy(() => import("../partials/Topnav"));
const Dropdown = lazy(() => import("../partials/Dropdown"));
const Cards = lazy(() => import("../partials/Cards"));

const Tvshow = () => {

    const navigate = useNavigate();
    const [category, setcategory] = useState("airing_today");
    const [tv, settv] = useState([]);
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
  document.title = "PrimeMax | Tv Show"

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if(data.results.length > 0) {
            settv((prevState)=>[...prevState, ...data.results])
            setpage(page +1);

      }else{
           sethasMore(false);
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refershHandler = ()=>{
    if(tv.length === 0){
        GetTv();
    }else{
         setpage(1);
         settv([]);
         GetTv();
    }
  }

  useEffect(() => {
    refershHandler();
  }, [category]);



    return tv.length > 0 ? (
        <div className="w-screen px-[8%] max-sm:px-[4%] bg-[#111418] h-screen">
          <div className="flex max-sm:flex-col max-sm:gap-4 justify-between px-5 max-sm:px-2">
            <h1 className="text-2xl my-5 max-sm:my-2 font-semibold">
              <i
                onClick={() => navigate(-1)}
                className="text-2xl hover:text-[#1980E6] ri-arrow-left-line"
              ></i>{" "}
              Tv Show 
              <small className="text-sm ml-2">({category})</small>
            </h1>
    
            <div className="flex max-sm:flex max-sm:gap-2 items-center">
              
    
              <Dropdown
                title="Category"
                options={['on_the_air','popular','top_rated','airing_today']}
                func={(value) => setcategory(value)}
              />
            </div>
          </div>
    
            <InfiniteScroll
            dataLength={tv.length}
            next={GetTv}
            hasMore={hasMore}
            loader={<div className="w-full flex justify-center p-4">
            <div className="w-10 h-10 border-4 border-[#1980E6] border-t-transparent rounded-full animate-spin"></div>
          </div>}
          className="max-sm:mt-2"
          >
    
          <Cards data={tv} title='tv' />
            </InfiniteScroll>
    
    
        </div>
      ) : (
        <Loading />
      );
    };

export default Tvshow