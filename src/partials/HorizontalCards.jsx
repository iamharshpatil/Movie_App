import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";
import TiltedCard from "@/components/ui/TiltedCard";


const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full max-sm:h-[45%] max-sm:px-5  flex overflow-y-hidden mb-5">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="max-sm:min-w-[50%]  min-w-[15%] mr-5 mb-3"
          >
            <TiltedCard
              imageSrc={
                d?.backdrop_path || d?.poster_path
                  ? `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}`
                  : noimage
              }
              altText={d.title || d.name || d.original_name || d.original_title}
              captionText="Hover to view details"
              displayOverlayContent={true}
              overlayContent={
                <div className="bg-black/70 text-white  p-3  rounded-md max-w-[250px]">
                  <h1 className="text-sm font-bold">
                    {d.title || d.name || d.original_name || d.original_title}
                  </h1>
                  <p className="text-xs text-gray-300 mt-1">
                    {d.release_date ? `📅 ${d.release_date}` : ""}
                  </p>
                  <p className="text-xs">
                    ⭐ {d.vote_average?.toFixed(1) || "N/A"}
                  </p>
                  <p className="text-xs mt-1 line-clamp-3">
                    {d.overview ? d.overview.slice(0, 100) + "..." : "No description available."}
                  </p>
                </div>
              }
              imageHeight="250px"
              imageWidth="100%"
              containerHeight="auto"
              containerWidth="100%"
              showTooltip={false}
              showMobileWarning={false}
            />
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-white font-black text-center w-full">
          Nothing to show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
