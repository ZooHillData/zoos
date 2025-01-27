import React from "react";
import { getOptions } from "@zoos/react-form";
import { Button, Tabs, TabsList, TabsTrigger } from "@zoos/shadcn";

import { ComboboxCheckboxGroup } from "./combobox-checkbox-group";

type Permissions = Record<string, string[]>;

const PermissionsForm = (props: {
  permissions: Permissions;
  options: string[];
}) => {
  const [type, setType] = React.useState("read");

  return (
    <Tabs value={type} onValueChange={(type) => setType(type)}>
      <TabsList>
        <TabsTrigger value="read">Read</TabsTrigger>
        <TabsTrigger value="write">Write</TabsTrigger>
        <TabsTrigger value="manage">Manage</TabsTrigger>
      </TabsList>
      <div className="p-2">
        <ComboboxCheckboxGroup
          options={getOptions({ values: props.options })}
          value={props.permissions[type]}
          onChange={(value) => {
            console.log(value);
          }}
        />
      </div>
      <Button className="w-full">Save</Button>
    </Tabs>
  );
};

export { PermissionsForm };
