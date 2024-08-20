<script>
  export let form;
</script>

<div class="flex items-center">
  <div
    class="mt-10 pt-10 w-full max-w-xl p-5 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
  >
    <form method="POST" action="?/deploy">
      <div class="-mx-3 mb-2">
        <div class="w-full px-3 mb-6 md:mb-6">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="bounty"
          >
            Bounty
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="bounty"
            type="number"
            placeholder="Enter bounty amount"
            name="bounty"
          />
        </div>
        <div class="w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="square"
          >
            Enter the square
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="square"
            type="number"
            placeholder="Enter square number"
            name="square"
          />
        </div>
        <!-- <div class="w-full px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              Email
            </label>
          </div> -->
        <button
          type="submit"
          class="bg-green-500 hover:bg-blue-700 text-white font-bold mt-5 ml-2 px-2 py-2 rounded"
        >
          Deploy bounty
        </button>
      </div>
    </form>
    {#if form?.success}
      <!-- this message is ephemeral; it exists because the page was rendered in
		   response to a form submission. it will vanish if the user reloads -->
      <p class="pt-2 text-green-400 font-semibold">
        Bounty was deployed successfully: <a
          class="text-indigo-500 underline font-semibold"
          target="_blank"
          href={`https://whatsonchain.com/tx/${form?.txid}`}>Trasaction Link</a
        >!
      </p>
      {:else if form?.deployed === false}
      <p >{form?.txid}</p>
    {/if}
  </div>

  <!-- UNLOCK -->

  <div
    class="mt-10 pt-10 w-full max-w-xl p-5 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
  >
    <form method="POST" action="?/unlock">
      <div class="-mx-3 mb-2">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="square"
          >
            Enter the root
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="root"
            type="number"
            placeholder="Enter root answer"
            name="root"
          />
        </div>
        <!-- <div class="w-full px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              Email
            </label>
          </div> -->
        <button
          type="submit"
          class="bg-red-500 hover:bg-blue-700 text-white font-bold mt-5 ml-2 px-2 py-2 rounded"
        >
          Unlock bounty
        </button>
      </div>
    </form>
    {#if form?.success}
      <!-- this message is ephemeral; it exists because the page was rendered in
		   response to a form submission. it will vanish if the user reloads -->
      <p class="pt-2 text-green-600 font-semibold">
        Bounty was unlocked successfully: <a
          class="text-indigo-500 underline font-semibold"
          target="_blank"
          href={`https://whatsonchain.com/tx/${form?.txid}`}>Trasaction Link</a
        >!
      </p>
    {:else if form?.success === false}
      <p class="pt-2 text-red-600 font-semibold">
        {form?.txid} 
      </p>
    {/if}
  </div>
</div>