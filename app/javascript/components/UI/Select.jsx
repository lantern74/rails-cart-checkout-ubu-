import React from "react";

const Select = React.forwardRef((props, ref) => {
  return (
    <select
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

export default Select;
