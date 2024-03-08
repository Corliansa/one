import { authorize } from "./../../../common/authorize";
import { protectedProcedure } from "../../trpc";
import { z } from "zod";
import { RoleZod, StatusZod, VerificationZod } from "../../../../types";

/**
 * Retrieves users based on the specified criteria.
 *
 * @param input - Optional object containing the criteria for filtering users.
 * @returns A promise that resolves to an array of users matching the specified criteria.
 */
export const getUsers = protectedProcedure
  .input(
    z
      .object({
        role: RoleZod,
        verification: VerificationZod,
        status: StatusZod,
      })
      .optional(),
  )
  .query(async ({ ctx, input }) => {
    authorize(ctx, ["ADMIN"]);
    return await ctx.prisma.user.findMany({
      where: input ? { ...input } : undefined,
    });
  });
