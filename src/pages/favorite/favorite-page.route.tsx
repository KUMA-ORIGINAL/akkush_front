import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { FavoritePage } from './favorite-page.ui';
import { pathKeys } from '../../shared/lib/react-router';

export const favoritePageRoute: RouteObject = {
  path: pathKeys.favorite(),
  element: createElement(FavoritePage),
};
