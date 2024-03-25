"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navMenuItems = [
  { name: "Home", href: "/dashboard" },
  { name: "Projects", href: "/all-projects" },
  { name: "Add New Project", href: "/add" },
];

const DashboardNav = () => {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {navMenuItems.map(({ name, href }) => (
        <Link key={name} href={href}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ",
              pathname === href ? "bg-accent" : "bg-transparent"
            )}
          >
            {name}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default DashboardNav;
