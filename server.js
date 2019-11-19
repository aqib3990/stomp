var Stomp = require('stomp-client');
var destination = '/queue/test1';
var express = require('express');
var app = express();

app.get('/, function(req, res) {
var client = new Stomp('172.30.74.114', 61613, '', ''); 
try {
  client.connect(function(sessionId) {
    client.subscribe(destination, function(body, headers) {
      console.log('This is the body of a message on the subscribed queue:', body);
    });
    res.send(client);
    client.publish(destination, 'hi');
  });
}
 catch(err) {
 res.send(err);
   console.log("ERROR====> ", err);
 }
})