import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { redirect } from "next/navigation";
import { Button } from "../components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-svh flex justify-center items-center text-center mt-10">
        <div className="max-w-fit drop-shadow-2xl">
          <Image src="/not-found.svg" alt="" width={400} height={400} />
          <h3 className="text-3xl font-semibold mt-10">Looks you are lost?</h3>
          <p className="mt-2">Requested page not found in our server</p>
          <Button
            onClick={() => redirect("/")}
            className="w-full mt-6rounded-lg shadow-lg"
          >
            Go to Home
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
