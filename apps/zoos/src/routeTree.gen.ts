/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ShadcnRouteImport } from './routes/shadcn/route'
import { Route as ReactTableRouteImport } from './routes/react-table/route'
import { Route as ReactQueryRouteImport } from './routes/react-query/route'
import { Route as ReactFormRouteImport } from './routes/react-form/route'
import { Route as IndexImport } from './routes/index'
import { Route as ShadcnUseReactiveStateImport } from './routes/shadcn/use-reactive-state'
import { Route as ShadcnUseDebounceImport } from './routes/shadcn/use-debounce'
import { Route as ShadcnSelectImport } from './routes/shadcn/select'
import { Route as ShadcnProposeClassNameOverrideImport } from './routes/shadcn/propose-class-name-override'
import { Route as ShadcnContextMenuImport } from './routes/shadcn/context-menu'
import { Route as ShadcnCheckboxImport } from './routes/shadcn/checkbox'
import { Route as ShadcnButtonImport } from './routes/shadcn/button'
import { Route as ReactTableStandardImport } from './routes/react-table/standard'
import { Route as ReactQueryUseQueryImport } from './routes/react-query/use-query'
import { Route as ReactQueryUseMutationImport } from './routes/react-query/use-mutation'
import { Route as ReactFormWithZoosFormImport } from './routes/react-form/with-zoos-form'
import { Route as ReactFormStandardReactFormImport } from './routes/react-form/standard-react-form'
import { Route as ReactFormSelectImport } from './routes/react-form/select'
import { Route as ReactFormInputDebounceImport } from './routes/react-form/input-debounce'
import { Route as ReactFormComboboxCheckboxGroupImport } from './routes/react-form/combobox-checkbox-group'
import { Route as ReactFormCheckboxWithLabelImport } from './routes/react-form/checkbox-with-label'
import { Route as ReactFormCheckboxGroupImport } from './routes/react-form/checkbox-group'

// Create/Update Routes

const ShadcnRouteRoute = ShadcnRouteImport.update({
  id: '/shadcn',
  path: '/shadcn',
  getParentRoute: () => rootRoute,
} as any)

const ReactTableRouteRoute = ReactTableRouteImport.update({
  id: '/react-table',
  path: '/react-table',
  getParentRoute: () => rootRoute,
} as any)

const ReactQueryRouteRoute = ReactQueryRouteImport.update({
  id: '/react-query',
  path: '/react-query',
  getParentRoute: () => rootRoute,
} as any)

const ReactFormRouteRoute = ReactFormRouteImport.update({
  id: '/react-form',
  path: '/react-form',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ShadcnUseReactiveStateRoute = ShadcnUseReactiveStateImport.update({
  id: '/use-reactive-state',
  path: '/use-reactive-state',
  getParentRoute: () => ShadcnRouteRoute,
} as any)

const ShadcnUseDebounceRoute = ShadcnUseDebounceImport.update({
  id: '/use-debounce',
  path: '/use-debounce',
  getParentRoute: () => ShadcnRouteRoute,
} as any)

const ShadcnSelectRoute = ShadcnSelectImport.update({
  id: '/select',
  path: '/select',
  getParentRoute: () => ShadcnRouteRoute,
} as any)

const ShadcnProposeClassNameOverrideRoute =
  ShadcnProposeClassNameOverrideImport.update({
    id: '/propose-class-name-override',
    path: '/propose-class-name-override',
    getParentRoute: () => ShadcnRouteRoute,
  } as any)

const ShadcnContextMenuRoute = ShadcnContextMenuImport.update({
  id: '/context-menu',
  path: '/context-menu',
  getParentRoute: () => ShadcnRouteRoute,
} as any)

const ShadcnCheckboxRoute = ShadcnCheckboxImport.update({
  id: '/checkbox',
  path: '/checkbox',
  getParentRoute: () => ShadcnRouteRoute,
} as any)

const ShadcnButtonRoute = ShadcnButtonImport.update({
  id: '/button',
  path: '/button',
  getParentRoute: () => ShadcnRouteRoute,
} as any)

const ReactTableStandardRoute = ReactTableStandardImport.update({
  id: '/standard',
  path: '/standard',
  getParentRoute: () => ReactTableRouteRoute,
} as any)

const ReactQueryUseQueryRoute = ReactQueryUseQueryImport.update({
  id: '/use-query',
  path: '/use-query',
  getParentRoute: () => ReactQueryRouteRoute,
} as any)

const ReactQueryUseMutationRoute = ReactQueryUseMutationImport.update({
  id: '/use-mutation',
  path: '/use-mutation',
  getParentRoute: () => ReactQueryRouteRoute,
} as any)

const ReactFormWithZoosFormRoute = ReactFormWithZoosFormImport.update({
  id: '/with-zoos-form',
  path: '/with-zoos-form',
  getParentRoute: () => ReactFormRouteRoute,
} as any)

const ReactFormStandardReactFormRoute = ReactFormStandardReactFormImport.update(
  {
    id: '/standard-react-form',
    path: '/standard-react-form',
    getParentRoute: () => ReactFormRouteRoute,
  } as any,
)

const ReactFormSelectRoute = ReactFormSelectImport.update({
  id: '/select',
  path: '/select',
  getParentRoute: () => ReactFormRouteRoute,
} as any)

const ReactFormInputDebounceRoute = ReactFormInputDebounceImport.update({
  id: '/input-debounce',
  path: '/input-debounce',
  getParentRoute: () => ReactFormRouteRoute,
} as any)

const ReactFormComboboxCheckboxGroupRoute =
  ReactFormComboboxCheckboxGroupImport.update({
    id: '/combobox-checkbox-group',
    path: '/combobox-checkbox-group',
    getParentRoute: () => ReactFormRouteRoute,
  } as any)

const ReactFormCheckboxWithLabelRoute = ReactFormCheckboxWithLabelImport.update(
  {
    id: '/checkbox-with-label',
    path: '/checkbox-with-label',
    getParentRoute: () => ReactFormRouteRoute,
  } as any,
)

const ReactFormCheckboxGroupRoute = ReactFormCheckboxGroupImport.update({
  id: '/checkbox-group',
  path: '/checkbox-group',
  getParentRoute: () => ReactFormRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/react-form': {
      id: '/react-form'
      path: '/react-form'
      fullPath: '/react-form'
      preLoaderRoute: typeof ReactFormRouteImport
      parentRoute: typeof rootRoute
    }
    '/react-query': {
      id: '/react-query'
      path: '/react-query'
      fullPath: '/react-query'
      preLoaderRoute: typeof ReactQueryRouteImport
      parentRoute: typeof rootRoute
    }
    '/react-table': {
      id: '/react-table'
      path: '/react-table'
      fullPath: '/react-table'
      preLoaderRoute: typeof ReactTableRouteImport
      parentRoute: typeof rootRoute
    }
    '/shadcn': {
      id: '/shadcn'
      path: '/shadcn'
      fullPath: '/shadcn'
      preLoaderRoute: typeof ShadcnRouteImport
      parentRoute: typeof rootRoute
    }
    '/react-form/checkbox-group': {
      id: '/react-form/checkbox-group'
      path: '/checkbox-group'
      fullPath: '/react-form/checkbox-group'
      preLoaderRoute: typeof ReactFormCheckboxGroupImport
      parentRoute: typeof ReactFormRouteImport
    }
    '/react-form/checkbox-with-label': {
      id: '/react-form/checkbox-with-label'
      path: '/checkbox-with-label'
      fullPath: '/react-form/checkbox-with-label'
      preLoaderRoute: typeof ReactFormCheckboxWithLabelImport
      parentRoute: typeof ReactFormRouteImport
    }
    '/react-form/combobox-checkbox-group': {
      id: '/react-form/combobox-checkbox-group'
      path: '/combobox-checkbox-group'
      fullPath: '/react-form/combobox-checkbox-group'
      preLoaderRoute: typeof ReactFormComboboxCheckboxGroupImport
      parentRoute: typeof ReactFormRouteImport
    }
    '/react-form/input-debounce': {
      id: '/react-form/input-debounce'
      path: '/input-debounce'
      fullPath: '/react-form/input-debounce'
      preLoaderRoute: typeof ReactFormInputDebounceImport
      parentRoute: typeof ReactFormRouteImport
    }
    '/react-form/select': {
      id: '/react-form/select'
      path: '/select'
      fullPath: '/react-form/select'
      preLoaderRoute: typeof ReactFormSelectImport
      parentRoute: typeof ReactFormRouteImport
    }
    '/react-form/standard-react-form': {
      id: '/react-form/standard-react-form'
      path: '/standard-react-form'
      fullPath: '/react-form/standard-react-form'
      preLoaderRoute: typeof ReactFormStandardReactFormImport
      parentRoute: typeof ReactFormRouteImport
    }
    '/react-form/with-zoos-form': {
      id: '/react-form/with-zoos-form'
      path: '/with-zoos-form'
      fullPath: '/react-form/with-zoos-form'
      preLoaderRoute: typeof ReactFormWithZoosFormImport
      parentRoute: typeof ReactFormRouteImport
    }
    '/react-query/use-mutation': {
      id: '/react-query/use-mutation'
      path: '/use-mutation'
      fullPath: '/react-query/use-mutation'
      preLoaderRoute: typeof ReactQueryUseMutationImport
      parentRoute: typeof ReactQueryRouteImport
    }
    '/react-query/use-query': {
      id: '/react-query/use-query'
      path: '/use-query'
      fullPath: '/react-query/use-query'
      preLoaderRoute: typeof ReactQueryUseQueryImport
      parentRoute: typeof ReactQueryRouteImport
    }
    '/react-table/standard': {
      id: '/react-table/standard'
      path: '/standard'
      fullPath: '/react-table/standard'
      preLoaderRoute: typeof ReactTableStandardImport
      parentRoute: typeof ReactTableRouteImport
    }
    '/shadcn/button': {
      id: '/shadcn/button'
      path: '/button'
      fullPath: '/shadcn/button'
      preLoaderRoute: typeof ShadcnButtonImport
      parentRoute: typeof ShadcnRouteImport
    }
    '/shadcn/checkbox': {
      id: '/shadcn/checkbox'
      path: '/checkbox'
      fullPath: '/shadcn/checkbox'
      preLoaderRoute: typeof ShadcnCheckboxImport
      parentRoute: typeof ShadcnRouteImport
    }
    '/shadcn/context-menu': {
      id: '/shadcn/context-menu'
      path: '/context-menu'
      fullPath: '/shadcn/context-menu'
      preLoaderRoute: typeof ShadcnContextMenuImport
      parentRoute: typeof ShadcnRouteImport
    }
    '/shadcn/propose-class-name-override': {
      id: '/shadcn/propose-class-name-override'
      path: '/propose-class-name-override'
      fullPath: '/shadcn/propose-class-name-override'
      preLoaderRoute: typeof ShadcnProposeClassNameOverrideImport
      parentRoute: typeof ShadcnRouteImport
    }
    '/shadcn/select': {
      id: '/shadcn/select'
      path: '/select'
      fullPath: '/shadcn/select'
      preLoaderRoute: typeof ShadcnSelectImport
      parentRoute: typeof ShadcnRouteImport
    }
    '/shadcn/use-debounce': {
      id: '/shadcn/use-debounce'
      path: '/use-debounce'
      fullPath: '/shadcn/use-debounce'
      preLoaderRoute: typeof ShadcnUseDebounceImport
      parentRoute: typeof ShadcnRouteImport
    }
    '/shadcn/use-reactive-state': {
      id: '/shadcn/use-reactive-state'
      path: '/use-reactive-state'
      fullPath: '/shadcn/use-reactive-state'
      preLoaderRoute: typeof ShadcnUseReactiveStateImport
      parentRoute: typeof ShadcnRouteImport
    }
  }
}

// Create and export the route tree

interface ReactFormRouteRouteChildren {
  ReactFormCheckboxGroupRoute: typeof ReactFormCheckboxGroupRoute
  ReactFormCheckboxWithLabelRoute: typeof ReactFormCheckboxWithLabelRoute
  ReactFormComboboxCheckboxGroupRoute: typeof ReactFormComboboxCheckboxGroupRoute
  ReactFormInputDebounceRoute: typeof ReactFormInputDebounceRoute
  ReactFormSelectRoute: typeof ReactFormSelectRoute
  ReactFormStandardReactFormRoute: typeof ReactFormStandardReactFormRoute
  ReactFormWithZoosFormRoute: typeof ReactFormWithZoosFormRoute
}

const ReactFormRouteRouteChildren: ReactFormRouteRouteChildren = {
  ReactFormCheckboxGroupRoute: ReactFormCheckboxGroupRoute,
  ReactFormCheckboxWithLabelRoute: ReactFormCheckboxWithLabelRoute,
  ReactFormComboboxCheckboxGroupRoute: ReactFormComboboxCheckboxGroupRoute,
  ReactFormInputDebounceRoute: ReactFormInputDebounceRoute,
  ReactFormSelectRoute: ReactFormSelectRoute,
  ReactFormStandardReactFormRoute: ReactFormStandardReactFormRoute,
  ReactFormWithZoosFormRoute: ReactFormWithZoosFormRoute,
}

const ReactFormRouteRouteWithChildren = ReactFormRouteRoute._addFileChildren(
  ReactFormRouteRouteChildren,
)

interface ReactQueryRouteRouteChildren {
  ReactQueryUseMutationRoute: typeof ReactQueryUseMutationRoute
  ReactQueryUseQueryRoute: typeof ReactQueryUseQueryRoute
}

const ReactQueryRouteRouteChildren: ReactQueryRouteRouteChildren = {
  ReactQueryUseMutationRoute: ReactQueryUseMutationRoute,
  ReactQueryUseQueryRoute: ReactQueryUseQueryRoute,
}

const ReactQueryRouteRouteWithChildren = ReactQueryRouteRoute._addFileChildren(
  ReactQueryRouteRouteChildren,
)

interface ReactTableRouteRouteChildren {
  ReactTableStandardRoute: typeof ReactTableStandardRoute
}

const ReactTableRouteRouteChildren: ReactTableRouteRouteChildren = {
  ReactTableStandardRoute: ReactTableStandardRoute,
}

const ReactTableRouteRouteWithChildren = ReactTableRouteRoute._addFileChildren(
  ReactTableRouteRouteChildren,
)

interface ShadcnRouteRouteChildren {
  ShadcnButtonRoute: typeof ShadcnButtonRoute
  ShadcnCheckboxRoute: typeof ShadcnCheckboxRoute
  ShadcnContextMenuRoute: typeof ShadcnContextMenuRoute
  ShadcnProposeClassNameOverrideRoute: typeof ShadcnProposeClassNameOverrideRoute
  ShadcnSelectRoute: typeof ShadcnSelectRoute
  ShadcnUseDebounceRoute: typeof ShadcnUseDebounceRoute
  ShadcnUseReactiveStateRoute: typeof ShadcnUseReactiveStateRoute
}

const ShadcnRouteRouteChildren: ShadcnRouteRouteChildren = {
  ShadcnButtonRoute: ShadcnButtonRoute,
  ShadcnCheckboxRoute: ShadcnCheckboxRoute,
  ShadcnContextMenuRoute: ShadcnContextMenuRoute,
  ShadcnProposeClassNameOverrideRoute: ShadcnProposeClassNameOverrideRoute,
  ShadcnSelectRoute: ShadcnSelectRoute,
  ShadcnUseDebounceRoute: ShadcnUseDebounceRoute,
  ShadcnUseReactiveStateRoute: ShadcnUseReactiveStateRoute,
}

const ShadcnRouteRouteWithChildren = ShadcnRouteRoute._addFileChildren(
  ShadcnRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/react-form': typeof ReactFormRouteRouteWithChildren
  '/react-query': typeof ReactQueryRouteRouteWithChildren
  '/react-table': typeof ReactTableRouteRouteWithChildren
  '/shadcn': typeof ShadcnRouteRouteWithChildren
  '/react-form/checkbox-group': typeof ReactFormCheckboxGroupRoute
  '/react-form/checkbox-with-label': typeof ReactFormCheckboxWithLabelRoute
  '/react-form/combobox-checkbox-group': typeof ReactFormComboboxCheckboxGroupRoute
  '/react-form/input-debounce': typeof ReactFormInputDebounceRoute
  '/react-form/select': typeof ReactFormSelectRoute
  '/react-form/standard-react-form': typeof ReactFormStandardReactFormRoute
  '/react-form/with-zoos-form': typeof ReactFormWithZoosFormRoute
  '/react-query/use-mutation': typeof ReactQueryUseMutationRoute
  '/react-query/use-query': typeof ReactQueryUseQueryRoute
  '/react-table/standard': typeof ReactTableStandardRoute
  '/shadcn/button': typeof ShadcnButtonRoute
  '/shadcn/checkbox': typeof ShadcnCheckboxRoute
  '/shadcn/context-menu': typeof ShadcnContextMenuRoute
  '/shadcn/propose-class-name-override': typeof ShadcnProposeClassNameOverrideRoute
  '/shadcn/select': typeof ShadcnSelectRoute
  '/shadcn/use-debounce': typeof ShadcnUseDebounceRoute
  '/shadcn/use-reactive-state': typeof ShadcnUseReactiveStateRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/react-form': typeof ReactFormRouteRouteWithChildren
  '/react-query': typeof ReactQueryRouteRouteWithChildren
  '/react-table': typeof ReactTableRouteRouteWithChildren
  '/shadcn': typeof ShadcnRouteRouteWithChildren
  '/react-form/checkbox-group': typeof ReactFormCheckboxGroupRoute
  '/react-form/checkbox-with-label': typeof ReactFormCheckboxWithLabelRoute
  '/react-form/combobox-checkbox-group': typeof ReactFormComboboxCheckboxGroupRoute
  '/react-form/input-debounce': typeof ReactFormInputDebounceRoute
  '/react-form/select': typeof ReactFormSelectRoute
  '/react-form/standard-react-form': typeof ReactFormStandardReactFormRoute
  '/react-form/with-zoos-form': typeof ReactFormWithZoosFormRoute
  '/react-query/use-mutation': typeof ReactQueryUseMutationRoute
  '/react-query/use-query': typeof ReactQueryUseQueryRoute
  '/react-table/standard': typeof ReactTableStandardRoute
  '/shadcn/button': typeof ShadcnButtonRoute
  '/shadcn/checkbox': typeof ShadcnCheckboxRoute
  '/shadcn/context-menu': typeof ShadcnContextMenuRoute
  '/shadcn/propose-class-name-override': typeof ShadcnProposeClassNameOverrideRoute
  '/shadcn/select': typeof ShadcnSelectRoute
  '/shadcn/use-debounce': typeof ShadcnUseDebounceRoute
  '/shadcn/use-reactive-state': typeof ShadcnUseReactiveStateRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/react-form': typeof ReactFormRouteRouteWithChildren
  '/react-query': typeof ReactQueryRouteRouteWithChildren
  '/react-table': typeof ReactTableRouteRouteWithChildren
  '/shadcn': typeof ShadcnRouteRouteWithChildren
  '/react-form/checkbox-group': typeof ReactFormCheckboxGroupRoute
  '/react-form/checkbox-with-label': typeof ReactFormCheckboxWithLabelRoute
  '/react-form/combobox-checkbox-group': typeof ReactFormComboboxCheckboxGroupRoute
  '/react-form/input-debounce': typeof ReactFormInputDebounceRoute
  '/react-form/select': typeof ReactFormSelectRoute
  '/react-form/standard-react-form': typeof ReactFormStandardReactFormRoute
  '/react-form/with-zoos-form': typeof ReactFormWithZoosFormRoute
  '/react-query/use-mutation': typeof ReactQueryUseMutationRoute
  '/react-query/use-query': typeof ReactQueryUseQueryRoute
  '/react-table/standard': typeof ReactTableStandardRoute
  '/shadcn/button': typeof ShadcnButtonRoute
  '/shadcn/checkbox': typeof ShadcnCheckboxRoute
  '/shadcn/context-menu': typeof ShadcnContextMenuRoute
  '/shadcn/propose-class-name-override': typeof ShadcnProposeClassNameOverrideRoute
  '/shadcn/select': typeof ShadcnSelectRoute
  '/shadcn/use-debounce': typeof ShadcnUseDebounceRoute
  '/shadcn/use-reactive-state': typeof ShadcnUseReactiveStateRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/react-form'
    | '/react-query'
    | '/react-table'
    | '/shadcn'
    | '/react-form/checkbox-group'
    | '/react-form/checkbox-with-label'
    | '/react-form/combobox-checkbox-group'
    | '/react-form/input-debounce'
    | '/react-form/select'
    | '/react-form/standard-react-form'
    | '/react-form/with-zoos-form'
    | '/react-query/use-mutation'
    | '/react-query/use-query'
    | '/react-table/standard'
    | '/shadcn/button'
    | '/shadcn/checkbox'
    | '/shadcn/context-menu'
    | '/shadcn/propose-class-name-override'
    | '/shadcn/select'
    | '/shadcn/use-debounce'
    | '/shadcn/use-reactive-state'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/react-form'
    | '/react-query'
    | '/react-table'
    | '/shadcn'
    | '/react-form/checkbox-group'
    | '/react-form/checkbox-with-label'
    | '/react-form/combobox-checkbox-group'
    | '/react-form/input-debounce'
    | '/react-form/select'
    | '/react-form/standard-react-form'
    | '/react-form/with-zoos-form'
    | '/react-query/use-mutation'
    | '/react-query/use-query'
    | '/react-table/standard'
    | '/shadcn/button'
    | '/shadcn/checkbox'
    | '/shadcn/context-menu'
    | '/shadcn/propose-class-name-override'
    | '/shadcn/select'
    | '/shadcn/use-debounce'
    | '/shadcn/use-reactive-state'
  id:
    | '__root__'
    | '/'
    | '/react-form'
    | '/react-query'
    | '/react-table'
    | '/shadcn'
    | '/react-form/checkbox-group'
    | '/react-form/checkbox-with-label'
    | '/react-form/combobox-checkbox-group'
    | '/react-form/input-debounce'
    | '/react-form/select'
    | '/react-form/standard-react-form'
    | '/react-form/with-zoos-form'
    | '/react-query/use-mutation'
    | '/react-query/use-query'
    | '/react-table/standard'
    | '/shadcn/button'
    | '/shadcn/checkbox'
    | '/shadcn/context-menu'
    | '/shadcn/propose-class-name-override'
    | '/shadcn/select'
    | '/shadcn/use-debounce'
    | '/shadcn/use-reactive-state'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ReactFormRouteRoute: typeof ReactFormRouteRouteWithChildren
  ReactQueryRouteRoute: typeof ReactQueryRouteRouteWithChildren
  ReactTableRouteRoute: typeof ReactTableRouteRouteWithChildren
  ShadcnRouteRoute: typeof ShadcnRouteRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ReactFormRouteRoute: ReactFormRouteRouteWithChildren,
  ReactQueryRouteRoute: ReactQueryRouteRouteWithChildren,
  ReactTableRouteRoute: ReactTableRouteRouteWithChildren,
  ShadcnRouteRoute: ShadcnRouteRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/react-form",
        "/react-query",
        "/react-table",
        "/shadcn"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/react-form": {
      "filePath": "react-form/route.tsx",
      "children": [
        "/react-form/checkbox-group",
        "/react-form/checkbox-with-label",
        "/react-form/combobox-checkbox-group",
        "/react-form/input-debounce",
        "/react-form/select",
        "/react-form/standard-react-form",
        "/react-form/with-zoos-form"
      ]
    },
    "/react-query": {
      "filePath": "react-query/route.tsx",
      "children": [
        "/react-query/use-mutation",
        "/react-query/use-query"
      ]
    },
    "/react-table": {
      "filePath": "react-table/route.tsx",
      "children": [
        "/react-table/standard"
      ]
    },
    "/shadcn": {
      "filePath": "shadcn/route.tsx",
      "children": [
        "/shadcn/button",
        "/shadcn/checkbox",
        "/shadcn/context-menu",
        "/shadcn/propose-class-name-override",
        "/shadcn/select",
        "/shadcn/use-debounce",
        "/shadcn/use-reactive-state"
      ]
    },
    "/react-form/checkbox-group": {
      "filePath": "react-form/checkbox-group.tsx",
      "parent": "/react-form"
    },
    "/react-form/checkbox-with-label": {
      "filePath": "react-form/checkbox-with-label.tsx",
      "parent": "/react-form"
    },
    "/react-form/combobox-checkbox-group": {
      "filePath": "react-form/combobox-checkbox-group.tsx",
      "parent": "/react-form"
    },
    "/react-form/input-debounce": {
      "filePath": "react-form/input-debounce.tsx",
      "parent": "/react-form"
    },
    "/react-form/select": {
      "filePath": "react-form/select.tsx",
      "parent": "/react-form"
    },
    "/react-form/standard-react-form": {
      "filePath": "react-form/standard-react-form.tsx",
      "parent": "/react-form"
    },
    "/react-form/with-zoos-form": {
      "filePath": "react-form/with-zoos-form.tsx",
      "parent": "/react-form"
    },
    "/react-query/use-mutation": {
      "filePath": "react-query/use-mutation.tsx",
      "parent": "/react-query"
    },
    "/react-query/use-query": {
      "filePath": "react-query/use-query.tsx",
      "parent": "/react-query"
    },
    "/react-table/standard": {
      "filePath": "react-table/standard.tsx",
      "parent": "/react-table"
    },
    "/shadcn/button": {
      "filePath": "shadcn/button.tsx",
      "parent": "/shadcn"
    },
    "/shadcn/checkbox": {
      "filePath": "shadcn/checkbox.tsx",
      "parent": "/shadcn"
    },
    "/shadcn/context-menu": {
      "filePath": "shadcn/context-menu.tsx",
      "parent": "/shadcn"
    },
    "/shadcn/propose-class-name-override": {
      "filePath": "shadcn/propose-class-name-override.tsx",
      "parent": "/shadcn"
    },
    "/shadcn/select": {
      "filePath": "shadcn/select.tsx",
      "parent": "/shadcn"
    },
    "/shadcn/use-debounce": {
      "filePath": "shadcn/use-debounce.tsx",
      "parent": "/shadcn"
    },
    "/shadcn/use-reactive-state": {
      "filePath": "shadcn/use-reactive-state.tsx",
      "parent": "/shadcn"
    }
  }
}
ROUTE_MANIFEST_END */
