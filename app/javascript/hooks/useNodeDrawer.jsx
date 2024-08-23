import React, { createContext, useContext, useState } from "react";
import Drawer from "react-modern-drawer";
import PropTypes from "prop-types";

const DrawerContext = createContext();

export const useNodeDrawer = () => useContext(DrawerContext);

export const DrawerProvider = ({ children, size }) => {
  const [drawerContent, setDrawerContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [drawerSize, setDrawerSize] = useState("small");

  const openDrawer = (content, size = "small") => {
    setDrawerContent(content);
    setDrawerSize(size);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const contextValue = { openDrawer, closeDrawer, isOpen };

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
      <Drawer
        open={isOpen}
        onClose={closeDrawer}
        direction="right"
        size={drawerSize}
        style={{
          overflow: "auto",
        }}>
        {drawerContent}
      </Drawer>
    </DrawerContext.Provider>
  );
};
