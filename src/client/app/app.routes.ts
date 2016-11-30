import { Routes } from '@angular/router';
import { HeaderComponent } from './header/index';

/**
 * This application currently does not need to use the router, as all
 * of our components are always visible. Thus, we use ** as the path to
 * catch all just in case. The header component is used here, but it
 * isn't of any significance. The router is only implemented to leverage
 * queryParams.
 */
export const routes: Routes = [
  {
    path: '**',
    component: HeaderComponent
  }
];
