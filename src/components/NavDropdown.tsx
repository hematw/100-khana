import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";

export default function NavDropdown() {
  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button isIconOnly  variant="light" aria-label="User menu">
          <Menu />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Nav dropdown">
        <DropdownSection showDivider title="My Account">
          <DropdownItem key="profile">
            <Link to="./dashboard/profile">Profile</Link>
          </DropdownItem>
          <DropdownItem key="add-property">
            <Link to="./properties">Add Property</Link>
          </DropdownItem>
          <DropdownItem key="my-properties">
            <Link to="./dashboard/homes">My Properties</Link>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider>
          <DropdownItem key="team">Team</DropdownItem>
        </DropdownSection>
        <DropdownItem key="support">Support</DropdownItem>
        <DropdownItem key="api">API</DropdownItem>
        <DropdownItem key="logout">Log out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
