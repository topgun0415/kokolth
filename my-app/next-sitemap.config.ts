import { IConfig } from 'next-sitemap';

const config: IConfig = {
  siteUrl: 'https://kokolth.com',
  generateRobotsTxt: true,
  outDir: 'public',
  exclude: ['/admin'],
  changefreq: 'daily',
  priority: 0.7,
};

export default config;