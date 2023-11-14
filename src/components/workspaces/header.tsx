import { Icons } from "../icons";
import UserProfileDropdown from "./user-profile-dropdown";
import WorkSpaceDropdown from "./workspace-dropdown";

type WorkSpacesHeaderProps = {};

export default function WorkSpacesHeader({}: WorkSpacesHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-border p-4">
      {/* <div className="flex items-center text-lg font-medium">
        <Icons.logo className="mr-2 h-4 w-4" />
        Formly
      </div> */}
      <WorkSpaceDropdown />
      <UserProfileDropdown />
    </div>
  );
}
