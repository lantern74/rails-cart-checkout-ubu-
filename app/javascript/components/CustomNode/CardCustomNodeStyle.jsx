export const CardCustomNodeStyle = {
  icon: {
    height: "20px",
    width: "23px",
    background: "#ECFDF6",
    color: "#71ceaf",
    padding: "5px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: (highlightedNodes, data, selectedNode) => ({
    borderRadius: "4px",
    fontSize: "8px",
    padding: "10px",
    width: "150px",
    display: "flex",
    gap: "5px",
    cursor: data.isEnd ? "default" : "pointer",
    alignItems: "center",
    textTransform: data.isEnd ? "uppercase" : "capitalize",
    background: data.isEnd ? "none" : "#fff",
    color: data.isEnd ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.7)",
    border:
      selectedNode?.index === data.index
        ? "1px solid blue"
        : data.isEnd
        ? ""
        : "1px solid #D1D5DB",
    transform:
      +highlightedNodes.endNode === data.index &&
      !(data.isEnd || data.index === 0)
        ? "translateY(5px) scale(1.1)"
        : "translateY(0px) scale(1)",
    transition: "all 0.2s ease-in-out",
  }),
  content: (data) => ({
    display: "flex",
    justifyContent: data.index === 0 ? "center" : "flex-start",
    width: "100%",
  }),
  end: {
    background: "rgba(0,0,0,0.2)",
    margin: "0 auto",
    padding: "4px 8px",
    borderRadius: "10px",
    fontSize: "10px",
  },
};
