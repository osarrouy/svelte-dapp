<script>
  import Title from "./Title";

  export let title = "";
  export let explanation = "";
</script>

<style lang="scss">
  .section {
    margin-bottom: 2rem;
  }
</style>

<section class="section">
  <Title {title} {explanation} />
  <slot />
</section>
