import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features/auth/")({
  component: RouteComponent,
  validateSearch: (search) => ({
    formId: (search.formId || "login") as FormId,
  }),
});

import type { QueryClient } from "@tanstack/react-query";
import type { FormConfig } from "@zoos/react-form";

import { useMutation } from "@tanstack/react-query";
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
import { forms, mutations } from "../../../features/auth";

const tabs = {
  login: {
    value: "login",
    label: "Login",
    description: "Login in to access your custom experience",
    formConfig: forms.login,
    submitButtonLabel: "Login",
    useMutation: (queryClient: QueryClient) =>
      useMutation(mutations.login({ queryClient })),
  },
  signup: {
    value: "signup",
    label: "Signup",
    description: "Welcome to our platform! Signup to get started",
    formConfig: forms.signup,
    submitButtonLabel: "Signup",
    useMutation: (queryClient: QueryClient) =>
      useMutation(mutations.signup({ queryClient })),
  },

  forgotPassword: {
    value: "forgotPassword",
    label: "Forgot Password",
    description:
      "Don't worry, it happens. Enter your email to reset your password",
    formConfig: forms.forgotPassword,
    submitButtonLabel: "Reset Password",
    useMutation: (queryClient: QueryClient) =>
      useMutation(mutations.signup({ queryClient })),
  },
  resetPassword: {
    value: "resetPassword",
    label: "Reset Password",
    description:
      "Choose a strong password and store it in your password manager ❤️",
    formConfig: forms.resetPassword,
    submitButtonLabel: "Reset password",
    useMutation: (queryClient: QueryClient) =>
      useMutation(mutations.signup({ queryClient })),
  },
  confirmOtp: {
    value: "confirmOtp",
    label: "Confirm Code",
    description: "Enter the 6-digit code sent to your email",
    formConfig: forms.confirmOtp,
    submitButtonLabel: "Confirm OTP",
    useMutation: (queryClient: QueryClient) =>
      useMutation(mutations.signup({ queryClient })),
  },
} as const;

const useAuthMutations = () => {
  const { queryClient } = Route.useRouteContext();
  return {
    login: useMutation(
      mutations.login({
        queryClient,
        // Optional custom onSuccess that will run
        // after standard query invalidations
        options: {
          // onSuccess: () =>
          //   window.alert("yea, we're doing custom stuff after login!"),
        },
      }),
    ),
    logout: useMutation(mutations.logout({ queryClient })),
    signup: useMutation(mutations.signup({ queryClient })),
    confirmOtp: useMutation(mutations.login({ queryClient })),
    forgotPassword: useMutation(mutations.login({ queryClient })),
    resetPassword: useMutation(mutations.login({ queryClient })),
  };
};

type FormId = (typeof tabs)[keyof typeof tabs]["value"];

function RouteComponent() {
  const formId = Route.useSearch({ select: (search) => search.formId });
  const navigate = Route.useNavigate();

  // Pull the mutation function and form config
  const mutations = useAuthMutations();
  const { mutate } = mutations[formId];
  const { formConfig } = tabs[formId];

  return (
    <div className="my-[10%] h-full w-full">
      <Tabs
        className="mx-auto w-fit"
        value={formId}
        onValueChange={(value) =>
          navigate({ search: { formId: value as FormId } })
        }
      >
        <TabsList>
          {Object.values(tabs).map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.values(tabs).map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className={cn(
              "mx-auto mt-16 max-w-[350px]",
              tab.value === "confirmOtp" && "max-w-fit",
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
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  config={formConfig as FormConfig<any, any>}
                  context={{}}
                  submitButtonLabel={tab.submitButtonLabel}
                  onSubmit={({ value }) => mutate(value)}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
