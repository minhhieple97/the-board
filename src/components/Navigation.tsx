"use client";

import { cn } from "@/lib/utils";
import { SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

const routes = [
  {
    label: "Home",
    href: "/",
    icon: GoHome,
    actionIcon: GoHomeFill,
  },
  {
    label: "My Tasks",
    href: "/my-tasks",
    icon: GoCheckCircle,
    actionIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    actionIcon: SettingsIcon,
  },
  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    actionIcon: UsersIcon,
  },
];

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col gap-4">
      {routes.map((route) => {
        const isActive = pathname === route.href;
        const Icon = isActive ? route.actionIcon : route.icon;
        return (
          <li key={route.href}>
            <Link
              href={route.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md p-2.5 font-medium text-neutral-500 transition hover:text-primary",
                isActive && "bg-white text-primary shadow-sm hover:opacity-100",
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              {route.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
