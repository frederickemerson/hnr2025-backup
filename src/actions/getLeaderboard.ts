import {users} from "~/server/db/schema";
import {db} from "~/server/db";
import {sql} from "drizzle-orm";

export const GetTopUsers = async () => {
  try {
    const topUsers = await db.select()
      .from(users)
      .where(
        sql`${users.finishedAt} IS NOT NULL AND ${users.createdAt} IS NOT NULL`
      )
      .orderBy(
        sql`AGE(${users.finishedAt}, ${users.createdAt}) ASC`
      )
      .limit(10);

    return topUsers;
  } catch (error) {
    console.error("Error fetching top users:", error);
    throw new Error("Failed to retrieve top users");
  }
};