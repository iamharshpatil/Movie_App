import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "../partials/Topnav";
import Dropdown from "../partials/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "../partials/Cards";

const Popular = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("movie");
    const [popular, setpopular] = useState([]);
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
  document.title = "PrimeMax | Popular "

  
    const GetPopular = async () => {
        try {
          const { data } = await axios.get(`/${category}/popular?page=${page}`);
    
          if(data.results.length > 0) {
                setpopular((prevState)=>[...prevState, ...data.results])
                setpage(page +1);
    
          }else{
               sethasMore(false);
          }
    
        } catch (error) {
          console.log("Error:", error);
        }
      };
    
      const refershHandler = ()=>{
        if(popular.length === 0){
            GetPopular();
        }else{
             setpage(1);
             setpopular([]);
             GetPopular();
        }
      }
    
      useEffect(() => {
        refershHandler();
      }, [category]);
    
      return popular.length > 0 ? (
        <div className="w-screen px-[8%] max-sm:px-[4%] bg-[#111418] h-screen">
          <div className="flex max-sm:flex-col max-sm:gap-4 justify-between px-5 max-sm:px-2">
            <h1 className="text-2xl my-5 max-sm:my-2 font-semibold">
              <i
                onClick={() => navigate(-1)}
                className="text-2xl hover:text-[#1980E6] ri-arrow-left-line"
              ></i>{" "}
              Popular
            </h1>

            <div className="flex max-sm:flex max-sm:gap-2 items-center">
              <Dropdown
                title="Category"
                options={["movie", "tv"]}
                func={(value) => setcategory(value)}
              />
            </div>
          </div>
    
            <InfiniteScroll
            dataLength={popular.length}
            next={GetPopular}
            hasMore={hasMore}
            loader={<div className="w-full flex justify-center p-4">
            <div className="w-10  h-10 border-4 border-[#1980E6] border-t-transparent rounded-full animate-spin"></div>
          </div>}
          className="max-sm:mt-2"
          >
    
          <Cards data={popular} title={category} />
            </InfiniteScroll>
    
    
        </div>
      ) : (
        <Loading />
      );
    };

export default Popular