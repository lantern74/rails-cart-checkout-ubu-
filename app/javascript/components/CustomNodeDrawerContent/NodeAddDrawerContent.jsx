import React, { useState } from "react";
import { FaClock, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ActionForm from "./ActionForm";
import { IoArrowBack } from "react-icons/io5";

export default function NodeAddDrawerContent({ data }) {
  // TODO NEED TO FIX THIS FILTER LOGIC IN THE FUTURE BUT FOR NOW LETS STICK WITH THIS
  const workflowKind = JSON.parse(localStorage.getItem("workflowKind"));
  const isInstagram = workflowKind === "instagram";
  const worktaskTypes = JSON.parse(
    localStorage.getItem("worktask_types")
  ).filter((wt) =>
    isInstagram ? wt.kind === "insta_msg" : wt.kind !== "insta_msg"
  );
  const [selectedNode, setSelectedNode] = useState(null);
  const icons = {
    email: <MdEmail />,
    delay: <FaClock />,
    insta_msg: <FaInstagram />,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}>
      {selectedNode ? (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
            onClick={() => {
              setSelectedNode(null);
            }}>
            <div
              style={{
                background: "#ECFDF6",
                padding: "5px",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <IoArrowBack />
            </div>
            Go Back
          </div>
          <ActionForm data={{ ...selectedNode, ...data }} />
        </div>
      ) : (
        worktaskTypes.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setSelectedNode(item);
            }}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "1rem",
              gap: "1rem",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
            }}>
            <div
              style={{
                background: "#ECFDF6",
                padding: "5px",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              {icons[item.kind]}
            </div>
            <div>{item.name}</div>
          </div>
        ))
      )}
    </div>
  );
}
