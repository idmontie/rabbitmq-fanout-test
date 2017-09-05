var amqp = require('amqplib/callback_api');

console.log();

amqp.connect('amqp://claire:claire@localhost', function(err, conn) {
  if (err) {
    console.log(err);
    return;
  }

  conn.createChannel(function(err, ch) {
    if (err) {
      console.log(err);
      return;
    }

    var ex = 'logs';

    ch.assertExchange(ex, 'fanout', {durable: false});

    ch.assertQueue(process.argv[2], {}, function(err, q) {
      if (err) {
        console.log(err);
        return;
      }

      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '');

      ch.consume(q.queue, function(msg) {
        console.log(" [x] %s", msg.content.toString());
      }, {noAck: true});
    });
  });
});
