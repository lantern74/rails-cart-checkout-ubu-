import PropTypes from "prop-types";
import React, { createContext, useContext, useState } from "react";

const HighlightedNodesContext = createContext();

export const HighlightedNodesProvider = ({ children }) => {
  const [highlightedNodes, setHighlightedNodes] = useState({});
  return (
    <HighlightedNodesContext.Provider
      value={{ highlightedNodes, setHighlightedNodes }}>
      {children}
    </HighlightedNodesContext.Provider>
  );
};

export const useHighlightedNodes = () => useContext(HighlightedNodesContext);

HighlightedNodesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
