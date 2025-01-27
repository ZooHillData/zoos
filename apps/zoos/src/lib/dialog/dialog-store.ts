import { createStore, useStore, type Creator } from "@zoos/zustand";

type State = {
  content?: React.ReactNode;
};

type Events = {
  open: (params: { content: React.ReactElement }) => void;
  close: () => void;
};

type Store = { state: State; events: Events };

const creator: Creator<Store> = () => (set) => ({
  state: {},
  events: {
    open: ({ content }) => {
      set(({ state }) => {
        state.content = content;
      });
    },
    close: () => {
      set(({ state }) => {
        state.content = undefined;
      });
    },
  },
});

const dialogStore = createStore({ creator });

///
// Main Interface
///

// const useDialogStore = <T>(selector: (state: Store) => T): T => {
//   return useStore(dialogStore, selector);
// };

const useDialog = () => {
  const content = useStore(dialogStore, ({ state }) => state.content);
  return { content, isOpen: !!content };
};

const { open: openDialog, close: closeDialog } = dialogStore.getState().events;

export { useDialog, openDialog, closeDialog };
