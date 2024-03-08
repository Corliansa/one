import { type NextPage } from "next";
import Head from "next/head";

import { Base, Protected } from "../../Components";

import { trpc } from "../../utils/trpc";
import ProfileInfo from "./ProfileInfo";
import { UpdateProfileForm } from "./UpdateForm";

export const Profile: NextPage = () => {
  const { data: user, isLoading } = trpc.user.getUser.useQuery();

  return (
    <>
      <Head>
        <title>ONE | Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title="Profile">
        <div className="py-4">
          <Protected redirectTo="/">
            {!isLoading && user && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ProfileInfo user={user} />
                <UpdateProfileForm user={user} />
              </div>
            )}
          </Protected>
        </div>
      </Base>
    </>
  );
};
