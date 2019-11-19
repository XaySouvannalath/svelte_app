<script>
  import Nested from "./Components/Nested.svelte";
  import Info from "./Components/Info.svelte";
  import Navigator from "./Components/Navigator.svelte";
  //import routes setting
  import router, { curRoute } from "./routes.js";
  import RouterLink from "./Pages/RouterLink.svelte";
  import { onMount } from "svelte";

  //how to import plan javascript file
  import "./all.js";

  onMount(() => {
    curRoute.set(window.location.pathname);
    if (!history.state) {
      window.history.replaceState(
        { path: window.location.pathname },
        "",
        window.location.href
      );
    }
  });

  function handlerBackNavigation(event) {
    curRoute.set(event.state.path);
  }
</script>

<style>
  #pageContent {
    margin-right: 20px;
    margin-left: 20px;
  }
</style>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css" />

<svelte:window on:popstate={handlerBackNavigation} />

<Navigator />

<div class="columns is-center">
  <div class="column" />
</div>
<div id="pageContent">

  <!-- Page component updates here -->
  <svelte:component this={router[$curRoute]} />
</div>

