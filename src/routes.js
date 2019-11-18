import API from "./Pages/API.svelte";
import Home from "./Pages/Home.svelte";
import Procedure from "./Pages/Procedure.svelte";
import Table from "./Pages/Table.svelte";
import NotFound from "./Pages/NotFound.svelte";
import Upload from "./Pages/Upload.svelte"
import { writable } from 'svelte/store';


const router = {
    '/': Home,
    '/home': Home,
    '/api': API,
    '/procedure': Procedure,
    '/table': Table,
    '/upload': Upload,
    '*': NotFound
}

export default router;
export const curRoute = writable('/home')