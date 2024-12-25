import { Input, Textarea } from "@zoos/ui-shad";
import { Select } from "../components/select";
import { CheckboxWithLabel } from "../components/checkbox-with-label";
import { CheckboxGroup } from "../components/checkbox-group";

const getFieldComponents = () => ({
  string: Input,
  "string-long": Textarea,
  "select-single": Select,
  "select-multi": CheckboxGroup,
  boolean: CheckboxWithLabel,
});

export { getFieldComponents };
