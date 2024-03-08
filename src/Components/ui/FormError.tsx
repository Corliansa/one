import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface FormErrorProps {
  message: string | undefined;
}

export const FormError: React.FC<FormErrorProps> = ({
  message,
}: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-red-300 text-red-800 flex items-center gap-x-2 rounded-md p-3 text-sm">
      <ExclamationTriangleIcon className="h-10 w-10" />
      <p>{message}</p>
    </div>
  );
};
