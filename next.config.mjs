import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: true,
});

const nextConfig = withBundleAnalyzer({
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    serverComponentsExternalPackages: ['@node-rs/bcrypt', '@node-rs/jsonwebtoken'],
  },
});

export default nextConfig;
