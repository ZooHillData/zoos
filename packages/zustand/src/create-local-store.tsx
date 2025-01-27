import React from "react";

import { createStore, useStore as useZoosStore } from "./create-store";

type Context<Store> = ReturnType<typeof createStore<Store>> | undefined;

function createContext<Store>() {
  return React.createContext<Context<Store>>(undefined);
}

function createProvider<Store, StoreProps>({
  createParams,
  context,
}: {
  createParams: Omit<
    Parameters<typeof createStore<Store, StoreProps>>[0],
    "storeProps"
  >;
  context: React.Context<Context<Store>>;
}) {
  return function Provider({
    children,
    storeProps,
  }: {
    children: React.ReactNode;
    storeProps?: StoreProps;
  }) {
    const store = createStore<Store, StoreProps>({
      ...createParams,
      storeProps,
    });
    return <context.Provider value={store}>{children}</context.Provider>;
  };
}

function createUseStore<Store>({
  context,
}: {
  context: React.Context<Context<Store>>;
}) {
  return function useStore<T>(selector: (state: Store) => T): T {
    const store = React.useContext(context);
    if (!store) {
      throw new Error("Missing Provider");
    }
    return useZoosStore(store, selector);
  };
}

function createLocalStore<Store, StoreProps>(
  createParams: Omit<
    Parameters<typeof createStore<Store, StoreProps>>[0],
    "storeProps"
  >,
) {
  const context = createContext<Store>();
  return {
    Provider: createProvider<Store, StoreProps>({ createParams, context }),
    useStore: createUseStore({ context }),
  };
}

export { createLocalStore };
