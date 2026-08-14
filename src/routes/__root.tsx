import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar"; 

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        
        {/* Левое боковое меню (восстановлено) */}
        <AppSidebar />
        
        {/* Правая часть: Шапка + Основной контент */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
        
      </div>
      <ScrollRestoration />
    </ThemeProvider>
  );
}
