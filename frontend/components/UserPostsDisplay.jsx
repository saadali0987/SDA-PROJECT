"use client";  

import { useEffect, useState } from 'react';  
import StudyPosts from "@/components/StudyDisplayPost";
import CarPoolPosts from "@/components/CarPoolDisplayPost";
import BloodDonationPosts from "@/components/BloodDonationDisplayPost";

function UserPostsList() {
  const [userPosts, setUserPosts] = useState([]);  // State to hold user posts
  const [loading, setLoading] = useState(true);  // State to track loading state

  useEffect(() => {
    // Function to fetch the user's posts from the backend
    const fetchUserPosts = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://localhost:8000/api/userPosts/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });  
        const data = await response.json();
        setUserPosts(data);  
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setLoading(false);  
      }
    };

    fetchUserPosts();  
  }, []);  

  // If posts are still loading, show a loading message
  if (loading) {
    return <div>Loading your posts...</div>;
  }

  return (
    <>
      {userPosts.length === 0 ? (
        <div>No posts found.</div>  // Message when no posts are available
      ) : (
        userPosts.map((post) => {
          // Conditional rendering based on post.community_id
          switch (post.community) {
            case 1:
              
              return <StudyPosts key={post.id} post={post} />;
            
            case 2:
              
              return <CarPoolPosts key={post.id} post={post} />;
            
            case 3:
              
              return <BloodDonationPosts key={post.id} post={post} />;
            
            default:
              
              return <div key={post.id}>No suitable community found for this post.</div>;
          }
        })
      )}
    </>
  );
}

export default UserPostsList;