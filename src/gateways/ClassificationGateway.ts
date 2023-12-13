import Classification from "../entities/Classification";
export default interface ClassificationGateway {
    getClassifications(): Promise<Classification[]>;
    save(): Promise<any>;
}