import React from "react";
import Comment from "../VideoPage/comment";

const CommentUser = ({ userData, commentsData }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div>
        <h1 className="text-4xl font-semibold mb-6 text-gray-800 text-center font-mono">
          Commentaire écrits par {userData.name}
        </h1>
      </div>
      <div>
        <div className="comment-list">
          {commentsData.map((comment) => (
            <Comment
              key={comment._id}
              userImage={userData.profilePicture}
              userName={userData.name}
              date={comment.createdAt}
              comment={comment.content}
              videoData={comment.videoId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentUser;
