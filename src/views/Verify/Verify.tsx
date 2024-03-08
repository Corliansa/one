import Head from "next/head";
import { Base, Protected, Card } from "../../Components";
import { VerifyFormUni } from "./VerifyFormUni";
import { VerifyFormAusbildung } from "./VerifyFormAusbildung";
import { useSession } from "next-auth/react";
import { OccupationBadges } from "../../Components/OccupationBadges";
const VerifyPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>ONE | Verify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Protected redirectTo="/">
        <Base title="Verification Page">
          <div className="my-3 flex flex-row items-center justify-start gap-3">
            <h1 className="text-xl font-semibold">Status:</h1>
            <OccupationBadges occupation={session?.user?.occupation || ""} />
          </div>
          <div className="flex flex-col gap-2 py-4">
            <Card>
              <VerifyFormUni />
            </Card>
            <Card>
              <VerifyFormAusbildung />
            </Card>
          </div>
        </Base>
      </Protected>
    </>
  );
};

export default VerifyPage;
