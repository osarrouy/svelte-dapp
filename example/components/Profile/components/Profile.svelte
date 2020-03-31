<script>
  export let profile;
</script>

<style lang="scss">
  .profile {
    display: flex;

    img {
      border-radius: 50%;
      height: 50px;
      margin-right: 1rem;
    }

    .did,
    .address {
      font-size: 0.8rem;
    }
  }
</style>

<section class="profile">
  <img src={profile.avatar} alt="avatar" />
  <div class="data">
    <a href={profile.url} target="_blank">{profile.name}</a>
    <p class="address">{profile.address}</p>
    <p class="did">{profile.did}</p>
  </div>
</section>
