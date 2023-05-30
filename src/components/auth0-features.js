import React from "react";
import { Auth0Feature } from "./auth0-feature";

export const Auth0Features = () => {
  const featuresList = [
    {
      title: "Master Card",
      description:
        "Mastercard Inc. (stylized as MasterCard from 1979–2016, mastercard from 2016–2019) is the second-largest payment-processing corporation worldwide. It offers a range of financial services. Its headquarters are in Purchase, New York.",
      resourceUrl: "https://auth0.com/docs/connections",
      icon: "https://cdn.auth0.com/blog/hello-auth0/identity-providers-logo.svg",
    },
    {
      title: "Master Card",
      description:
        "Mastercard Inc. (stylized as MasterCard from 1979–2016, mastercard from 2016–2019) is the second-largest payment-processing corporation worldwide. It offers a range of financial services. Its headquarters are in Purchase, New York.",
      resourceUrl: "https://auth0.com/docs/connections",
      icon: "https://cdn.auth0.com/blog/hello-auth0/advanced-protection-logo.svg",
    },
    {
      title: "Master Card",
      description:
        "Mastercard Inc. (stylized as MasterCard from 1979–2016, mastercard from 2016–2019) is the second-largest payment-processing corporation worldwide. It offers a range of financial services. Its headquarters are in Purchase, New York.",
      resourceUrl: "https://auth0.com/docs/connections",
      icon: "https://cdn.auth0.com/blog/hello-auth0/mfa-logo.svg",
    },
    {
      title: "Master Card",
      description:
        "Mastercard Inc. (stylized as MasterCard from 1979–2016, mastercard from 2016–2019) is the second-largest payment-processing corporation worldwide. It offers a range of financial services. Its headquarters are in Purchase, New York.",
      resourceUrl: "https://auth0.com/docs/connections",
      icon: "https://cdn.auth0.com/blog/hello-auth0/private-cloud-logo.svg",
    },
  ];

  return (
    <div className="auth0-features">
      <h2 className="auth0-features__title">Offers</h2>
      <div className="auth0-features__grid">
        {featuresList.map((feature) => (
          <Auth0Feature
            key={feature.resourceUrl}
            title={feature.title}
            description={feature.description}
            resourceUrl={feature.resourceUrl}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
};
