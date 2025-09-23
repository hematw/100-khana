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
  DrawerBody,
  DrawerFooter,
} from "@/src/components/ui/drawer";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";

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
      <Button onPress={() => setIsOpen(true)}>Open Sidebar</Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="left"
        size="xs"
        isDismissable
      >
        <DrawerContent>
          {/* User Profile */}
          <DrawerHeader>
            <Dropdown>
              <DropdownTrigger>
                <Avatar src={data.user.avatar} size="lg" />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Menu">
                <DropdownItem key="profile">Profile</DropdownItem>
                <DropdownItem key="logout">Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </DrawerHeader>

          {/* Navigation */}
          <DrawerBody>
            {data.navMain.map((item, index) => (
              <Button
                key={index}
                startContent={<item.icon />}
                variant="light"
                fullWidth
                className="justify-start"
              >
                {item.title}
              </Button>
            ))}
          </DrawerBody>

          {/* Projects */}
          <DrawerFooter>
            <h4 className="text-sm font-semibold">Projects</h4>
            {data.projects.map((project, index) => (
              <Button
                key={index}
                startContent={<project.icon />}
                variant="light"
                fullWidth
                className="justify-start"
              >
                {project.name}
              </Button>
            ))}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
