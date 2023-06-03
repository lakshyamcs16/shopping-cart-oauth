import React from "react";
import { MobileNavBarTab } from "./mobile-nav-bar-tab";

export const MobileNavBarTabs = ({ handleClick }) => {

  return (
    <div className="mobile-nav-bar__tabs">
      <MobileNavBarTab
        path="/profile"
        label="Profile"
        handleClick={handleClick}
      />
      <MobileNavBarTab 
        path="/catalog" 
        label="Catalog" 
        handleClick={handleClick} 
      />
    </div>
  );
};