import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/how-it-works.html", destination: "/how-it-works", permanent: true },
      { source: "/privacy-policy.html", destination: "/privacy-policy", permanent: true },
      { source: "/terms-of-service.html", destination: "/terms-of-service", permanent: true },
      { source: "/data-deletion.html", destination: "/data-deletion", permanent: true },
      { source: "/terms.html", destination: "/terms", permanent: true },
      { source: "/article1.html", destination: "/blog/therain-launches-in-yaounde", permanent: true },
      { source: "/article2.html", destination: "/blog/school-transport-child-safety", permanent: true },
      { source: "/article3.html", destination: "/blog/driver-earnings-tips-cameroon", permanent: true }
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
