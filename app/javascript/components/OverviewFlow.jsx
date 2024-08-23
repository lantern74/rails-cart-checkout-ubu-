import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  getViewportForBounds,
} from "reactflow";

import { NodeUtils } from "../utils/nodes.utils";
import AddButtonEdge from "./CustomEdge/AddButtonEdge";
import CardCustomNode from "./CustomNode/CardCustomNode";
import { useHighlightedNodes } from "../context/highlightedNodesContext";

const nodeTypes = {
  "card-custom-node": CardCustomNode,
};
const edgeTypes = {
  "add-button-edge": AddButtonEdge,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const OverviewFlow = ({ backendData, workflowId }) => {
  const { setHighlightedNodes } = useHighlightedNodes();
  const [originalPositions, setOriginalPositions] = useState({});
  const [needNodeUpdates, setNeedNodeUpdates] = useState(false);

  const nodeUtils = new NodeUtils();
  const { nodes: initialNodes, edges: initialEdges } =
    nodeUtils.generateNodesAndEdges(backendData);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === "card-custom-node")
        .data.selects[edge.sourceHandle];
      edge.type = edgeType;
    }

    return edge;
  });

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }, i) => ({
              id: `edge-${i}`,
              source,
              target,
              type: "add-button-edge",
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [setEdges, edges, nodes]
  );

  // Function to check if two nodes are close to each other
  const areNodesClose = useCallback((nodeA, nodeB, threshold = 50) => {
    const dx = nodeA.position.x - nodeB.position.x;
    const dy = nodeA.position.y - nodeB.position.y;
    return Math.sqrt(dx * dx + dy * dy) < threshold;
  }, []);

  const updateEdgesAfterSwap = useCallback(
    (nodeA, nodeB) => {
      // Remove all edges connected to nodeA and nodeB
      setEdges((currentEdges) =>
        currentEdges.filter(
          (edge) =>
            edge.source !== nodeA.id &&
            edge.target !== nodeA.id &&
            edge.source !== nodeB.id &&
            edge.target !== nodeB.id
        )
      );

      // Re-create edges based on the updated node indices
      setNodes((currentNodes) => {
        const sortedNodes = [...currentNodes].sort(
          (a, b) => a.data.index - b.data.index
        );
        const newEdges = [];
        for (let i = 0; i < sortedNodes.length - 1; i++) {
          newEdges.push({
            id: `edge-${i}`,
            source: sortedNodes[i].id,
            target: sortedNodes[i + 1].id,
            type: "add-button-edge",
          });
        }
        setEdges(newEdges);
        return sortedNodes;
      });
    },
    [setEdges, setNodes]
  );

  const swapNodes = useCallback(
    (nodeA, nodeB) => {
      if (nodeB.data.index === 0 || nodeB.data.isEnd) {
        setNodes((nds) =>
          nds.map((n) => {
            if (n.id === nodeA.id) {
              return {
                ...n,
                position: { x: 250, y: nodeA.data.index * 100 },
                data: { ...n.data, index: nodeA.data.index },
              };
            }
            if (n.id === nodeB.id) {
              return {
                ...n,
                position: { x: 250, y: nodeB.data.index * 100 },
                data: { ...n.data, index: nodeB.data.index },
              };
            }
            return n;
          })
        );
      }
      if (!(nodeB.data.index === 0 || nodeB.data.isEnd)) {
        setNodes((nds) =>
          nds.map((n) => {
            if (n.id === nodeA.id) {
              return {
                ...n,
                position: { x: 250, y: nodeB.data.index * 100 },
                data: { ...n.data, index: nodeB.data.index },
              };
            }
            if (n.id === nodeB.id) {
              return {
                ...n,
                position: { x: 250, y: nodeA.data.index * 100 },
                data: { ...n.data, index: nodeA.data.index },
              };
            }
            return n;
          })
        );
        updateEdgesAfterSwap(nodeA, nodeB);
      }
    },
    [setNodes, updateEdgesAfterSwap]
  );

  // Custom callback for node drag start
  const onNodeDragStart = useCallback((event, node) => {
    setOriginalPositions((prev) => ({
      ...prev,
      [node.id]: node.position,
    }));
  }, []);

  // Custom callback for node drag
  const onNodeDrag = useCallback(
    (event, node) => {
      let newHighlightedNodes = {};
      nodes.forEach((otherNode) => {
        if (node.id !== otherNode.id && areNodesClose(node, otherNode)) {
          // If nodes are close, mark both for highlighting
          newHighlightedNodes = {
            startNode: node.data.index,
            endNode: otherNode.data.index,
          };
        }
      });
      setHighlightedNodes(newHighlightedNodes);
    },
    [nodes, areNodesClose, setHighlightedNodes]
  );

  const swapNodesAndUpdateBackend = async (updatedOrderIds) => {
    try {
      // Send PUT request to backend using fetch API
      const url = `/workflows/${workflowId}/update_worktask_order`;
      console.log(url);
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('[name="csrf-token"]').content,
        },
        body: JSON.stringify({ worktaskIds: updatedOrderIds }),
      });
      setNeedNodeUpdates(false);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Order updated successfully");
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  useEffect(() => {
    if (needNodeUpdates) {
      const updatedOrderIds = nodes
        .filter((node) => !(node.data.index === 0 || node.data.isEnd))
        .map((node) => node.data.id); // assuming node.id is your worktask ID
      console.log(updatedOrderIds);
      swapNodesAndUpdateBackend(updatedOrderIds);
    }
  }, [nodes]);

  const onNodeDragStop = useCallback(
    (event, node) => {
      let swapOccurred = false;

      nodes.forEach((otherNode) => {
        if (node.id !== otherNode.id && areNodesClose(node, otherNode)) {
          swapNodes(node, otherNode);
          swapOccurred = true;
          setNeedNodeUpdates(true);
          setHighlightedNodes({});
        }
      });

      if (!swapOccurred) {
        // Reset to original position if no swap occurred
        setNodes((nds) =>
          nds.map((n) => {
            if (n.id === node.id) {
              return {
                ...n,
                position: originalPositions[node.id],
              };
            }
            return n;
          })
        );
      }
    },
    [
      nodes,
      areNodesClose,
      swapNodesAndUpdateBackend,
      setHighlightedNodes,
      setNodes,
      originalPositions,
    ]
  );

  const { x, y, zoom } = getViewportForBounds(
    {
      x: 350,
      y: window.innerHeight / 8,
      width: 100,
      height: 100,
    },
    window.innerWidth,
    window.innerHeight,
    0.5,
    2
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edgesWithUpdatedTypes}
      onNodesChange={onNodesChange}
      onNodesDelete={onNodesDelete}
      onNodeDragStart={onNodeDragStart}
      onNodeDrag={onNodeDrag}
      onNodeDragStop={onNodeDragStop}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      snapToGrid={true}
      snapGrid={[16, 16]}
      defaultViewport={{
        x,
        y,
        zoom,
      }}
      panOnScroll={true}
      attributionPosition="top-right"
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}>
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#eaeaea" gap={10} size={2} />
    </ReactFlow>
  );
};

export default OverviewFlow;
