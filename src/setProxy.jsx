import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.vworld.kr/req/address",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // "/api" 경로를 제거하여 원래의 API URL을 생성합니다.
      },
    })
  );
};
