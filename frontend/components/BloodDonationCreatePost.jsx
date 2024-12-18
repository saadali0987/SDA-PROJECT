import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomCardHeader from "./CustomCardHeader";
import CustomCardFooter from "./CustomCardFooter";
import { useRouter } from 'next/navigation';

function BloodDonation({ community }) {
  const [formData, setFormData] = useState({
    bloodType: "A+", 
    urgency: "Low", 
    requiredWithin: "1", 
  });
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");
  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit triggered");
    console.log(formData);

    // Prepare the data to be sent to the backend
    const formDataToSend = new FormData();
    formDataToSend.append("blood_type_required", formData.bloodType);
    formDataToSend.append("urgency", formData.urgency);
    formDataToSend.append("required_within", formData.requiredWithin + " weeks");
    formDataToSend.append("community", community);

    // Get the token from localStorage
    const token = localStorage.getItem("accessToken");
    console.log(token);

    // Send the FormData to the backend
    fetch("http://localhost:8000/api/createBloodDonationPost", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      body: formDataToSend, 
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setSuccessMessage("Posted Successfully!");
        
        setFormData({
          bloodType: "A+",
          urgency: "Low",
          requiredWithin: "1",
        });
        setTimeout(() => {
          router.push("/"); // Redirect to the homepage
        }, 2000); 
      })
      .catch((error) => {
        console.error("Error:", error);
        setSuccessMessage(""); // Clear success message on error
      });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CustomCardHeader
          title="Blood Donation"
          description="Find & Donate to save lives!"
        />
        <CardContent className="space-y-2">
          {/* Success Message */}
          {successMessage && (
            <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
              {successMessage}
            </div>
          )}
          <div className="space-y-1 w-full">
            <Label htmlFor="bloodType">Blood Type</Label>
            <select
              id="bloodType"
              value={formData.bloodType}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="space-y-1 w-full">
            <Label htmlFor="urgency">Urgency</Label>
            <select
              id="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="space-y-1 w-full">
            <Label htmlFor="requiredWithin">Required Within (Weeks)</Label>
            <input
              id="requiredWithin"
              type="number"
              min="1"
              max="8"
              value={formData.requiredWithin}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter number of weeks (1-8)"
            />
          </div>
        </CardContent>
        <CustomCardFooter buttontext="Find a Donor" />
      </form>
    </Card>
  );
}

export default BloodDonation;
