<script>
  import Counter from './lib/Counter.svelte'
  import IconButton from './lib/IconButton.svelte'

  const broadcaster = new BroadcastChannel('sw-messages');
  let registration;
  let state = 0; // -1 no permission, 0 idle, 1 running, 2 paused
  $: notifPermission = Notification.permission;
  $: time = 60 * 20;

  function swPostMessage(action, data = null) {
    broadcaster.postMessage({
      action,
      data
    });
  }

  function start() {
    swPostMessage('start');
    state = 1;
  }

  function stop() {
    swPostMessage('stop');
    state = 0;
  }

  /**
   * Initiation
   */

  async function init() {
    notifPermission = await Notification.requestPermission();
    state = notifPermission === 'granted' ? 0 : -1;

    registration = await navigator.serviceWorker.ready;

    broadcaster.addEventListener('message', (event) => {
      let {
        action,
        data
      } = event.data;
      switch (action) {
        case 'update-time':
          time = data;
          break;
      }
    })
  }

  init();
</script>

<main class="bg-emerald-900 text-emerald-100">

  <div class="w-screen h-screen flex items-center justify-center gap-4 flex-col">
    {#if state === -1}
      <p>Access required. Please allow access</p>
    {/if}
    {#if state > -1}
      <div class="mb-8">
        <Counter time={time}/>
      </div>
      {#if state === 0}
        <IconButton click={start}>
          <svg class="w-full h-full block hover:fill-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
        </IconButton>
      {/if}
      {#if state === 1}
        <button on:click={stop} class="w-14">
          <svg class="w-full h-full block hover:fill-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd"></path></svg>
        </button>
      {/if}
    {/if}


  </div>
</main>