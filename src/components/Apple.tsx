import { AppleSvg } from "../assets/apple";
import React from "react";

interface AppleProps {
  className?: string;
}

export const Apple: React.FC<AppleProps> = ({ className }) => {
  return (
    <div className={`apple ${className}`}>
      <AppleSvg width="50" height="50" />
    </div>
  );
};
