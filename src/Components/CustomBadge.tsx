// CustomBadge.tsx

interface CustomBadgeProps {
  color?: "neutral" | "blue" | "green" | "purple" | "orange" | "gray";
  children: React.ReactNode;
  className?: string;
}

export const CustomBadge = ({
  color = "gray",
  children,
  className = "",
}: CustomBadgeProps) => {
  // Define a mapping from color props to Tailwind CSS classes
  const colorClassMapping = {
    neutral: "bg-gray-600 text-gray-800",
    blue: "bg-blue-500 text-white",
    green: "bg-green-500 text-white",
    purple: "bg-purple-500 text-white",
    orange: "bg-orange-500 text-white",
    gray: "bg-gray-500 text-white", // Default color
  };

  // Combine the base classes with the color-specific classes
  const badgeClasses = `inline-block rounded-md px-2 py-1 text-sm font-medium ${colorClassMapping[color]} ${className}`;

  return <div className={badgeClasses}>{children}</div>;
};
