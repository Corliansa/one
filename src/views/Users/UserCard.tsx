import Link from "next/link";
import { Card } from "../../Components";
import { capitalize } from "../../utils/capitalize";
import type { RouterOutputs } from "../../utils/trpc";

type UserCardProps = {
  user: RouterOutputs["user"]["getUser"];
};

export const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <Link key={user.id} href={`/users/${user.id}`}>
    <Card>
      <div className="flex h-20 flex-col justify-center">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p>{user.email}</p>
        <p>
          {capitalize(user.role)} | {capitalize(user.verification)} |{" "}
          {capitalize(user.status)}
        </p>
      </div>
    </Card>
  </Link>
);
