<script>
  import { scale } from "svelte/transition";
  export let x_c;


</script>

<div in:scale out:scale class="box flex-container center sticky">
  {#each x_c as it, i}
    <div class="">
      <a
      
        class="flex-item button is-success is-outlined"
      
        href="#{it.data.table_name}">
        {i + 1} {it.data.table_name}
      </a>
    </div>
  {/each}
</div>


<style>


.table_name {
    font-size: 18px !important;
    color: white !important;
  }
  .flex-container {
    display: -webkit-flex; /* Safari */
    -webkit-flex-wrap: wrap; /* Safari 6.1+ */
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap !important;
  }

  .contain-wrap {
    display: -webkit-flex !important; /* Safari */
    -webkit-flex-wrap: wrap !important; /* Safari 6.1+ */
    display: flex !important;
    flex-wrap: wrap !important;
  }
  .flex-start {
    justify-content: flex-start;
  }

  .flex-end {
    justify-content: flex-end;
  }
  .flex-end li {
    background: gold;
  }

  .center {
    justify-content: center;
  }
  .center li {
    background: deepskyblue;
  }

  .space-between {
    justify-content: space-between;
  }
  .space-between li {
    background: lightgreen;
  }

  .space-around {
    justify-content: space-around;
  }
  .space-around li {
    background: hotpink;
  }

  .space-evenly {
    justify-content: space-evenly;
  }
  .space-evenly li {
    background: #bada55;
  }

  .flex-item {
    background: tomato;
    padding: 5px;
    width: fit-content;
    height: 20;
    margin: 5px;
    line-height: 50px;
    color: white;
    font-weight: bold;
    font-size: 10px;
    text-align: center;
  }

  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
  .cf {
    font-family: "Fredoka One", cursive;
  }
</style>