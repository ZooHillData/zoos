/**
 * Layout configuration data structure
 */

import React from "react";
import type { FieldName, FieldConfig } from "./form-config";

type Row<Form, Context> = {
  // Field distribution in the row, e.g.
  // ["street", "street", "city", "state"]
  fields: string[];
  // Props passed to the flex container around the row
  containerProps?: React.ComponentProps<"div">;
  // Component before row
  _before?: ({
    values,
    context,
    name,
  }: {
    values: Form;
    context: Context;
    name: FieldName<Form>;
  }) => React.ReactNode;
  // Component after row
  _after?: ({
    values,
    context,
    name,
  }: {
    values: Form;
    context: Context;
    name: FieldName<Form>;
  }) => React.ReactNode;
};

type Layout<Form, Context> = {
  minWidth?: number;
  rowContainerProps?: React.ComponentProps<"div">;
  fieldContainerProps?: React.ComponentProps<"div">;
  formContainerProps?: React.ComponentProps<"form">;
  labelComponent?: ({
    fieldConfig,
    values,
    context,
  }: {
    fieldConfig: FieldConfig<Form, Context>;
    values: Form;
    context: Context;
  }) => (props: { name: string }) => React.ReactNode;
  rows: Row<Form, Context>[];
};

export type { Layout, Row };
