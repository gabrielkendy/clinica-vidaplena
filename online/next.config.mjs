/** @type {import('next').NextConfig} */
const nextConfig = {
  // Garante que TODOS os arquivos do lab (site, banco de dados e o .env plantado)
  // entrem no pacote da função serverless — a função lê tudo via fs.
  outputFileTracingIncludes: {
    "/*": ["./assets/**", "./data/**", "./.env"],
    "/**/*": ["./assets/**", "./data/**", "./.env"],
    "/[[...slug]]/route": ["./assets/**", "./data/**", "./.env"],
  },
};

export default nextConfig;
