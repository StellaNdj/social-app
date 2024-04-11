import React from "react";
import { useState } from "react";
import { usePostContext } from "../hooks/usePostContext.tsx";
import {useAuthContext} from '../hooks/useAuthContext.tsx';
import './components css/Modal.css';
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
      dispatch({type: 'CREATE_POST', payload: json});
      onCloseModal();
    }
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <textarea
        rows={20} cols={60}
        onChange={(e) => setContent(e.target.value)}
        value={content}></textarea>
      <Button className={'modal-create-button'} onClick={undefined} text={'Post'}></Button>
      {error && <div className="notice">{error}</div>}
    </form>
  )
};

export default PostForm;
