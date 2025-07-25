export const hasParentPortalUserRole = () => {
  //@ts-expect-error
  return (window?.frappe?.boot?.user?.roles ?? []).includes('PP User')
}

export const isSystemManager = () => {
  //@ts-expect-error
  return (window?.frappe?.boot?.user?.roles ?? []).includes('System Manager')
}
