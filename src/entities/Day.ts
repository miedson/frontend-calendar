import Event from './Event';
export default class Day {
    events: Event[];
    constructor(readonly date: Date, events: Event[]){
        this.date = date;
        this.events = events;
    }

    haveEvents(): boolean {
        return this.events.length > 0;
    }
}