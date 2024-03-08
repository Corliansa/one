import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Base, Card, Protected } from "../../Components";
import type { RoleType, StatusType, VerificationType } from "../../types";
import { trpc } from "../../utils/trpc";
import { Filter } from "./FilterMenu";

import { UserCard } from "./UserCard";

export const Users: NextPage = () => {
  const { query } = useRouter();

  const { data: users, isLoading } = trpc.user.getUsers.useQuery({
    verification: query.verification as VerificationType,
    role: query.role as RoleType,
    status: query.status as StatusType,
  });

  return (
    <>
      <Head>
        <title>ONE | Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title="Users list">
        <div className="py-4">
          <Protected roles={["ADMIN"]} redirectTo="/dashboard">
            <Filter />
            {!isLoading && users && (
              <div className="grid gap-2 py-4">
                {users.length === 0 ? (
                  <Card>
                    <p>No users found</p>
                  </Card>
                ) : (
                  <>
                    {users.map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </>
                )}
              </div>
            )}
          </Protected>
        </div>
      </Base>
    </>
  );
};
