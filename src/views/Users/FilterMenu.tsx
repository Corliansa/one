import { Select } from "evergreen-ui";
import { Statuses } from "../../types";
import { Verifications } from "../../types";
import { Roles } from "../../types";
import { omit } from "../../utils/omit";
import { useRouter } from "next/router";

export const Filter: React.FC = () => {
  const { query, replace } = useRouter();

  const handleSelectChange =
    (filterType: "role" | "verification" | "status" | "occupation") =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      replace({
        query: e.target.value
          ? { ...query, [filterType]: e.target.value } // Use computed property names [] to dynamically set the correct filter type
          : omit(query, filterType),
      });
    };

  return (
    <div className="flex flex-col gap-0 rounded-lg bg-white/20 sm:flex-row sm:gap-2">
      <Select onChange={handleSelectChange("role")}>
        <option value="">All Roles</option>
        {Roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </Select>
      <Select onChange={handleSelectChange("verification")}>
        <option value="">All Verifications</option>
        {Verifications.map((verification) => (
          <option key={verification} value={verification}>
            {verification}
          </option>
        ))}
      </Select>
      <Select onChange={handleSelectChange("status")}>
        <option value="">All Statuses</option>
        {Statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </Select>
    </div>
  );
};
