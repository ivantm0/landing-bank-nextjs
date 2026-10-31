import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hay otro package-lock.json en carpetas superiores: fija la raíz en este proyecto
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
