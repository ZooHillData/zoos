import { unique } from "remeda";

import type { FieldName, Layout, LayoutData, Row } from "../types";

/**
 * Helper function
 *
 * Converts a row from the layout configuration, e.g.
 * ["street", "street", "city", "state"]
 *
 * into the container props needed to render the form:
 * {
 *   props: {},
 *   fields: {
 *      street: { style: { width: "50%" } },
 *      city: { style: { width: "25%" } },
 *      state: { style: { width: "25%" } },
 *   }
 * }
 *
 */
const getRowContainerProps = <Form, Context>(row: Row<Form, Context>) => {
  // Unique fields in row and total number of columns
  const fields = unique(row.fields);
  const numColumns = row.fields.length;

  // Map fields to their container props, doing transformations
  // described above
  const fieldContainerPropsEntries = fields.map((field) => {
    const numOccurrences = row.fields.filter((f) => f === field).length;
    const widthPct = (numOccurrences / numColumns) * 100;
    return [field, { style: { width: `${Math.floor(widthPct)}%` } }];
  });
  const fieldContainerProps = Object.fromEntries(fieldContainerPropsEntries);

  return {
    props: row.containerProps || {},
    fields: fieldContainerProps as Record<
      FieldName<Form>,
      React.ComponentProps<"div">
    >,
  };
};

/** Maps the layout configuration into layout data for rendering */
const getLayoutData = <Form, Context>(params: {
  layout: Layout<Form, Context>;
}): LayoutData<Form> => {
  const rowLayoutData = params.layout.rows.map((row) =>
    getRowContainerProps(row),
  );

  return {
    rows: rowLayoutData,
  };
};

/** Takes field list and returns layout data with every field on a different row */
const getDefaultLayoutData = (params: { fields: string[] }) => {
  const rowLayoutData = params.fields.map((field) => ({
    props: {},
    fields: {
      [field]: {},
    },
  }));

  return {
    rows: rowLayoutData,
  };
};

export { getLayoutData, getDefaultLayoutData };
