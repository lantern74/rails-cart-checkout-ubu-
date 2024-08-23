import React, { useEffect, useState } from "react";
import { FaCalendar, FaClock, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import PropTypes from "prop-types";
import withCustomNode from "./withCustomNode";
import { useHighlightedNodes } from "../../context/highlightedNodesContext";
import CustomNodeMenu from "./CustomNodeMenu";
import { useNodeDrawer } from "../../hooks/useNodeDrawer";
import { CardCustomNodeStyle } from "./CardCustomNodeStyle";
import CustomNodeDrawerContent from "../CustomNodeDrawerContent";

function CardNode({ data }) {
  const { highlightedNodes } = useHighlightedNodes();
  const { openDrawer, isOpen, closeDrawer } = useNodeDrawer();
  const [selectedNode, setSelectedNode] = useState(null);
  const [isClickable, setIsClickable] = useState(true);

  const icons = {
    start: <FaCalendar />,
    email: <MdEmail />,
    delay: <FaClock />,
    insta_msg: <FaInstagram />,
  };

  const isIntractable = !(data.isEnd || data.index === 0);
  useEffect(() => {
    if (!isOpen) {
      setSelectedNode(null);
    }
  }, [isOpen]);

  const handleDelete = async () => {
    const url = `/workflows/${data.workflow_id}/worktasks/${data.id}`;

    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('[name="csrf-token"]').content,
      },
    });
    window.location.reload();
  };

  const handleOpenDrawer = () => {
    if (!data.isEnd && isClickable) {
      openDrawer(
        <CustomNodeDrawerContent data={data} onClose={closeDrawer} />,
        "45vw"
      );
      setSelectedNode(data);
    }
  };

  const disableOpenDrawer = () => {
    setIsClickable(false);
  };

  const enableOpenDrawer = () => {
    setIsClickable(true);
  };

  return (
    <div
      onClick={handleOpenDrawer}
      style={CardCustomNodeStyle.container(
        highlightedNodes,
        data,
        selectedNode
      )}
      className={isIntractable ? "" : "nodrag"}>
      {isIntractable && (
        <div style={CardCustomNodeStyle.icon}>{icons[data.type]}</div>
      )}
      <div
        style={
          data.isEnd
            ? CardCustomNodeStyle.end
            : CardCustomNodeStyle.content(data)
        }>
        {data.index === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}>
            <div
              style={{
                ...CardCustomNodeStyle.icon,
                width: "19px",
                padding: "6px",
                marginRight: "5px", // Adjust the margin as needed
                backgroundColor: "#dfefff",
                color: "#3b82f680",
              }}>
              {data.kind === "instagram" ? icons.insta_msg : icons.start}
            </div>

            <div>
              <div
                style={{
                  color: "#518fc4",
                  fontWeight: "bold",
                  fontSize: "8px",
                }}>
                Trigger
              </div>
              <div>{data.name}</div>
            </div>
          </div>
        ) : (
          <div>{data.name}</div>
        )}
      </div>
      {isIntractable && (
        <div
          onMouseOver={disableOpenDrawer} // Disable when mouse over
          onMouseLeave={enableOpenDrawer} // Enable when mouse leaves
        >
          <CustomNodeMenu>
            <CustomNodeMenu.Delete onClick={handleDelete} />
          </CustomNodeMenu>
        </div>
      )}
    </div>
  );
}

CardNode.propTypes = {
  data: PropTypes.object.isRequired,
};

const CardCustomNode = withCustomNode(CardNode);
export default CardCustomNode;
