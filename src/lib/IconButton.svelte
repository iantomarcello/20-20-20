<script>
  export let click;
</script>

<button on:click={click} class="w-14 p-2 sm:p-0 transition outline-none outline-offset-2 focus:outline-purple-400">
  <slot></slot>
</button>

<style>
  button {
    filter: drop-shadow(4px 4px 0 rgba(0,0,0,0.2))
  }

  button:hover {
    filter: drop-shadow(4px 7px 3px rgba(0,0,0,0.15))
  }
</style>