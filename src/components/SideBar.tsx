import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Navigation } from "./Navigation";

export const SideBar = () => {
  return (
    <aside className="h-full w-full bg-neutral-100 p-4">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
      </Link>
      <Separator className="my-4" />
      <Navigation />
    </aside>
  );
};
