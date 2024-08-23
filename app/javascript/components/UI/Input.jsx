import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <input
      style={{
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "4px",
        outline: "none",
        paddingLeft: "5px",
      }}
      ref={ref}
      {...props}
    />
  );
});

export default Input;
