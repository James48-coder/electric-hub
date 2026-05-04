import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/calculators")({
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="glass rounded-3xl p-10">
        <h1 className="text-3xl font-bold tracking-tight capitalize">calculators</h1>
        <p className="mt-3 text-muted-foreground">Этот раздел скоро появится. Мы готовим инструменты, проверенные практикой.</p>
      </div>
    </div>
  );
}
