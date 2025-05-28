export const ToolButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  <button onClick={onClick}>{children}</button>;
};
