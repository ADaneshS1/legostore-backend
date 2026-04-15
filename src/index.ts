import { OpenAPIHono } from "@hono/zod-openapi"; // Ganti Hono biasa
import { logger } from "hono/logger";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { commonRoute } from "./modules/common/route";
import { gameRoute } from "./modules/game/route";
import { userRoute } from "./modules/user/route";
import { authRoute } from "./modules/auth/route";

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

app.route("/health-check", commonRoute);
app.route("/games", gameRoute);
app.route("/users", userRoute);
app.route("/auth", authRoute);

export default app;
