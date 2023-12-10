export interface IIconProps {
  color: string;
}

export interface INavItemProps {
  icon: React.ReactNode;
  title: string;
  path: string;
  isActive: boolean;
  aria_label: string;
}
