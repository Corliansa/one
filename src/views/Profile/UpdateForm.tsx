import { Button, TextInputField } from "evergreen-ui";
import React, { useState } from "react";
import type { RouterOutputs } from "../../utils/trpc";
import { trpc } from "../../utils/trpc";
import { SelectField } from "evergreen-ui";
import { ListPPICabang } from "../../Components/optionsList/ListPPICabang";

export const UpdateProfileForm: React.FC<{
  user: RouterOutputs["user"]["getUser"];
}> = ({ user }) => {
  const [name, setName] = useState(user.name ?? "");
  const [birthDate, setBirthDate] = useState(
    user?.birthDate ? (user?.birthDate).toISOString().slice(0, 10) : "",
  );
  const [ppicabang, setPpiCabang] = useState(user?.ppicabang ?? "");
  const [occupation, setOccupation] = useState(user?.occupation ?? "");
  const [location, setLocation] = useState(user?.location ?? "");

  const queryClient = trpc.useContext();
  const { mutateAsync: updateUser, isLoading } =
    trpc.user.updateUser.useMutation({
      onSuccess: () => {
        queryClient.user?.getUser?.invalidate();
        window.location.reload();
      },
    });

  const isProfileUpdated = !user.updated;

  return (
    <div className="flex flex-col">
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
        required={isProfileUpdated}
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
        <option value="doctor">Researcher</option>
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
      <Button
        onClick={async () =>
          await updateUser({
            name,
            birthDate: birthDate ? new Date(birthDate) : undefined,
            occupation,
            location,
            ppicabang,
          })
        }
        isLoading={isLoading}
      >
        Save
      </Button>
    </div>
  );
};
