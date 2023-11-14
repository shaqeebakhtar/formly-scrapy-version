import { Crown } from "lucide-react";
import { Button } from "../ui/button";
import UserProfileNav from "./user-profile-nav";
import WorkSpaceDropdown from "./workspace-dropdown";

type WorkSpacesHeaderProps = {};

export default function WorkSpacesHeader({}: WorkSpacesHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-border px-6 py-3 lg:px-8">
      {/* <div className="flex items-center text-lg font-medium">
        <Icons.logo className="mr-2 h-4 w-4" />
        Formly
      </div> */}
      <WorkSpaceDropdown />

      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          className="font-semibold bg-yellow-300 hover:bg-yellow-200"
        >
          <Crown className="mr-2 w-4 h-4" /> Upgrade
        </Button>
        <UserProfileNav />
      </div>
    </div>
  );
}
