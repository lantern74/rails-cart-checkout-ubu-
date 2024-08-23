// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";
import * as bootstrap from "bootstrap";

import jquery from "jquery";
window.$ = jquery;
window.jQuery = jquery;

require("jquery-ui-bundle");

import Rails from "@rails/ujs";
// Rails.start() // I think you don't need to do this in the Rails 7

// console.log(window.$);   // jQuery is already global
// console.log($.ui);       // jquery-ui initialized on import

// $(document).on("turbo:load", () => {
//   console.log("turbo!");
// });

import magnificPopup from "magnific-popup";
window.magnificPopup = magnificPopup;

import inputmask from "inputmask";
window.inputmask = inputmask;

import flatpickr from "flatpickr";
window.flatpickr = flatpickr;

import quill from "quill";
window.Quill = quill;

import tippy from "tippy.js";
window.tippy = tippy;

import animate from "animate.css/animate";
window.animate = animate;

import choices from "choices.js";
window.choices = choices;

//?      REACT START
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import OverviewFlow from "./components/OverviewFlow";

import { HighlightedNodesProvider } from "./context/highlightedNodesContext";
import { DrawerProvider } from "./hooks/useNodeDrawer";
import { Slide, ToastContainer } from "react-toastify";

const rootElement = document.getElementById("workflow-show-root");

const App = () => {
  const [backendData, setBackendData] = useState([]);
  const pathname = window.location.pathname;
  const segments = pathname.split("/");
  const workflowId = segments[2];
  useEffect(() => {
    (async () => {
      const url = `/workflows/${workflowId}`;
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      const { workflow, worktask_types, worktasks } = data;
      localStorage.setItem("worktask_types", JSON.stringify(worktask_types));
      const combinedData = worktasks.map((worktask) => {
        const worktaskType = worktask_types.find(
          (type) => type.id === worktask.worktask_type_id
        );

        if (worktaskType) {
          return {
            ...worktask,
            typeName: worktaskType.name,
            type: worktaskType.kind,
          };
        }

        return worktask; // Return the original worktask if no matching type is found
      });
      localStorage.setItem("workflowKind", JSON.stringify(workflow.kind));
      combinedData.unshift({
        type: "workflow",
        ...workflow,
      });
      setBackendData(combinedData);
    })();
  }, []);
  return (
    <div style={{ width: "100%", height: "80vh" }}>
      <DrawerProvider>
        <HighlightedNodesProvider>
          <ToastContainer
            hideProgressBar
            closeOnClick
            theme="colored"
            transition={Slide}
          />
          {backendData.length && (
            <OverviewFlow backendData={backendData} workflowId={workflowId} />
          )}
        </HighlightedNodesProvider>
      </DrawerProvider>
    </div>
  );
};

const render = (Component) => {
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<Component />);
  } else {
    // console.log("Root element not found. React component not rendered.");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  render(App); // Render the App component instead of OverviewFlow directly
});

//?      REACT END



