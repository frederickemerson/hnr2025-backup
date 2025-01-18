import {NextRequest} from "next/server";
import {db} from "~/server/db";
import {eq, sql} from "drizzle-orm";
import {users} from "~/server/db/schema";
import {jwtVerify} from "jose";

// Increment score by 1
// TODO: Captacha? rate limiting?
export const PUT = async (req: NextRequest): Promise<Response> => {
  const cookie = req.cookies.get("token")
  if (!cookie) return new Response(null, {status: 401})

  const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "");
  try {
    const jwt = await jwtVerify(cookie.value, secret)

    const res = await db.update(users)
      .set({
        score: sql`${users.score} + 1`,
      })
      .where(eq(users.id, jwt.payload.sub ?? ""))
      .execute();
    console.log(res)
    return new Response(null);
  } catch (e) {
    console.log(e)
    return new Response(null, {status: 401});
  }
}