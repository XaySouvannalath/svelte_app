<script>
  import ListTable from "../Components/ListTable.svelte";
  import { excel_data } from "../stores";
  import {onMount } from "svelte"
  let data = [];

 
  let unsubscriber = excel_data.subscribe(store_data => {
    data = store_data;
  });

 
</script>

<svelte:head>
	<title>Procedure</title>
</svelte:head>
<ListTable x_c={data} />
