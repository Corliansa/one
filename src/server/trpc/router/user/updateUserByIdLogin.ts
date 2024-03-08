import { z } from "zod";
import { protectedProcedure } from "../../trpc";

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
export const updateUserByIdLogin = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string(),
      birthDate: z.date().optional(),
      occupation: z.string(),
      location: z.string(),
      fieldOfStudy: z.string().optional(),
      bundesland: z.string(),
      expectedGraduation: z.string().optional(),
      ppicabang: z.string(),
    }),
  )
  .mutation(
    async ({
      ctx,
      input: {
        id,
        name,
        birthDate,
        occupation,
        location,
        ppicabang,
        bundesland,
        expectedGraduation,
        fieldOfStudy,
      },
    }) => {
      return await ctx.prisma.user.update({
        where: { id },
        data: {
          name,
          birthDate,
          occupation,
          location,
          ppicabang,
          bundesland,
          fieldOfStudy,
          expectedGraduation,
          updated: true,
        },
      });
    },
  );
