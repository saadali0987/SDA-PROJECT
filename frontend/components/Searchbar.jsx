"use client";
import { useState } from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

function SearchBar() {
  // const [searchtext, setsearchtext] = useState("")

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[200px] mx-10">
      <CommandInput placeholder="Type to search..." />
      <CommandList>
        {
        //   <div>
        //     <CommandEmpty>No results found.</CommandEmpty>
        //     <CommandGroup heading="Suggestions">
        //       <CommandItem>
        //         <Calendar />
        //         <span>Calendar</span>
        //       </CommandItem>
        //       <CommandItem>
        //         <Smile />
        //         <span>Search Emoji</span>
        //       </CommandItem>
        //       <CommandItem disabled>
        //         <Calculator />
        //         <span>Calculator</span>
        //       </CommandItem>
        //     </CommandGroup>
        //     <CommandSeparator />
        //     <CommandGroup heading="Settings">
        //       <CommandItem>
        //         <User />
        //         <span>Profile</span>
        //         <CommandShortcut>⌘P</CommandShortcut>
        //       </CommandItem>
        //       <CommandItem>
        //         <CreditCard />
        //         <span>Billing</span>
        //         <CommandShortcut>⌘B</CommandShortcut>
        //       </CommandItem>
        //       <CommandItem>
        //         <Settings />
        //         <span>Settings</span>
        //         <CommandShortcut>⌘S</CommandShortcut>
        //       </CommandItem>
        //     </CommandGroup>
        //   </div>
        }
      </CommandList>
    </Command>
  );
}

export default SearchBar;
