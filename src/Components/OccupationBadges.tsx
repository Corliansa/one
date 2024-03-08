import { CustomBadge } from "./CustomBadge";

interface OccupationBadgesProps {
  occupation: string;
  className?: string;
}

// Define a TypeScript type for occupation colors
type OccupationColor = {
  [key: string]: "neutral" | "blue" | "green" | "purple" | "orange";
};

const occupationColors: OccupationColor = {
  ausbildung: "neutral",
  bachelor: "blue",
  master: "green",
  doctor: "purple",
  researcher: "orange",
};

export const OccupationBadges: React.FC<OccupationBadgesProps> = ({
  occupation,
  className,
}: OccupationBadgesProps) => {
  // Determine the badge color based on the occupation, defaulting to "neutral" if not found
  const badgeColor =
    occupationColors[occupation as keyof OccupationColor] || "neutral";

  return (
    <div className={className}>
      <CustomBadge color={badgeColor}>
        {occupation.charAt(0).toUpperCase() + occupation.slice(1)}
      </CustomBadge>
    </div>
  );
};
