import { Link } from "react-router-dom";

const Header = ({ data }) => {
  console.log(data);

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${
          data?.backdrop_path || data?.profile_path || ""
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-[50vh] flex flex-col justify-end p-[10%]"
    >
      <h1 className=" w-[70%] text-5xl font-black text-white">
        {data.title || data.name || data.original_name || data.original_title}
      </h1>
      <p className="w-[70%] mt-3 text-white">
        {data.overview.slice(0, 200)}...<Link className="text-blue-400">more</Link>
      </p>
      <p></p>
    </div>
  );
};

export default Header;
