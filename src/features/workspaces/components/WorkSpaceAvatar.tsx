import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

type WorkSpaceAvatarProps = {
  image?: string;
  name: string;
  className?: string;
};
export const WorkSpaceAvatar = ({
  image,
  name,
  className,
}: WorkSpaceAvatarProps) => {
  if (image) {
    return (
      <div
        className={cn(
          "relative size-10 overflow-hidden rounded-full",
          className,
        )}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="rounded-full object-cover"
        />
      </div>
    );
  }
  return (
    <Avatar className={cn("size-10", className)}>
      <AvatarFallback className="text-lg font-semibold uppercase text-white">
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
