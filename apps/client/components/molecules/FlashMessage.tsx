import { useEffect, useState } from "react";

export const FlashMessage = ({
  message,
  duration,
}: {
  message: string;
  duration: number;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
      {isVisible && (
        <div
          className="absolute right-0 bottom-0 mb-4 w-auto rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{message}</span>
        </div>
      )}
    </>
  );
};
