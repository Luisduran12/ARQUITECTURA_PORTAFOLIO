import { IconButton } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
function IconButtonReusable({ icon, href, colorHover, ariaLabel }) {
  return (
    <IconButton
      bg="none"
      className="animate-top"
      _hover={{ color: colorHover }}
      _active={{}}
      icon={icon}
      color="white"
      aria-label={ariaLabel || "Enlace a red social"}
      onClick={() => window.open(href, "_blank", "noopener noreferrer")}
    />
  );
}

export default IconButtonReusable;
