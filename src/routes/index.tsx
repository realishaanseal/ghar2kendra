import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Ghar2Kendra</h1>
        <p className="mt-2 text-sm opacity-70">
          घर से केंद्र तक — from your doorstep to the government office.
        </p>
      </div>
    </main>
  );
}
