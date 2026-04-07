import { OpenAPIHono } from "@hono/zod-openapi"; // Ganti Hono biasa
import { logger } from "hono/logger";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { commonRoutes } from "./modules/common/route";
import { gameRoutes } from "./modules/game/route";
import { userRoute } from "./modules/user/route";

const app = new OpenAPIHono();
app.use(logger());
app.use(cors());

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "LEGO Game API",
    description: "API for managing LEGO game collection",
  },
});

app.get(
  "/",
  Scalar({
    spec: {
      url: "/openapi.json",
    },
    theme: "deepSpace",
  } as any),
);

app.route("/healt-check", commonRoutes);
app.route("/products", gameRoutes);
app.route("/users", userRoute);

export default app;
