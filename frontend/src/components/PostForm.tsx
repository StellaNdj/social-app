import React from "react";
import { useState } from "react";
import { usePostContext } from "../hooks/usePostContext.tsx";
import {useAuthContext} from '../hooks/useAuthContext.tsx';
import './Modal.css';
import Button from "./Button.tsx";

interface PostContextType {
  dispatch: (action: any) => void;
};

interface AuthContextType {
  user: {
    id: string;
    token: string;
  } | null;
};

const PostForm = ({onCloseModal}) => {
  const { dispatch } = usePostContext() as PostContextType;
  const { user } = useAuthContext() as AuthContextType;
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user) {
      setError('You must be logged in');
      return
    }

    const post = { content };

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if(!response.ok) {
      setError(json.error)
      console.log(error);
    };

    if(response.ok) {
      setContent('');
      setError(null);
      console.log('New post add', post);
      dispatch({type: 'CREATE_POST', payload: json});
      onCloseModal={onCloseModal};
    }
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) => setContent(e.target.value)}
        value={content}/>
      <Button className={'modal-create-button'} onClick={undefined} text={'Post'}></Button>
      {error && <div>{error}</div>}
    </form>
  )
};

export default PostForm;
