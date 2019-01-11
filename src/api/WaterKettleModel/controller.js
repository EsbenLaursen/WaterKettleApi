import { success, notFound } from '../../services/response/'
import { WaterKettleModel } from '.'


var mqtt = require('mqtt')
var client = mqtt.connect({
  host: 'm21.cloudmqtt.com',
  port: 15512,
  username: 'qpumvfcg',
  password: 'RojH5T47_STM'
});




// = onMessageArrived;

//Test
client.on('connect', function() { // When connected
  console.log('connected');
  // subscribe to a topic
  client.subscribe('WaterKettleModels', function(err) {
    // when a message arrives, do something with it
    console.log("Subscribing");
  });
  client.subscribe('WaterKettleModels');
});
client.on('message', function (topic, message) {
  console.log(JSON.parse(message.toString()));
  console.log(JSON.parse(message.toString())["temperature"]);
  var data = { temperature: JSON.parse(message.toString())["temperature"], weight:JSON.parse(message.toString())["weight"]};
  WaterKettleModel.create(data).catch((err)=>console.log(err))

});




function onMessageArrived(message) {
  console.log("efwFEWFWEfwefwe");
  console.log("onMessageArrived:"+message.payloadString);
}


export const create = ({ bodymen: { body } }, res, next) =>
  WaterKettleModel.create(body)
    .then((waterKettleModel) => waterKettleModel.view(true))
    .then((waterKettleModel) => {
      console.log('trying')
      console.log(waterKettleModel)

      var result = client.publish('new-temp', JSON.stringify(body))
      return 1;//tempsensors
    })
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  WaterKettleModel.count(query)
    .then((waterKettleModels) => {console.log("index")})
    .then(count => WaterKettleModel.find(query, select, cursor)
      .then((waterKettleModels) => ({
        count,
        rows: waterKettleModels.map((waterKettleModel) => waterKettleModel.view())
      })
      )
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  WaterKettleModel.findById(params.id)
    .then((waterKettleModels) => {console.log("show")})
    .then(notFound(res))
    .then((waterKettleModel) => waterKettleModel ? waterKettleModel.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  WaterKettleModel.findById(params.id)
    .then(notFound(res))
    .then((waterKettleModel) => waterKettleModel ? Object.assign(waterKettleModel, body).save() : null)
    .then((waterKettleModel) => waterKettleModel ? waterKettleModel.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  WaterKettleModel.findById(params.id)
    .then(notFound(res))
    .then((waterKettleModel) => waterKettleModel ? waterKettleModel.remove() : null)
    .then(success(res, 204))
    .catch(next)
