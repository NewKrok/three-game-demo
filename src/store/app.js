import { AppState } from "../enums/app-state";
import { writable } from "svelte/store";

export const appState = writable(AppState.MENU);
export const selectedDemo = writable(null);
export const availableCollectableCount = writable(0);
export const collectedCollectableCount = writable(0);
export const checkpointEntries = writable([]);
export const carSpeed = writable(0);
export const lapsCount = writable(0);
