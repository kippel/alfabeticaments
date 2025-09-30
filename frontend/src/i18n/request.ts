import {getRequestConfig} from 'next-intl/server';

const supportedLocales = ['ca', 'es'] as const;
type SupportedLocale = (typeof supportedLocales)[number];

export default getRequestConfig(async ({locale}) => {
  const selectedLocale: SupportedLocale = supportedLocales.includes(locale as SupportedLocale)
    ? (locale as SupportedLocale)
    : 'ca';

  return {
    locale: selectedLocale,
    messages: (await import(`../../messages/${selectedLocale}.json`)).default
  };
});