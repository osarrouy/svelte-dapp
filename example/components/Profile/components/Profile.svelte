<script>
  import Input from "./Input";
  import Section from "./Section";
  import { fly } from "svelte/transition";

  export let profile;

  let name = "Olivier Sarrouy";
  let motto = "";
  let nickname = "";
  let ship = "";
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
  }
</style>

<section class="profile" transition:fly>
  <img
    src="https://ipfs.infura.io/ipfs/Qmav5SF9Ji5ZAmc5MNH3958aocrELn4meX5McPYAzGcmiq"
    alt="avatar" />
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
</section>
