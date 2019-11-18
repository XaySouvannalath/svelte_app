import {writable} from "svelte/store";

export const count = writable(22)
export const is_table_proess_with_fk = writable('init')
export const excel_data = writable([])