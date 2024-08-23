export class NodeUtils {
  generateNodesAndEdges = (data) => {
    const spacingY = 100; // Vertical spacing between nodes

    const nodes = data.map((item, index) => ({
      id: String(index + 1),
      type: item.nodeType || "card-custom-node",
      data: {
        name: item.name,
        type: item.type,
        index,
        ...item,
      },
      position: { x: 250, y: index * spacingY },
    }));

    // Adding an automatic end node
    nodes.push({
      id: String(nodes.length + 1),
      type: "card-custom-node",
      data: { name: "end", index: nodes.length, isEnd: true },
      position: { x: 250, y: nodes.length * spacingY },
    });

    const edges = nodes
      .map((node, i) => ({
        id: `edge-${i}`,
        source: node.id,
        target: nodes[i + 1]?.id || null,
        type: "add-button-edge",
      }))
      .filter((edge) => edge.target !== null);

    return { nodes, edges };
  };
}
