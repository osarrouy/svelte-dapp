<script>
  import Button from "../../Button";
  import Input from "./Input";
  import Section from "./Section";
  import { dapp } from "../../../../src";
  import { isLoggedIn, profile } from "../../../../src/stores";
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  let loading = false;
  let avatar = "";
  let name = "";
  let motto = "";
  let nickname = "";
  let ship = "";

  isLoggedIn.subscribe(async _isLoggedIn => {
    if (_isLoggedIn && $profile) {
      avatar = $profile.avatar;
      name = $profile.name;
      nickname = await dapp.profile.get("nickname");
      ship = await dapp.storage.get("ship");
      motto = await dapp.storage.get("motto");
    }
  });

  const dispatch = createEventDispatcher();

  const logout = () => {
    dispatch("logout");
  };

  const submit = async () => {
    loading = true;
    try {
      await dapp.profile.set("name", name);
      await dapp.profile.set("nickname", nickname);
      await dapp.storage.set("motto", motto);
      await dapp.storage.set("ship", ship);
    } catch (e) {
      console.log(e);
    }
    loading = false;
  };
</script>

<style lang="scss">
  .profile {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    min-width: 60%;
    padding: 1rem;
    position: relative;
    img {
      border-radius: 50%;
      height: 50px;
      width: 50px;
      position: absolute;
      top: -25px;
      left: 1rem;
    }

    .action {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1rem;

      .logout {
        margin-left: 1rem;
      }
    }
  }
</style>

<section class="profile" transition:fly>
  <img src={avatar} alt="avatar" />
  <Section
    title="Profile"
    explanation="These fields are saved to your shared 3Box profile">

    <Input name="Name" bind:value={name} placeholder="John Doe" />
    <Input name="Nickname" bind:value={nickname} placeholder="@jdoe" />
  </Section>
  <Section
    title="Dapp"
    explanation="These fields are saved to your 3Box dapp specific storage space">
    <Input name="Ship" bind:value={ship} placeholder="The Black Pearl" />
    <Input
      name="Motto"
      bind:value={motto}
      placeholder="All State Sailors Are Bastards" />
  </Section>
  <section class="action">
    <Button disabled={loading} on:click={submit}>save</Button>
    <p class="logout">
      or
      <a href="#" on:click={logout}>logout</a>
    </p>
  </section>

</section>
