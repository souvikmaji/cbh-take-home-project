const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");


describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns same partition key present in the event for partition key's smaller than 256 char", () => {
    const randomKey = crypto.randomBytes(10).toString('hex');
    const event = {"partitionKey": randomKey}
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe(randomKey);
  });

  it("Returns string value for partition key for non string partition keys smaller than 256 char", () => {
    const event = {"partitionKey": 1000}
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe("1000");
  });

  it("Returns different hashed value for partition key for partition keys larger than 256 char", () => {
    const randomKey = crypto.randomBytes(260).toString('hex');
    const event = {"partitionKey": randomKey}
    const trivialKey = deterministicPartitionKey(event);
    
    expect(trivialKey).not.toBe(randomKey);
  });

  it("Returns hashed string for events without partition key", () => {
    const event = "data"
    const trivialKey = deterministicPartitionKey(event);
    
    expect(trivialKey).not.toBe(JSON.stringify(event));
    expect(trivialKey).toMatch(/[0-9A-Fa-f]+/g);
    expect(trivialKey.length).toBe(128);
  });

  it("Returns hashed string with empty event", () => {
    const event = {}
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).not.toBe(JSON.stringify(event));
    expect(trivialKey).toMatch(/[0-9A-Fa-f]+/g);
    expect(trivialKey.length).toBe(128);
  });
});
