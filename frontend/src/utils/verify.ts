import nacl from "tweetnacl";
import { Message } from "@farcaster/core";

export const verifyFrameActionMessage = (body: any) => {
  const message = Message.decode(
    Buffer.from(body.trustedData.messageBytes, "hex")
  );
  //   console.log(message);
  const isVerified = nacl.sign.detached.verify(
    message.hash,
    message.signature,
    message.signer
  );
  if (isVerified) {
    console.log("Signature is valid.");
  } else {
    console.log("Signature is invalid.");
  }
  return isVerified;
};
