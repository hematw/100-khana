import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Bookmark, LogOut, UserPen, CirclePlus, House } from "lucide-react";
import { NavLink } from "react-router-dom";

export function AccountSidebar() {
  const { logout } = useAuth();
  return (
    <div className="w-72 rounded-lg space-y-4">
      <Card className="p-4 text-center border border-default-300">
        <Avatar className="w-16 h-16 mx-auto" />
        <p className="text-lg font-semibold">Ahmad</p>
        <p className="text-sm text-gray-500">User</p>
      </Card>
      <Card className="p-4 space-y-2 border border-default-300">
        <NavLink
          end
          to="/account"
          className={({ isActive }) =>
            `flex items-center p-2 gap-4 hover:bg-primary-100 hover:text-primary-500 rounded-lg transition duration-250 ${
              isActive ? "bg-primary-100 text-primary-500" : ""
            }`
          }
        >
          <UserPen size={16} />
          <span>Edit Profile</span>
        </NavLink>
        <NavLink
          end
          to="/new-property"
          className={({ isActive }) =>
            `flex items-center p-2 gap-4 hover:bg-primary-100 hover:text-primary-500 rounded-lg transition duration-250 ${
              isActive ? "bg-primary-100 text-primary-500" : ""
            }`
          }
        >
          <CirclePlus size={16} />
          <span>Add Property</span>
        </NavLink>
        <NavLink
          end
          to="/account/my-houses"
          className={({ isActive }) =>
            `flex items-center p-2 gap-4 hover:bg-primary-100 hover:text-primary-500 rounded-lg transition duration-250 ${
              isActive ? "bg-primary-100 text-primary-500" : ""
            }`
          }
        >
          <House size={16} />
          <span>My Properties</span>
        </NavLink>
        <NavLink
          end
          to="/account/saved-ads"
          className={({ isActive }) =>
            `flex items-center p-2 gap-4 hover:bg-primary-100 hover:text-primary-500 rounded-lg transition duration-250 ${
              isActive ? "bg-primary-100 text-primary-500" : ""
            }`
          }
        >
          <Bookmark size={16} />
          <span>Saved Properties</span>
        </NavLink>
        <Button
          onPress={logout}
          // end
          // to="/logout"
          // className={({ isActive }) =>
          //   `flex items-center p-2 gap-4 hover:bg-primary-100 hover:text-primary-500 rounded-lg transition duration-250 ${
          //     isActive ? "bg-primary-100 text-primary-500" : ""
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
