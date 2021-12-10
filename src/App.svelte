<script>
  import MagicBox from './MagicBox.svelte';
  import MagicButton from './MagicButton.svelte';
</script>

<main>
  <MagicBox title="Hello E-g!" />
  <MagicButton />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
