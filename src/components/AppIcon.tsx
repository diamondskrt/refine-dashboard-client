import React from "react";
import { logo, shortLogo } from "@/assets/img";

interface AppIconProps {
  collapsed?: boolean;
}

export const AppIcon: React.FC<AppIconProps> = ({ collapsed }) => {
  return <img src={collapsed ? shortLogo : logo} alt="refine" />;
};
