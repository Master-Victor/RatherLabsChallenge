/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['interactive-examples.mdn.mozilla.net', '48tools.com'], formats: ['image/avif', 'image/webp'], }
}

module.exports = nextConfig
