import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { List } from 'immutable';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    public heroes = List<Hero>();

    constructor(private _heroService: HeroService, private _router: Router) { }

    ngOnInit() {
        this._heroService.getHeroes().then(heroes => this.heroes = List<Hero>(heroes.slice(1, 5)));
    }

    gotoDetail(hero: Hero) {
        this._router.navigate(['HeroDetail', { id: hero.id }]);
    }
}
