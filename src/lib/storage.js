import {
  infra as $infra,
  isLoggedIn as $isLoggedIn,
  settings as $settings
} from "../stores";
import PromiEvent from "web3-core-promievent";

let infra;
let isLoggedIn;
let settings;

$infra.subscribe(_infra => {
  infra = _infra;
});

$isLoggedIn.subscribe(_isLoggedIn => {
  if (isLoggedIn && !_isLoggedIn) {
    storage.logout();
  }
  isLoggedIn = _isLoggedIn;
});

$settings.subscribe(_settings => {
  settings = _settings;
});

const storage = {
  login: () => {
    const pe = PromiEvent();
    Promise.resolve().then(() => {
      if (!infra.box) {
        pe.reject("user not logged in in 3Box");
      }
      pe.eventEmitter.emit("storage:syncing");
      infra.box.openSpace(settings.id).then(_space => {
        _space.syncDone.then(() => {
          $infra.update(_infra => ({
            ..._infra,
            ...{ space: _space }
          }));
          pe.eventEmitter.emit("storage:synced", _space);
          pe.resolve(_space);
        });
      });
    });

    return pe.eventEmitter;
  },
  logout: () => {
    $infra.update(_infra => ({ ..._infra, ...{ space: null } }));
  },
  set: (key, value, opts = { private: false }) => {
    if (opts.private) {
      return infra.space.private.set(key, value);
    } else {
      return infra.space.public.set(key, value);
    }
  },
  get: (key, opts = { private: false }) => {
    if (opts.private) {
      return infra.space.private.get(key);
    } else {
      return infra.space.public.get(key);
    }
  }
};

export default storage;
