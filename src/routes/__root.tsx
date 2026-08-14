import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header"; 

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="dark">
      {/* Главная обертка приложения */}
      <div className="relative flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        
        {/* Шапка сайта */}
        <Header />
        
        {/* Контент текущей страницы (Калькуляторы, Схемы и т.д.) */}
        <main className="flex-1">
          <Outlet />
        </main>
        
      </div>
      <ScrollRestoration />
    </ThemeProvider>
  );
}
