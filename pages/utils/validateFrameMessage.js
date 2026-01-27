export default function validateFrameMessage(message) {
  if (!message.untrustedData || !message.trustedData) {
    return false;
  }

  const { fid, url, messageHash, timestamp, network, buttonIndex, state } =
    message.untrustedData;
  const { messageBytes } = message.trustedData;

  if (
    !fid ||
    !url ||
    !messageHash ||
    !timestamp ||
    !network ||
    !buttonIndex ||
    !state ||
    !messageBytes
  ) {
    return false;
  }

  const now = Math.floor(Date.now() / 1000);
  if (now - timestamp > 60) {
    return false;
  }

  return true;
}
