<script>
  import { onMount } from 'svelte';

  // the `$:` means 're-run whenever these values change'
  $: backgroundColor = '#336699';

  export let title;

  function fetchData() {
    fetch(`/api/color`)
      .then((r) => r.json())
      .then((data) => {
        backgroundColor = data.color;
      });
  }

  onMount(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div class="box material" style="--theme-color: {backgroundColor}">{title}</div>

<style>
  .box {
    background-color: var(--theme-color);
    color: #ffffff;
    font-size: 4em;
    font-weight: 100;
    margin: auto 0;
    padding: 16px;
  }
</style>
