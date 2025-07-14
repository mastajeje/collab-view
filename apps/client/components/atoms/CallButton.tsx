interface CallButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export const CallButton = ({
  label,
  onClick,
  variant = "primary",
}: CallButtonProps) => {
  const base = "px-4 py-2 rounded font-medium";
  const styles = {
    primary: `${base} bg-blue-500 text-white hover:bg-blue-600`,
    secondary: `${base} bg-gray-300 hover:bg-gray-400`,
  };

  return (
    <button onClick={onClick} className={`${styles[variant]}`}>
      {label}
    </button>
  );
};
