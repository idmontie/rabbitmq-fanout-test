var amqp = require('amqplib/callback_api');

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
    var msg = process.argv.slice(2).join(' ') || 'Hello World!';

    ch.assertExchange(ex, 'fanout', {durable: false});
    ch.publish(ex, '', new Buffer(msg));
    console.log(" [x] Sent %s", msg);

    setInterval(function () {
      ch.publish(ex, '', new Buffer(msg));
      console.log(" [x] Sent %s", msg);
    }, 5000);
  });

  // setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
