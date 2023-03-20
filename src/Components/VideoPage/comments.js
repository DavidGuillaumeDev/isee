import React, { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import Comment from './comment';



const Comments = ({ comments }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
/*
  const handleAddComment = () => {
    // Add nv commentaire
  };
*/
  return (
    <div className="comments">
      <div className="flex items-center mb-4">
        <FiUser className="text-xl mr-4" />
        <input
          className="border-2 border-gray-300 rounded-md p-2 w-full"
          type="text"
          placeholder="Ajouter un commentaire"
          value={newComment}
          onChange={handleCommentChange}
        />
      </div>
      <div className="comment-list">
        {/*comments.map((comment) => (
          <Comment
            key={comment.id}
            userImage={comment.userImage}
            userName={comment.userName}
            date={comment.date}
            comment={comment.comment}
          />
        ))*/}
      </div>
    </div>
  );
};

export default Comments;
