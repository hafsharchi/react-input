/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as MainLayoutImport } from './routes/_main-layout'
import { Route as MainLayoutIndexImport } from './routes/_main-layout/index'
import { Route as MainLayoutDocsTextIndexImport } from './routes/_main-layout/docs/text/index'
import { Route as MainLayoutDocsIntroductionIndexImport } from './routes/_main-layout/docs/introduction/index'

// Create/Update Routes

const MainLayoutRoute = MainLayoutImport.update({
  id: '/_main-layout',
  getParentRoute: () => rootRoute,
} as any)

const MainLayoutIndexRoute = MainLayoutIndexImport.update({
  path: '/',
  getParentRoute: () => MainLayoutRoute,
} as any)

const MainLayoutDocsTextIndexRoute = MainLayoutDocsTextIndexImport.update({
  path: '/docs/text/',
  getParentRoute: () => MainLayoutRoute,
} as any)

const MainLayoutDocsIntroductionIndexRoute =
  MainLayoutDocsIntroductionIndexImport.update({
    path: '/docs/introduction/',
    getParentRoute: () => MainLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_main-layout': {
      id: '/_main-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof MainLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_main-layout/': {
      id: '/_main-layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof MainLayoutIndexImport
      parentRoute: typeof MainLayoutImport
    }
    '/_main-layout/docs/introduction/': {
      id: '/_main-layout/docs/introduction/'
      path: '/docs/introduction'
      fullPath: '/docs/introduction'
      preLoaderRoute: typeof MainLayoutDocsIntroductionIndexImport
      parentRoute: typeof MainLayoutImport
    }
    '/_main-layout/docs/text/': {
      id: '/_main-layout/docs/text/'
      path: '/docs/text'
      fullPath: '/docs/text'
      preLoaderRoute: typeof MainLayoutDocsTextIndexImport
      parentRoute: typeof MainLayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  MainLayoutRoute: MainLayoutRoute.addChildren({
    MainLayoutIndexRoute,
    MainLayoutDocsIntroductionIndexRoute,
    MainLayoutDocsTextIndexRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_main-layout"
      ]
    },
    "/_main-layout": {
      "filePath": "_main-layout.tsx",
      "children": [
        "/_main-layout/",
        "/_main-layout/docs/introduction/",
        "/_main-layout/docs/text/"
      ]
    },
    "/_main-layout/": {
      "filePath": "_main-layout/index.tsx",
      "parent": "/_main-layout"
    },
    "/_main-layout/docs/introduction/": {
      "filePath": "_main-layout/docs/introduction/index.tsx",
      "parent": "/_main-layout"
    },
    "/_main-layout/docs/text/": {
      "filePath": "_main-layout/docs/text/index.tsx",
      "parent": "/_main-layout"
    }
  }
}
ROUTE_MANIFEST_END */