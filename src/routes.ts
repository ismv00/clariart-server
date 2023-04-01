import { z } from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { json } from "stream/consumers";

export async function appRoutes(app: FastifyInstance) {
  app.post("/admin", async (request) => {
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

  app.delete("/admin/:id", async (request) => {
    const id = request.params;

    try {
      await prisma.user.deleteMany({
        where: {
          id: String(id)[0],
        },
      });
    } catch (error) {
      console.log(error);
    }

    return "Arquivo deletado com sucesso";
  });

  app.get("/admin", async (request) => {
    const users = await prisma.user.findMany();

    return users;
  });
}
