import { Form, getFormConfig } from "@zoos/react-form";

const formConfig = getFormConfig({
  defaultValues: {
    permissions: [] as string[],
  },
  context: { emails: [] as string[] },
})({
  formOptions: {},
  fields: [
    {
      name: "permissions",
      type: "select-multi",
      options: ({ context }) => context.emails,
    },
  ],
  layout: {
    rowContainerProps: { className: "py-3" },
    fieldContainerProps: { className: "space-y-2" },
    formContainerProps: { className: "space-y-4 px-3 py-2" },
    rows: [{ fields: ["permissions"] }],
  },
});

const emails = [
  "art@zoohilldata.com",
  "bk@zoohilldata.com",
  "borst@zoohilldata.com",
  "bryce@zoohilldata.com",
];

const PermissionsForm = () => {
  return <Form context={{ emails }} config={formConfig} />;
};

export { PermissionsForm };
