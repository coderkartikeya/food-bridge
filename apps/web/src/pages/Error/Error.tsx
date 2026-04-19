/**
 * FoodBridge Global Error Boundary
 * Catches runtime exceptions and 404s thrown by React Router loaders or components.
 * Provides a user-friendly fallback UI with navigation recovery.
 */
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as any;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        {error?.statusText || error?.message || "We encountered an unexpected error while loading this page."}
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default ErrorPage;