import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";
import { PriceList } from "@/components/price-list";

export const Route = createFileRoute("/profile")({
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 py-6">
      <header className="glass neu rounded-3xl p-6 md:p-8">
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          <User className="h-7 w-7 text-primary" />
          Личный кабинет
        </h1>
        <p className="mt-2 text-muted-foreground">
          Управляйте профилем, ценами и настройками рабочих инструментов.
        </p>
      </header>

      <PriceList />
    </div>
  );
}
