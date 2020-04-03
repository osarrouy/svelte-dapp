<script>
  import Button from "./components/Button";
  import Login from "./components/Login";
  import Profile from "./components/Profile";
  import Dapp from "../src";
  import { dapp } from "../src";
  import { infra, isLoggedIn, profile, settings, wallet } from "../src/stores";
  import { fly } from "svelte/transition";

  let isLogging = false;

  infra.subscribe(_infra => {
    console.log("[infra:update]");
    console.log(_infra);
  });

  isLoggedIn.subscribe(_isLoggedIn => {
    console.log("[isLoggedIn:update]");
    console.log(_isLoggedIn);
  });

  profile.subscribe(_profile => {
    console.log("[profile:update]");
    console.log(_profile);
  });

  settings.subscribe(_settings => {
    console.log("[settings:update]");
    console.log(_settings);
  });

  wallet.subscribe(_wallet => {
    console.log("[wallet:update]");
    console.log(_wallet);
  });
</script>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    max-width: 940px;
    min-height: 100vh;
  }

  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1,
    :global(.button) {
      margin-top: 2rem;
    }

    h1 {
      font-size: 3rem;
    }
  }
</style>

<Dapp
  id="svelte-dapp"
  network="mainnet"
  fortmatic={{ key: 'pk_live_E05E40D61421710B' }}>
  {#if isLogging}
    <Login on:close={() => (isLogging = false)} />
  {/if}
  <main>
    {#if $isLoggedIn}
      <Profile on:logout={() => dapp.logout()} />
    {:else}
      <section class="hero" transition:fly>
        <svg height="10" width="10">
          <line
            x1="0"
            y1="0"
            x2="9"
            y2="9"
            style="stroke: rgba(255, 255, 255, 0.7); stroke-width: 2;" />
          <line
            x1="0"
            y1="9"
            x2="9"
            y2="0"
            style="stroke: rgba(255, 255, 255, 0.7); stroke-width: 2;" />
        </svg>
        <h1>: Hi Sailor :</h1>
        <Button class="button" on:click={() => (isLogging = true)}>
          login
        </Button>
      </section>
    {/if}
  </main>
</Dapp>
