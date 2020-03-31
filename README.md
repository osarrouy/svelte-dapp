# `svelte-dapp`

> DApp SSO made easy with 3Box and Svelte.

## Demo

Check the demo (here)[https://svelte-dapp.netlify.com/].

## Installation

```bash
npm install --save @osarrouy/svelte-dapp
```

## Usage

You can browse the [`example`](example/) folder to discover more advanced usage.

```javascript
// MainComponent.svelte

<script>
  import 'Dapp' from '@osarrouy/svelte-dapp'
  import 'App'  from './App.svelte'
</script>

<Dapp id="myawesomedapp" network="kovan" fortmatic={{ key: 'my_key'}}>
  <App />
</Dapp>
```

```javascript
// ChildComponent.svelte

<script>
  import { dapp } from '@osarrouy/svelte-dapp'
  import { wallet, profile } from '@osarrouy/svelte-dapp/stores'

  const login = async () => {
    await dapp.login('metamask')
  }

  const logout = async () => {
    await dapp.logout()
  }
</script>

<section>
  <section>
    {#if $profile}
      <img src={$profile.avatar} />
      <p>{$profile.address}</p>
      <p>{$profile.did}</p>
      <p>{$profile.name}</p>
      <p>{$profile.url}</p>
    {:else}
      <p>Please login.</p>
    {/if}
  </section>
  <section>
    {#if $profile}
      <a on:click={login}>logout</a>
    {:else}
      <a on:click={login}>login</a>
    {/if}
  </section>
</section>
```

## API

### `dapp.login`

`svelte-dapp` allows to log users in through multiple ethereum wallets while transparently syncing their 3Box profile informations and enabling access to their dapp specific storage space. Supported wallet for now:

- Metamask
- Fortmatic

```javascript
await dapp
  .login("metamask")
  .on("wallet:syncing", () => {
    // waiting for the user to log in and / or enable her wallet
  })
  .on("wallet:synced", account => {
    // the user has logged in and / or enabled her wallet
    // the wallet store is filled with informations
  })
  .on("profile:syncing", () => {
    // waiting for the user 3Box profile to be synced
  })
  .on("profile:synced", profile => {
    // the user 3Box profile is now synced
    // the profile store is filled with informations
  })
  .on("storage:syncing", () => {
    // waiting for the user 3Box dapp storage space to be synced
  })
  .on("storage:synced", space => {
    // the user 3Box dapp storage space is now synced
    // the dapp can read and write from dapp.storage
  });
```

### `dapp.logout`

```javascript
await dapp.logout();
```

## Stores

### `wallet`

```javacript
<script>
  import { dapp } from '@osarrouy/svelte-dapp'
  import { wallet } from '@osarrouy/svelte-dapp/stores'

  dapp
    .login('formatic')
    .then(_ => {
      console.log($wallet)

      // {
      //   type: 'metamask' || 'fortmatic' || ...
      //   account: '0x76...',
      //   network: 'mainnet' || 'kovan' || ...
      //   provider: Object
      // }
    })
```

### `profile`

The `dapp.user` namespace provides a set of helpers to:

1. access and update a user's `3Box` generic profile
2. access and update a user's `3Box` app specific storage space
3. access and refreshed cached generic informations

If your dapp needs to read / write generic informations about a user's profile: use the `dapp.user.profile` sub-namespace. If your dapp needs to read / write app specific informations about a user such as settings or preferences: use the `dapp.user.storage` sub-namespace.

#### `dapp.user.profile`

```javacript
await dapp.user.profile.get('name')
await dapp.user.profile.set('age', 18, { private: true })
```

#### `dapp.user`

`svelte-dapp` caches and prettifies of set of generic informations about a user's profile on login.

```javacript
dapp.user.address // ethereum public address
dapp.user.did     //
dapp.user.name    //
dapp.user.avatar  // url pointing towards a user-specified profile image or a generic blockie substitute if the user has no avatar registered
dapp.user.url     //
dapp.user.raw     //
```

These informations are fetched on user login. If you need to refresh these informations at some point - _e.g._ because the user has updated its profile - you can call `dapp.user.refresh()`.

```javacript
await dapp.user.refresh()
```

### `dapp.helpers`

```javacript
console.log(await dapp.profiles.of(address_or_DID)
```
