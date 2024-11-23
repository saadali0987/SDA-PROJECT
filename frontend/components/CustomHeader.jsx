"use client";
import React, { useEffect, useState } from "react";
import { BellIcon, Plus, PlusIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useUserData } from "@/store";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileButton from "./ProfileButton";
import SearchBar from "./Searchbar";

function Header() {
  const user = useUserData((state) => state.user);
  const clearUser = useUserData((state) => state.clearUser);
  const router = useRouter();

  useEffect(() => {
    console.log(user);
  }, [user]);

  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   clearUser();
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");
  //   router.push("/login");
  // };

  const handleCreatePost = (e) => {
    e.preventDefault();
    router.push("/createPost");
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-main-color border-gray-700/50 border-b-[1px]">
      <div className="mx-auto max-w-[1200px] px-3 py-2 bg-main-color flex items-center justify-between  ">
        <div className="flex items-center space-x-2 w-[15rem]">
          <Image
            alt="logo"
            width={38}
            height={38}
            src="/logo.png"
            className="w-auto h-auto"
          />
          <Link href="/" className=" text-lg">
            FASTLink
          </Link>
        </div>

        <SearchBar />

        {user.username ? (
          <div className="flex items-center justify-end space-x-2 text-sm  w-[15rem]">
            <button
              onClick={handleCreatePost}
              className="flex items-center space-x-1"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Create</span>
            </button>
            <ProfileButton />
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-sm">
            <Button>
              <Link href="/login">Login</Link>
            </Button>

            <Button>
              <Link href="/signup">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
