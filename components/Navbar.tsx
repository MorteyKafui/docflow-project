import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ToggleModeButton";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SearchForm from "./SearchForm";
import MobileNav from "./MobileNav";
import Image from "next/image";

const Navbar = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="border-b-2 border-secondBg sticky w-full top-0 bg-firstBg z-10">
      <div className="max-w-screen-xl mx-auto px10 py-4 container flex justify-between items-center text-lg font-medium">
        <Link
          className="text-3xl font-bold text-secondBg flex items-center gap-4"
          href="/"
        >
          <Image src="/logo.png" width={55} height={55} alt="site logo" />
          <h3>
            Doc<span className="text-rose-500">Flow</span>
          </h3>
        </Link>

        {(await isAuthenticated()) ? (
          <ul className="flex items-center gap-8">
            <li className="hidden lg:block">
              <Link
                href="/all-projects"
                className="hover:text-secondBg transition-all duration-500 text-white"
              >
                Projects
              </Link>
            </li>
            <li className="hidden lg:block">
              <SearchForm />
            </li>
            <li className="hidden lg:block">
              <Link
                href="/dashboard"
                className="transition-all duration-500 ml-20 border-2 p-2 bg-secondBg rounded-md text-firstBg hover:opacity-90"
              >
                Go to Dashboard
              </Link>
            </li>
          </ul>
        ) : null}
        <div className="flex gap-4 items-center">
          {!(await isAuthenticated()) ? (
            <div className="hidden lg:block">
              <Button className="bg-red-600 text-muted font-bold mr-8" asChild>
                <RegisterLink>Sign up</RegisterLink>
              </Button>
              <Button className="font-bold" asChild>
                <LoginLink>Sign in</LoginLink>
              </Button>
            </div>
          ) : (
            <div className="hidden lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user?.picture as string} />
                    <AvatarFallback>?</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-firstBg text-secondBg">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{user?.given_name}</DropdownMenuItem>
                  <DropdownMenuItem>{user?.family_name}</DropdownMenuItem>
                  <DropdownMenuItem>{user?.email}</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-full bg-red-600 text-white font-semibold"
                      asChild
                    >
                      <LogoutLink>Log out</LogoutLink>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <div className="block md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
