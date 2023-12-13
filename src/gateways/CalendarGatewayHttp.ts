import CalendarGateway from './CalendarGateway';
import HttpClient from '../infra/HttpClient';
import Month from '../entities/Month';
import Event from '../entities/Event';
export default class CalendarGatewayHttp implements CalendarGateway {
    constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {
    }
    async getCalendar(year: number, region: number, filial: number): Promise<Month[]> {
        const calendar = await this.httpClient.get(`${this.baseUrl}/calendar/${year}/${region}/${filial}`);
        return calendar;
    }
    async saveEvent(event: Event): Promise<any> {
        await this.httpClient.post(`${this.baseUrl}/event/save`, event);
        return
    }
    
}