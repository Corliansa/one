import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ClimbingBoxLoader } from "react-spinners";
import { FormSuccess, FormError } from "../../../Components/ui";
import { trpc } from "../../../utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const VerifyTokenForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenToVerify = searchParams.get("token");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { data: session } = useSession();
  const queryClient = trpc.useContext();

  const { mutateAsync: verifyUniVerificationToken, isLoading } =
    trpc.token.verifyUniVerificationToken.useMutation({
      onSuccess: () => {
        queryClient.token.getVerificationTokenByUserId.invalidate();
      },
    });

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!session?.user?.universityEmail) {
      setError("User not found");
      return;
    }

    if (!tokenToVerify) {
      setError("Token not found");
      return;
    }
    verifyUniVerificationToken({
      token: tokenToVerify,
      email: session.user.universityEmail,
    })
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);

        setTimeout(() => {
          router.push("/dashboard");
        }, 5000);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [
    tokenToVerify,
    success,
    error,
    session?.user?.universityEmail,
    verifyUniVerificationToken,
  ]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      <div className="mb-3 flex w-full flex-col items-center justify-center gap-3">
        <h1 className="p-4 text-3xl font-bold">Konfirmasi Verifikasi</h1>

        {(!success && !error) || (isLoading && <ClimbingBoxLoader />)}

        {success && (
          <div className="flex w-full flex-col items-center justify-center">
            <h1>Verifikasi berhasil!</h1>
            <p>
              Anda telah terverifikasi sebagai student. Anda akan dikembalikan
              dalam 5 detik ke dashboard.
            </p>
          </div>
        )}

        <p>{tokenToVerify}</p>
      </div>

      <div className="flex flex-col gap-2">
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </>
  );
};
