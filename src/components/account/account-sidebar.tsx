import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Bookmark, LogOut, UserPen, CirclePlus, House } from "lucide-react";
import Link from "next/link"

export function AccountSidebar() {
  const logout  = ()=> console.log("logout");
  return (
    <div className="w-72 rounded-lg space-y-4">
      <Card className="p-4 text-center border border-default-300">
        <Avatar className="w-16 h-16 mx-auto">
          <AvatarImage src="/landing-background.jpg" />
          <AvatarFallback>AH</AvatarFallback>
        </Avatar>
        <p className="text-lg font-semibold">Ahmad</p>
        <p className="text-sm text-gray-500">User</p>
      </Card>
      <Card className="p-4 space-y-2 border border-default-300">
        <Link
          href="/account"
          className={
            `flex items-center p-2 gap-4 hover:bg-primary-100 hover:text-primary-500 rounded-lg transition duration-250 ${
              true ? "bg-primary-100 text-primary-500" : ""
            }`
          }
        >
          <UserPen size={16} />
          <span>Edit Profile</span>
        </Link>
        <Link
          href="/new-property"
          className={
            `flex items-center p-2 gap-4 hover:bg-primary-100 hover:text-primary-500 rounded-lg transition duration-250 ${
              false ? "bg-primary-100 text-primary-500" : ""
            }`
          }
        >
          <CirclePlus size={16} />
          <span>Add Property</span>
        </Link>
        <Link
          href="/account/my-houses"
          className={
            `flex items-center p-2 gap-4 hover:bg-primary-100 hover:text-primary-500 rounded-lg transition duration-250 ${
              false ? "bg-primary-100 text-primary-500" : ""
            }`
          }
        >
          <House size={16} />
          <span>My Properties</span>
        </Link>
        <Link
          href="/account/saved-ads"
          className={
            `flex items-center p-2 gap-4 hover:bg-primary-100 hover:text-primary-500 rounded-lg transition duration-250 ${
              false ? "bg-primary-100 text-primary-500" : ""
            }`
          }
        >
          <Bookmark size={16} />
          <span>Saved Properties</span>
        </Link>
        <Button
          onClick={logout}
          // end
          // href="/logout"
          // className={
          //   `flex items-center p-2 gap-4 hover:bg-primary-100 hover:text-primary-500 rounded-lg transition duration-250 ${
          //     false ? "bg-primary-100 text-primary-500" : ""
          //   }`
          // }
          className={`flex items-center p-2 gap-4 hover:bg-primary-100 hover:text-primary-500 rounded-lg transition duration-250 bg-red-100 text-red-500
            `}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </Button>
      </Card>
    </div>
  );
}
