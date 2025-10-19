import { Handlers } from "$fresh/server.ts";
import { User, users } from "../../lib/data.ts";

interface UserPayload {
  idUser: string;
}

export const handler: Handlers = {
  async POST(req) {
    try {
      const body: UserPayload = await req.json();

      if (!body.idUser || typeof body.idUser !== "string") {
        return new Response(
          JSON.stringify({ error: "idUser is required and must be a string" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      if (users.some((u) => u.idUser === body.idUser)) {
        return new Response(
          JSON.stringify({ error: "idUser must be unique",success:false }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      const newUser: User = {
        idUser: body.idUser,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);

      return new Response(
        JSON.stringify({ success: true, user: newUser }),
        { status: 201, headers: { "Content-Type": "application/json" } },
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON payload." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};
