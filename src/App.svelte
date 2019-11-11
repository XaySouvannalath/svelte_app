<script>
	import Nested from "./Components/Nested.svelte";
	import Info from './Components/Info.svelte';

	let name = "h";
	let lastname = "mitthasone";

	let numbers = [1, 2, 3, 4, 5, 6];

	// how to declaire an object
	 const pkg = {
		name: 'svelte',
		version: 3,
		speed: 'blazing',
		website: 'https://svelte.dev'
	}

	$: console.log("Hello world");
	function handleClick() {
		console.log(name);
		console.log(numbers[1]);
	}

	$: if (name == "xay") {
		console.log("This name is the most suitable name");
		alert("This name is the most suitable name");
		console.log()
	}

	$: {
		console.log(name);
	}
</script>

<style>

</style>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css" />

<div class="container">
	<Nested answer={55} />

<Info />
 
	<button class="button is-info">Hello world</button>
</div>