import React from "react";
import EmailFormDrawerContent from "./EmailFormDrawerContent";
import DelayFormDrawerContent from "./DelayFormDrawerContent";
import InstagramFormDrawerContent from "./InstagramFormDrawerContent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function ActionForm({ data }) {
  const pathname = window.location.pathname;
  const segments = pathname.split("/");
  const workflow_id = segments[2];
  const onSuccess = () => {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  const actions = {
    email: (
      <EmailFormDrawerContent
        data={{ ...data, workflow_id, worktask_type: data.id }}
        onSuccess={onSuccess}
        isCreateMode={true}
      />
    ),
    delay: (
      <DelayFormDrawerContent
        data={{ ...data, workflow_id, worktask_type: data.id }}
        onSuccess={onSuccess}
        isCreateMode={true}
      />
    ),
    insta_msg: (
      <QueryClientProvider client={queryClient}>
        <InstagramFormDrawerContent
          data={{ ...data, workflow_id, worktask_type: data.id }}
          onSuccess={onSuccess}
          isCreateMode={true}
        />
      </QueryClientProvider>
    ),
  };
  return <div>{actions[data.kind]}</div>;
}
