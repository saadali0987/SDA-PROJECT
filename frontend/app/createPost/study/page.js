'use client'
import { FileUploaderMinimal } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';

import { useState } from 'react';
import UploadImages from '@/components/UploadImages';

const CreateStudyPost = () => {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [referenceImage, setReferenceImage] = useState('');

  console.log(referenceImage)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data to handle the file upload
    const formData = new FormData();
    formData.append('courseName', courseName);
    formData.append('description', description);
    if (referenceImage) {
      formData.append('referenceImage', referenceImage);
    }

    try {
      const response = await fetch('http://localhost:8000/api/study-posts/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Post created successfully!');
        // Reset form fields after successful submission
        setCourseName('');
        setDescription('');
        setReferenceImage(null);
      } else {
        const errorData = await response.json();
        console.error('Error creating post:', errorData);
        alert('Failed to create post.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className=' h-screen flex items-center justify-center w-full'>
        <div className=" w-1/2 text-white bg-[#0E1113] mx-auto p-6 border border-green-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Study Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2" htmlFor="courseName">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-700"
            required
            placeholder='Data Structures'
          />
        </div>

        <div className="mb-4">
          <label className="block text-white font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-700 px-3 py-2  rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="referenceImage">
            Reference Image
          </label>
          {/* <input
            type="file"
            id="referenceImage"
            onChange={(e) => setReferenceImage(e.target.files[0])}
            className="w-full"
          /> */}
          <UploadImages setReferenceImage={setReferenceImage} referenceImage={referenceImage} />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
    </div>

    
  );
};

export default CreateStudyPost;