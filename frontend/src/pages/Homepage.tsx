import React, { useEffect } from "react";
import Post from "../components/Post.tsx";
import PostForm from "../components/PostForm.tsx";
import { usePostContext } from "../hooks/usePostContext.tsx";
import { useAuthContext } from "../hooks/useAuthContext.tsx";
import { useState } from "react";
import Profile from "../components/Profile.tsx";
import './Homepage.css';

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
    email: string;
    token: string;
  } | null;
};

const Homepage = () => {
  const { posts, dispatch } = usePostContext() as PostContextType;
  const { user } = useAuthContext() as AuthContextType;
  const [userInfo, setUserInfo] = useState<any>(null);

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

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/api/userinfo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`
          },
          body: JSON.stringify({ email: user?.email })
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user info: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        setUserInfo(json);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };


    if(user) {
      fetchPosts();
      fetchUserInfo()
    }
  }, [dispatch, user]);

  return(
    <div className='homepage'>
      <div className='homepage-profile'>
        <Profile firstName={'Max'} lastName={'Mad'} username={'@MadMax'}></Profile>
      </div>
      <div className='homepage-posts'>
        {posts !== null && posts.map((post) => {
          return <Post key={post._id} post={post}></Post>
        })}
      </div>
    </div>
  )
};

export default Homepage;
