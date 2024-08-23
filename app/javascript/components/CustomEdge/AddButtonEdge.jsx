import React from "react";
import PropTypes from "prop-types";
import withCustomEdge from "./withCustomEdge";
import { CustomEdgeStyle } from "./CustomEdgeStyle";
import CustomNodeDrawerContent from "../CustomNodeDrawerContent";
import { useNodeDrawer } from "../../hooks/useNodeDrawer";

function AddButton({ edgeId, style, className }) {
  const { openDrawer, closeDrawer } = useNodeDrawer();
  const handleAdd = async () => {
    const order = +edgeId.split("-")[1];
    openDrawer(
      <CustomNodeDrawerContent
        data={{ type: "nodeAdd", order }}
        onClose={closeDrawer}
      />,
      "45vw"
    );
  };

  const buttonStyle = {
    ...style,
    ...CustomEdgeStyle,
  };
  return (
    <button style={buttonStyle} className={className} onClick={handleAdd}>
      +
    </button>
  );
}

AddButton.propTypes = {
  edgeId: PropTypes.string.isRequired,
  setEdges: PropTypes.func.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

const AddButtonEdge = withCustomEdge(AddButton);
export default AddButtonEdge;
