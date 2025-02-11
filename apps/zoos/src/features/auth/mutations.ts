import { createMutationOptions } from "@zoos/react-query";
import { getClient, getQueryKey } from "../../lib/supabase";

const login = createMutationOptions({
  mutationKey: getQueryKey(["login"]),
  mutationFn: async (credentials: { email: string; password: string }) => {
    const response = await getClient().auth.signInWithPassword(credentials);
    return response;
  },
  options: {
    onSuccess: ({ queryClient }) => {
      queryClient.invalidateQueries({ queryKey: getQueryKey() });
    },
  },
});

const logout = createMutationOptions({
  mutationKey: getQueryKey(["logout"]),
  mutationFn: async () => getClient().auth.signOut(),
  options: {
    onSuccess: ({ queryClient }) => {
      queryClient.invalidateQueries({ queryKey: getQueryKey() });
    },
  },
});

const signup = createMutationOptions({
  mutationKey: getQueryKey(["signup"]),
  mutationFn: async (credentials: { email: string; password: string }) =>
    getClient().auth.signUp(credentials),
  options: {
    onSuccess: ({ queryClient }) => {
      queryClient.invalidateQueries({ queryKey: getQueryKey() });
    },
  },
});

export { login, logout, signup };
