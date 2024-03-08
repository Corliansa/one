import { Button, Checkbox, SelectField, TextInputField } from "evergreen-ui";
import React, { useState } from "react";
import { ListPPICabang } from "../../../../Components/optionsList/ListPPICabang";
import type { RouterOutputs } from "../../../../utils/trpc";
import { trpc } from "../../../../utils/trpc";

export const UpdateProfileFormFirstLogin: React.FC<{
  user: RouterOutputs["user"]["getUser"];
}> = ({ user }) => {
  const [name, setName] = useState(user.name ?? "");
  const [birthDate, setBirthDate] = useState<string | undefined>(undefined);
  const [expectedGraduation, setExpectedGraduation] = useState<
    string | undefined
  >(undefined);
  const [ppicabang, setPpiCabang] = useState(user?.ppicabang ?? "");
  const [occupation, setOccupation] = useState(user?.occupation ?? "");
  const [location, setLocation] = useState(user?.location ?? "");
  const [bundesland, setBundesland] = useState("berlin");
  const [fieldOfStudy, setFieldOfStudy] = useState("");

  const [checkedPrivacy, setCheckedPrivacy] = useState(false);
  const queryClient = trpc.useContext();

  const { mutateAsync: updateUserByIdLogin, isLoading } =
    trpc.user.updateUserByIdLogin.useMutation({
      onSuccess: async () => {
        await queryClient.user.getUserById.invalidate({ id: user.id });
        console.log("user updated");
        window.location.reload();
      },
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check privacy
    if (!checkedPrivacy) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    await updateUserByIdLogin({
      id: user.id,
      name,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      occupation,
      location,
      ppicabang,
      bundesland,
      fieldOfStudy: ["bachelor", "master", "doctor"].includes(occupation)
        ? fieldOfStudy
        : undefined,
      expectedGraduation: ["bachelor", "master", "doctor"].includes(occupation)
        ? expectedGraduation
        : undefined,
    });
  };

  const isProfileUpdated = !user.updated;

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <TextInputField
          marginBottom={8}
          label="Name"
          value={name}
          disabled={isLoading}
          required={isProfileUpdated}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <TextInputField
          marginBottom={8}
          label="Birth Date"
          type="date"
          disabled={isLoading}
          value={birthDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBirthDate(e.target.value)
          }
        />
        <SelectField
          marginBottom={8}
          label="Occupation"
          value={occupation}
          disabled={isLoading}
          required={isProfileUpdated}
          description="Select your occupation"
          onChange={(e) => setOccupation(e.target.value)}
        >
          <option value="ausbildung">Ausbildung</option>
          <option value="bachelor">Bachelor</option>
          <option value="master">Master</option>
          <option value="doctor">Doctor</option>
          <option value="professor">Professor</option>
        </SelectField>
        {["bachelor", "master", "doctor"].includes(occupation) && (
          <>
            <TextInputField
              marginBottom={8}
              label="Field Of Study "
              value={fieldOfStudy}
              disabled={isLoading}
              required={
                isProfileUpdated &&
                ["bachelor", "master", "doctor"].includes(occupation)
              }
              description="Select your occupation"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldOfStudy(e.target.value)
              }
            />
            <TextInputField
              marginBottom={8}
              label="Expected Graduation Date"
              type="date"
              disabled={isLoading}
              value={expectedGraduation}
              required={
                isProfileUpdated &&
                ["bachelor", "master", "doctor"].includes(occupation)
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setExpectedGraduation(e.target.value)
              }
            />
          </>
        )}
        <SelectField
          marginBottom={8}
          required={isProfileUpdated}
          disabled={isLoading}
          value={bundesland}
          label="Federal State"
          onChange={(e) => setBundesland(e.target.value)}
        >
          <option value="hamburg">Hamburg</option>
          <option value="bremen">Bremen</option>
          <option value="thüringen">Thüringen</option>
          <option value="bayern">Bayern</option>
          <option value="nordrhein-westfalen">Nordrhein Westfalen</option>
          <option value="baden-württemberg">Baden Württemberg</option>
          <option value="berlin">Berlin</option>
          <option value="niedersachsen">Niedersachsen</option>
          <option value="hessen">Hessen</option>
          <option value="rheinland-pfalz">Rheinland-Pfalz</option>
          <option value="brandenburg">Brandenburg</option>
          <option value="sachsen">Sachsen</option>
          <option value="sachsen-anhalt">Sachsen-Anhalt</option>
          <option value="mecklenburg-vorpommern">Mecklenburg-Vorpommern</option>
          <option value="schleswig-holstein">Schleswig-Holstein</option>
          <option value="saarland">Saarland</option>
        </SelectField>

        <TextInputField
          marginBottom={12}
          label="Location"
          value={location}
          disabled={isLoading}
          required={isProfileUpdated}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLocation(e.target.value)
          }
        />
        <SelectField
          marginBottom={8}
          label="PPI Cabang"
          required={isProfileUpdated}
          value={ppicabang}
          disabled={isLoading}
          description="PPI Cabang terdekat dari lokasi domisili anda di Jerman"
          onChange={(e) => setPpiCabang(e.target.value)}
        >
          {ListPPICabang.map((ppi) => {
            return (
              <option key={ppi.value} value={ppi.value}>
                {ppi.label}
              </option>
            );
          })}
        </SelectField>

        <Checkbox
          label="Dengan ini, anda setuju dengan kebijakan privasi kami."
          checked={checkedPrivacy}
          disabled={isLoading}
          onChange={(e) => setCheckedPrivacy(e.target.checked)}
        />

        <Button type="submit" isLoading={isLoading} className="mt-10 w-full">
          Save
        </Button>
      </form>
    </div>
  );
};
