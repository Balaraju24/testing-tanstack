export const getSidebarWidth = (
  sidebarState: string,
  is2xlOrBelow: boolean
): string => {
  return sidebarState === "collapsed"
    ? "60px"
    : is2xlOrBelow
      ? "190px"
      : "200px";
};
