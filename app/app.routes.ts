import { RouterConfig } from '@angular/router';

import {TypescriptComponent} from './typescript/typescript.component';
import {ComponentsComponent} from './components/components.component';
import {BindingsComponent} from './bindings/bindings.component';
import {ServicesComponent} from './services/services.component';

export const AppRoutes: RouterConfig = [
  	{path: 'typescript', component: TypescriptComponent},
	{path: 'components', component: ComponentsComponent},
	{path: 'bindings', component: BindingsComponent},
	{path: 'services', component: ServicesComponent}
];