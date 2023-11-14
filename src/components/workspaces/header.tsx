import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import UserProfileNav from "./user-profile-nav";

interface WorkSpacesHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function WorkSpacesHeader({ className }: WorkSpacesHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-border px-4 py-3 lg:px-8 bg-white",
        className
      )}
    >
      <div className="items-center text-2xl font-semibold hidden lg:flex">
        <Icons.logo className="mr-2 h-6 w-6" />
        Formly
      </div>
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          className="font-semibold bg-yellow-300 hover:bg-yellow-200 hidden md:flex items-center"
        >
          <Crown className="mr-2 w-4 h-4" /> <span>Upgrade</span>
        </Button>
        <UserProfileNav />
      </div>
    </div>
  );
}
