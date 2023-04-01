import Fastify from "fastify";
import { appRoutes } from "./routes";

const app = Fastify();

app.register(appRoutes);

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("server is running");
  });
