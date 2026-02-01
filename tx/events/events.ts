type statusEntity =
    | "STARTING"
    | "RUNNING"
    | "FINISH"
    | "NOTSTARTED"
    | "LOADED"
interface event {
    status: statusEntity,
    name: string,
    payload:unknown
}
const globalEvents: event[] = []
export const events = {
    emit: (event: string, status: statusEntity,payload:unknown) => {
        const eventIndex = globalEvents.findIndex(e => e.name == event)
        if (eventIndex != -1) {
            globalEvents[eventIndex].status = status
            return;
        }
        globalEvents.push({name:event,status,payload})
    },
    trash: (event: string) => {
        const eventIndex = globalEvents.findIndex(e => e.name == event)
        if (eventIndex != -1) {
            globalEvents.slice(eventIndex, 1)
        }
    },
    on: (event: string, status: statusEntity, func: Function) => {
        const eventExists = globalEvents.find(e => e.name == event)
        if (eventExists && eventExists.status == status) func(eventExists.payload);
    }
}