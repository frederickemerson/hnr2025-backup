import {db} from "~/server/db";
import {users} from "~/server/db/schema";
import {SignJWT} from "jose";

export const POST = async (request: Request): Promise<Response> => {
  const nameList = [
    "ClickyMcClickFace",
    "ButtonButNotReally",
    "YouMissedIt",
    "ThePhantomButton",
    "OopsTryAgain",
    "MaybeNextTime",
    "InvisibleClickZone",
    "AreYouEvenTrying",
    "LostInTheClick",
    "HoverHereFirst",
    "TheFakeOne",
    "TooSlowBuddy",
    "GuessWhereIAm",
    "WrongButtonPal",
    "NaaahNotThisOne",
    "SikeItMoved",
    "CatchMeIfYouCan",
    "WhyYouClickingMe",
    "NopeNotToday",
    "404ButtonNotFound",
    "NiceTryLoser",
    "JustKiddingBro",
    "UnreachableDream",
    "HoverOverMeFirst",
    "FalseHope",
    "CloseButNoCigar",
    "AlmostClickedIt",
    "GhostOfGrades",
    "DisguisedButton",
    "Clickception",
    "PixelPerfectClick",
    "TheElusiveOne",
    "LaggyButton",
    "ClickThis?Nope.",
    "CurseOfTheCurve",
    "OneInAMillion",
    "MouseTrap",
    "GradeGatekeeper",
    "TooManyClicks",
    "TheButtonChimera",
    "EternalLoading",
    "ClickClickClick",
    "BetterLuckNextTime",
    "TrollButton",
    "StressTestButton",
    "ImpostorButton",
    "FindMeMaybe"
  ];

  const data = await db.insert(users).values({
    name: nameList[Math.floor(Math.random() * nameList.length)] ?? "",
    score: 0
  }).returning();
  if (data.length === 0 || !data[0]) {
    return new Response(null, {
      status: 500
    })
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "");
  const tok = await new SignJWT({
    sub: data[0].id,
    name: data[0].name
  })
    .setProtectedHeader({alg: "HS256"})
    .setExpirationTime("1d")
    .sign(secret);
  return new Response(null, {
    status: 200,
    headers: {
      "content-type": "application/json",
      "set-cookie": `token=${tok}; path=/; HttpOnly; SameSite=Strict; Secure;`,
    }
  })}