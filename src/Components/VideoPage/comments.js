import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import Comment from "./comment";
import { createComment, getCommentsByVideoId } from "../../Api/commentsApi";

const Comments = ({ videoId,handleReloadComments  }) => {
  const [parentsComments, setParentsComments] = useState([]);
  const [childComments, setChildComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  

  
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCreateComment = async (e) => {
    if (e.key === "Enter") {
      try {
        await createComment(videoId, newComment);
        setNewComment("");
        handleReloadComments(); // Appel du callback pour recharger les commentaires
      } catch (error) {
        console.error("Failed to create comment:", error);
      }
    }
  };
  const fetchComments = async () => {
    try {
      const commentsData = await getCommentsByVideoId(videoId);
      const parentComments = commentsData.filter(
        (comment) => !comment.parentId
      );
      const childComments = commentsData.filter((comment) => comment.parentId);

      setChildComments(childComments);
      setParentsComments(parentComments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [videoId,handleReloadComments]);

  return (
    <div className="comments" key={handleReloadComments}>
      <div className="flex items-center mb-4">
        <FiUser className="text-xl mr-4" />
        <input
          className="border-2 border-gray-300 rounded-md p-2 w-full"
          type="text"
          placeholder="Ajouter un commentaire"
          value={newComment}
          onChange={handleCommentChange}
          onKeyDown={handleCreateComment}
        />
      </div>
      <div className="comment-list">
        {parentsComments.map((comment) => (
          <Comment
            key={comment._id}
            userImage={comment.user.profilePicture}
            userName={comment.user.name}
            date={comment.createdAt}
            comment={comment.content}
            userId={comment.user._id}
            commentId={comment._id}
            childComments={childComments}
            handleReloadComments ={handleReloadComments}

          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
