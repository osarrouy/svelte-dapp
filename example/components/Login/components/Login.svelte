<script>
  import metamask from "../img/metamask.svg";
  import fortmatic from "../img/fortmatic.svg";
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  import { dapp } from "../../../../src";
  import wallet from "../../../../src/stores/wallet";
  import profile from "../../../../src/stores/profile";

  let logging = false;

  // dapp.profile.subscribe(_profile => {
  //   profile = _profile;
  // });

  // wallet.subscribe(_wallet => {
  //   console.log("subscribed wallet");
  //   console.log(_wallet);
  // });

  let loading = false;
  let message = "logging in";
  let pattern = ["   ", ".  ", ".. ", "...", ".. ", ".  "];
  let dots = "";
  let index = 0;

  const spin = () => {
    if (loading) {
      dots = pattern[index];
      index = (index + 1) % pattern.length;
    }
  };

  const dispatch = createEventDispatcher();

  const close = () => {
    dispatch("close");
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
          message = "syncing 3Box profile";
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

  setInterval(spin, 300);
</script>

<style lang="scss">
  .overlay {
    backdrop-filter: blur(3px);
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
      font-size: 0.8rem;
      margin-top: 1rem;
    }
  }

  .spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    pre {
      font-family: sans-serif;
      font-weight: 100;
      margin-top: 1rem;
    }
  }

  .loader {
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    margin: 60px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 3px solid rgba(255, 255, 255, 0.2);
    border-right: 3px solid rgba(255, 255, 255, 0.2);
    border-bottom: 3px solid rgba(255, 255, 255, 0.2);
    border-left: 3px solid #ffffff;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>

<div class="overlay" on:click={close} transition:fade>
  {#if loading}
    <section class="spinner" transition:fly>
      <div class="loader">loading...</div>
      <pre>{message} {dots}</pre>
    </section>
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
