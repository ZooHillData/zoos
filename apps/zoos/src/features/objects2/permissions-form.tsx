import React from "react";
import { getOptions } from "@zoos/react-form";
import {
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  useReactiveState,
} from "@zoos/shadcn";

import { ComboboxCheckboxGroup } from "./combobox-checkbox-group";

type Permissions = Record<string, string[]>;

const PermissionsForm = (props: {
  permissions: Permissions;
  options: string[];
  onSubmit: (permissions: Permissions) => void;
}) => {
  const [type, setType] = React.useState("read");
  const [permissions, setPermissions] = useReactiveState(props.permissions);

  return (
    <Tabs value={type} onValueChange={(type) => setType(type)}>
      <TabsList>
        <TabsTrigger value="read">Read</TabsTrigger>
        <TabsTrigger value="write">Write</TabsTrigger>
        <TabsTrigger value="manage">Manage</TabsTrigger>
      </TabsList>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit(permissions);
        }}
      >
        <div className="p-2">
          <ComboboxCheckboxGroup
            options={getOptions({ values: props.options })}
            value={permissions[type]}
            onChange={(value) => {
              setPermissions((prev) => ({ ...prev, [type]: value }));
            }}
          />
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Tabs>
  );
};

export { PermissionsForm };
export type { Permissions };
