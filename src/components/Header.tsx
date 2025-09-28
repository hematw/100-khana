"use client";

import ThemeSwitcher from "@/src/components/theme/theme-switcher";
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
    <header className="fixed transition-all duration-150 top-0 left-0 md:px-12 w-full z-50">
      <nav
        className={`bg-background shadow-md md:rounded-lg flex justify-between items-center md:max-w-7xl md:my-4 px-6 py-4 lg:mx-auto transition-all duration-200 ${
          isScrolled ? "backdrop-blur-md bg-white/50 dark:bg-zinc-900/50" : ""
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/100khana.png" alt="Our logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/properties?listingType=sale"
            className="py-1 px-2 hover:text-primary-500"
          >
            Buy
          </Link>
          <Link
            href="/properties?listingType=rental"
            className="py-1 px-2 hover:text-primary-500"
          >
            Rent
          </Link>
          <Link
            href="/properties?listingType=mortgage"
            className="py-1 px-2 hover:text-primary-500"
          >
            Mortgage
          </Link>
          <Link href="/support" className="py-1 px-2 hover:text-primary-500">
            Property Consultants
          </Link>
          <Link href="/support" className="py-1 px-2 hover:text-primary-500">
            Real Estate & Properties
          </Link>
        </div>

        {/* Mobile Menu (Drawer) */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="lg:hidden -order-1"
            >
              <Menu />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex flex-col space-y-4 p-6 bg-white dark:bg-zinc-900 h-full shadow-lg rounded-lg">
              <Link
                href="/properties?listingType=sale"
                className="block px-4 py-2 text-lg hover:text-primary-500"
              >
                Buy
              </Link>
              <Link
                href="/properties?listingType=rental"
                className="block px-4 py-2 text-lg hover:text-primary-500"
              >
                Rent
              </Link>
              <Link
                href="/properties?listingType=mortgage"
                className="block px-4 py-2 text-lg hover:text-primary-500"
              >
                Mortgage
              </Link>
              <Link
                href="/support"
                className="block px-4 py-2 text-lg hover:text-primary-500"
              >
                Property Consultants
              </Link>
              <Link
                href="/support"
                className="block px-4 py-2 text-lg hover:text-primary-500"
              >
                Real Estate & Properties
              </Link>
              <Link
                href="/new-property"
                className="block px-4 py-2 text-lg hover:text-primary-500"
              >
                Add Property
              </Link>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <ThemeSwitcher />

          {isLoggedIn ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/account">
                  <Avatar>
                    <AvatarImage src={user.profile} alt="Profile" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Link>
              </TooltipTrigger>
              <TooltipContent>My Account</TooltipContent>
            </Tooltip>
          ) : (
            <Link href="/login" className="text-primary-500">
              Login
            </Link>
          )}

          <Button
            onClick={() => router.push("/new-property")}
            variant="outline"
            className="hidden lg:block"
          >
            Add Property
          </Button>
        </div>
      </nav>
    </header>
  );
}
