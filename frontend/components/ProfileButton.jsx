"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, User } from "lucide-react";
import { useUserData } from "@/store";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

function ProfileButton() {
  const user = useUserData((state) => state.user);
  const clearUser = useUserData((state) => state.clearUser);
  const router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    clearUser();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback>
            {user.username[0].toUpperCase() + user.username[1].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="cursor-pointer">
          <Link href={`/${user.username}/profile`} className="flex gap-2">
            <User className="h-5" /> My Account
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="cursor-pointer">
          <Link href={`/${user.username}/profile`} className="flex  items-center gap-2">
            <Settings className="h-4" /> Settings
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileButton;
