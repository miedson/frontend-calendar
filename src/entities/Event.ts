export default class Event {
    constructor(readonly title: string, readonly description: string, readonly region: number, readonly filial: number, readonly date: Date, readonly classification: string, readonly type_event: string, readonly color?: string){
    }
}