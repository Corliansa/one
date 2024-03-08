import { Role, Status, Verification } from "@prisma/client";
import { prisma } from "../src/server/db/client";

async function main() {
  const a = prisma.user.upsert({
    where: { id: "123" },
    create: { id: "123", email: "test@gmail.com", role: Role.ADMIN },
    update: { role: Role.ADMIN },
  });

  const b = prisma.user.upsert({
    where: { id: "124" },
    create: {
      id: "124",
      name: "aku cinta",
      email: "hi@gmail.com",
      role: Role.ADMIN,
    },
    update: { role: Role.USER },
  });

  const c = prisma.user.upsert({
    where: { id: "125" },
    create: {
      id: "125",
      name: "aku ckamu dan aku",
      email: "done@gmail.com",
      role: Role.ADMIN,
    },
    update: { role: Role.ADMIN },
  });

  const d = prisma.user.upsert({
    where: { id: "126" },
    create: { id: "126", email: "test@yahoo.com", role: Role.ADMIN },
    update: { role: Role.ADMIN },
  });

  await Promise.all([a, b, c, d]);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
