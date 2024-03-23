import Link from "next/link";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <header className="h-screen">
      <div className="flex flex-col justify-center items-center h-full gap-8 text-center">
        <h1 className="text-6xl font-poppins">
          <span className="text-rose-500">Effortless</span> Document{" "}
          <span className="text-green-400">Management</span> Made Simple
        </h1>
        <p className="text-2xl text-gray-400">
          Experience the{" "}
          <span className="text-rose-500 font-bold">next level</span> of
          document organization and efficiency. Our platform elevates your
          document management process, making it more{" "}
          <span className="text-green-500 font-bold">
            efficient and effective.
          </span>
        </p>
        <div className="flex gap-10 items-center">
          <Button className="text-xl font-bold" size="lg" asChild>
            <Link href="/add">Get Started</Link>
          </Button>
          <Button
            className="text-xl font-bold border-2 border-rose-700"
            size="lg"
            asChild
            variant="ghost"
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
