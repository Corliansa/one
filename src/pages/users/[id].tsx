import type { NextPage } from "next";
import { useRouter } from "next/router";
import { User } from "../../views/User";

const UserPage: NextPage = () => {
  const { query } = useRouter();
  return (
    <>
      <User userId={query.id as string} />
    </>
  );
};

export default UserPage;
