// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { homedir } from "node:os";
import { join } from "node:path";

export default defineConfig({
  vite: {
    // Keep Vite's mutable optimizer cache off both the WSL-mounted Windows
    // drive (where atomic renames can be locked) and the size-limited /tmp.
    cacheDir: join(homedir(), ".cache", "paul-and-timothy-vite"),
    server: {
      // Files live on /mnt/c (Windows drive via WSL); inotify events don't fire
      // there, so the dev server never sees changes without polling.
      watch: { usePolling: true },
      // Allow the current ngrok hostname to proxy browser/webhook requests locally.
      allowedHosts: ["claw-headdress-guts.ngrok-free.dev"],
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Vercel is the production target; Lovable builds still force their own preset.
  nitro: {
    preset: "vercel",
    experimental: { tasks: true },
    tasks: {
      "razorpay:reconcile": {
        handler: join(process.cwd(), "src/tasks/razorpay-reconcile.ts"),
        description: "Reconcile unresolved Razorpay payment attempts",
      },
    },
    scheduledTasks: {
      "0 3 * * *": ["razorpay:reconcile"],
    },
  },
});
