import React from "react";
import { Link } from "react-router-dom";

export const HeroBanner = () => {
  const logo = "https://cdn.auth0.com/blog/developer-hub/react-logo.svg";

  return (
    <div className="hero-banner hero-banner--pink-yellow">
      <div className="hero-banner__logo">
        <img className="hero-banner__image" src={logo} alt="React logo" />
      </div>
      <h1 className="hero-banner__headline">Welcome!</h1>
      <p className="hero-banner__description">
        Basic OAuth Application with Shopping cart, Modal and Drawer.
      </p>
      <Link
        id="code-sample-link"
        rel="noopener noreferrer"
        to="/catalog"
        className="button button--secondary"
      >
        Check out the catalog!
      </Link>
    </div>
  );
};
