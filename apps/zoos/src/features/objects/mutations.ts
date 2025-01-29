import type { ObjectInsert, Object } from "./types";

import { createMutationOptions } from "@zoos/react-query";
import { getQueryKey, getClient } from "../../lib/supabase";

import { keyFactory } from "./queries";
import { parseObject } from "./db/parse-objects";

const deleteObject = createMutationOptions({
  mutationKey: getQueryKey(["delete-object"]),
  mutationFn: async (variables: { id: number }) => {
    const { data } = await getClient()
      .schema("zoos")
      .from("objects")
      .delete()
      .eq("id", variables.id)
      .select();
    return data?.map(parseObject);
  },

  options: {
    onSuccess: ({ queryClient }) => {
      queryClient.invalidateQueries({ queryKey: keyFactory.objects.all });
    },
  },
});

const updateObject = createMutationOptions({
  mutationKey: getQueryKey(["update-object"]),
  mutationFn: async (variables: {
    object: { id: number } & Partial<Object>;
    authedEmail: string;
  }) => {
    const { id, objects_folders, objects_history, ...objectForInsert } =
      variables.object;
    const { data } = await getClient()
      .schema("zoos")
      .from("objects")
      .update({
        ...objectForInsert,
        // When update an object, update the "last_updated" columns
        last_updated_email: variables.authedEmail,
        last_updated_at: new Date(),
      })
      .eq("id", id)
      .select();
    return data?.map(parseObject);
  },
  options: {
    onSuccess: ({ queryClient }) => {
      queryClient.invalidateQueries({ queryKey: keyFactory.objects.all });
    },
  },
});

const addObject = createMutationOptions({
  mutationKey: getQueryKey(["add-object"]),
  mutationFn: async (variables: {
    object: Omit<ObjectInsert, "owner_email" | "last_updated_email">;
    authedEmail: string;
  }) => {
    const { data } = await getClient()
      .schema("zoos")
      .from("objects")
      .insert({
        ...variables.object,
        owner_email: variables.authedEmail,
        last_updated_email: variables.authedEmail,
      })
      .select();

    return data?.map(parseObject);
  },
  options: {
    onSuccess: ({ queryClient }) => {
      queryClient.invalidateQueries({ queryKey: keyFactory.objects.all });
    },
  },
});

export { deleteObject, updateObject, addObject };
