import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { Hero } from '../services/hero';
import { HeroService } from '../services/hero.service';

@Component({
    templateUrl: 'app/dashboard/dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    public heroes = new Array<Hero>();

    constructor(private _heroService: HeroService, private _router: Router) { }

    ngOnInit() {
        this._heroService.getHeroes().then(heroes => {
            this.heroes = heroes.slice(1, 5);
        });
    }

    gotoDetail(hero: Hero) {
        this._router.navigate(['HeroDetail', { id: hero.id }]);
    }
}
