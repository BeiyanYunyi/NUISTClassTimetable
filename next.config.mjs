import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: !!process.env.ANALYZE,
});

const nextConfig = withBundleAnalyzer({});

export default nextConfig;
