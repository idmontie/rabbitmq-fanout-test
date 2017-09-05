# RabbitMQ Fanout Test

Fanout to multiple work queues

## Running the Example

```sh
yarn install
```

1. Open some terminals (like 5 if you want the full effect)
2. Run the following in two of the terminals: `node ./consumer.js queue1`
3. Run the following in two of the **other** terminals: `node ./consumer.js queue2`
4. In the last terminal: `node ./producer.js`

You should see tasks being round-robin'd to both queue1 and queue2 separately.
