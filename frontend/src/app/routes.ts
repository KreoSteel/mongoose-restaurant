import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("pages/home.tsx"), route("ingredients", "pages/ingredients.tsx"), route("categories", "pages/categories.tsx")] satisfies RouteConfig;