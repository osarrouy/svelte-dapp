<script>
  import Dots from "./Dots";
  import Spinner from "./Spinner";
  import { fly } from "svelte/transition";

  export let message = "";
</script>

<style lang="scss">
  .loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

<section class="loader" transition:fly>
  <Spinner />
  <Dots {message} />
</section>
