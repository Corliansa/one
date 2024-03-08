import { type NextPage } from "next";
import Head from "next/head";
import { Base, Card, Protected } from "../../Components";
import { capitalize } from "../../utils/capitalize";
import { trpc } from "../../utils/trpc";
import { UserForm } from "./UserForm";

export const User: NextPage<{ userId: string }> = ({ userId }) => {
  const { data: user, isLoading } = trpc.user.getUserById.useQuery({
    id: userId,
  });
  return (
    <>
      <Head>
        <title>ONE | User Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title={user?.name ?? " "}>
        <h1>Admin View, editing user...</h1>
        <div className="py-4">
          <Protected roles={["ADMIN"]} redirectTo="/dashboard">
            {!isLoading && user && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card>
                  {[
                    { label: "Email", value: user.email },
                    { label: "Role", value: capitalize(user.role) },
                    { label: "Status", value: capitalize(user.status) },
                    {
                      label: "Verified",
                      value: user.verification === "VERIFIED" ? "Yes" : "No",
                    },
                    {
                      label: "Birth date",
                      value: user.birthDate?.toLocaleDateString() ?? "N/A",
                    },
                    { label: "Occupation", value: user.occupation ?? "N/A" },
                    {
                      label: "Affiliation",
                      value:
                        user.affiliation.length > 0 ? (
                          <ul className="list-disc pl-4">
                            {user.affiliation
                              .sort((a, b) => b.length - a.length)
                              .map((affiliation) => (
                                <li key={affiliation}>
                                  {affiliation.replace("_", " ")}
                                </li>
                              ))}
                          </ul>
                        ) : (
                          "N/A"
                        ),
                    },
                    { label: "Location", value: user.location ?? "N/A" },
                    {
                      label: "PPI Cabang",
                      value: user.ppicabang ?? "N/A",
                    },
                    {
                      label: "Updated Info",
                      value: user.updated ? "Yes" : "No",
                    },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <span className="font-bold">{label}: </span>
                      {value}
                    </div>
                  ))}
                </Card>
                <UserForm user={user} />
              </div>
            )}
          </Protected>
        </div>
      </Base>
    </>
  );
};

