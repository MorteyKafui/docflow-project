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

const Navbar = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="border-b-2 border-rose-500 sticky w-full top-0 dark:bg-[#0c0a09] bg-white z-10">
      <div className="max-w-screen-xl mx-auto px10 py-4 container flex justify-between items-center text-lg font-medium">
        <h1 className="text-3xl font-bold">
          <Link href="/">
            Doc<span className="text-rose-500">Flow</span>
          </Link>
        </h1>
        {(await isAuthenticated()) ? (
          <ul className="flex items-center gap-8">
            <li className="hidden lg:block">
              <Link
                href="/all-projects"
                className="hover:text-rose-700 transition-all duration-500"
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
                className="transition-all duration-500 ml-20 border-2 p-2 bg-rose-500 rounded"
              >
                Go to Dashboard
              </Link>
            </li>
          </ul>
        ) : null}
        <div className="flex gap-4 items-center">
          {!(await isAuthenticated()) ? (
            <div className="hidden lg:block">
              <Button asChild>
                <RegisterLink>Sign up</RegisterLink>
              </Button>
              <Button variant="ghost" asChild>
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
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{user?.given_name}</DropdownMenuItem>
                  <DropdownMenuItem>{user?.family_name}</DropdownMenuItem>
                  <DropdownMenuItem>{user?.email}</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-full"
                      asChild
                    >
                      <LogoutLink>Log out</LogoutLink>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          <div className="hidden lg:block">
            <ModeToggle />
          </div>

          <div className="block md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
