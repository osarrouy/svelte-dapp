<script>
  import Button from "./components/Button";
  import Login from "./components/Login";
  import Dapp from "../src";
  import { dapp } from "../src";
  import { wallet, profile, settings, infra } from "../src/stores";

  let logging = false;

  infra.subscribe(_infra => {
    console.log("[infra update]");
    console.log(_infra);
  });

  profile.subscribe(_profile => {
    console.log("[profile update]");
    console.log(_profile);
  });

  settings.subscribe(_settings => {
    console.log("[settings update]");
    console.log(_settings);
  });

  wallet.subscribe(_wallet => {
    console.log("[wallet update]");
    console.log(_wallet);
  });
</script>

<style lang="scss">
  main {
    display: grid;
    grid-template-columns: calc(50% - 2rem) calc(50% - 2rem);
    grid-template-rows: 100%;
    grid-template-areas: "profile action";
    grid-column-gap: 4rem;
    min-height: 100vh;
  }

  .profile {
    grid-area: profile;
    align-self: center;
    justify-self: end;
    display: flex;
    img {
      height: 50px;
      margin-right: 1rem;
    }
  }

  .action {
    grid-area: action;
    align-self: center;
    justify-self: start;
  }

  .small {
    font-size: 0.8rem;
  }
</style>

<Dapp
  id="megayolospace"
  network="mainnet"
  fortmatic={{ key: 'pk_live_E05E40D61421710B' }}>
  {#if logging}
    <Login on:close={() => (logging = false)} />
  {/if}
  <main>
    <section class="profile">
      {#if $profile}
        <img src={$profile.avatar} alt="avatar" />
        <div class="data">
          <a href={$profile.url} target="_blank">{$profile.name}</a>
          <p class="small">{$profile.address}</p>
        </div>
      {:else}
        <p>Hi, please login to move on.</p>
      {/if}
    </section>
    <section class="action">
      {#if $profile}
        <Button on:click={() => dapp.logout()}>logout</Button>
      {:else}
        <Button on:click={() => (logging = true)}>login</Button>
      {/if}
    </section>
  </main>
</Dapp>
