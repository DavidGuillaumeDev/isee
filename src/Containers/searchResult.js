import React, { useEffect, useState } from "react";
import "../Styles/index.css";
import Miniature from "../Images/miniatureTest.jpg";
import ProfilPicture from "../Images/profilePictureTest.jpg";
import CardSearchPage from "../Components/cardSearchPage";
import { FiTrendingUp } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { fetchSearchVideos } from "../Api/videoApi";
import CardUser from "../Components/cardUser";

const SearchResult = () => {
  const { query } = useParams();
  document.title = "Résultat de recherche";
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchVideos = async () => {
      try {
        setLoading(true);
        const searchResults = await fetchSearchVideos(query);
        setSearchData(searchResults);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    searchVideos();
  }, [query]);

  return (
    <div className="trending-page-container mt-24 mx-2 ">
      <div className="trending-videos-container mb-6 mt-6">
        <h2 className="text-4xl font-semibold mb-8 text-gray-800 text-center">
          <div className="font-mono flex items-center mb-6">
            <FiTrendingUp className="text-black text-xl mr-3" />
            Résultats de recherche "{query}"
          </div>
        </h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6">
              <p>Chaines </p>

              {searchData.users.map((data) => (
                <>
                  <CardUser
                    userId={data._id}
                    userImage={data.profilePicture}
                    userName={data.name}
                    date={data.data}
                  />
                </>
              ))}
            </div>
            <div className="mt-6 grid g rid-cols-1 gap-6  ">
              <p>Videos </p>

              {searchData.videos.map((video) => (
                <CardSearchPage
                  key={video._id}
                  videoId={video._id}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  userName={video.user.name}
                  views={video.views}
                  date={video.date}
                  userImage={video.user.profilePicture}
                  description={video.description}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
