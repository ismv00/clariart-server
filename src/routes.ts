import { z } from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import jwt from "jsonwebtoken";
import authConfig from "./config/auth.json";

function GeneratedToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

export async function appRoutes(app: FastifyInstance) {
  app.post("/admin", async (request, response) => {
    const createUser = z.object({
      email: z.string(),
      password: z.string(),
      name: z.string(),
    });

    const { email, name, password } = createUser.parse(request.body);

    try {
      if (
        await prisma.user.findUnique({
          where: {
            email: email,
          },
        })
      ) {
        return response.status(400).send({ error: "User Already Exists" });
      } else {
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password,
          },
        });

        user.password = "";

        return response.send({
          user,
          token: GeneratedToken({ id: user?.id }),
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/admin", async (request) => {
    const users = await prisma.user.findMany();

    return users;
  });
}
