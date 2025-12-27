"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div
      className="h-screen flex flex-col justify-center items-center gap-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/error-page.png')" }}
    >
      <h2 className="text-white text-2xl font-bold">Login error</h2>
      <p className="text-white">{error.message}</p>

      <button
        onClick={reset}
        className="border rounded-md px-4 py-2 bg-white text-black hover:bg-gray-200"
      >
        Try again
      </button>
    </div>
  );
}
