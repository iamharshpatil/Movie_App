import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personAction";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "../partials/HorizontalCards";
import Dropdown from "../partials/Dropdown";

const Persondetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.person);
  const [category, setcategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id, dispatch]);

  if (!info) return <Loading />;

  const { detail, externalid, combinedCredits, movieCredits, tvCredits } = info;
  const creditsToShow = info[`${category}Credits`]?.cast || [];

  return (
    <div className="px-[10%] py-[1%] w-screen bg-[#111418] flex flex-col">
      {/* Back Navigation */}
      <nav className="h-[10vh] w-full flex items-center gap-10 mb-5 text-xl">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl hover:text-[#1980E6] ri-arrow-left-line"
        />
      </nav>

      <div className="w-full flex flex-col lg:flex-row gap-10">
        {/* LEFT SECTION */}
        <div className="w-full lg:w-[25%] flex flex-col items-center">
          <img
            className="shadow-xl h-[50vh] object-cover rounded-md"
            src={`https://image.tmdb.org/t/p/original/${detail.profile_path || ""}`}
            alt="Poster"
          />

          {/* Social Links */}
          <div className="text-xl text-white flex gap-5 mt-5">
            {externalid?.wikidata_id && (
              <a target="_blank" rel="noopener noreferrer" href={`https://www.wikidata.org/wiki/${externalid.wikidata_id}`}>
                <i className="ri-earth-fill" />
              </a>
            )}
            {externalid?.facebook_id && (
              <a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/${externalid.facebook_id}`}>
                <i className="ri-facebook-circle-fill" />
              </a>
            )}
            {externalid?.instagram_id && (
              <a target="_blank" rel="noopener noreferrer" href={`https://www.instagram.com/${externalid.instagram_id}`}>
                <i className="ri-instagram-fill" />
              </a>
            )}
            {externalid?.twitter_id && (
              <a target="_blank" rel="noopener noreferrer" href={`https://www.twitter.com/${externalid.twitter_id}`}>
                <i className="ri-twitter-x-fill" />
              </a>
            )}
          </div>

          {/* Person Info */}
          <div className="text-white mt-6 w-full">
            <h2 className="text-2xl font-bold mb-4">Person Info</h2>
            <p><span className="font-semibold">Known For:</span> {detail.known_for_department}</p>
            <p><span className="font-semibold">Gender:</span> {detail.gender === 2 ? "Male" : "Female"}</p>
            <p><span className="font-semibold">Birthday:</span> {detail.birthday || "Unknown"}</p>
            <p><span className="font-semibold">Deathday:</span> {detail.deathday || "Still Alive"}</p>
            <p><span className="font-semibold">Place of Birth:</span> {detail.place_of_birth || "Unknown"}</p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-[75%]">
          <h1 className="text-5xl text-white font-black mb-5">{detail.name}</h1>

          {/* Biography */}
          {detail.biography && (
            <>
              <h2 className="text-lg text-white font-semibold">Biography</h2>
              <p className="text-white mt-3 whitespace-pre-line">{detail.biography}</p>
            </>
          )}

          {/* Summary */}
          <h2 className="text-lg text-white font-semibold mt-8">Summary</h2>
          <HorizontalCards data={combinedCredits.cast} />

          {/* Acting + Filter */}
          <div className="flex justify-between items-center mt-8">
            <h2 className="text-xl text-white font-semibold">Acting Credits</h2>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(value) => setcategory(value)}
            />
          </div>

          {/* Acting List */}
          <ul className="list-disc text-white w-full h-[50vh] overflow-y-auto mt-4  border px-10 border-zinc-700 rounded-md shadow-inner shadow-zinc-600/30">
            {creditsToShow.map((c, i) => (
              <li key={i} className="hover:bg-[#19191d] p-3 rounded cursor-pointer duration-300">
                <Link to={`/${category}/details/${c.id}`}>
                  <span className="font-medium ">
                    {c.title || c.name || c.original_title || c.original_name}
                  </span>
                  {c.character && (
                    <div className="text-sm text-zinc-300 ml-2">Character: {c.character}</div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Persondetails;
