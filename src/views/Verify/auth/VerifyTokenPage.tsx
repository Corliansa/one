import { useRouter } from "next/router";
import { VerifyTokenForm } from "./VerifyTokenForm";
import { Button } from "evergreen-ui";
import { Card, Protected } from "../../../Components";

export const VerifyTokenPage = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Protected>
        <Card>
          <Button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Back to dashboard
          </Button>
          <VerifyTokenForm />
        </Card>
      </Protected>
    </div>
  );
};
