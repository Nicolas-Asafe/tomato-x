const eventsState = new Map();
const listeners = new Map();
export const events = {
    getAll() {
        return eventsState;
    },
    emit(event, status, payload) {
        eventsState.set(event, { status, payload });
        const fns = listeners.get(event);
        if (fns) {
            fns.forEach(fn => setImmediate(() => fn(payload)));
        }
    },
    on(event, fn) {
        if (!listeners.has(event))
            listeners.set(event, []);
        listeners.get(event).push(fn);
        const state = eventsState.get(event);
        if (state)
            setImmediate(() => fn(state.payload));
    }
};
//# sourceMappingURL=events.js.map