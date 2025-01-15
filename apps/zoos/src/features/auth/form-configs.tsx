import { Label } from "@zoos/shadcn";

import type { FormConfig } from "@zoos/react-form";
import { getFormConfig } from "@zoos/react-form";
import { toKebabCase } from "remeda";

const getSharedLayout = <Form extends object, Context = unknown>(): FormConfig<
  Form,
  Context
>["layout"] => ({
  rowContainerProps: { className: "py-2" },
  fieldContainerProps: { className: "space-y-1" },
  formContainerProps: { className: "space-y-4" },
  labelComponent:
    () =>
    ({ name }) => (
      <Label className="uppercase">
        {toKebabCase(name).split("-").join(" ")}
      </Label>
    ),
});

const loginData = {
  email: "",
  password: "",
};
const loginConfig = getFormConfig({
  defaultValues: loginData,
  context: {},
})({
  formOptions: {},
  fields: [
    { name: "email", type: "string" },
    { name: "password", type: "string" },
  ],
  layout: { ...getSharedLayout<typeof loginData, object>() },
});

const signupData = {
  email: "",
  password: "",
  confirmPassword: "",
};
const signupConfig = getFormConfig({
  defaultValues: signupData,
  context: {},
})({
  formOptions: {},
  fields: [
    { name: "email", type: "string" },
    { name: "password", type: "string" },
    { name: "confirmPassword", type: "string" },
  ],
  layout: { ...getSharedLayout<typeof signupData, object>() },
});

const resetPasswordData = {
  existingPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};
const resetPasswordConfig = getFormConfig({
  defaultValues: resetPasswordData,
  context: {},
})({
  formOptions: {},
  fields: [
    { name: "existingPassword", type: "string" },
    { name: "confirmNewPassword", type: "string" },
    { name: "newPassword", type: "string" },
  ],
  layout: { ...getSharedLayout<typeof resetPasswordData, object>() },
});

const forgotPasswordData = {
  email: "",
};
const forgotPasswordConfig = getFormConfig({
  defaultValues: forgotPasswordData,
  context: {},
})({
  formOptions: {},
  fields: [{ name: "email", type: "string" }],
  layout: { ...getSharedLayout<typeof forgotPasswordData, object>() },
});

const confirmOtpData = { otp: "" };
const confirmOtpConfig = getFormConfig({
  defaultValues: confirmOtpData,
  context: {},
})({
  formOptions: {},
  fields: [{ name: "otp", type: "string" }],
  layout: { ...getSharedLayout<typeof confirmOtpData, object>() },
});

export {
  loginConfig,
  signupConfig,
  resetPasswordConfig,
  forgotPasswordConfig,
  confirmOtpConfig,
};
