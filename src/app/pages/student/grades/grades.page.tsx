import type { FC } from "react";

import { Permission } from "@/core/utils/permission";
import { createPage } from "@/core/utils/route-guard";

import GradePageTemplate from "@templates/grade-page.template";
import ForbiddenState from "@features/states/forbbiden-state";
import ContentPageLayout from "@templates/content-page.layout";
import ListGrades from "@features/grade/list-grades";

const PERMISSIONS: Permission[] = [];
const DISPLAY_NAME = "Grades";

export const Route: FC = () => {

  return (
    <ContentPageLayout >
      <GradePageTemplate list={<ListGrades />} />
    </ContentPageLayout>
  )
};

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />);

Route.displayName = `${DISPLAY_NAME}Page`;
Component.displayName = DISPLAY_NAME;

export { Component };
