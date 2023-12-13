import Region from "../entities/Region";
export default interface RegionsGateway {
    getRegions(): Promise<Region[]>;
    save(): Promise<any>;
}