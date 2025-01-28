import type { Object } from "./db-interface";

import { createMutationOptions } from "@zoos/react-query";
import { getQueryKey, getClient } from "../../lib/supabase";
import { keyFactory } from "./queries";

const deleteObject = createMutationOptions({
  mutationKey: getQueryKey(["delete-object"]),
  mutationFn: async (variables: { id: number }) => {
    const { error, data } = await getClient()
      .schema("zoos")
      .from("objects")
      .delete()
      .eq("id", variables.id)
      .select();
    return data as Object[];
  },

  options: {
    onSuccess: ({ queryClient }) => {
      queryClient.invalidateQueries({ queryKey: keyFactory.objects.all });
    },
  },
});

const updateObject = createMutationOptions({
  mutationKey: getQueryKey(["update-object"]),
  mutationFn: async (variables: Partial<Object> & { id: number }) => {
    const { id, ...rest } = variables;
    const { data } = await getClient()
      .schema("zoos")
      .from("objects")
      .update(rest)
      .eq("id", id)
      .select();
    return data as Object[];
  },
  options: {
    onSuccess: ({ queryClient }) => {
      queryClient.invalidateQueries({ queryKey: keyFactory.objects.all });
    },
  },
});

export { deleteObject, updateObject };
