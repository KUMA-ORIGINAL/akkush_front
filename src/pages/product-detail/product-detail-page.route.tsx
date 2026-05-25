import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { ProductDetailPage } from './product-detail-page.ui';

export const productDetailPageRoute: RouteObject = {
  path: pathKeys.product(':productId'),
  element: createElement(ProductDetailPage),
};
