import React, { useState, useEffect } from "react";
import DefaultPicture from "../../Images/DefaultUser.png";
import { getVideoById } from "../../Api/videoApi";
import { Link } from "react-router-dom";
import { createCommentReply, deleteComment } from "../../Api/commentsApi";
import { checkAdminStatus } from "../../Api/adminApi";

const Comment = ({
  userId,
  userImage,
  userName,
  date,
  comment,
  videoData,
  commentId,
  childComments,
  handleReloadComments,

}) => {
  const [pictureSrc, setPictureSrc] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [comments, setComments] = useState([]);
  const [replyComment, setReplyComment] = useState("");
  const [isAdmin, setIsAdmin] =useState()

  useEffect(() => {
    
    const loadPictureImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/images/pp/${userImage}`
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        setPictureSrc(`http://localhost:3000/images/pp/${userImage}`);
      } catch (error) {
        console.error("No image found, setting to default");
        setPictureSrc(`http://localhost:3000/images/pp/DefaultUser.png`);
      }
    };

    loadPictureImage();
  }, [userImage]);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const video = await getVideoById(videoData);
        setVideoInfo(video);
      } catch (error) {
        console.error("Failed to fetch video information:", error);
      }
    };

    if (videoData) {
      fetchVideoInfo();

    }
    fetchData();

  }, [videoData]);

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleReplyClick = () => {
    setShowReplyInput(true);
  };

  const handleCreateReplyComment = async (e) => {
    if (e.key === "Enter") {
      try {
        const reply = await createCommentReply(commentId, replyComment);
        setReplyComment("");
        setComments([...comments, reply]);
        setShowReplyInput(false);
        handleReloadComments()
      } catch (error) {
        console.error("Failed to create reply:", error);
      }
    }
  };
  async function fetchData() {
    try {
      const adminCheck = await checkAdminStatus();
      setIsAdmin(adminCheck)
        } catch (error) {
      console.error(error);
    }
  }
  
  

  const handleReplyChange = (e) => {
    setReplyComment(e.target.value);
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?");
  
    if (confirmDelete) {
      try {
        await deleteComment(commentId);
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.commentId !== commentId)
        );
  
        handleReloadComments();
      } catch (error) {
        console.error("Failed to delete comment:", error);
      }
    }
  };
  
  
  

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  console.log()

  return (
    <div className="flex items-start mb-4">
      <Link to={`/user/${userId}`}>
        <img
          className="w-10 h-10 rounded-full mr-4"
          src={pictureSrc}
          alt={userName}
        />
      </Link>
      <div>
        <div className="flex items-center">
          <span className="font-semibold mr-2">{userName}</span>
          <span className="text-gray-600">{formatDate(date)}</span>
        </div>
        <p>{comment}</p>
        {videoInfo && (
          <div className="justify-end">
            <Link to={`/video/${videoInfo._id}`}>
              <h3>Video Information:</h3>
              <p>Title: {videoInfo.title}</p>
              <p>Views: {videoInfo.views}</p>
            </Link>
          </div>
        )}
        <div className="flex items-center mt-2">
          <button
            className="text-gray-500 hover:text-gray-700 mr-2"
            onClick={handleToggleReplies}
          >
            {showReplies ? "Cacher les réponses" : "Voir les réponses"}
          </button>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleReplyClick}
          >
            Répondre
          </button>
          {isAdmin && (
            <button
              className="text-red-500 hover:text-red-700 ml-2"
              onClick={() => handleDeleteComment(commentId)}
              >
              Supprimer
            </button>
          )}
        </div>
        {showReplyInput && (
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-full mt-2"
            type="text"
            placeholder="Enter your reply"
            value={replyComment}
            onChange={handleReplyChange}
            onKeyDown={handleCreateReplyComment}
          />
        )}
        {showReplies && (
          <div className="ml-8 mt-4">
            {childComments
              .filter((reply) => reply.parentId === commentId)
              .map((reply) => {
                const replyPictureSrc = `http://localhost:3000/images/pp/${reply.user.profilePicture}`;
                return (
                  <div key={reply._id} className="flex items-center mb-2">
                    <Link to={`/user/${reply.user._id}`}>
                      <img
                        className="w-8 h-8 rounded-full mr-2"
                        src={replyPictureSrc || DefaultPicture}
                        alt={reply.user.name}
                      />
                    </Link>
                    <div>
                      <span className="font-semibold mr-2">
                        {reply.user.name}
                      </span>
                      <span className="text-gray-600">
                        {formatDate(reply.createdAt)}
                      </span>
                      <p>{reply.content}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
