import { Card } from "../../Components";
import { capitalize } from "../../utils/capitalize";
import type { RouterOutputs } from "../../utils/trpc";
import ProfileDetails from "./ProfileDetails";

type UserInfoProps = {
  user: RouterOutputs["user"]["getUser"];
};

const ProfileInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <Card>
      <h2 className="text-xl font-semibold">{user.name}</h2>

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
        { label: "Occupation", value: capitalize(user.occupation ?? "N/A") },
        {
          label: "Affiliation",
          value:
            user.affiliation.length > 0 ? (
              <ul className="list-disc pl-4">
                {user.affiliation
                  .sort((a, b) => b.length - a.length)
                  .map((affiliation) => (
                    <li key={affiliation}>{affiliation.replace("_", " ")}</li>
                  ))}
              </ul>
            ) : (
              "N/A"
            ),
        },
        { label: "Location", value: capitalize(user.location ?? "N/A") },
        { label: "PPI Cabang", value: user.ppicabang ?? "N/A" },
      ].map(({ label, value }) => (
        <ProfileDetails key={label} label={label} value={value} />
      ))}
    </Card>
  );
};

export default ProfileInfo;
