import React from "react";
import { UpdateProfileFormFirstLogin } from "./UpdateFormFirstLogin";
import { ProtectedUpdate } from "./ProtectedUpdate";
import { trpc } from "../../../../utils/trpc";
import { Card } from "../../../../Components/Card";
import type { NextPage } from "next";
import { Logo } from "../../../../Components";

const UpdateProfilePage: NextPage = () => {
  const { data: user, isLoading } = trpc.user.getUser.useQuery();
  return (
    <ProtectedUpdate redirectTo="/">
      {!isLoading && user && (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <Card className="p-10">
            <Logo />
            <h1 className="p-10 text-center text-3xl font-bold">Data Diri</h1>
            <UpdateProfileFormFirstLogin user={user} />
          </Card>
        </div>
      )}
    </ProtectedUpdate>
  );
};

export default UpdateProfilePage;
