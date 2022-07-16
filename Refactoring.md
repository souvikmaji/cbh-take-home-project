# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

- While reading the code for the first time, the first thing that I noticed was that there are too many if else conditions present in the code, which is making it hard to understand the code flow. Instead, choose to use early returns wherever possible to simplify the code logic. For example, returning the trivial key early if the event is empty. We can omit the if(event) check because of this. After removing some of the conditional blocks, it was easier to refactor them further. Also the overall cyclometric complexity of the code reduced.

- Refactored the flow, into two different flows based on whether the partition key is present or not in the event. That untangles the nested conditions present in the code. Writing tests first gave me the confidence to do this type of logical refactoring. 

- crypto.createHash method is called from 2 different places with the same set of arguments. Created a separate method to create the hash, so that it's easier to maintain. If we decide to change the hashing algorithm, we need to make a change in one place only instead of two different places. 

- The hash function creates hashed strings of length 128 chars. So If the partition key is not present, and the candidate is hashed once, the length of the hashed key will always be less than MAX_PARTITION_KEY_LENGTH. So we can return early after hashing the partition key if it is present. 

- In the unit test cases for matching hashed strings, avoided doing an exact string match. Instead, checked for hexadecimal strings using regex and checking the output length. Exact string matching is avoided so that if we need to change the hashing algorithm, there is less chance of failing the test cases. But the current constraints will make sure, that if any new hashing algorithm is chosen, its compatible with the older algorithm.

