import type { Config } from "@react-router/dev/config";

export default {
  // Mode SPA : pas de rendu côté serveur, GitHub Pages n'héberge que des fichiers statiques
  ssr: false,
  // Le site est servi dans le sous-dossier /TodoList/
  basename: "/TodoList/",
} satisfies Config;
