'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="min-h-screen bg-base-light-subtle flex flex-col items-center justify-center px-6 md:px-8 lg:px-12">
      <h1 className="text-h2 text-base-dark mb-2">
        {t('title')}
      </h1>
      <p className="text-body-lg text-base-dark/70 mb-6">{t('description')}</p>
      <Link
        href="/"
        className="bg-base-dark text-base-light px-6 py-3 rounded-full font-medium hover:bg-base-dark/90 transition-colors"
      >
        {t('backHome')}
      </Link>
    </div>
  );
}
