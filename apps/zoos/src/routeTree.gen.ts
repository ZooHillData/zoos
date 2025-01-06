/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UiShadRouteImport } from './routes/ui-shad/route'
import { Route as ReactTableRouteImport } from './routes/react-table/route'
import { Route as ReactQueryRouteImport } from './routes/react-query/route'
import { Route as ReactFormRouteImport } from './routes/react-form/route'
import { Route as IndexImport } from './routes/index'
import { Route as UiShadSelectImport } from './routes/ui-shad/select'
import { Route as UiShadContextMenuImport } from './routes/ui-shad/context-menu'
import { Route as UiShadCheckboxImport } from './routes/ui-shad/checkbox'
import { Route as UiShadButtonImport } from './routes/ui-shad/button'
import { Route as ReactTableStandardImport } from './routes/react-table/standard'
import { Route as ReactQueryUseQueryImport } from './routes/react-query/use-query'
import { Route as ReactQueryUseMutationImport } from './routes/react-query/use-mutation'
import { Route as ReactFormWithZoosFormImport } from './routes/react-form/with-zoos-form'
import { Route as ReactFormStandardReactFormImport } from './routes/react-form/standard-react-form'
import { Route as ReactFormSelectImport } from './routes/react-form/select'
import { Route as ReactFormCheckboxWithLabelImport } from './routes/react-form/checkbox-with-label'
import { Route as ReactFormCheckboxGroupImport } from './routes/react-form/checkbox-group'

// Create/Update Routes

const UiShadRouteRoute = UiShadRouteImport.update({
  id: '/ui-shad',
  path: '/ui-shad',
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

const UiShadSelectRoute = UiShadSelectImport.update({
  id: '/select',
  path: '/select',
  getParentRoute: () => UiShadRouteRoute,
} as any)

const UiShadContextMenuRoute = UiShadContextMenuImport.update({
  id: '/context-menu',
  path: '/context-menu',
  getParentRoute: () => UiShadRouteRoute,
} as any)

const UiShadCheckboxRoute = UiShadCheckboxImport.update({
  id: '/checkbox',
  path: '/checkbox',
  getParentRoute: () => UiShadRouteRoute,
} as any)

const UiShadButtonRoute = UiShadButtonImport.update({
  id: '/button',
  path: '/button',
  getParentRoute: () => UiShadRouteRoute,
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
    '/ui-shad': {
      id: '/ui-shad'
      path: '/ui-shad'
      fullPath: '/ui-shad'
      preLoaderRoute: typeof UiShadRouteImport
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
    '/ui-shad/button': {
      id: '/ui-shad/button'
      path: '/button'
      fullPath: '/ui-shad/button'
      preLoaderRoute: typeof UiShadButtonImport
      parentRoute: typeof UiShadRouteImport
    }
    '/ui-shad/checkbox': {
      id: '/ui-shad/checkbox'
      path: '/checkbox'
      fullPath: '/ui-shad/checkbox'
      preLoaderRoute: typeof UiShadCheckboxImport
      parentRoute: typeof UiShadRouteImport
    }
    '/ui-shad/context-menu': {
      id: '/ui-shad/context-menu'
      path: '/context-menu'
      fullPath: '/ui-shad/context-menu'
      preLoaderRoute: typeof UiShadContextMenuImport
      parentRoute: typeof UiShadRouteImport
    }
    '/ui-shad/select': {
      id: '/ui-shad/select'
      path: '/select'
      fullPath: '/ui-shad/select'
      preLoaderRoute: typeof UiShadSelectImport
      parentRoute: typeof UiShadRouteImport
    }
  }
}

// Create and export the route tree

interface ReactFormRouteRouteChildren {
  ReactFormCheckboxGroupRoute: typeof ReactFormCheckboxGroupRoute
  ReactFormCheckboxWithLabelRoute: typeof ReactFormCheckboxWithLabelRoute
  ReactFormSelectRoute: typeof ReactFormSelectRoute
  ReactFormStandardReactFormRoute: typeof ReactFormStandardReactFormRoute
  ReactFormWithZoosFormRoute: typeof ReactFormWithZoosFormRoute
}

const ReactFormRouteRouteChildren: ReactFormRouteRouteChildren = {
  ReactFormCheckboxGroupRoute: ReactFormCheckboxGroupRoute,
  ReactFormCheckboxWithLabelRoute: ReactFormCheckboxWithLabelRoute,
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

interface UiShadRouteRouteChildren {
  UiShadButtonRoute: typeof UiShadButtonRoute
  UiShadCheckboxRoute: typeof UiShadCheckboxRoute
  UiShadContextMenuRoute: typeof UiShadContextMenuRoute
  UiShadSelectRoute: typeof UiShadSelectRoute
}

const UiShadRouteRouteChildren: UiShadRouteRouteChildren = {
  UiShadButtonRoute: UiShadButtonRoute,
  UiShadCheckboxRoute: UiShadCheckboxRoute,
  UiShadContextMenuRoute: UiShadContextMenuRoute,
  UiShadSelectRoute: UiShadSelectRoute,
}

const UiShadRouteRouteWithChildren = UiShadRouteRoute._addFileChildren(
  UiShadRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/react-form': typeof ReactFormRouteRouteWithChildren
  '/react-query': typeof ReactQueryRouteRouteWithChildren
  '/react-table': typeof ReactTableRouteRouteWithChildren
  '/ui-shad': typeof UiShadRouteRouteWithChildren
  '/react-form/checkbox-group': typeof ReactFormCheckboxGroupRoute
  '/react-form/checkbox-with-label': typeof ReactFormCheckboxWithLabelRoute
  '/react-form/select': typeof ReactFormSelectRoute
  '/react-form/standard-react-form': typeof ReactFormStandardReactFormRoute
  '/react-form/with-zoos-form': typeof ReactFormWithZoosFormRoute
  '/react-query/use-mutation': typeof ReactQueryUseMutationRoute
  '/react-query/use-query': typeof ReactQueryUseQueryRoute
  '/react-table/standard': typeof ReactTableStandardRoute
  '/ui-shad/button': typeof UiShadButtonRoute
  '/ui-shad/checkbox': typeof UiShadCheckboxRoute
  '/ui-shad/context-menu': typeof UiShadContextMenuRoute
  '/ui-shad/select': typeof UiShadSelectRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/react-form': typeof ReactFormRouteRouteWithChildren
  '/react-query': typeof ReactQueryRouteRouteWithChildren
  '/react-table': typeof ReactTableRouteRouteWithChildren
  '/ui-shad': typeof UiShadRouteRouteWithChildren
  '/react-form/checkbox-group': typeof ReactFormCheckboxGroupRoute
  '/react-form/checkbox-with-label': typeof ReactFormCheckboxWithLabelRoute
  '/react-form/select': typeof ReactFormSelectRoute
  '/react-form/standard-react-form': typeof ReactFormStandardReactFormRoute
  '/react-form/with-zoos-form': typeof ReactFormWithZoosFormRoute
  '/react-query/use-mutation': typeof ReactQueryUseMutationRoute
  '/react-query/use-query': typeof ReactQueryUseQueryRoute
  '/react-table/standard': typeof ReactTableStandardRoute
  '/ui-shad/button': typeof UiShadButtonRoute
  '/ui-shad/checkbox': typeof UiShadCheckboxRoute
  '/ui-shad/context-menu': typeof UiShadContextMenuRoute
  '/ui-shad/select': typeof UiShadSelectRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/react-form': typeof ReactFormRouteRouteWithChildren
  '/react-query': typeof ReactQueryRouteRouteWithChildren
  '/react-table': typeof ReactTableRouteRouteWithChildren
  '/ui-shad': typeof UiShadRouteRouteWithChildren
  '/react-form/checkbox-group': typeof ReactFormCheckboxGroupRoute
  '/react-form/checkbox-with-label': typeof ReactFormCheckboxWithLabelRoute
  '/react-form/select': typeof ReactFormSelectRoute
  '/react-form/standard-react-form': typeof ReactFormStandardReactFormRoute
  '/react-form/with-zoos-form': typeof ReactFormWithZoosFormRoute
  '/react-query/use-mutation': typeof ReactQueryUseMutationRoute
  '/react-query/use-query': typeof ReactQueryUseQueryRoute
  '/react-table/standard': typeof ReactTableStandardRoute
  '/ui-shad/button': typeof UiShadButtonRoute
  '/ui-shad/checkbox': typeof UiShadCheckboxRoute
  '/ui-shad/context-menu': typeof UiShadContextMenuRoute
  '/ui-shad/select': typeof UiShadSelectRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/react-form'
    | '/react-query'
    | '/react-table'
    | '/ui-shad'
    | '/react-form/checkbox-group'
    | '/react-form/checkbox-with-label'
    | '/react-form/select'
    | '/react-form/standard-react-form'
    | '/react-form/with-zoos-form'
    | '/react-query/use-mutation'
    | '/react-query/use-query'
    | '/react-table/standard'
    | '/ui-shad/button'
    | '/ui-shad/checkbox'
    | '/ui-shad/context-menu'
    | '/ui-shad/select'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/react-form'
    | '/react-query'
    | '/react-table'
    | '/ui-shad'
    | '/react-form/checkbox-group'
    | '/react-form/checkbox-with-label'
    | '/react-form/select'
    | '/react-form/standard-react-form'
    | '/react-form/with-zoos-form'
    | '/react-query/use-mutation'
    | '/react-query/use-query'
    | '/react-table/standard'
    | '/ui-shad/button'
    | '/ui-shad/checkbox'
    | '/ui-shad/context-menu'
    | '/ui-shad/select'
  id:
    | '__root__'
    | '/'
    | '/react-form'
    | '/react-query'
    | '/react-table'
    | '/ui-shad'
    | '/react-form/checkbox-group'
    | '/react-form/checkbox-with-label'
    | '/react-form/select'
    | '/react-form/standard-react-form'
    | '/react-form/with-zoos-form'
    | '/react-query/use-mutation'
    | '/react-query/use-query'
    | '/react-table/standard'
    | '/ui-shad/button'
    | '/ui-shad/checkbox'
    | '/ui-shad/context-menu'
    | '/ui-shad/select'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ReactFormRouteRoute: typeof ReactFormRouteRouteWithChildren
  ReactQueryRouteRoute: typeof ReactQueryRouteRouteWithChildren
  ReactTableRouteRoute: typeof ReactTableRouteRouteWithChildren
  UiShadRouteRoute: typeof UiShadRouteRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ReactFormRouteRoute: ReactFormRouteRouteWithChildren,
  ReactQueryRouteRoute: ReactQueryRouteRouteWithChildren,
  ReactTableRouteRoute: ReactTableRouteRouteWithChildren,
  UiShadRouteRoute: UiShadRouteRouteWithChildren,
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
        "/ui-shad"
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
    "/ui-shad": {
      "filePath": "ui-shad/route.tsx",
      "children": [
        "/ui-shad/button",
        "/ui-shad/checkbox",
        "/ui-shad/context-menu",
        "/ui-shad/select"
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
    "/ui-shad/button": {
      "filePath": "ui-shad/button.tsx",
      "parent": "/ui-shad"
    },
    "/ui-shad/checkbox": {
      "filePath": "ui-shad/checkbox.tsx",
      "parent": "/ui-shad"
    },
    "/ui-shad/context-menu": {
      "filePath": "ui-shad/context-menu.tsx",
      "parent": "/ui-shad"
    },
    "/ui-shad/select": {
      "filePath": "ui-shad/select.tsx",
      "parent": "/ui-shad"
    }
  }
}
ROUTE_MANIFEST_END */
