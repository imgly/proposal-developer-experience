// pages/api/auth/[...nextauth].ts

// import GitHubProvider from "next-auth/providers/github";

import {createNextRouteHandler} from  "@imgly/sdk/server"
export const { GET, POST } = createNextRouteHandler({ router });