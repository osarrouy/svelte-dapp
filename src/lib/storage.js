import { infra as $infra, settings as $settings } from "../stores";
import PromiEvent from "web3-core-promievent";

let infra;
let settings;

$infra.subscribe(_infra => {
  if (infra && infra.box && !_infra.box) {
    storage.logout();
  }
  infra = _infra;
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
  }
};

export default storage;
