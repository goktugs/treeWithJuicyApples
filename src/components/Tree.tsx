import { TreeSvg } from "../assets/tree";
import React from "react";
import { Apple } from "./Apple";

export const Tree = () => {
  return (
    <div className="treeContainer">
      <TreeSvg />
      <Apple className="apple1" />
      <Apple className="apple2" />
      <Apple className="apple3" />
    </div>
  );
};
