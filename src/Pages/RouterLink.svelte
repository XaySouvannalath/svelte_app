<script>
    import { curRoute } from "../routes.js";


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
	
	}

    

</style>
<!-- 
<a   href={page.path} on:click|preventDefault={redirectTo}>{page.name}</a>
 -->
      <a class="navbar-item custom_font is has-text-grey" href={page.path} on:click|preventDefault={redirectTo}>
        {page.name}
      </a>  