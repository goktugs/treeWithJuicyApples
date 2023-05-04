import { AppleSvg } from "../assets/appleSvg";
import React from "react";

interface AppleProps {
  className?: string;
}

export const Apple: React.FC<AppleProps> = ({ className }) => {
  return (
    <div className={`apple ${className}`}>
      <AppleSvg width="50px" height="50px" />
    </div>
  );
};
