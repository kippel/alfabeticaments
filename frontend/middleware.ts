import createMiddleware from 'next-intl/middleware';

const locales = ['ca', 'es'] as const;
const defaultLocale = 'ca' as (typeof locales)[number];

export default createMiddleware({
  locales,
  defaultLocale
});

export const config = {
  matcher: [
    '/',
    '/(ca|es)/:path*',
    '/dash/:path*'
  ]
};


