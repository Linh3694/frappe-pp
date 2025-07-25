import { Button } from "@atoms/button";
import { Calendar } from "@atoms/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@atoms/popover";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@atoms/select";
import { Textarea } from "@atoms/textarea";
import { format } from "date-fns";

import { useCallback, useState, type FC } from "react";

// TODO: Implement Form
export type LeaveRequestFormProps = {
  onSubmitted?: VoidFunction;
};

export const LeaveRequestForm: FC<LeaveRequestFormProps> = ({
  onSubmitted,
}) => {
  const [from, setFrom] = useState<Date | null | undefined>(null);
  const [to, setTo] = useState<Date | null | undefined>(null);

  const handleSubmitLeaveRequest = useCallback(() => {
    onSubmitted?.();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label label="From" required />
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="basis-1/2">
              <SelectValue placeholder="Select a session" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="morning">Start of morning</SelectItem>
                <SelectItem value="afternoon">Start of afternoon</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger className="basis-1/2">
              <Button variant="outline" className="w-full">
                {from ? format(from, "eee, dd/MM/yyyy") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-fit">
              <Calendar mode="single" onSelect={setFrom} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label label="To" required />
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="basis-1/2">
              <SelectValue placeholder="Select a session" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="morning">End of morning</SelectItem>
                <SelectItem value="afternoon">End of afternoon</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger className="basis-1/2">
              <Button variant="outline" className="w-full">
                {to ? format(to, "eee, dd/MM/yyyy") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-fit">
              <Calendar mode="single" onSelect={setTo} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label label="Reason" required />
        <Textarea placeholder="Absence reason" />
      </div>
      <Button
        className="[background:var(--gradient-t-s)] w-fit hover:opacity-80"
        onClick={handleSubmitLeaveRequest}
      >
        Submit
      </Button>
    </div>
  );
};

export const Label: FC<{ label: string; required?: boolean }> = ({
  label,
  required,
}) => {
  return (
    <div className="text-brand-teal font-semibold text-sm">
      {label}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </div>
  );
};
