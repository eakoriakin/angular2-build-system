import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HeroesComponent} from './heroes.component';
import {HeroDetailComponent} from './hero-detail.component';
import {DashboardComponent} from './dashboard.component';
import {HeroService} from './hero.service';

@Component({
    selector: 'app',
    templateUrl: 'js/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HeroService]
})
@RouteConfig([
    { path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true },
    { path: '/heroes', name: 'Heroes', component: HeroesComponent },
    { path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent }
])
export class AppComponent {
    public title = 'Tour of Heroes';
}
