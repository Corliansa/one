import { useState, useEffect } from "react";
import { Button, TextInputField, Combobox, Checkbox } from "evergreen-ui";
import type { University } from "../../types";
import { Universities } from "../../Components/optionsList/de-university-list";
import { trpc } from "../../utils/trpc";
import { FormError } from "../../Components/ui/FormError";
import { FormSuccess } from "../../Components/ui/FormSuccess";
import { useSession } from "next-auth/react";

const universityList: University[] = Universities as University[];

export const VerifyFormUni: React.FC = () => {
  const { data: userIdAndEmail } = trpc.user.getUserUniEmailAndId.useQuery();
  const { data: session } = useSession();

  const [universityEmail, setUniversityEmail] = useState(
    session?.user?.universityEmail || "",
  );
  const [university, setUniversity] = useState<University | null>(null);
  // function that updates the name only
  useEffect(() => {
    if (session?.user?.universityName) {
      const initialUniversity = universityList.find(
        (u) => u.name === session?.user?.universityName,
      );
      setUniversity(initialUniversity || null);
    }
  }, [session?.user?.universityName]);

  const verificationStatus = session?.user?.verification;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [checkedPrivacy, setCheckedPrivacy] = useState(false);
  const queryClient = trpc.useContext();
  const generateTokenMutation =
    trpc.token.generateVerificationToken.useMutation();
  const sendVerificationTokenMutation =
    trpc.token.sendVerificationToken.useMutation();

  const handleSendVerificationEmail = async () => {
    if (userIdAndEmail?.id && userIdAndEmail.universityEmail) {
      try {
        const result = await generateTokenMutation.mutateAsync({
          id: userIdAndEmail.id,
          email: userIdAndEmail.universityEmail,
        });

        if (!result.success) {
          return setError(result.message);
        }
        // If successful, you might want to do something with the result
        
        const result2 = await sendVerificationTokenMutation.mutateAsync({
          email: userIdAndEmail.universityEmail,
          token: result.token!,
        });
        return result2;
      } catch (error) {
        console.error("Error generating verification token:", error);
      }
    } else {
      console.error("Session user ID or email is undefined.");
    }
  };

  const { mutateAsync: updateUserUniEmailAndUni, isLoading } =
    trpc.user.updateUserUniEmailAndUni.useMutation({
      onSuccess: () => queryClient.user?.getUser.invalidate(),
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (verificationStatus === "VERIFIED") {
      return setError("User is already verified.");
    }

    if (!university) {
      return setError("Please select a university.");
    }

    if (
      universityEmail &&
      university &&
      !university.domains.some((domain) => universityEmail.endsWith(domain))
    ) {
      return setError("Email must be from the selected university.");
    }

    if (!checkedPrivacy) {
      return setError("Please agree to the terms and conditions.");
    }

    await updateUserUniEmailAndUni({
      universityEmail,
      universityName: university.name,
    });

    const sendResult = await handleSendVerificationEmail();
    if (sendResult && !sendResult.success) {
      return setError(sendResult.message);
    } else {
      return setSuccess(
        sendResult?.message || "Verification email sent successfully",
      );
    }
  };
  return (
    <>
      <h1 className="pb-3 text-center text-2xl font-semibold">
        Verifikasi Universitas
      </h1>
      <p className="mb-5">
        Masukkan email universitas anda untuk memverifikasi status student anda.
        Anda akan dikirimkan email verifikasi ke alamat email universitas anda,
        yang mana anda harus memverifikasi dalam jangka waktu{" "}
        <span className="font-bold">10 menit</span>.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Pilih universitas anda saat ini
          </label>
          <Combobox
            placeholder="Universitas"
            items={universityList}
            itemToString={(universityList) =>
              universityList ? universityList.name : ""
            }
            disabled={isLoading}
            width="100%"
            onChange={(selected: University) => {
              setUniversity(selected);
              console.log(selected);
            }}
          />
          <TextInputField
            marginTop={8}
            marginBottom={24}
            label="University Email"
            type="email"
            placeholder="nicole@tu-jerman.de"
            value={universityEmail}
            disabled={isLoading}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUniversityEmail(e.target.value)
            }
          />

          <Checkbox
            label="Dengan ini, anda setuju dengan kebijakan privasi kami dan memberikan informasi secara jujur."
            checked={checkedPrivacy}
            disabled={isLoading}
            onChange={(e) => setCheckedPrivacy(e.target.checked)}
          />

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            isLoading={isLoading}
            appearance="primary"
            disabled={session?.user?.verification === "VERIFIED"}
          >
            Verifikasi Email Universitas
          </Button>
        </div>
      </form>
    </>
  );
};
