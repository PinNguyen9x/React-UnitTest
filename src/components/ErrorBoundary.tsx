import React, { useState, useEffect } from "react";
import * as Sentry from "@sentry/react";

interface Props {
  fallback?: any;
  children?: any;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

const useErrorBoundary = () => {
  const [state, setState] = useState<ErrorBoundaryState>({ hasError: false });

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      setState({ hasError: true, error: error.error });
      Sentry.captureException(error.error);
    };

    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  return state;
};

const ErrorBoundary: React.FC<Props> = ({ children, fallback }) => {
  const { hasError } = useErrorBoundary();

  if (hasError) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h1>Something went wrong</h1>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white border-none rounded hover:bg-blue-700 cursor-pointer"
          >
            Refresh Page
          </button>
        </div>
      )
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default ErrorBoundary;
