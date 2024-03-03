import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: !!process.env.ANALYZE,
});

const nextConfig = withBundleAnalyzer({
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    serverComponentsExternalPackages: ['@node-rs/bcrypt', '@node-rs/jsonwebtoken'],
  },
});

export default nextConfig;
