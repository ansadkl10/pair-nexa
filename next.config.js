/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Turbopack എറർ ഒഴിവാക്കാൻ ഇത് സഹായിക്കും
  turbopack: {}, 
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false,
      child_process: false 
    };
    return config;
  },
}

module.exports = nextConfig;
