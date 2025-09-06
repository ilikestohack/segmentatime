<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

    // svelte-ignore export_let_unused
    export let data;
    export let children;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
