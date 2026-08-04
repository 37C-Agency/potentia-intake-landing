import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');

export default defineConfig({
  site: env.PUBLIC_SITE_URL || 'https://book.potentiaclinics.com',
  prefetch: true,
  image: {
    domains: ['a.storyblok.com', 'a-eu.storyblok.com'],
  },
  // Allow the dev server to be reached via cloudflare quick tunnels and tailscale
  // funnels (Vite blocks unknown Host headers by default in dev).
  vite: {
    server: {
      allowedHosts: ['.trycloudflare.com', '.ts.net'],
    },
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      bridge: env.NODE_ENV !== 'production',
      apiOptions: { region: 'eu' },
      components: {
        page: 'storyblok/Page',
        topBar: 'storyblok/TopBar',
        hero: 'storyblok/Hero',
        trustStrip: 'storyblok/TrustStrip',
        fourSituations: 'storyblok/FourSituations',
        benefits: 'storyblok/Benefits',
        process: 'storyblok/Process',
        costComparison: 'storyblok/CostComparison',
        socialProof: 'storyblok/SocialProof',
        about: 'storyblok/About',
        faq: 'storyblok/Faq',
        finalCta: 'storyblok/FinalCta',
        footer: 'storyblok/Footer',
        stickyMobileBar: 'storyblok/StickyMobileBar',
      },
    }),
  ],
});
