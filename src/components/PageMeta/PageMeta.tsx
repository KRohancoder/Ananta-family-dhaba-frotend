import { siteInfo } from '@/shared/constants/site';
import type { PageMetaProps } from './PageMeta.types';

/**
 * React 19 hoists <title>/<meta> rendered anywhere in the tree into <head>,
 * so each route can set its own tags without a Helmet-style dependency.
 */
export function PageMeta({ title, description }: PageMetaProps) {
  const fullTitle = title === siteInfo.name ? title : `${title} | ${siteInfo.name}`;

  return (
    <>
      <title>{fullTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
    </>
  );
}
