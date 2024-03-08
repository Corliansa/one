import { authorize } from "./../../../common/authorize";
import { protectedProcedure } from "../../trpc";
import { z } from "zod";
import { RoleZod, StatusZod, VerificationZod } from "../../../../types";

/**
 * Updates a user by their ID.
 *
 * @param {Object} input - The input object containing the user's ID, role, verification, status, and affiliation.
 * @param {string} input.id - The ID of the user to update.
 * @param {Role} input.role - The new role of the user.
 * @param {Verification} input.verification - The new verification status of the user.
 * @param {Status} input.status - The new status of the user.
 * @param {string[]} [input.affiliation] - The new affiliations of the user (optional).
 * @returns {Promise<User>} - A promise that resolves to the updated user.
 */
export const updateUserById = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      role: RoleZod,
      verification: VerificationZod,
      status: StatusZod,
      affiliation: z.array(z.string()).optional(),
    })
  )
  .mutation(
    async ({ ctx, input: { id, role, verification, status, affiliation } }) => {
      authorize(ctx, ["ADMIN"]);
      return await ctx.prisma.user.update({
        where: { id },
        data: { role, verification, status, affiliation },
      });
    }
  );
