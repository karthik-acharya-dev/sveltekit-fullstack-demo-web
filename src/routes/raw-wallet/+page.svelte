<script lang="ts">
  import { PrivateKey } from "@bsv/sdk";

  let WIF: string;
  let address: string;

  function createKeys() {
    const privKey = PrivateKey.fromRandom();
    WIF = privKey.toWif();
    console.log("Private Key WIF format is ", WIF);
    address = privKey.toAddress();
    console.log("Your bitcoin address is ", address);
  }
</script>

<section class="my-50 flex flex-col justify-center items-center">
  <div class="p-6 bg-white rounded-lg shadow-lg text-center">
    <h1 class="text-2xl font-bold mb-4">Bitcoin Wallet Generator</h1>
    <button
      class="bg-green-500 hover:bg-blue-600 text-white p-3 rounded-lg mb-4"
      on:click={createKeys}
    >
      Generate New Wallet Keys
    </button>
    <p class="text-gray-700">
      <strong>Private Key WIF format:</strong>
      <span class="block break-all">{WIF}</span>
    </p>
    <p class="text-gray-700 mt-2">
      <strong>Your Bitcoin Address:</strong>
      <span class="block break-all">{address}</span>
    </p>
  </div>
</section>
