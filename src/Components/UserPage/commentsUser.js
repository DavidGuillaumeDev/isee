import React, { useEffect, useState } from "react";
import Comments from "../VideoPage/comments";
import { getVideoById } from "../../Api/videoApi";
import { useParams  } from "react-router-dom";


const CommentUser = ({ user }) => {

    user = "Azazel";

    const { videoId } = useParams();

    const [commentsData, setCommentsData] = useState(null);

    const fetchVideoData = async (videoId) => {
        try {
          const data = await getVideoById(videoId);
          setCommentsData(data.comments);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        fetchVideoData(videoId);
      }, [videoId]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div>
                <h1 className="text-4xl font-semibold mb-6 text-gray-800 text-center font-mono">
                    Commentaire écrits par {user}
                </h1>
            </div>
            <div>
                <Comments comments={commentsData} />
            </div>
        </div>
    );
};

export default CommentUser;
