<script>
  export let name = "";
  export let value = "";
  export let placeholder = "";
</script>

<style lang="scss">
  .input {
    display: flex;
    margin-bottom: 2rem;

    &:last-of-type {
      margin-bottom: 0;
    }

    label {
      color: #fff;
      line-height: 1.5rem;
      margin-right: 1rem;
      width: 7rem;
    }

    input {
      width: 100%;
    }
  }
</style>

<div class="input">
  <label for={name}>{name}</label>
  <input type="text" bind:value id={name} {name} {placeholder} />
</div>
