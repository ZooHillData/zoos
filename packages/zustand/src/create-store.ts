import {
  createStore as createZustandStore,
  useStore as useZustandStore,
  type StateCreator,
} from "zustand";
import { useShallow } from "zustand/react/shallow";
import {
  persist as persistMiddleware,
  type PersistOptions as ZustandPersistOptions,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import deepmerge from "deepmerge";

type Creator<Store, StoreProps = undefined> = (
  props?: StoreProps,
) => StateCreator<Store, [["zustand/immer", never]]>;

interface PersistOptions<Store>
  extends Omit<ZustandPersistOptions<Store>, "partialize"> {
  partialize?: (store: Store) => Partial<Store>;
}

/**
 *
 * @param creator Store creator function (with immer)
 * @param persist Options for persisting the store (optional)
 * @returns Zustand store with Immer and (optionally) persist middleware
 */
function createStore<Store, StoreProps = undefined>({
  creator,
  storeProps,
  persist,
}: {
  creator: Creator<Store, StoreProps>;
  persist?: PersistOptions<Store>;
  storeProps?: StoreProps;
}) {
  if (persist) {
    return createPersistStore(creator(storeProps), persist);
  }

  return createZustandStore(immer(creator(storeProps)));
}

const defaultMerge = <Store>(persistedState: unknown, currentState: Store) =>
  deepmerge<Store>(persistedState as Store, currentState);

/**
 *
 * @param creator Store creator function (with immer)
 * @param persist Options for persisting the store (optional)
 * @returns Zustand store API with immer and persist middleware
 */
function createPersistStore<Store>(
  creator: ReturnType<Creator<Store>>,
  persist: PersistOptions<Store>,
) {
  const withImmer = immer(creator);
  const merge = persist.merge || defaultMerge;
  return createZustandStore(
    persistMiddleware<Store, [], [["zustand/immer", never]]>(withImmer, {
      ...persist,
      merge,
    } as ZustandPersistOptions<Store>),
  );
}

/**
 *
 * @param store Store (created with createStore)
 * @param selector
 * @returns
 */
function useStore<Store, T>(
  store: ReturnType<typeof createStore<Store>>,
  selector: (store: Store) => T,
): T {
  return useZustandStore(store, useShallow(selector));
}

export { createStore, useStore, type Creator };
