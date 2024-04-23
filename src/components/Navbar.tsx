"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { page: "Home", path: "/" },
  { page: "Our team", path: "/ourteam" },
];

export default function Navbar() {
  const path = usePathname();
  return (
    <nav className="flex justify-between items-center p-4 bg-balance absolute top-4">
      <ul className="flex gap-4 justify-start list-style-none">
        {navItems.map((item) => (
          <li key={item.page} className="">
            <Link
              href={item.path}
              className={`text-zinc-700 hover:text-zinc-950
                ${path === item.path ? "underline underline-offset-2" : "font-normal"}
              `}
            >
              {item.page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
