import {
  infra as $infra,
  profile as $profile,
  wallet as $wallet
} from "../stores";
import profiles from "./helpers/profiles";
import Box from "3box";
import PromiEvent from "web3-core-promievent";

let wallet;

$wallet.subscribe(_wallet => {
  if (wallet && !_wallet) {
    profile.logout();
  }
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
  }
};

export default profile;
