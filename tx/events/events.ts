type statusEntity =
    | "STARTING"
    | "RUNNING"
    | "FINISH"
    | "NOTSTARTED"
    | "LOADED"

type EventState = {
    status: statusEntity
    payload?: unknown
}

const eventsState = new Map<string, EventState>()

export const events = {
    getAll() {
        return eventsState
    },
    emit(event: string, status: statusEntity, payload?: unknown) {
        eventsState.set(event, { status, payload })
    },
    on(event: string, status: statusEntity, fn: (payload?: unknown) => void) {
        const state = eventsState.get(event)
        if (!state) return
        if (state.status !== status) return

        fn(state.payload)
    }
}
