"use client";

import { ChevronsUpDown, Folder, FolderOpen, Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

type WorkSpaceDropdownProps = {};

export default function WorkSpaceDropdown({}: WorkSpaceDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[230px] justify-between"
        >
          <div className="flex items-center">
            <FolderOpen className="mr-2 h-4 w-4 opacity-50" />
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Select workspace"}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[230px] p-0">
        <Command>
          {frameworks && frameworks.length > 0 && (
            <CommandInput placeholder="Search workspace..." />
          )}
          <CommandEmpty>No workspaces found.</CommandEmpty>
          <CommandGroup>
            <CommandItem onSelect={() => console.log("clik")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Workspace
            </CommandItem>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {value === framework.value ? (
                  <FolderOpen className="mr-2 h-4 w-4 opacity-100" />
                ) : (
                  <Folder className="mr-2 h-4 w-4 opacity-50" />
                )}
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
