import Filial from '../entities/Filial';
import Region from '../entities/Region';
import HttpClient from '../infra/HttpClient';
import RegionGateway from './RegionGateway';
export default class RegionGatewayHttp implements RegionGateway {
    constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {
    }    
    async getRegions(): Promise<Region[]> {
        const regions = [];
        const response = await this.httpClient.get(`${this.baseUrl}/regions`);
        for(const regionData of response) {
            const region = new Region(regionData.id, regionData.name);
            for(const filial of regionData.filial) {
                region.addFilial(new Filial(filial.id, filial.name, filial.code));
            }
            regions.push(region);
        }
        return regions;
    }
    save(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}