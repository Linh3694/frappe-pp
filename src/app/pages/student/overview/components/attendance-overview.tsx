import { Separator } from "@atoms/separator";
import { type FC } from "react";

export type AttendanceOverviewProps = {};

export const AttendanceOverview: FC<AttendanceOverviewProps> = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-semibold">Overview</div>
      <div className="flex gap-2 justify-between">
        <div className="flex flex-col items-center gap-2 basis-1/3">
          <div className="text-gray-500">Late</div>
          <div className="text-4xl font-semibold text-brand-red">1</div>
        </div>
        <Separator orientation="vertical" className="h-16" />
        <div className="flex flex-col items-center gap-2 basis-1/3">
          <div className="text-gray-500">Absence</div>
          <div className="text-4xl font-semibold text-brand-orange">4</div>
        </div>
        <Separator orientation="vertical" className="h-16" />
        <div className="flex flex-col items-center gap-2 basis-1/3">
          <div className="text-gray-500">Approved</div>
          <div className="text-4xl font-semibold text-brand-green">3</div>
        </div>
      </div>
    </div>
  );
};
