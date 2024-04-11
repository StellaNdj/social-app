import React from "react";
import './Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import { usePostContext } from "../hooks/usePostContext.tsx";
import {useAuthContext} from '../hooks/useAuthContext.tsx';
import Avatar from "./Avatar.tsx";

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

  // const handleClick = async () => {
  //   if (!user) {
  //     return
  //   }
  //   const response = await fetch('/api/posts/'+ post._id, {
  //     method: "DELETE"
  //   });
  //   const json = await response.json();

  //   if(response.ok) {
  //     dispatch({type: 'DELETE_POST', payload: json})
  //   }
  // };

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
      dispatch({type: 'UPDATE_POST', payload: json})
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
      <p>{post.content} {post.createdAt}</p>
      <div className="post-counters">
        <FontAwesomeIcon icon={faThumbsUp} onClick={handleLikes} />
        <FontAwesomeIcon icon={faThumbsDown} onClick={handleDislikes} />
        <p>Likes: {post.likes}</p>
        <p>Dislikes: {post.dislikes}</p>
      </div>
    </div>
  )
};

export default Post;
