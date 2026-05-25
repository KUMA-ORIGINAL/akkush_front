import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { TermsPage } from './terms-page.ui';
import { pathKeys } from '../../shared/lib/react-router';

export const termsPageRoute: RouteObject = {
  path: pathKeys.terms(),
  element: createElement(TermsPage),
};
