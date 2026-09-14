// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  {
    name: "Resources",
    href: "#",
    children: [
      { name: "Documentation", href: "/docs" },
      { name: "Blog", href: "/blog" },
      { name: "Guides", href: "/guides" },
    ],
  },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="max-w-7xl mx-auto sticky top-0 z-50 w-full border-b border-border/40  backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">A</span>
          </div>
          <span className="hidden sm:inline-block text-lg">Acme</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors
                    ${openDropdown === item.name
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                >
                  {item.name}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="size-4 opacity-70"
                    strokeWidth={2}
                  />
                </button>

                {/* Dropdown */}
                {openDropdown === item.name && (
                  <div className="absolute left-0 top-full mt-1 w-48 rounded-md border bg-popover p-1 shadow-md animate-in fade-in-0 zoom-in-95">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`block rounded-sm px-3 py-2 text-sm transition-colors
                          ${isActive(child.href)
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors
                  ${isActive(item.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
              >
                {item.name}
              </Link>
            )
          )}
        </nav>



        {/* Mobile menu button */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <XMarkIcon aria-hidden="true" className="size-5" strokeWidth={2} />
          ) : (
            <Bars3Icon aria-hidden="true" className="size-5" strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t md:hidden">
          <div className="container space-y-1 px-4 py-4">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.name} className="space-y-1">
                  <button
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.name ? null : item.name)
                    }
                  >
                    {item.name}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className={`h-4 w-4 transition-transform ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                      strokeWidth={2}
                    />
                  </button>
                  {openDropdown === item.name && (
                    <div className="ml-4 space-y-1 border-l pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`block rounded-md px-3 py-2 text-sm
                            ${isActive(child.href)
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium
                    ${isActive(item.href)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}


          </div>
        </div>
      )}
    </header>
  );
}
