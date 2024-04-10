import React from "react";
import { useState } from "react";
import { usePostContext } from "../hooks/usePostContext.tsx";

const PostForm = () => {
  const { dispatch } = usePostContext();
  const [content, setContent] = useState('');
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = { content };

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json'
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
      dispatch({type: 'CREATE_POST', payload: json})
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>New post</h3>
      <label>Content</label>
      <input
        type="text"
        onChange={(e) => setContent(e.target.value)}
        value={content}/>
      <button>Create post</button>
      {error && <div>{error}</div>}
    </form>
  )
};

export default PostForm;
