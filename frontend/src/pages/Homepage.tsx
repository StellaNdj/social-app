import React, { useEffect } from "react";
import Post from "../components/Post.tsx";
import PostForm from "../components/PostForm.tsx";
import { usePostContext } from "../hooks/usePostContext.tsx";


const Homepage = () => {
  const { posts, dispatch } = usePostContext();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_POSTS', payload: json})
      }
    }
    fetchPosts()
  }, [])

  console.log(posts);

  return(
    <div>
      <div>
        {posts !== null && posts.map((post) => {
          return <Post key={post.id} post={post}></Post>
        })}
      </div>
      <PostForm></PostForm>
    </div>
)
};

export default Homepage;
