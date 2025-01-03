import { useState } from "react";

const ErrorThrower = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("This is a test error for Sentry");
  }

  return (
    <div className="p-4">
      <button
        onClick={() => setShouldThrow(true)}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Trigger Error
      </button>
    </div>
  );
};

export default ErrorThrower;
