'use client';

import { I18nextProvider } from 'react-i18next';
import { useMemo } from 'react';
import initTranslations from '@/app/i18n';
import { createInstance } from 'i18next';

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}: {
  children: React.ReactNode;
  locale: string;
  namespaces: string[];
  resources: Record<string, unknown>;
}) {
  const instance = useMemo(() => {
    const i18nInstance = createInstance();
    void initTranslations(locale, namespaces, i18nInstance, resources);
    return i18nInstance;
  }, [locale, namespaces, resources]);

  return <I18nextProvider i18n={instance} defaultNS={namespaces[0]}>{children}</I18nextProvider>;
}
