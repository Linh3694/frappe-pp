import type { FC } from "react";

import { Permission } from "@/core/utils/permission";
import { createPage } from "@/core/utils/route-guard";
import BusPageTemplate from "@templates/bus-page.template";
import ForbiddenState from "@features/states/forbbiden-state";
import ContentPageLayout from "@templates/content-page.layout";
import BusRouteCard from "@features/bus/bus-route-card";

const PERMISSIONS: Permission[] = [];
const DISPLAY_NAME = "Bus";

export const Route: FC = () => {

  return (
    <ContentPageLayout>
      <BusPageTemplate info={<BusRouteCard />}/>
    </ContentPageLayout>
  )
};

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />);

Route.displayName = `${DISPLAY_NAME}Page`;
Component.displayName = DISPLAY_NAME;

export { Component };

export const Label: FC<{ label: string }> = ({ label }) => {
  return <div className="text-brand-teal font-semibold">{label}</div>;
};
