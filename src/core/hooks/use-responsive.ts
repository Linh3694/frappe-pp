import { APP } from "@/config/app";
import { useWindowSize } from "usehooks-ts";

export const useResponsive = () => {
  const { width } = useWindowSize();
  const isDesktop = width >= APP.MD_BREAKPOINT;

  return { isDesktop };
};
