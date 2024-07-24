/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/api/condominios',
        destination: process.env.API_URL,
        permanent: true,
      },
      {
        source: '/api/condominios/:id',
        destination: `${process.env.API_URL}/:id`,
        permanent: true,
      }
    ]
  },
};

export default nextConfig;
