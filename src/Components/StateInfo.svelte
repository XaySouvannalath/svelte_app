<script>
    import {excel_data} from "../stores"
    import {onDestroy} from "svelte"


    let x_c;

   const unsubscribe = excel_data.subscribe(value=>{
        x_c = value
    })


    onDestroy(unsubscribe)


    function show(){
        console.log(x_c)
    }
</script>
<style>
  .navbar {
    -webkit-box-shadow: 0px 3px 19px -9px rgba(0, 0, 0, 1);
    -moz-box-shadow: 0px 3px 19px -9px rgba(0, 0, 0, 1);
    box-shadow: 0px 3px 19px -9px rgba(0, 0, 0, 1);
  }
  .cf {
    font-family: "Fredoka One", cursive;
  }
</style>
<button on:click={show} class="button is-info is-outlined cf">Check State</button>