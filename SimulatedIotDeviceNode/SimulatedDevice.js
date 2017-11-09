'use strict';

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

//Device specific IoT hub connection string.
var connectionString = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
var client = clientFromConnectionString(connectionString);

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

var connectCallback = function (err) {
  if (err) {
    console.log('Could not connect: ' + err);
  } else {
    console.log('Client connected');

    // Create a message and send it to the IoT Hub every 5 second
    setInterval(function(){

        var data = JSON.stringify(createMessage());

        //Sending Telemetry Message with Priority
        var message = new Message(data);
        message.properties.add("sampleHeaderProperty", "SampleValue");
        console.log("Sending telemetry message: " + message.getData());
        client.sendEvent(message, printResultFor('send'));
    }, 5000);
  }
};

client.open(connectCallback);

function createMessage()
{
    var msgObjectArray = [];
    var msgObject = {};
    msgObject['deviceId'] = 'cdf41edf-8b2c-47bc-bcfd-11554ae22344';
    msgObject['deviceTimestamp'] = '2017-11-06T11:16:30Z';
    msgObject['deviceTemperature'] = '20';
    msgObjectArray.push(msgObject);

    //Second Set
    msgObject = {};
    msgObject['deviceId'] = 'cdf41edf-8b2c-47bc-bcfd-11554ae22344';
    msgObject['deviceTimestamp'] = '2017-11-06T11:16:30Z';
    msgObject['deviceFrequency'] = '30'
    msgObjectArray.push(msgObject);

    return msgObjectArray;
}