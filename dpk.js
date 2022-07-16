const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
const HASHING_ALGO = "sha3-512";

exports.deterministicPartitionKey = (event) => {

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  // event must be non null here.
  if (event.partitionKey) {
    let candidate = event.partitionKey;
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = createHash(candidate);
    }

    return candidate;
  }

  // Partion key is not present. Simply Create hash and return
  const data = JSON.stringify(event);
  return createHash(data);
};

const createHash = data => {
  return crypto.createHash(HASHING_ALGO).update(data).digest("hex");
};