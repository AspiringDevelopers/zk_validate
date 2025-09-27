/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Enable modern bundling for better Node.js 22+ compatibility
    esmExternals: true,
  },
  // Ensure compatibility with Node.js 22+
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        'snarkjs': 'commonjs snarkjs',
        'circomlib': 'commonjs circomlib'
      });
    }
    return config;
  },
}

module.exports = nextConfig
