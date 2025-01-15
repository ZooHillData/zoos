import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features/auth/")({
  component: RouteComponent,
  validateSearch: (search) => ({
    formId: search.formId as FormId,
  }),
});

import type { FormConfig } from "@zoos/react-form";

import { Form } from "@zoos/react-form";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  CardDescription,
} from "@zoos/shadcn";

import {
  signupConfig,
  loginConfig,
  forgotPasswordConfig,
  resetPasswordConfig,
  confirmOtpConfig,
} from "../../../features/auth/form-configs";

const tabs = [
  {
    value: "login",
    label: "Login",
    formConfig: loginConfig,
    submitButtonLabel: "Login",
  },
  {
    value: "signup",
    label: "Signup",
    formConfig: signupConfig,
    submitButtonLabel: "Signup",
  },
  {
    value: "confirm-otp",
    label: "Confirm OTP",
    formConfig: confirmOtpConfig,
    submitButtonLabel: "Confirm OTP",
  },
  {
    value: "forgot-password",
    label: "Forgot Password",
    formConfig: forgotPasswordConfig,
    submitButtonLabel: "Reset Password",
  },
  {
    value: "reset-password",
    label: "Reset Password",
    formConfig: resetPasswordConfig,
    submitButtonLabel: "Reset password",
  },
] as const;

type FormId = (typeof tabs)[number]["value"];

function RouteComponent() {
  const formId = Route.useSearch({ select: (search) => search.formId });
  const navigate = Route.useNavigate();

  return (
    <div className="h-screen w-screen py-36">
      <Tabs
        className="mx-auto w-fit"
        value={formId}
        onValueChange={(value) =>
          navigate({ search: { formId: value as FormId } })
        }
      >
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="mx-auto mt-16 max-w-[350px]"
          >
            <Card>
              <CardHeader className="flex w-full flex-col items-center justify-center text-center">
                <CardTitle className="text-2xl">{tab.label}</CardTitle>
                <div className="h-12 w-24">
                  <img
                    src="./favicon.svg"
                    className="h-full w-full object-cover"
                    alt="logo"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Form
                  // ! we're re-writing the form ;)
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  config={tab.formConfig as FormConfig<any, any>}
                  context={{}}
                  submitButtonLabel={tab.submitButtonLabel}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
