# `svelte-dapp`

> DApp SSO made easy with 3Box and Svelte.

## Demo

Check out the demo [here](https://svelte-dapp.netlify.com/).

## Installation

```bash
npm install --save @osarrouy/svelte-dapp
```

## Usage

You can browse the [`example`](example/) folder to find out about a more advanced usage.

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

### `login / logout`

#### `dapp.login`

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

#### `dapp.logout`

```javascript
await dapp.logout();
```

### `profile / storage`

`svelte-dapp` provides a set of helpers to: a. access and update a user's `3Box` generic profile b. access and update a user's `3Box` dapp specific storage space.

If your dapp needs to read / write generic informations about a user's profile: use the `dapp.profile` helpers. If your dapp needs to read / write app specific informations about a user such as settings or preferences: use the `dapp.storage` helpers.

#### `dapp.profile`

```javacript
await dapp.profile.set('name', 'John Doe')
await dapp.profile.get('name')
// => 'John Doe'
await dapp.profile.set('age', 18, { private: true })
await dapp.profile.get('age', { private: true})
// => 18

```

#### `dapp.storage`

```javacript
await dapp.storage.set('lang', 'en')
await dapp.storage.get('lang')
// => 'en'
await dapp.storage.set('relationship', 'complicated', { private: true })
await dapp.storage.get('relationship', { private: true})
// => 'complicated'

```

## Stores

### `wallet`

```javascript
<script>
  import { dapp }   from '@osarrouy/svelte-dapp'
  import { wallet } from '@osarrouy/svelte-dapp/stores'

  dapp
    .login('formatic')
    .then(_ => {
      console.log($wallet)
      // {
      //   type:    'metamask' || 'fortmatic' || ...
      //   account: '0x76...',
      //   network: 'mainnet' || 'kovan' || ...
      //   provider: Object
      // }
    })
<script>
```

### `profile`

```javascript
<script>
  import { dapp }    from '@osarrouy/svelte-dapp'
  import { profile } from '@osarrouy/svelte-dapp/stores'

  dapp
    .login('formatic')
    .then(_ => {
      console.log($profile)
      // {
      //    address 0x85c...
      //    did     did:3:....
      //    name    John Doe
      //    avatar  url of a user-defined picture and standard Ethereum blockie otherwise
      //    url     https://3box.io/0x85c...
      //    raw:    Object [raw 3Box profile]
      // }
    })
<script>
```

### `isLoggedIn`

```javascript
<script>
  import { dapp }       from '@osarrouy/svelte-dapp'
  import { isLoggedIn } from '@osarrouy/svelte-dapp/stores'

  isLoggedIn.subscribe(_isLoggedIn => {
    if (_isLoggedIn) {
      console.log('User is now logged in!')
      console.log('You can use dapp.profile and dapp.storage safely.')
    }
  })
<script>
```
