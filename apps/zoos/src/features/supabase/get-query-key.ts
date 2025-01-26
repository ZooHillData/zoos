import type { QueryKey } from "@tanstack/react-query";

// Anywhere you query supabase, use this query key so that
// the queries will be invalidated properly in Auth
// QUERY_KEY so queries can be invalidated
// on auth changes
const QUERY_KEY = "supabase";

// Helper to get the full query key
const getQueryKey = (key?: QueryKey) => [QUERY_KEY, ...(key || [])];

export { getQueryKey, QUERY_KEY };
