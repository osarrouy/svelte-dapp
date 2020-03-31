import Box from "3box";
import blockie from "ethereum-blockies-base64";
import resolve from "did-resolver";
import register from "3id-resolver";

const profiles = {
  of: async _did => {
    register(await Box.getIPFS());
    const did = await resolve(_did);
    const raw = await Box.getProfile(_did);

    return {
      address: did.publicKey[2].ethereumAddress,
      did: _did,
      name: raw.name ? raw.name : "anonymous",
      avatar: raw.image
        ? "https://ipfs.infura.io/ipfs/" + raw.image[0].contentUrl["/"]
        : blockie(did.publicKey[2].ethereumAddress),
      url: "https://3box.io/" + did.publicKey[2].ethereumAddress,
      raw: raw
    };
  }
};

export default profiles;
