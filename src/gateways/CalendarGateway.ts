import Month from "../entities/Month";
import Event from "../entities/Event";

export default interface CalendarGateway {
    getCalendar(year: number, region: number, filial: number): Promise<Month[]>;
    saveEvent(event: Event): Promise<any>;
}