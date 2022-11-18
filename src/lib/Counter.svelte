<script>
  export let time;

  $: minutes = Math.floor(time % 3600 / 60);
  $: seconds = Math.floor(time % 60);
  $: minutesPadded = minutes.toString().padStart(2, '0');
  $: secondsPadded = seconds.toString().padStart(2, '0');

</script>

<p class="text-base md:text-9xl font-light">
  {minutesPadded} : {secondsPadded}
</p>