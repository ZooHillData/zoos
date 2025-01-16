import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features/auth/")({
  component: RouteComponent,
  validateSearch: (search) => ({
    formId: (search.formId || "login") as FormId,
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
  cn,
} from "@zoos/shadcn";

import { ZooFavicon } from "../../../features/components";
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
    description: "Login in to access your custom experience",
    formConfig: loginConfig,
    submitButtonLabel: "Login",
  },
  {
    value: "signup",
    label: "Signup",
    description: "Welcome to our platform! Signup to get started",
    formConfig: signupConfig,
    submitButtonLabel: "Signup",
  },

  {
    value: "forgot-password",
    label: "Forgot Password",
    description:
      "Don't worry, it happens. Enter your email to reset your password",
    formConfig: forgotPasswordConfig,
    submitButtonLabel: "Reset Password",
  },
  {
    value: "reset-password",
    label: "Reset Password",
    description:
      "Choose a strong password and store it in your password manager ❤️",
    formConfig: resetPasswordConfig,
    submitButtonLabel: "Reset password",
  },
  {
    value: "confirm-otp",
    label: "Confirm Code",
    description: "Enter the 6-digit code sent to your email",
    formConfig: confirmOtpConfig,
    submitButtonLabel: "Confirm OTP",
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
            className={cn(
              "mx-auto mt-16 max-w-[350px]",
              tab.value === "confirm-otp" && "max-w-fit",
            )}
          >
            <Card>
              <CardHeader className="flex w-full flex-col items-center justify-center space-y-0 text-center">
                <div className="flex h-10 w-16 items-center">
                  <ZooFavicon />
                </div>
                <CardTitle className="text-2xl">{tab.label}</CardTitle>
                {tab.description && (
                  <CardDescription className="text-pretty">
                    {tab.description}
                  </CardDescription>
                )}
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
