import { BiGlobe, BiHash, BiLockAlt } from "react-icons/bi";
import { PPChannel } from "@/types/ParentPortal/PPChannel";
import { IconBaseProps } from "react-icons";

export const getChannelIcon = (type: PPChannel["type"]) => {
  switch (type) {
    case "Private":
      return BiLockAlt;
    case "Open":
      return BiGlobe;
    default:
      return BiHash;
  }
};

interface ChannelIconProps extends IconBaseProps {
  type: PPChannel["type"];
}

export const ChannelIcon = ({ type, ...props }: ChannelIconProps) => {
  if (!type) return null;

  if (type === "Private") return <BiLockAlt {...props} />;
  if (type === "Open") return <BiGlobe {...props} />;
  return <BiHash {...props} />;
};
