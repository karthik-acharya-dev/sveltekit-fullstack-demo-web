<script>
  export let names;
</script>

<div
  class="mt-10 pt-10 w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
>
  <div class="flex items-center justify-between mb-4">
    <div class="space-y-1">
      <h2 class="text-xl font-semibold">List of Users</h2>
      <p class="text-sm text-gray-500">
        Fetched {names.length} users
      </p>
    </div>
  </div>
  <div class="divide-y divide-gray-900/5">
    {#each names as user (user.id)}
      <div class="flex items-center justify-between py-3">
        <div class="flex items-center space-x-4">
          <div>
            <p class="font-medium pt-1 leading-none">{user.name}</p>
          </div>
        </div>

        <!-- Update Form -->
        <form
          method="POST"
          action="/profiles?/update"
          class="flex items-center space-x-2"
        >
          <input type="hidden" name="id" value={user.id} />
          <input
            type="email"
            name="email"
            value={user.email}
            class="border p-1 rounded"
          />
          <button type="submit" class="bg-blue-500 text-white rounded px-3 py-1"
            >Update</button
          >
        </form>

        <!-- Delete Form -->
        <form method="POST" action="/profiles?/delete">
          <input type="hidden" name="id" value={user.id} />
          <button type="submit">
            <img class="w-4" src="./trash-can.svg" alt="delete" />
          </button>
        </form>
      </div>
    {/each}
  </div>
</div>
