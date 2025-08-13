import React from "react";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../components/ui/select";

const Dropdown = ({ title, options, func }) => {
  return (
    <div className="w-[180px]">
      <Select onValueChange={func}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((o, i) => (
              <SelectItem key={i} value={o}>
                {o.toUpperCase()}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Dropdown;
