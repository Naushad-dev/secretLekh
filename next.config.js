/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {},
    // Prevent bundling firebase-admin in client code
    serverExternalPackages: ['firebase-admin'],
};

module.exports = nextConfig;
