import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InstagramPostsGrid from "./InstagramPostsGrid";
import { useQuery } from "@tanstack/react-query";
import Input from "../UI/Input";

export default function InstagramFormDrawerContent({
  data,
  onSuccess,
  isCreateMode = false,
}) {
  const {
    isPending,
    error,
    data: postsData,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("/insta_integration/fetch_posts").then((res) => res.json()),
  });

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      fb_post_id: data.fb_post_id,
      search_term: data.search_term,
      message: data.message,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (formData) => {
    const worktask = {
      name: data.name,
      message: formData.message,
      fb_post_id: formData.fb_post_id,
      search_term: formData.search_term,
      order: data.order,
      worktask_type_id: data.worktask_type,
    };

    try {
      setIsLoading(true);
      setIsSuccess(false);

      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      const url = isCreateMode
        ? `/workflows/${data.workflow_id}/worktasks`
        : `/workflows/${data.workflow_id}/worktasks/${data.id}`;
      const method = isCreateMode ? "POST" : "PUT";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          worktask,
        }),
      });

      if (response.ok) {
        onSuccess();
        setIsSuccess(true);
      } else {
        toast.error(
          `Failed to ${isCreateMode ? "create" : "update"} ${data.name}! ${
            response.statusText
          }`
        );
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2em" }}>
      <div>
        <div>Select a post for us to track comments on.</div>
        <div
          style={{
            marginTop: "1rem",
            backgroundColor: "#f3f4f6",
            padding: "1rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
          }}>
          {isPending ? (
            <div>Loading posts...</div>
          ) : error ? (
            <div>Error loading posts: {error.message}</div>
          ) : (
            <InstagramPostsGrid
              posts={postsData.posts}
              selectedPostId={data.fb_post_id}
              onPostSelect={(post) => {
                setValue("fb_post_id", post.id);
              }}
            />
          )}
        </div>
      </div>
      <div>
        <div>Only trigger comments with these keywords.</div>
        <Input
          type="text"
          {...register("search_term")}
          placeholder="enter keywords"
        />
      </div>
      <div>
        <div>Write Message that you want to reply with</div>
        <Input
          type="text"
          {...register("message")}
          placeholder="enter keywords"
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading || isSuccess}
        style={{
          backgroundColor: isSuccess ? "#10b981" : "#6366f1",
          color: "white",
          outline: "none",
          border: "none",
          fontWeight: "500",
          borderRadius: "0.375rem",
        }}>
        {isSuccess
          ? "Success! ✅"
          : isLoading
          ? "Processing..."
          : isCreateMode
          ? "Create"
          : "Update"}
      </button>
    </div>
  );
}
