<script>
  import { excel_data } from "../stores";

  function reset() {
    excel_data.set([]);
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
    margin-left: 10px;
  }
</style>

<button class="button is-danger is-outlined cf"  on:click={reset}>Reset</button>
