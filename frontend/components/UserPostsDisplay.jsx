"use client";  // Marks the file as a client component

import { useEffect, useState } from 'react';  // Import necessary hooks
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
        });  // Replace with your backend URL
        const data = await response.json();
        setUserPosts(data);  // Set the user posts state with the fetched data
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setLoading(false);  // Set loading to false after the data is fetched
      }
    };

    fetchUserPosts();  // Call the fetch function
  }, []);  // Empty dependency array means it runs once on component mount

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
              // If community_id is 1, render StudyPostDisplay
              return <StudyPosts key={post.id} post={post} />;
            
            case 2:
              // If community_id is 2, render CarPoolPostDisplay
              return <CarPoolPosts key={post.id} post={post} />;
            
            case 3:
              // If community_id is 3, render BloodDonationPostDisplay
              return <BloodDonationPosts key={post.id} post={post} />;
            
            default:
              // If community_id is not 1, 2, or 3, render a fallback message
              return <div key={post.id}>No suitable community found for this post.</div>;
          }
        })
      )}
    </>
  );
}

export default UserPostsList;