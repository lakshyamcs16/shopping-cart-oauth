import React from "react";
import { NavBarTab } from "./nav-bar-tab";

export const NavBarTabs = () => {
  return (
    <div className="nav-bar__tabs">
      <NavBarTab path="/profile" label="Profile" />
      <NavBarTab path="/catalog" label="Catalog" />
    </div>
  );
};