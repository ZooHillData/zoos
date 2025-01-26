import { toKebabCase } from "remeda";

import type { FormConfig } from "@zoos/react-form";

import { Label } from "@zoos/shadcn";
import { getFormConfig } from "@zoos/react-form";

/**
 *
 * @param id - an id of any type (e.g. camel case, snake case, etc.)
 * @returns the id converted to title case (e.g. "camelCase" -> "Camel Case")
 */
const idToTitleCase = (id: string) =>
  toKebabCase(id)
    .split("-")
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");

/**
 *
 * @returns Shared layout used by all auth form configs below
 * (some may override this layout)
 */
const getSharedLayout = <Form extends object, Context = unknown>(): FormConfig<
  Form,
  Context
>["layout"] => ({
  rowContainerProps: { className: "py-2" },
  fieldContainerProps: { className: "space-y-1" },
  formContainerProps: { className: "space-y-4" },
  labelComponent:
    () =>
    ({ name }) => <Label>{idToTitleCase(name)}</Label>,
});

/**
 * * LOGIN FORM
 */

const loginData = {
  email: "",
  password: "",
};
const login = getFormConfig({
  defaultValues: loginData,
  context: {},
})({
  formOptions: {},
  fields: [
    { name: "email", type: "string" },
    { name: "password", type: "string.password" },
  ],
  layout: { ...getSharedLayout<typeof loginData, object>() },
});

/**
 * * SIGNUP FORM
 */

const signupData = {
  email: "",
  password: "",
  confirmPassword: "",
};
const signup = getFormConfig({
  defaultValues: signupData,
  context: {},
})({
  formOptions: {},
  fields: [
    { name: "email", type: "string" },
    { name: "password", type: "string.password" },
    { name: "confirmPassword", type: "string.password" },
  ],
  layout: { ...getSharedLayout<typeof signupData, object>() },
});

/**
 * * RESET PASSWORD FORM
 */

const resetPasswordData = {
  existingPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};
const resetPassword = getFormConfig({
  defaultValues: resetPasswordData,
  context: {},
})({
  formOptions: {},
  fields: [
    { name: "existingPassword", type: "string.password" },
    { name: "confirmNewPassword", type: "string.password" },
    { name: "newPassword", type: "string.password" },
  ],
  layout: { ...getSharedLayout<typeof resetPasswordData, object>() },
});

/**
 * * FORGOT PASSWORD FORM
 */

const forgotPasswordData = {
  email: "",
};
const forgotPassword = getFormConfig({
  defaultValues: forgotPasswordData,
  context: {},
})({
  formOptions: {},
  fields: [{ name: "email", type: "string" }],
  layout: { ...getSharedLayout<typeof forgotPasswordData, object>() },
});

/**
 * * CONFIRM OTP FORM
 */

const confirmOtpData = { otp: "" };
const confirmOtp = getFormConfig({
  defaultValues: confirmOtpData,
  context: {},
})({
  formOptions: {},
  fields: [{ name: "otp", type: "string.otp" }],
  layout: {
    ...getSharedLayout<typeof confirmOtpData, object>(),
    labelComponent: (data) => (props) => "",
    fieldContainerProps: { className: "w-full flex justify-center" },
  },
});

export { login, signup, resetPassword, forgotPassword, confirmOtp };
