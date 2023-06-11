module.exports = {
  /**
   * https://www.dianjilingqu.com/652649.html
   * `reactStrictMode`: true，会导致重复渲染，接口调用两次，据说生产环境没问题，测试环境有这个问题
   */
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:8888/:path*',
      },
    ];
  },
};
