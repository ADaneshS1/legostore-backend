import { Hono } from "hono";
import { logger } from "hono/logger";
import { commonRoute } from "./modules/common/route";
import { legoGameRoute } from "./modules/lego-game/route";

const app = new Hono();
app.use(logger());

app.route("/", commonRoute);
app.route("/lego-game", legoGameRoute);

export default app;
