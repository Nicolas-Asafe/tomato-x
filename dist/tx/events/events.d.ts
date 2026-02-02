type statusEntity = "STARTING" | "RUNNING" | "FINISH" | "NOTSTARTED" | "LOADED";
type EventState = {
    status: statusEntity;
    payload?: unknown;
};
export declare const events: {
    getAll(): Map<string, EventState>;
    emit(event: string, status: statusEntity, payload?: unknown): void;
    on(event: string, fn: (payload?: unknown) => void): void;
};
export {};
//# sourceMappingURL=events.d.ts.map