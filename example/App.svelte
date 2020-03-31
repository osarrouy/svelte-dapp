<script>
  import Button from "./components/Button";
  import Layout from "./components/Layout";
  import Login from "./components/Login";
  import Profile from "./components/Profile";
  import Dapp from "../src";
  import { dapp } from "../src";
  import { infra, profile, settings, wallet } from "../src/stores";

  let isLogging = false;

  infra.subscribe(_infra => {
    console.log("[infra:update]");
    console.log(_infra);
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

</style>

<Dapp
  id="svelte-dapp"
  network="mainnet"
  fortmatic={{ key: 'pk_live_E05E40D61421710B' }}>
  {#if isLogging}
    <Login on:close={() => (isLogging = false)} />
  {/if}
  <Layout>
    <section slot="profile">
      {#if $profile}
        <Profile profile={$profile} />
      {:else}
        <p>Hi stranger...</p>
      {/if}
    </section>
    <section slot="buttons">
      {#if $profile}
        <Button on:click={() => dapp.logout()}>logout</Button>
      {:else}
        <Button on:click={() => (isLogging = true)}>login</Button>
      {/if}
    </section>
  </Layout>
</Dapp>
