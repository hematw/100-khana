"use client";

// import NavDropdown from "./NavDropdown";
// import ThemeSwitch from "./theme-switch";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, onOpen, onOpenChange } = {
    isOpen: false,
    onOpen: () => {},
    onOpenChange: (open: boolean) => {},
  };
  const router = useRouter();
  const { isLoggedIn, user } = { isLoggedIn: false, user: { profile: "" } };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed transition-all duration-150 top-0 left-0 md:px-12 w-full z-50`}
    >
      <div>
        <nav
          className={`bg-white dark:bg-zinc-900 shadow-md md:rounded-lg  flex justify-between items-center md:max-w-7xl md:my-4 px-6 py-4 lg:mx-auto  transition-all duration-200 ${
            isScrolled && "backdrop-blur-md bg-white/50 dark:bg-zinc-900/50"
          }`}
        >
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800 cursor-pointer">
            <Link href="/">
              <img
                src="/100khana.png"
                alt="Our logo"
                className="w-18 h-12 absolute md:block top-[50%] right-[50%] translate-x-1/2 -translate-y-1/2"
              />
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="hidden lg:flex justify-between items-center space-x-2 rounded-full gap-4">
            <Link
              href="/properties?listingType=sale"
              className={`py-1 px-2 transition-all duration-200 hover:text-primary-500`}
            >
              Buy
            </Link>
            <Link
              href="/properties?listingType=rental"
              className={`py-1 px-2 transition-all duration-200 hover:text-primary-500 `}
            >
              Rent
            </Link>
            <Link
              href="/properties?listingType=mortgage"
              className={`py-1 px-2 transition-all duration-200 hover:text-primary-500 `}
            >
              Mortgage
            </Link>
            <Link
              href="/support"
              className={`py-1 px-2 transition-all duration-200 hover:text-primary-500 `}
            >
              Property Consultants
            </Link>
            <Link
              href="/support"
              className={`py-1 px-2 transition-all duration-200 hover:text-primary-500 `}
            >
              Real Estate & Properties
            </Link>
          </div>
          <Button
            size="icon"
            variant="outline"
            onClick={onOpen}
            className="lg:hidden -order-1"
          >
            <Menu />
          </Button>
          <Drawer onOpenChange={onOpenChange}>
            <DrawerTrigger>
              <Button
                size="icon"
                variant="outline"
                onClick={onOpen}
                className="lg:hidden -order-1"
              >
                <Menu />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col space-y-4 p-6 bg-white h-full shadow-lg rounded-lg">
                <Link
                  href="/"
                  className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                >
                  Buy
                </Link>
                <Link
                  href="/houses"
                  className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                >
                  Rent
                </Link>
                <Link
                  href="/support"
                  className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                >
                  Mortgage
                </Link>
                <Link
                  href="/support"
                  className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                >
                  Property Consultants
                </Link>
                <Link
                  href="/support"
                  className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                >
                  Real Estate & Properties
                </Link>
                <Link
                  href="/new-property"
                  className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                >
                  Add Property
                </Link>
              </div>
            </DrawerContent>
          </Drawer>
          <div className="flex items-center gap-4">
            {/* <ThemeSwitch theme={theme} toggleTheme={toggleTheme} /> */}
            {isLoggedIn ? (
              <Tooltip>
                <TooltipTrigger>
                  <Link href="/account">
                    <Avatar color="primary">
                      <AvatarImage src={user.profile} alt="Profile" />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>My Account</TooltipContent>
              </Tooltip>
            ) : (
              <Link href="/login" className="text-primary-500 ">
                Login
              </Link>
            )}

            <Button
              onClick={() => router.push("/new-property")}
              variant="outline"
              color="primary"
              className="hidden lg:block"
            >
              Add Property
            </Button>
            {/* <NavDropdown /> */}
          </div>
        </nav>
      </div>
    </header>
  );
}

// export default Navbar;
