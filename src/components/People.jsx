import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "../partials/Topnav";
import Dropdown from "../partials/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "../partials/Cards";


const People = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("popular");
    const [person, setperson] = useState([]);
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
  document.title = "PrimeMax | Person Show"

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);

      if(data.results.length > 0) {
            setperson((prevState)=>[...prevState, ...data.results])
            setpage(page +1);

      }else{
           sethasMore(false);
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refershHandler = ()=>{
    if(person.length === 0){
        GetPerson();
    }else{
         setpage(1);
         setperson([]);
         GetPerson();
    }
  }

  useEffect(() => {
    refershHandler();
  }, [category]);



  return person.length > 0 ? (
    <div className=" w-screen px-[8%] bg-[#111418] h-screen ">
      <div className=" flex justify-between px-5 ">
        <h1 className="text-2xl my-5 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="text-2xl ml- hover:text-[#1980E6] ri-arrow-left-line"
          ></i>{" "}
          People
        </h1>

        <div className="flex items-center w-[80%]">

          
          <div className="w-[2%]"></div>
          
        </div>
      </div>

        <InfiniteScroll
        dataLength={person.length}
        next={GetPerson}
        hasMore={hasMore}
        loader={<div className="w-full flex justify-center p-4">
            <div className="w-10 h-10 border-4 border-[#1980E6] border-t-transparent rounded-full animate-spin"></div>
          </div>}>

      <Cards data={person} title="person" />
        </InfiniteScroll>


    </div>
  ) : (
    <Loading />
  );
};


export default People