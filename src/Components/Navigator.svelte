<script>
  import RouterLink from "../Pages/RouterLink.svelte";
  import StateInfo from "./StateInfo.svelte";
  import Reset from "./Reset.svelte";
  import Upload from "../Pages/Upload.svelte";
  import { IS_NAV_ACTIVE } from "../stores.js";
  export let IS_ACTIVE = false;

  let unsubscriber = IS_NAV_ACTIVE.subscribe(value => {
    IS_ACTIVE = value;
  });
  function handlerActive() {
    IS_NAV_ACTIVE.update(data => (data = !IS_ACTIVE));
  }
</script>

<style>
  .navbar {
    -webkit-box-shadow: 0px 3px 19px -9px rgba(0, 0, 0, 1);
    -moz-box-shadow: 0px 3px 19px -9px rgba(0, 0, 0, 1);
    box-shadow: 0px 3px 19px -9px rgba(0, 0, 0, 1);
  }

  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
</style>

<nav class="navbar is-transparent is-success ">
  <div class="navbar-brand">
    <a class="navbar-item" href="/home">
      <img
        src="./oie_png.png"
        alt="Bulma: a modern CSS framework based on Flexbox" />
    </a>
    <div
      on:click={handlerActive}
      class="navbar-burger burger"
      data-target="navbarExampleTransparentExample">
      <span />
      <span />
      <span />
    </div>
  </div>

  <div
    id="navbarExampleTransparentExample"
    class="navbar-menu"
    class:is-active={IS_ACTIVE}>
    <div class="navbar-start">
      <RouterLink page={{ path: '/home', name: 'Home' }} />

      <RouterLink page={{ path: '/upload', name: 'Upload' }} />
      <RouterLink page={{ path: '/table', name: 'Table' }} />
      <RouterLink page={{ path: '/procedure', name: 'Procedure' }} />
      <RouterLink page={{ path: '/api', name: 'API' }} />

      <!--       <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="https://bulma.io/documentation/overview/start/">
          Docs
        </a>
        <div class="navbar-dropdown is-boxed">
          <a class="navbar-item" href="https://bulma.io/documentation/overview/start/">
            Overview
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
            Modifiers
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
            Columns
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
            Layout
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
            Form
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
            Elements
          </a>
          <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
            Components
          </a>
        </div>
      </div> -->
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control" />
          <StateInfo />
          <Reset />
        </div>
      </div>
    </div>
  </div>
</nav>
