import {
  infra as $infra,
  isLoggedIn as $isLoggedIn,
  profile as $profile,
  wallet as $wallet
} from "../stores";
import profiles from "./helpers/profiles";
import Box from "3box";
import PromiEvent from "web3-core-promievent";

let infra;
let isLoggedIn;
let wallet;

$infra.subscribe(_infra => {
  infra = _infra;
});

$isLoggedIn.subscribe(_isLoggedIn => {
  if (isLoggedIn && !_isLoggedIn) {
    profile.logout();
  }
  isLoggedIn = _isLoggedIn;
});

$wallet.subscribe(_wallet => {
  wallet = _wallet;
});

const profile = {
  login: () => {
    const pe = PromiEvent();

    Promise.resolve().then(() => {
      pe.eventEmitter.emit("profile:syncing");
      Box.openBox(wallet.account, wallet.provider).then(_box => {
        _box.syncDone.then(() => {
          profiles.of(_box.DID).then(_profile => {
            $infra.update(_infra => ({
              ..._infra,
              ...{ box: _box }
            }));
            $profile.update(_ => _profile);
            pe.eventEmitter.emit("profile:synced", _profile);
            pe.resolve(_profile);
          });
        });
      });
    });

    return pe.eventEmitter;
  },
  logout: () => {
    $infra.update(_infra => ({ ..._infra, ...{ box: null } }));
    $profile.update(_profile => null);
  },
  set: (key, value, opts = { private: false }) => {
    if (opts.private) {
      return infra.box.private.set(key, value);
    } else {
      return infra.box.public.set(key, value);
    }
  },
  get: (key, opts = { private: false }) => {
    if (opts.private) {
      return infra.box.private.get(key);
    } else {
      return infra.box.public.get(key);
    }
  }
};

export default profile;
