import axios from "../utils/axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const Topnav = () => {

   const [query, setquery] = useState("")
   const [searches, setsearches] = useState(null)

    const GetSerches =  async()=>{
    try {
      const {data} =  await axios.get(`/search/multi?query=${query}`)
      
      setsearches(data.results);
       
  } catch (error) {
    console.log("Error :" + error);
    
  }
};


useEffect(()=>{
  GetSerches()
},[query])

  
   

  return (
    <div className="w-full h-[10vh] relative flex justify-start items-center ml-[15%]">
          <i class=" text-zinc-400 text-3xl ri-search-line"></i>
          <input
          onChange={(e)=> setquery(e.target.value)}
          value={query}
           className="w-[50%] mx-10 p-5 text-xl outline-none border-none bg-transparent text-zinc-400  " type="text" placeholder="Search anything" />

           {query.length > 0 && <i onClick={()=>setquery("")} class=" text-zinc-400 text-3xl ri-close-fill"></i> }
          
          
          <div className="absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[90%] overflow-auto rounded">
             

            {/* <Link className=" hover:text-black hover:bg-zinc-300 duration-200  font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100  ">
            <img src="" alt="" />
            <span>Hello Everyone</span>
            </Link> */}
            
         
          </div>

      
    </div>
  )
}

export default Topnav