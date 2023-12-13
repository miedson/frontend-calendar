import Filial from "./Filial";

export default class Region {
    filiais: Filial[];
    constructor(readonly id: number, readonly name: string){
        this.filiais = [];
    }

    addFilial(filial: Filial): void {
        this.filiais.push(filial);
    }

    getFiliaisRegion(): Filial[] {
        return this.filiais
    }
}