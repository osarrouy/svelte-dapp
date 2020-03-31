import { settings as $settings } from "../stores";
import profile from "./profile";
import storage from "./storage";
import wallet from "./wallet";
import profiles from "./helpers/profiles";
import Box from "3box";
import register from "3id-resolver";
import PromiEvent from "web3-core-promievent";

const initialize = async _settings => {
  $settings.set(_settings);
  register(await Box.getIPFS());
};

const login = _wallet => {
  const pe = PromiEvent();

  wallet
    .login(_wallet)
    .on("wallet:syncing", () => {
      pe.eventEmitter.emit("wallet:syncing");
    })
    .on("wallet:synced", _account => {
      pe.eventEmitter.emit("wallet:synced", _account);
    })
    .then(_account => {
      profile
        .login()
        .on("profile:syncing", () => {
          pe.eventEmitter.emit("profile:syncing");
        })
        .on("profile:synced", _profile => {
          pe.eventEmitter.emit("profile:synced", _profile);
        })
        .then(_profile => {
          storage
            .login()
            .on("storage:syncing", () => {
              pe.eventEmitter.emit("storage:syncing");
            })
            .on("storage:synced", _space => {
              pe.eventEmitter.emit("storage:synced", _space);
            })
            .then(_space => {
              pe.resolve(_profile);
            });
        });
    });

  return pe.eventEmitter;
};

const logout = () => {
  wallet.logout();
};

export default {
  profile,
  storage,
  wallet,
  // profiles,
  initialize,
  login,
  logout
};
