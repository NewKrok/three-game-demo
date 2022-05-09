import { AppState } from "../enums/app-state";
import { writable } from "svelte/store";

export const appState = writable(AppState.MENU);
export const selectedDemo = writable(null);
