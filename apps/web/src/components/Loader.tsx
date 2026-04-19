/**
 * FoodBridge Global Loading System
 * Provides a highly polished, brand-consistent spinner and a higher-order wrapper 
 * for React Suspense to handle lazy-loaded route transitions gracefully.
 */
import React, { Suspense } from "react";

export const Loader = ({ fullPage = false }: { fullPage?: boolean }) => {
  const containerClasses = fullPage 
    ? "fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex items-center justify-center" 
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClasses}>
      <div className="w-10 h-10 border-4 border-green-100 border-t-green-600 rounded-full animate-spin" />
    </div>
  );
};

export const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Loader fullPage />}>
    <Component />
  </Suspense>
);