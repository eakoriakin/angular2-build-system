import { Component, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { Hero } from '../services/hero';
import { HeroService } from '../services/hero.service';

@Component({
    templateUrl: 'app/hero/hero.component.html',
    inputs: ['hero']
})
export class HeroDetailComponent implements OnInit {
    public hero: Hero;

    constructor(private _heroService: HeroService, private _routeParams: RouteParams) { }

    ngOnInit() {
        if (!this.hero) {
            let id = this._routeParams.get('id');
            this._heroService.getHero(id).then(hero => this.hero = hero);
        }
    }

    goBack() {
        window.history.back();
    }
}
