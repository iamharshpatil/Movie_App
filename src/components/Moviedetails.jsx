import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieAction";
import { Link, useNavigate, useParams } from "react-router-dom";

const Moviedetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie);
    };
  }, []);
  return (
    <div className="w-screen h-screen px-[10%]">
      <nav className="w-full">
        <Link
          onClick={() => navigate(-1)}
          className="text-2xl ml- hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>
    </div>
  );
};

export default Moviedetails;
