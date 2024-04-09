import React, { useEffect, useState } from "react";

const Homepage = () => {
  const [posts, setPosts] = useState<any>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const json = await response.json()

      if (response.ok) {
        setPosts(json);
      }
    }
    fetchPosts()
  }, [])

  console.log(posts);

  return(
    <div>
      <div>
        {posts !== null && posts.map((post) => {
          return <p key={post._id}>{post.content}</p>
        })}
      </div>
    </div>
)
};

export default Homepage;
