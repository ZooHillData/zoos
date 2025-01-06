/**
 * This is the LayoutData that is used to render the form layout. It is
 * computed in `../lib/get-layout-data` from the layout configuration
 * (types defined in `./layout-config`)
 */

import { type FieldName } from "./form-config";

type RowContainer<Form> = {
  props?: React.ComponentProps<"div">;
  // Maps fields in the row to their props
  fields: Record<FieldName<Form>, React.ComponentProps<"div">>;
};

type LayoutData<Form> = {
  rows: RowContainer<Form>[];
};

export { type LayoutData };
