<script>
  import Popover from "svelte-popover";

  export let title = "";
  export let explanation = "";
</script>

<style lang="scss">
  :global(.target) {
    width: 100%;
  }
  h2 {
    margin-bottom: 2rem;
    margin-top: 1rem;
    text-align: center;
  }
  .explanation {
    backdrop-filter: blur(2px);
    background-color: transparentize(#333, 0.5);
    border-radius: 3px;
    color: #fff;
    padding: 1rem;
  }
</style>

<Popover arrow={false} action="hover">
  <h2 slot="target">: {title} :</h2>
  <div slot="content" class="explanation">{explanation}</div>
</Popover>
