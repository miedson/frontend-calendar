import Classification from '../entities/Classification';
import HttpClient from '../infra/HttpClient';
import ClassificationGateway from './ClassificationGateway';
export default class ClassificationGatewayHttp implements ClassificationGateway {
    constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {
    }    
    async getClassifications(): Promise<Classification[]> {
        const classifications = await this.httpClient.get(`${this.baseUrl}/classifications`);
        return classifications;
    }
    save(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}