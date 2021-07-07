import { LayoutServiceData, ComponentPropsCollection } from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Sitecore page props
 */
export type SitecorePageProps = {
  locale: string;
  layoutData: LayoutServiceData | null;
  componentProps: ComponentPropsCollection;
  notFound: boolean;
};
