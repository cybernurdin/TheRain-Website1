import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TheRain",
    short_name: "TheRain",
    description: "Ride, delivery, and transport services in Cameroon.",
    start_url: "/",
    display: "standalone",
    background_color: "#060E1F",
    theme_color: "#0A84FF",
    icons: [
      {
        src: "/images/favicon.png",
        sizes: "192x192",
        type: "image/png"
      }
    ]
  };
}
