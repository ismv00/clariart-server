import { z } from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  app.post("/admin", async (request, response) => {
    const createUser = z.object({
      email: z.string(),
      password: z.string(),
      name: z.string(),
    });

    const { email, name, password } = createUser.parse(request.body);

    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  });
}
