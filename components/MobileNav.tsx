import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "./ui/button";

const MobileNav = async () => {
  const { isAuthenticated } = getKindeServerSession();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu color="#DDB61B" />
      </SheetTrigger>
      <SheetContent className="bg-firstBg text-muted">
        <nav className="uppercase font-bold text-2xl tracking-wider">
          <ul className="flex flex-col justify-between my-10 gap-10 h-full">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/all-projects">Projects</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
          {!(await isAuthenticated()) ? (
            <div className="flex gap-8">
              <Button className="bg-red-600" asChild>
                <RegisterLink>Sign up</RegisterLink>
              </Button>
              <Button
                className="border-2 border-gray-300"
                variant="ghost"
                asChild
              >
                <LoginLink>Sign in</LoginLink>
              </Button>
            </div>
          ) : (
            <div>
              <Button
                asChild
                className="font-semibold bg-secondBg text-firstBg hover:text-muted duration-500 transition-all"
              >
                <LogoutLink>Logout</LogoutLink>
              </Button>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
