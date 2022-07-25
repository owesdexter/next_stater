import { appWithTranslation } from 'next-i18next';
import type { ReactElement, ReactNode, useEffect } from 'react';

export default function i18nProvider({children}: any){
  return appWithTranslation(children);
};