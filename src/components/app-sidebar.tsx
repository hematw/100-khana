import React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from "@/src/components/ui/drawer";

// import {
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
// } from "@/src/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Sample Data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: ["History", "Starred", "Settings"],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: ["Genesis", "Explorer", "Quantum"],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: ["Introduction", "Get Started", "Tutorials", "Changelog"],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: ["General", "Team", "Billing", "Limits"],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Sidebar</Button>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          {/* User Profile */}
          <DrawerHeader>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback>{data.user.name}</AvatarFallback>
                  <AvatarImage src={data.user.avatar} />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenu aria-label="User Menu">
                <DropdownMenuItem key="profile">Profile</DropdownMenuItem>
                <DropdownMenuItem key="logout">Logout</DropdownMenuItem>
              </DropdownMenu>
            </DropdownMenu>
          </DrawerHeader>

          {/* Navigation */}
          <DrawerContent>
            {data.navMain.map((item, index) => (
              <Button key={index} className="flex justify-start gap-2">
                {<item.icon />}
                {item.title}
              </Button>
            ))}
          </DrawerContent>

          {/* Projects */}
          <DrawerFooter>
            <h4 className="text-sm font-semibold">Projects</h4>
            {data.projects.map((project, index) => (
              <Button key={index} className="justify-start">
                {<project.icon />}
                {project.name}
              </Button>
            ))}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
