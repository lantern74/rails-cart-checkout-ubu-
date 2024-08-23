import React from "react";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { GoKebabHorizontal } from "react-icons/go";

const Delete = ({ onClick }) => {
  return (
    <DropdownMenu.Item className="DropdownMenuItem" onClick={onClick}>
      <FaTrash /> Delete
    </DropdownMenu.Item>
  );
};

Delete.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const CustomNodeMenu = ({ children }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton">
          <GoKebabHorizontal />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

CustomNodeMenu.propTypes = {
  children: PropTypes.node,
};

CustomNodeMenu.Delete = Delete;

export default CustomNodeMenu;
