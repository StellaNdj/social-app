import React from "react";
import './Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import { usePostContext } from "../hooks/usePostContext.tsx";
import {useAuthContext} from '../hooks/useAuthContext.tsx';

interface PostContextType {
  dispatch: (action: any) => void;
};

interface AuthContextType {
  user: {
    id: string;
    token: string;
  } | null;
};

const Post = ({ post }) => {
  const { dispatch } = usePostContext() as PostContextType;
  const { user } = useAuthContext() as AuthContextType;

  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch('/api/posts/'+ post._id, {
      method: "DELETE"
    });
    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'DELETE_POST', payload: json})
    }
  };

  return(
    <div className="post-card">
      <p>{post.content}</p>
      <div className="post-counters">
        <p><FontAwesomeIcon icon={faThumbsUp} /></p>
        <p><FontAwesomeIcon icon={faThumbsDown} /></p>
        <p>Like counter</p>
        <p>Dislike counter</p>
        <span onClick={handleClick}>delete</span>
      </div>
    </div>
  )
};

export default Post;
