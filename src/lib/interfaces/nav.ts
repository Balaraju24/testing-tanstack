export interface NavItem {
  title: string;
  url: string;
  activePaths?: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  userTypes: string[];
}

export interface NavMainProps {
  items: NavItem[];
}

export interface TodoProps {
  case_id?: string;
  iconType?: string;
}
