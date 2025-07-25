import { type FC } from "react";

import { TabsList, TabsTrigger } from "@atoms/tabs";
import { capitalize } from "lodash";

const weekDayMap = {
  0: "Mon",
  1: "Tue",
  2: "Wed",
  3: "Thu",
  4: "Fri",
  5: "Sat",
  6: "Sun",
};

export type WeekdayPickerProps = {};

export const WeekdayPicker: FC<WeekdayPickerProps> = () => {
  return (
    <TabsList className="w-fit">
      {["mon", "tue", "wed", "thu", "fri"].map((day) => (
        <TabsTrigger className="basis-1/5 px-6" key={day} value={day}>
          {capitalize(day)}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
