import { Toaster } from "react-hot-toast";

export function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className:
          "bg-background text-foreground border border-border shadow-lg rounded-lg px-4 py-2",
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          borderColor: "hsl(var(--border))",
        },
      }}
    />
  );
}
