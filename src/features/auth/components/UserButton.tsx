"use client";
import { useLogout } from "../api/useLogout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetCurrentUser } from "../api/useGetCurrentUser";
import { Loader, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export const UserButton = () => {
  const { mutate: logout, isPending: isLogoutPending } = useLogout();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  if (isCurrentUserLoading || isLogoutPending) {
    return (
      <div className="flex size-10 items-center justify-center rounded-full bg-neutral-200">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!currentUser) {
    return null;
  }
  const { name, email } = currentUser.data;
  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email
      ? email.charAt(0).toUpperCase()
      : "U";
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        asChild
        className="relative cursor-pointer outline-none"
      >
        <Avatar className="size-10 border bg-neutral-300 opacity-80 transition hover:opacity-100">
          <AvatarFallback className="flex items-center justify-center bg-neutral-200 font-medium text-neutral-500">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-56"
        sideOffset={10}
      >
        <div className="px flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] border bg-neutral-300">
            <AvatarFallback className="flex items-center justify-center bg-neutral-200 text-xl font-medium text-neutral-500">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {name || "User"}
            </p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>
        <Separator />
        <DropdownMenuItem
          onClick={() => logout()}
          className="flex cursor-pointer items-center justify-center font-medium text-amber-700"
        >
          <LogOut className="mr-2 size-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
