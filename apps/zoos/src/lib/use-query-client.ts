import { Route } from "../routes/__root";

const useQueryClient = () => Route.useRouteContext().queryClient;

export { useQueryClient };
