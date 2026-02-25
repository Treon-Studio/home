'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <h2 className="text-text-primary text-xl font-medium">Something went wrong</h2>
      <p className="text-text-secondary text-sm">{error.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={reset}
        className="bg-theme-3 text-text-primary rounded-full px-6 py-2 text-sm transition-opacity hover:opacity-80"
      >
        Try again
      </button>
    </div>
  );
}
