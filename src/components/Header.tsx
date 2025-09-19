import { Link, NavLink, useNavigate } from "react-router-dom";
// import NavDropdown from "./NavDropdown";
import ThemeSwitch from "./theme-switch";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/contexts/theme-context";
import { Drawer, DrawerContent } from "@heroui/drawer";
import { useDisclosure } from "@heroui/use-disclosure";
import { Button } from "@heroui/button";
import { Menu } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Avatar } from "@heroui/avatar";
import { Tooltip } from "@heroui/tooltip";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

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
            <a href="/">
              <img src="/100khana.png" alt="Our logo" className="w-18 h-12 absolute md:block top-[50%] right-[50%] translate-x-1/2 -translate-y-1/2" />
            </a>
          </div>
          {/* Navigation Links */}
          <div className="hidden lg:flex justify-between items-center space-x-2 rounded-full gap-4">
            <NavLink
              to="/properties?listingType=sale"
              className={`py-1 px-2 transition-all duration-200 hover:text-primary-500`}
            >
              Buy
            </NavLink>
            <NavLink
              to="/properties?listingType=rental"
              className={`py-1 px-2 transition-all duration-200 hover:text-primary-500 `}
            >
              Rent
            </NavLink>
            <NavLink
              to="/properties?listingType=mortgage"
              className={`py-1 px-2 transition-all duration-200 hover:text-primary-500 `}
            >
              Mortgage
            </NavLink>
            <NavLink
              to="/support"
              className={`py-1 px-2 transition-all duration-200 hover:text-primary-500 `}
            >
              Property Consultants
            </NavLink>
            <NavLink
              to="/support"
              className={`py-1 px-2 transition-all duration-200 hover:text-primary-500 `}
            >
              Real Estate & Properties
            </NavLink>
          </div>
          <Button
            isIconOnly
            variant="light"
            onPress={onOpen}
            className="lg:hidden -order-1"
          >
            <Menu />
          </Button>
          <Drawer
            isOpen={isOpen}
            size="xs"
            onOpenChange={onOpenChange}
            placement="right"
          >
            <DrawerContent>
              {() => (
                <div className="flex flex-col space-y-4 p-6 bg-white h-full shadow-lg rounded-lg">
                  <NavLink
                    to="/"
                    className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                  >
                    Buy
                  </NavLink>
                  <NavLink
                    to="/houses"
                    className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                  >
                    Rent
                  </NavLink>
                  <NavLink
                    to="/support"
                    className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                  >
                    Mortgage
                  </NavLink>
                  <NavLink
                    to="/support"
                    className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                  >
                    Property Consultants
                  </NavLink>
                  <NavLink
                    to="/support"
                    className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                  >
                    Real Estate & Properties
                  </NavLink>
                  <NavLink
                    to="/new-property"
                    className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                  >
                    Add Property
                  </NavLink>
                </div>
              )}
            </DrawerContent>
          </Drawer>
          <div className="flex items-center gap-4">
            <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
            {isLoggedIn ? (
              <Tooltip showArrow content="My Account">
                <Link to="/account">
                  <Avatar isBordered color="primary" src={user.profile} />
                </Link>
              </Tooltip>
            ) : (
              <Link to="/login" className="text-primary-500 ">
                Login
              </Link>
            )}

            <Button
              onPress={() => navigate("/new-property")}
              variant="bordered"
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
