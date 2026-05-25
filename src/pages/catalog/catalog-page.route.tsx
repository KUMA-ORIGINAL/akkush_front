import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { CatalogPage } from './catalog-page.ui';
import { pathKeys } from '../../shared/lib/react-router';

export const catalogPageRoute: RouteObject = {
  path: pathKeys.catalog(),
  element: createElement(CatalogPage),
};
