import { Phone, Instagram, Send, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full max-w-screen-2xl mx-auto bg-white dark:bg-zinc-900 text-gray-800 dark:text-white py-8 px-4 border-t">
      {/* Main Banner */}
      <div className="container mx-auto mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          From searching href settling, 100-Khana is with you!
        </h1>
      </div>

      <div className="max-w-screen-2xl px-4 md:px-10 mx-auto">
        <div className="grid grid-cols-6 lg:grid-cols-12 gap-8 mb-8">
          {/* Column 1 - Logo and Description */}
          <div className="space-y-4 col-span-6 md:col-span-4">
            <div className="mb-4">
              <img
                src="/100khana.png"
                alt="100-Khana Logo"
                width={100}
                // height={50}
                className="object-contain mx-auto md:mx-0"
              />
            </div>
            <p className="text-sm leading-relaxed">
              Experience the Joy of Quick and Easy Property Finding
            </p>
            <p className="text-sm leading-relaxed text-gray-500">
              100-Khana is your bridge href quickly browse through thousands of
              listings and find your perfect property.
            </p>
          </div>

          {/* Column 2 - Services */}
          <div className="space-y-4 col-span-3">
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <div className="flex flex-col gap-2">
              <Link href="#" className="hover:text-primary-500">
                Rent
              </Link>
              <Link href="#" className="hover:text-primary-500">
                Buy
              </Link>
              <Link href="#" className="hover:text-primary-500">
                Free Property Listing
              </Link>
              <Link href="#" className="hover:text-primary-500">
                Real Estate
              </Link>
              <Link href="#" className="hover:text-primary-500">
                Real Estate Consultants
              </Link>
            </div>
          </div>

          {/* Column 3 - Most Popular */}
          <div className="space-y-4 col-span-3">
            <h3 className="font-bold text-lg mb-4">Most Popular Searches</h3>
            <div className="flex flex-col gap-2">
              <Link href="#" className="hover:text-primary-500">
                Apartments Near Metro
              </Link>
              <Link href="#" className="hover:text-primary-500">
                Homes Near Main Street
              </Link>
              <Link href="#" className="hover:text-primary-500">
                One Bedroom Apartments
              </Link>
              <Link href="#" className="text-primary-500 flex items-center gap-1">
                View More
                <ChevronDown />
              </Link>
            </div>
          </div>

          {/* Column 4 - Contact */}
          <div className="space-y-4 col-span-3 md:col-span-2">
            <h3 className="font-bold text-lg mb-4">Stay Connected</h3>
            <div className="flex flex-col gap-3">
              <Link href="#" className="flex items-center gap-2">
                <Phone className="text-primary-500 h-5 w-5" />
                <span>Phone</span>
              </Link>
              <Link href="#" className="flex items-center gap-2">
                <Instagram className="text-primary-500 h-5 w-5" />
                <span>Instagram</span>
              </Link>
              <Link href="#" className="flex items-center gap-2">
                <Send className="text-primary-500 h-5 w-5" />
                <span>Telegram</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 col-span-3 md:grid-cols-3 lg:col-span-12 gap-4 mb-8">
            <div className="space-y-2">
              <h4 className="font-semibold">Kabul Real Estate</h4>
              <Link href="#" className="text-primary-500 flex items-center gap-1">
                View More
                <ChevronDown />
              </Link>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Badakhshan Real Estate</h4>
              <Link href="#" className="text-primary-500 flex items-center gap-1">
                View More
                <ChevronDown />
              </Link>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Herat Real Estate</h4>
              <Link href="#" className="text-primary-500 flex items-center gap-1">
                View More
                <ChevronDown />
              </Link>
            </div>
          </div>
        </div>

        {/* Property Listings Section */}

        {/* Bottom Illustration */}
        <div className="relative  mt-12 mb-4">
          <div className=" max-w-2xl mx-auto">
            <img src="/footer-illustration.png" alt="" />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 mt-4">
          All rights reserved by 100-Khana
        </div>
      </div>
    </footer>
  );
}
