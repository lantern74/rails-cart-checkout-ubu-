import React from "react";
import PropTypes from "prop-types";
import WorkflowFormDrawerContent from "./WorkflowFormDrawerContent";
import EmailFormDrawerContent from "./EmailFormDrawerContent";
import DelayFormDrawerContent from "./DelayFormDrawerContent";
import { IoClose } from "react-icons/io5";
import NodeAddDrawerContent from "./NodeAddDrawerContent";
import InstagramFormDrawerContent from "./InstagramFormDrawerContent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function CustomNodeDrawerContent({ data, onClose }) {
  const pathname = window.location.pathname;
  const segments = pathname.split("/");
  const workflow_id = segments[2];
  const onSuccess = () => {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  const formLists = {
    nodeAdd: {
      description: "Pick an action for this step",
      content: <NodeAddDrawerContent data={data} />,
    },
    workflow: {
      description: `This workflow is connected to ${data.name}. You can edit what workflow to use in funnels below.`,
      content: <WorkflowFormDrawerContent data={data} />,
    },
    email: {
      description: "Sends an email to the contact",
      content: <EmailFormDrawerContent data={data} onSuccess={onSuccess} />,
    },
    delay: {
      description: "Delays the workflow for a specified amount of time",
      content: <DelayFormDrawerContent data={data} onSuccess={onSuccess} />,
    },
    insta_msg: {
      description: "Trigger message to be sent to Instagram",
      content: (
        <QueryClientProvider client={queryClient}>
          <InstagramFormDrawerContent
            data={data}
            onSuccess={onSuccess}
            isCreateMode={false}
          />
        </QueryClientProvider>
      ),
    },
  };
  return (
    <div>
      <div
        style={{
          padding: "1.5rem",
          borderBottom: "1px solid #e5e7eb",
        }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}>
          <header
            style={{
              fontSize: "1.125rem", // For 'text-lg', assuming it corresponds to 18px
              fontWeight: "500", // For 'font-medium'
              textTransform: "capitalize", // For 'capitalize'
              color: "#1f2937", // For 'text-gray-900', assuming it corresponds to this hex value
              flex: 1,
            }}>
            {data.type === "nodeAdd" ? "Actions" : data.name}
          </header>
          <IoClose
            onClick={onClose}
            style={{
              cursor: "pointer",
            }}
            size={30}
            color="#727986"
          />
        </div>
        <div
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
          }}>
          {formLists[data.type].description}
        </div>
      </div>
      <div
        style={{
          padding: "1.5rem",
        }}>
        {formLists[data.type].content}
      </div>
    </div>
  );
}

CustomNodeDrawerContent.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
