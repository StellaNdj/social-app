import React from "react";
import './Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import { usePostContext } from "../hooks/usePostContext.tsx";
import {useAuthContext} from '../hooks/useAuthContext.tsx';
import Avatar from "./Avatar.tsx";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { useState } from "react";

interface PostContextType {
  dispatch: (action: any) => void;
};

interface AuthContextType {
  user: {
    id: string;
    token: string;
    user: object;
  } | null;
};

const Post = ({ post }) => {
  const { dispatch } = usePostContext() as PostContextType;
  const { user } = useAuthContext() as AuthContextType;
  const [clicked, setClicked] = useState(false);
  const [clickedIcon, setClickedIcon] = useState('');

  const handleLikes = async () => {
    if (!user) {
      return
    }
    const response = await fetch('/api/posts/'+ post._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ action: "like" }),
    });
    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'UPDATE_POST', payload: json})
      setClicked(true);
      setClickedIcon('like');
    }
  };

  const handleDislikes = async () => {
    if (!user) {
      return
    }
    const response = await fetch('/api/posts/'+ post._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ action: "dislike" }),
    });
    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'UPDATE_POST', payload: json});
      setClicked(true);
      setClickedIcon('dislike');
    }
  };

  return(
    <div className="post-card">
      {post.user && (
        <div className="user-info">
          <Avatar
            firstName={post.user.firstName}
            lastName={post.user.lastName}
            username={post.user.username}
            />
        </div>
      )}
      <p className="post-date">{formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}</p>
      <p>{post.content}</p>
      <div className="post-counters">
        <FontAwesomeIcon
          icon={faThumbsUp}
          onClick={clicked ? null : handleLikes}
          style={{
            color: clickedIcon === 'like' ? '#7B61FF' : '#ad9dff',
          }} />
        <FontAwesomeIcon
          icon={faThumbsDown}
          onClick={clicked ? null : handleDislikes}
          style={{
            color: clickedIcon === 'dislike' ? '#7B61FF' : '#ad9dff',
          }}  />
        <p>Likes: <span>{post.likes}</span></p>
        <p>Dislikes: <span>{post.dislikes}</span></p>
      </div>
    </div>
  )
};

export default Post;
