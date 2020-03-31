import { settings as $settings, wallet as $wallet } from "../stores";
import Fortmatic from "fortmatic";
import PromiEvent from "web3-core-promievent";

let settings;

$settings.subscribe(_settings => {
  settings = _settings;
});

const login = {
  metamask: () => {
    const pe = PromiEvent();

    if (window.ethereum) {
      Promise.resolve().then(() => {
        pe.eventEmitter.emit("wallet:syncing");
        window.ethereum.autoRefreshOnNetworkChange = false;
        // events listener
        window.ethereum.on("accountsChanged", _accounts => {
          wallet.logout();
        });
        window.ethereum.on("networkChanged", _network => {
          $wallet.update(_wallet => ({
            ..._wallet,
            ...{ network: _network }
          }));
        });
        // enable metamask [EIP-1102]
        window.ethereum.enable().then(_accounts => {
          $wallet.update(_wallet => ({
            type: "metamask",
            account: _accounts[0],
            network: window.ethereum.networkVersion,
            provider: window.ethereum
          }));
          pe.eventEmitter.emit("wallet:synced", _accounts[0]);
          pe.resolve(_accounts[0]);
        });
      });
    } else {
      pe.reject("Metamask is not installed in this browser");
    }

    return pe.eventEmitter;
  },
  fortmatic: () => {
    const pe = PromiEvent();

    Promise.resolve().then(() => {
      pe.eventEmitter.emit("wallet:syncing");
      const fm = new Fortmatic(settings.fortmatic.key, settings.network);
      // enable fortmatic [EIP-1102]
      fm.user.login().then(_ => {
        fm.getProvider()
          .enable()
          .then(_accounts => {
            $wallet.update(_wallet => ({
              type: "fortmatic",
              account: _accounts[0],
              network: settings.network,
              provider: fm.getProvider()
            }));
            pe.eventEmitter.emit("wallet:synced", _accounts[0]);
            pe.resolve(_accounts[0]);
          });
      });
    });

    return pe.eventEmitter;
  }
};

const wallet = {
  login: _wallet => {
    const pe = PromiEvent();

    switch (_wallet) {
      case "metamask":
        login
          .metamask()
          .on("wallet:syncing", () => {
            pe.eventEmitter.emit("wallet:syncing");
          })
          .on("wallet:syncing", _account => {
            pe.eventEmitter.emit("wallet:synced", _account);
          })
          .then(_account => {
            pe.resolve(_account);
          });
        break;
      case "fortmatic":
        login
          .fortmatic()
          .on("wallet:syncing", () => {
            pe.eventEmitter.emit("wallet:syncing");
          })
          .on("wallet:synced", _account => {
            pe.eventEmitter.emit("wallet:synced", _account);
          })
          .then(_account => {
            pe.resolve(_account);
          });
        break;
      default:
        throw new Error("Unsupported wallet type: " + _wallet);
    }

    return pe.eventEmitter;
  },
  logout: () => {
    $wallet.update(_wallet => {
      if (_wallet && _wallet.type === "metamask") {
        window.ethereum.on("accountsChanged", _ => {});
        window.ethereum.on("networkChanged", _ => {});
      } else if (_wallet && _wallet.type === "fortmatic") {
        const fm = new Fortmatic(settings.fortmatic.key);
        fm.user.logout();
      }

      return null;
    });
  }
};

export default wallet;
