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
  }

  .buttons {
    grid-area: action;
    align-self: center;
    justify-self: start;
  }

  .small {
    font-size: 0.8rem;
  }
</style>

<main>
  <section class="profile">
    <slot name="profile" />

    <!-- {#if $profile}
        <img src={$profile.avatar} alt="avatar" />
        <div class="data">
          <a href={$profile.url} target="_blank">{$profile.name}</a>
          <p class="small">{$profile.address}</p>
        </div>
      {:else}
        <p>Hi, please login to move on.</p>
      {/if} -->
  </section>
  <section class="buttons">
    <slot name="buttons" />

    <!-- {#if $profile}
        <Button on:click={() => dapp.logout()}>logout</Button>
      {:else}
        <Button on:click={() => (logging = true)}>login</Button>
      {/if} -->
  </section>
</main>
