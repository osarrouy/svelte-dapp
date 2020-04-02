<script>
  import Loader from "./Loader";
  import metamask from "../img/metamask.svg";
  import fortmatic from "../img/fortmatic.svg";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  import { dapp } from "../../../../src";
  import wallet from "../../../../src/stores/wallet";
  import profile from "../../../../src/stores/profile";

  let loading = false;
  let message = "logging in";

  const dispatch = createEventDispatcher();

  const close = () => {
    dispatch("close");
  };

  const _close = () => {
    if (!loading) {
      close();
    }
  };

  const login = async wallet => {
    loading = true;

    try {
      await dapp
        .login(wallet)
        .on("wallet:syncing", () => {
          console.log("[wallet:syncing]");
          message = "logging in with " + wallet;
        })
        .on("wallet:synced", account => {
          console.log("[wallet:synced]");
          message = "account " + account + " enabled";
        })
        .on("profile:syncing", () => {
          console.log("[profile:syncing]");
          message = "syncing 3Box profile [this may take a while]";
        })
        .on("profile:synced", profile => {
          console.log("[profile:synced]");
          message = "3Box profile synced";
        })
        .on("storage:syncing", () => {
          console.log("[storage:syncing]");
          message = "syncing 3Box space";
        })
        .on("storage:synced", space => {
          console.log("[storage:synced]");
          message = "3Box space synced";
        });
      close();
    } catch (e) {
      console.log(e);
      loading = false;
    }
  };
</script>

<style lang="scss">
  .overlay {
    backdrop-filter: blur(3px);
    font-family: "SF Mono";
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 9999;
  }

  .wallet {
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 2rem;
    padding: 1rem;
    &:last-of-type {
      margin-right: 0;
    }
    &:hover {
      background-color: transparentize(#fff, 0.9);
    }
    :global(svg) {
      height: 100px;
    }
    p {
      margin-top: 1rem;
    }
  }
</style>

<div class="overlay" on:click={_close} transition:fade>
  {#if loading}
    <Loader {message} />
  {:else}
    <section
      class="wallet"
      on:click|preventDefault|stopPropagation={() => login('metamask')}>
      {@html metamask}
      <p>login with metamask</p>
    </section>
    <section
      class="wallet"
      on:click|preventDefault|stopPropagation={() => login('fortmatic')}>
      {@html fortmatic}
      <p>login with fortmatic</p>
    </section>
  {/if}
</div>
