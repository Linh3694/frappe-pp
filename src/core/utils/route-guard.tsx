import type { FC, ReactElement } from "react";
import { memo, useMemo } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { Permission } from "./permission";

export interface CreatePageFn {
  (
    Page: FC,
    requiredPermissions: Permission[],
    fallback: JSX.Element | null
  ): ReactElement<any, any> | null;
  displayName?: string | undefined;
}

const CreatePage: FC<{
  Page: FC;
  requiredPermissions: Permission[];
  fallback: JSX.Element | null;
}> = ({ Page, requiredPermissions, fallback = null }) => {
  // console.log("CREATE_PAGE");
  
  return useMemo(() => <Page />, []);
};

export const createPage = (
  Page: FC,
  requiredPermissions: Permission[],
  fallback: JSX.Element | null
) =>
  memo(() => (
    <CreatePage
      Page={Page}
      fallback={fallback}
      requiredPermissions={requiredPermissions}
    />
  ));
