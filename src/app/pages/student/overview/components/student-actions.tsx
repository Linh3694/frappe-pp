import {
  BookOpen,
  Calendar,
  Check,
  Heart,
  IconProps,
  NotePencil,
} from "phosphor-react";
import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  useMemo,
  type FC,
} from "react";
import { Link } from "react-router-dom";

export type StudentActionsProps = {};

export const StudentActions: FC<StudentActionsProps> = () => {
  const items: StudentActionItemProps[] = useMemo(
    () => [
      {
        icon: Calendar,
        label: "Timetable",
        to: "/student/timetable",
      },
      {
        icon: Check,
        label: "Attendance",
        to: "/student/attendance",
      },
      {
        icon: NotePencil,
        label: "Leave Req.",
        to: "/forms/leave-request",
      },
      {
        icon: BookOpen,
        label: "Grades",
        to: "/student/grades",
      },
      {
        icon: Heart,
        label: "Health",
        to: "/student/health",
      },
    ],
    [],
  );
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <StudentActionItem {...item} />
      ))}
    </div>
  );
};

type StudentActionItemProps = {
  icon: ForwardRefExoticComponent<HTMLAttributes<SVGSVGElement> & IconProps>;
  label: string;
  to: string;
};

const StudentActionItem: FC<StudentActionItemProps> = ({
  icon: Icon,
  label,
  to,
}) => {
  return (
    <Link to={to} className="w-full">
      <div className="flex flex-col items-center gap-1 p-4 bg-brand-teal/30 rounded-xl">
        <Icon size={32} className="text-brand-teal" />
        <div className="text-sm text-brand-teal">{label}</div>
      </div>
    </Link>
  );
};
