import { Menu } from "lucide-react";
import Link  from "next/link";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

export default function NavDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" aria-label="User menu">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Nav dropdown">
        <DropdownMenuGroup title="My Account">
          <DropdownMenuItem key="profile">
            <Link href="./dashboard/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem key="add-property">
            <Link href="./properties">Add Property</Link>
          </DropdownMenuItem>
          <DropdownMenuItem key="my-properties">
            <Link href="./dashboard/homes">My Properties</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem key="team">Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem key="support">Support</DropdownMenuItem>
        <DropdownMenuItem key="api">API</DropdownMenuItem>
        <DropdownMenuItem key="logout">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
