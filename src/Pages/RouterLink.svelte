<script>
    import { curRoute } from "../routes.js";
   import { IS_NAV_ACTIVE } from "../stores.js"
  export let IS_ACTIVE = false;


  let unsubscriber = IS_NAV_ACTIVE.subscribe(value => {
    IS_ACTIVE = value
  })
  function handlerActive() {
    IS_NAV_ACTIVE.update(data => data = !IS_ACTIVE)
  }



    export let page = {
        path: '/home',
        name: 'Home'
    }

    function redirectTo(event) {
        //change current route path
        curRoute.set(event.target.pathname);

        //push the path into web browser history API
        window.history.pushState({ path: page.path }, '', window.location.origin + page.path);

    }
</script>

<style>
    a {
        text-transform: uppercase;
        text-decoration: none;
        padding: 1rem;
        
    }

	.custom_font{
		font-family: 'Fredoka One', cursive;
    color: aliceblue!important;
	}

    

</style>
<!-- 
<a   href={page.path} on:click|preventDefault={redirectTo}>{page.name}</a>
 -->
      <a on:click={handlerActive} class="navbar-item custom_font is has-text-grey" href={page.path} on:click|preventDefault={redirectTo}>
        {page.name}
      </a>  