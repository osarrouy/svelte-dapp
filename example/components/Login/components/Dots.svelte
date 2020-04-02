<script>
  export let message = "";

  let pattern = ["   ", ".  ", ".. ", "...", ".. ", ".  "];
  let dots = "";
  let index = 0;

  const spin = () => {
    dots = pattern[index];
    index = (index + 1) % pattern.length;
  };

  setInterval(spin, 300);
</script>

<style lang="scss">
  pre {
    margin-top: 1rem;
  }
</style>

<pre>{message + ' ' + dots}</pre>
