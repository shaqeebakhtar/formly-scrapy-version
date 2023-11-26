import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type CreateWorkspaceProps = {
  isLoading: boolean;
};

export default function CreateWorkspace({ isLoading }: CreateWorkspaceProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="px-3 py-3" disabled={isLoading}>
          <Plus className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create a new workspace</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-3">
          <Input
            id="name"
            placeholder="Workspace name"
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Create workspace</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
