import {type NextRequest} from "next/server";
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

    const res: {score: number | null}[] = await db.update(users)
      .set({
        score: sql`${users.score} + 1`,
      })
      .where(eq(users.id, jwt.payload.sub ?? ""))
      .returning({score: users.score});
    return new Response(JSON.stringify({
      "score": res,
    }));
  } catch (e) {
    console.log(e)
    return new Response(null, {status: 401});
  }
}

export const GET = async (req: NextRequest): Promise<Response> => {
  const cookie = req.cookies.get("token");
  if (!cookie) return new Response(null, { status: 401 });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "");
  try {
    const jwt = await jwtVerify(cookie.value, secret);

    const res: { score: number | null }[] = await db.select({ score: users.score })
      .from(users)
      .where(eq(users.id, jwt.payload.sub ?? ""))
      .limit(1);

    if (res.length === 0 || !res[0]) {
      return new Response(null, { status: 404 });
    }

    return new Response(JSON.stringify({
      "score": res[0].score,
    }), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response(null, { status: 401 });
  }
}