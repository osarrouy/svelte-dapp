<script>
  import dapp from "../lib";

  export let id = null;
  export let network = "mainnet";
  export let fortmatic = null;

  dapp.initialize({ id, network, fortmatic });
</script>

<div>
  <slot />
</div>
