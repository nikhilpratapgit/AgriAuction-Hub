import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-green-600 text-white py-6 dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm">{t('footer.copyright', { year: 2025 })}</p>
        <p className="text-sm">{t('footer.madeWithLove')}</p>
      </div>
    </footer>
  );
};

export default Footer;
