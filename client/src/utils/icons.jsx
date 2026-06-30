import React from "react";
import * as FaIcons from "react-icons/fa";
/**
 * Dynamically renders a FontAwesome icon based on its string identifier.
 * Defaults to FaTools if the identifier is not found.
 */
export const ServiceIcon = ({ iconName, className }) => {
  const IconComponent = FaIcons[iconName];
  if (!IconComponent) {
    return <FaIcons.FaTools className={className} />;
  }
  return <IconComponent className={className} />;
};
export default ServiceIcon;
