"use server";

import {db} from "~/server/db";
import {users} from "~/server/db/schema";
import {eq, sql} from "drizzle-orm";
import {cookies} from "next/headers";
import {jwtVerify} from "jose";

export const SetScore = async () => {
  const cookie = (await cookies()).get("token")
  if (!cookie) throw new Error("Unauthenticated")

  const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "");
    const jwt = await jwtVerify(cookie.value, secret)

    const fields = await db.update(users).set({
      finishedAt: sql`now()`
    }).where(eq(users.id, jwt.payload.sub ?? "")).returning()
    if (fields.length === 0 || !fields[0]) {
      throw new Error("No data found");
    }
    return fields
}