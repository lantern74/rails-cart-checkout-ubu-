import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import PropTypes from "prop-types";
const withCustomNode = (WrappedComponent) => {
  function CustomNode({ data }) {
    return (
      <>
        {data.index > 0 && (
          <Handle
            type="target"
            isConnectable={false}
            isConnectableStart={false}
            position={Position.Top}
            style={{
              background: "none",
              border: "none",
              height: "0px",
              width: "0px",
            }}
          />
        )}
        <WrappedComponent data={data} />
        {!data.isEnd && (
          <Handle
            isConnectable={false}
            isConnectableStart={false}
            type="source"
            position={Position.Bottom}
            id={data.id}
            style={{
              background: "none",
              border: "none",
              height: "0px",
              width: "0px",
            }}
          />
        )}
      </>
    );
  }
  // define prop types
  CustomNode.propTypes = {
    data: PropTypes.object.isRequired,
  };
  return memo(CustomNode);
};

export default withCustomNode;
