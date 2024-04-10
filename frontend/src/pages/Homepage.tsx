import React, { useEffect } from "react";
import Post from "../components/Post.tsx";
import PostForm from "../components/PostForm.tsx";
import { usePostContext } from "../hooks/usePostContext.tsx";
import { useAuthContext } from "../hooks/useAuthContext.tsx"

interface PostContextType {
  dispatch: (action: any) => void;
  posts: [{
    _id: string;
    content: string;
    user: object;
  }]
};

interface AuthContextType {
  user: {
    id: string;
    token: string;
  } | null;
};

const Homepage = () => {
  const { posts, dispatch } = usePostContext() as PostContextType;
  const { user } = useAuthContext() as AuthContextType;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts', {
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_POSTS', payload: json})
      }
    };

    if(user) {
      fetchPosts();
      console.log(posts);
    }
  }, [dispatch, user]);

  return(
    <div>
      <div>
        {posts !== null && posts.map((post) => {
          return <Post key={post._id} post={post}></Post>
        })}
      </div>
      <PostForm></PostForm>
    </div>
  )
};

export default Homepage;
