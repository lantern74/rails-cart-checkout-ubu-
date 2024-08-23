import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../UI/Input";
import Quill from "quill";
import { toast } from "react-toastify";

export default function EmailFormDrawerContent({
  data,
  onSuccess,
  isCreateMode = false,
}) {
  const { register, handleSubmit, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);

      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      const url = isCreateMode
        ? `/workflows/${data.workflow_id}/worktasks`
        : `/workflows/${data.workflow_id}/worktasks/${data.id}`;
      const method = isCreateMode ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          worktask: {
            name: formData.name,
            from_email: formData.from_email,
            from_name: formData.from_name,
            subject_line: formData.subject_line,
            message: formData.message,
            order: data.order,
            worktask_type_id: data.worktask_type,
          },
        }),
      });

      if (response.ok) {
        onSuccess();
        setIsSuccess(true);
      } else {
        toast.error(
          `Failed to ${isCreateMode ? "create" : "update"}! ${
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

  useEffect(() => {
    const quill = new Quill("#message-editor", {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline"],
          [{ list: "bullet" }],
          ["link"],
        ],
      },
    });

    quill.on("text-change", () => {
      setValue("message", quill.root.innerHTML);
    });

    if (data?.message) {
      quill.root.innerHTML = data.message;
    }
  }, [data?.message, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div>
          <div>Name</div>
          <Input
            type="text"
            {...register("name")}
            defaultValue={data?.name || ""}
            onChange={(e) => {
              setValue("name", e.target.value);
            }}
          />
        </div>
        <div>
          <div>From Email</div>
          <Input
            type="email"
            {...register("from_email")}
            defaultValue={data?.from_email || ""}
            onChange={(e) => {
              setValue("from_email", e.target.value);
            }}
          />
        </div>
        <div>
          <div>From Name</div>
          <Input
            type="text"
            {...register("from_name")}
            defaultValue={data?.from_name || ""}
            onChange={(e) => {
              setValue("from_name", e.target.value);
            }}
          />
        </div>
        <div>
          <div>Subject</div>
          <Input
            type="text"
            {...register("subject_line")}
            defaultValue={data?.subject_line || ""}
            onChange={(e) => {
              setValue("subject_line", e.target.value);
            }}
          />
        </div>
        <div>
          <div>Message</div>
          <div id="message-editor" style={{ height: "300px" }} />
        </div>
        <button
          type="submit"
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
    </form>
  );
}
