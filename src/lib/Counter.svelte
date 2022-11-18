<script>
  export let time;

  $: minutes = Math.floor(time % 3600 / 60);
  $: seconds = Math.floor(time % 60);
  $: minutesPadded = minutes.toString().padStart(2, '0');
  $: secondsPadded = seconds.toString().padStart(2, '0');
</script>

<p class="text-3xl sm:text-6xl md:text-9xl font-light flex items-center">
  {#if minutes > 0}
    {minutesPadded} : {secondsPadded}
  {:else}
    {secondsPadded} <small>s</small>
  {/if}
</p>

<style>
  p {
    --offset: 8px;
    text-shadow: var(--offset) var(--offset) 0 rgba(0,0,0,0.2);
  }
</style>