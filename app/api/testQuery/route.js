import { db } from "@/lib/prisma";

export async function GET() {
  const result = await db.budget.findMany({
    include: {
      user: {
        include: {
          accounts: {
            where: {
              isDefault: true,
            },
          },
        },
      },
    },
  });
  return Response.json(result);
}
