/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self'",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

const nextConfig = (phase, { defaultConfig }) => {
  return {
    reactStrictMode: true,
    images: {
      formats: ["image/avif", "image/webp"],
      // domains: ['cdn.shopify.com', 'api.pluginsthatknock.com'],

      remotePatterns: [
        // {
        //   protocol: "https",
        //   hostname: "*.amazonaws.com",
        //   port: "",
        // },
        {
          protocol: "https",
          hostname: "cdn.shopify.com",
          port: "",
        },
        {
          protocol: "https",
          hostname: "api.pluginsthatknock.com",
          port: "",
        },
        // localhost
        {
          protocol: "http",
          hostname: "localhost",
          port: "4500",
        },
      ],
    },
    typescript: { ignoreBuildErrors: true },
    eslint: { ignoreDuringBuilds: true },
    redirects: async () => {
      return [
        {
          source: "/pages/contact",
          destination: "/contact-us",
          permanent: true,
        },
        {
          source: "/collections/frontpage",
          destination: "/",
          permanent: true,
        },
        {
          source: "/collections/all",
          destination: "/",
          permanent: true,
        },
        {
          source: "/collections",
          destination: "/",
          permanent: true,
        },
      ];
    },
    headers: async () => {
      return [
        {
          source: "/",
          headers: securityHeaders,
        },
        {
          source: "/knock",
          headers: securityHeaders,
        },
        {
          source: "/knock-clipper",
          headers: securityHeaders,
        },
        {
          source: "/drums-that-knock",
          headers: securityHeaders,
        },
        {
          source: "/faqs",
          headers: securityHeaders,
        },
        {
          source: "/policies/terms-of-service",
          headers: securityHeaders,
        },
        {
          source: "/policies/privacy-policy",
          headers: securityHeaders,
        },
        {
          source: "/policies/refund-policy",
          headers: securityHeaders,
        },
        {
          source: "/policies/shipping-policy",
          headers: securityHeaders,
        },
        {
          source: "/products/:path",
          headers: securityHeaders,
        },
        {
          source: "/boutique/:path",
          headers: securityHeaders,
        },
      ];
    },
  };
};

module.exports = nextConfig;
