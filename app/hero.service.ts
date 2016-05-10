import { Injectable } from 'angular2/core';
import { Hero } from './hero';

@Injectable()
export class HeroService {
    private heroes: Array<Hero> = [
        { id: '1', name: 'Mr. Nice' },
        { id: '2', name: 'Narco' },
        { id: '3', name: 'Bombasto' },
        { id: '4', name: 'Celeritas' },
        { id: '5', name: 'Magneta' },
        { id: '6', name: 'RubberMan' },
        { id: '7', name: 'Dynama' },
        { id: '8', name: 'Dr IQ' },
        { id: '9', name: 'Magma' },
        { id: '10', name: 'Tornado' }
    ];

    getHeroes() {
        return Promise.resolve(this.heroes);
    }

    getHero(id: string) {
        return Promise.resolve(this.heroes)
            .then(heroes => heroes.filter(hero => hero.id === id)[0]);
    }
}
