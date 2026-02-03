type statusEntity =
    | "STARTING"
    | "RUNNING"
    | "FINISH"
    | "NOTSTARTED"
    | "LOADED";

type EventState = {
    status: statusEntity;
    payload?: unknown;
}

const eventsState = new Map<string, EventState>();
const listeners = new Map<string, ((payload?: unknown) => void)[]>();

export const events = {
    getAll() {
        return eventsState;
    },

    emit(event: string, status: statusEntity, payload?: unknown) {
        eventsState.set(event, { status, payload });

        const fns = listeners.get(event);
        if (fns) {
            fns.forEach(fn => setImmediate(() => fn(payload)));
        }
    },

    on(event: string, fn: (payload?: unknown) => void) {
        if (!listeners.has(event)) listeners.set(event, []);
        listeners.get(event)!.push(fn);
        const state = eventsState.get(event);
        if (state) setImmediate(() => fn(state.payload));
    }
}
