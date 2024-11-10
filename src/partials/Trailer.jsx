import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { useEffect } from "react";

const Trailer = () => {
    const navigate = useNavigate();

    const { pathname } = useLocation();
    const category = pathname.includes('movies') ? 'movies' : "tv";
    const ytvideo = useSelector(state => state.movie.info.videos);


    console.log(ytvideo);
    

    return (
        <div className="absolute bg-black z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <button
                onClick={() => navigate(-1)}
                className="absolute text-3xl text-white right-[5%] top-[5%] hover:text-[#6556CD] ri-close-fill"
            >
                &times;
            </button>
            {ytvideo?.key ? (
                <ReactPlayer
                    height={800}
                    width={1500}
                    url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
                />
            ) : (
                <Loading/>
            )}
        </div>
    );
};

export default Trailer;
