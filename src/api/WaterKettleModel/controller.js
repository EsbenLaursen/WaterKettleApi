import { success, notFound } from '../../services/response/'
import { WaterKettleModel } from '.'

var mqtt = require('mqtt')
var client = mqtt.connect({
  host: 'm21.cloudmqtt.com',
  port: 15512,
  username: 'qpumvfcg',
  password: 'RojH5T47_STM'
})

client.on('connect', function () {
  client.subscribe('WaterKettleModels', function (err) {
    console.log(err);
    if (!err) {
      console.log('COONTAAACFTTTTT')
    }
  })
})

client.subscribe('WaterKettleModels', function (err) {
  if (!err) {
    console.log('COONTAAACFTTTTT')
  }
})

//Test
client.on('connect', function() { // When connected
  console.log('connected');
  // subscribe to a topic
  client.subscribe('WaterKettleModels', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message  + "' on '" + topic + "'" + JSON.stringify(packet) );
    });
  });


});



client.onMessageArrived = onMessageArrived;
function onMessageArrived(message) {
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
