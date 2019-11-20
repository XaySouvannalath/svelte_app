<script>
  import { scale } from "svelte/transition";
  import ListTable from "../Components/ListTable.svelte";
  import { excel_data } from "../stores";
  import { onMount } from "svelte";
  let data = [];

  let unsubscriber = excel_data.subscribe(store_data => {
    data = store_data;
  });

  function showTable(obj) {
    console.log("Hello world");
    console.log(obj);
  }
</script>

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




  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
  .cf {
    font-family: "Fredoka One", cursive;
  }
</style>

<svelte:head>
  <title>Procedure</title>
</svelte:head>

<div in:scale out:scale class="box flex-container center sticky">
  {#each data as it, i}
    <div class="">
      <button
        class="flex-item button is-success is-outlined is-small"
       
       
            on:click={showTable(it)}>
         
        {i + 1} {it.data.table_name}
      </button>
    </div>
  {/each}
</div>
