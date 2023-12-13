import TypeEvent from "../entities/TypeEvent";
import HttpClient from "../infra/HttpClient";
import TypesGateway from "./TypesGateway";

export default class TypesGatewayHttp implements TypesGateway {
    constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {
    }    
    async getTypes(): Promise<TypeEvent[]> {
        const types = [];
        const response = await this.httpClient.get(`${this.baseUrl}/types`);
        for(const typeData of response) {
            types.push(new TypeEvent(typeData.type, typeData.id));
        }
        return types;
    }
}