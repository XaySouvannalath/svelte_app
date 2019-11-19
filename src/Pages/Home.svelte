<script>
  import { count, excel_data } from "../stores";
  import Incrementer from "../Components/Incrementer.svelte";
  import { onDestroy } from "svelte";
  import { slide } from "svelte/transition"
  let count_value;
  let x_c
</script>

<article in:slide out:slide class="message">
  <div class="message-header">
    <p>Note</p>

  </div>
  <div class="message-body">
    This system is used for genearating some static code for software
    development such as: sql creating table scripts, service api and sql
    procedure for insert, update and delete.
  </div>

</article>
 
