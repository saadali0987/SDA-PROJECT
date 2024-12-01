"use client";
import DefaultLayout from "@/components/DefaultLayout";
import { useUserData } from "@/store";
import { Edit2Icon, EditIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import UserPostsList from "@/components/UserPostsDisplay";

export default function profile() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassowrd] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const user = useUserData((state) => state.user);
  const setUser = useUserData((state) => state.setUser)

  const changeUsername =async (e)=>{
    e.preventDefault()
    if (!username.trim()) {
      alert("username cannot be empty.");
      return;
    }

  
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch("http://localhost:8000/api/updateProfile/username/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ username: username }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update username");
      }
  
      const data = await response.json();
      console.log(data)
      
      // Assuming `useUserData` has an update function
      // useUserData.setState((state) => ({
      //   user: { ...state.user, username: data.username },
      // }));

      setUser({
        username: username,
        email: user.email
      })
  
      alert("Username updated successfully!");
    } catch (error) {
      console.error("Error updating username:", error);
      alert(error.message || "Something went wrong. Please try again.");
    }

  }

  const changeEmail = async (e)=>{
    e.preventDefault()
    if (!email.trim()) {
      alert("Email cannot be empty.");
      return;
    }

  
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch("http://localhost:8000/api/updateProfile/email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ email: email }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update email");
      }
  
      const data = await response.json();
      console.log(data)
      
      // Assuming `useUserData` has an update function
      // useUserData.setState((state) => ({
      //   user: { ...state.user, username: data.username },
      // }));

      setUser({
        email: email,
        username: user.username
      })
  
      alert("Email updated successfully!");
    } catch (error) {
      console.error("Error email username:", error);
      alert(error.message || "Something went wrong. Please try again.");
    }
  }

  const changePassword = async (e)=>{
    e.preventDefault()
    if (!newPassword.trim()) {
      alert("password cannot be empty.");
      return;
    }

  
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch("http://localhost:8000/api/updateProfile/password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          old_password: currentPassword,
          new_password: newPassword
         }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
      }
  
      const data = await response.json();
      console.log(data)
      
      // Assuming `useUserData` has an update function
      // useUserData.setState((state) => ({
      //   user: { ...state.user, username: data.username },
      // }));


  
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error password:", error);
      alert(error.message || "Something went wrong. Please try again.");
    }

  }

  return (
    <DefaultLayout>
      <div className="relative w-full min-h-screen  mt-10 px-5 flex flex-col space-y-6">
        <div className=" border border-2 p-4 rounded-md">
          <h1 className="text-3xl ">User Profile</h1>
          <div className="mt-4 flex flex-col space-y-4">
            <div className="flex justify-between">
              <h2 className=" font-bold">Name:</h2>
              <div className="flex space-x-2 items-center">
                <h2>{user.username}</h2>
                <Dialog>
                  <DialogTrigger asChild>
                  <EditIcon width={15} height={15} className=" cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Username</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Username
                        </Label>
                        <Input
                        value={username || user.username}
                          onChange={(e)=>setUsername(e.target.value)}
                          id="name"
                          defaultValue="Pedro Duarte"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={changeUsername} type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex justify-between">
              <h2 className=" font-bold">Email:</h2>
              <div className="flex space-x-2 items-center">
                <h2>{user.email}</h2>
                <Dialog>
                  <DialogTrigger asChild>
                  <EditIcon width={15} height={15} className=" cursor-pointer " />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Email</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Email
                        </Label>
                        <Input
                        value={email || user.email}
                          onChange={(e)=>setEmail(e.target.value)}
                          id="email"
                          defaultValue="Pedro Duarte"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={changeEmail} type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="text-sm font-bold cursor-pointer">
              
              <Dialog>
                  <DialogTrigger asChild>
                    <button>Change Password?</button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Current Password
                        </Label>
                        <Input
                        value={currentPassword}
                          onChange={(e)=>setCurrentPassword(e.target.value)}
                          id="currentPassword"
                          defaultValue="Pedro Duarte"
                          className="col-span-3"
                          type='password'
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          New Password
                        </Label>
                        <Input
                        value={newPassword}
                          onChange={(e)=>setNewPassowrd(e.target.value)}
                          id="newPassword"
                          defaultValue="Pedro Duarte"
                          className="col-span-3"
                          type='password'
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={changePassword} type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
            </div>
          </div>
        </div>

        <hr />

        <div className="flex-1">User Posts</div>
        <div>
          <UserPostsList/>
        </div>
      </div>
    </DefaultLayout>
  );
}
