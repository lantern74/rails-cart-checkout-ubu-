import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../UI/Input";
import Select from "../UI/Select";
import { toast } from "react-toastify";

export default function DelayFormDrawerContent({
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
            delay: formData.delay,
            unit_of_time: formData.unit_of_time,
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
          <div>Delay</div>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}>
            <Input
              required
              type="number"
              {...register("delay")}
              defaultValue={data?.delay || ""}
              onChange={(e) => {
                setValue("delay", e.target.value);
              }}
            />
            <Select
              {...register("unit_of_time")}
              defaultValue={data?.unit_of_time || ""}
              onChange={(e) => {
                setValue("unit_of_time", e.target.value);
              }}>
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
              <option value="days">Days</option>
            </Select>
          </div>
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
