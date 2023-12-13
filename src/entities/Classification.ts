export default class Classification {
    constructor(readonly id: number, readonly name: string, readonly color?: string) {
        if(this.name === undefined) {
            throw new Error("Invalid name");
        }
    }
}