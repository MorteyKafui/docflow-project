import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ToggleModeButton";

const Navbar = () => {
  return (
    <nav className="border-b-2 border-rose-500 sticky w-full top-0 dark:bg-[#0c0a09] bg-white">
      <div className="max-w-screen-xl mx-auto px10 py-4 container flex justify-between items-center text-lg font-medium">
        <h1 className="text-3xl font-bold">
          <Link href="/">
            Doc<span className="text-rose-500">Flow</span>
          </Link>
        </h1>
        <ul className="flex gap-8">
          <li>
            <Link
              href="/all-projects"
              className="hover:text-rose-700 transition-all duration-500"
            >
              Projects
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="hover:text-rose-700 transition-all duration-500"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/add"
              className="hover:text-rose-700 transition-all duration-500"
            >
              Add New Project
            </Link>
          </li>
        </ul>
        <div className="flex gap-4 items-center">
          <Button asChild>
            <Link href="/login" className="font-bold uppercase text-lg">
              Login
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
