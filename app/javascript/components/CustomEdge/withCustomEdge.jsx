import React,{ memo } from "react";
import PropTypes from "prop-types";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
} from "reactflow";

const withCustomEdge = (WrappedComponent) => {
  function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });

    const customEdgeProps = {
      style: {
        position: "absolute",
        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
        pointerEvents: "all",
      },
      className: "nodrag nopan",
      setEdges,
      edgeId: id,
    };

    return (
      <>
        <BaseEdge id={id} path={edgePath} />
        <EdgeLabelRenderer>
          <WrappedComponent {...customEdgeProps} />
        </EdgeLabelRenderer>
      </>
    );
  }

  CustomEdge.propTypes = {
    id: PropTypes.string.isRequired,
    sourceX: PropTypes.number.isRequired,
    sourceY: PropTypes.number.isRequired,
    targetX: PropTypes.number.isRequired,
    targetY: PropTypes.number.isRequired,
  };

  return memo(CustomEdge);
};

export default withCustomEdge;
