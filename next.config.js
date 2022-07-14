/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  async rewrite(){
    return [
      // {
      //   source: '/api/neuip/:path*',
      //   destination: 'https://cloud.nueip.com/neuip/:path'
      // },
      {
        source: '/NEUIP/:path*',
        destination: 'https://cloud.nueip.com/neuip/:path'
      }
    ]
  }
}

module.exports = nextConfig
