import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app',
  template: `
  		<nav class="navbar navbar-default">
		  <div class="container-fluid">
		    <div class="navbar-header">
		      <a class="navbar-brand" href="#">
		      Angular 2 Workshop</a>
		    </div>
		    <div class="collapse navbar-collapse">
		      <ul class="nav navbar-nav">		        
		      	<li><a [routerLink]="['typescript']">Typescript</a></li>
		        <li><a [routerLink]="['components']">Components</a></li>
		        <li><a [routerLink]="['bindings']">Bindings</a></li>
		        <li><a [routerLink]="['services']">Services/HTTP</a></li>
		      </ul>
		    </div><!-- /.navbar-collapse -->
		  </div><!-- /.container-fluid -->
		</nav>
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<router-outlet></router-outlet>
				</div>
			</div>
		</div>
	    
  `,
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
  
}