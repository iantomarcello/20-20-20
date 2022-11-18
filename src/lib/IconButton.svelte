<script>
  export let click;
</script>

<button on:click={click} class="w-14">
  <slot></slot>
</button>