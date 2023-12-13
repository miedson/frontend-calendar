import TypeEvent from "../entities/TypeEvent";

export default interface TypesGateway {
    getTypes(): Promise<TypeEvent[]>
}