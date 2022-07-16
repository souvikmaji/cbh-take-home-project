const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";

  if(!event){
    return TRIVIAL_PARTITION_KEY;
  }

  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  
  if (event.partitionKey) {
    candidate = event.partitionKey;
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    const data = JSON.stringify(event);
    candidate = createHash(data);
  }
  
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate);
  }

  return candidate;
};

const createHash = data => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}