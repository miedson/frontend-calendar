import Day from "./Day";
export default class Month {
    firstDayOfMonth: Date;
    constructor(readonly description: string, readonly monthNumber: number, readonly days: Day[], firstDayOfMonth: Date, readonly daysOfWeek: string[]) {
        this.firstDayOfMonth = new Date(firstDayOfMonth);
    }
}