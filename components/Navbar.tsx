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

const Navbar = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="border-b-2 border-rose-500 sticky w-full top-0 dark:bg-[#0c0a09] bg-white">
      <div className="max-w-screen-xl mx-auto px10 py-4 container flex justify-between items-center text-lg font-medium">
        <h1 className="text-3xl font-bold">
          <Link href="/">
            Doc<span className="text-rose-500">Flow</span>
          </Link>
        </h1>
        {(await isAuthenticated()) ? (
          <ul className="flex gap-8">
            <li>
              <Link
                href="/all-projects"
                className="hover:text-rose-700 transition-all duration-500"
              >
                All Projects
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
            <li>
              <Link
                href="/dashboard"
                className="hover:text-rose-700 transition-all duration-500 ml-20 border-2 p-2 border-rose-500 rounded"
              >
                Go to Dashboard
              </Link>
            </li>
          </ul>
        ) : null}
        <div className="flex gap-4 items-center">
          {!(await isAuthenticated()) ? (
            <>
              <Button asChild>
                <RegisterLink>Sign up</RegisterLink>
              </Button>
              <Button variant="ghost" asChild>
                <LoginLink>Sign in</LoginLink>
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
          {/* <Button asChild>
            <Link href="/login" className="font-bold uppercase text-lg">
              Login
            </Link>
          </Button> */}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
