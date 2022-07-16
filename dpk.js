const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

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
  return crypto.createHash("sha3-512").update(data).digest("hex");
};