const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');


//service fn to calculate fare on basis of distance and time with help of mapService.getDistanceTime fn
async function getFare(pickup, destination) {
  if(!pickup || !destination) {
    throw new Error('Pickup and destination are required')
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);  //await coz getDistanceTime is async in mapService

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5
  };

  const fare = {
    auto: baseFare.auto + (( distanceTime.distance.value / 1000 ) * perKmRate.auto) + (( distanceTime.duration.value / 60 ) * perMinuteRate.auto),
    car: baseFare.car + (( distanceTime.distance.value / 1000 ) * perKmRate.car) + (( distanceTime.duration.value / 60 ) * perMinuteRate.car),
    motorcycle: baseFare.motorcycle + (( distanceTime.distance.value / 1000 ) * perKmRate.motorcycle) + (( distanceTime.duration.value / 60 ) * perMinuteRate.motorcycle)
  };

  return fare;
}


module.exports.createRide = async ({
  user, pickup, destination, vehicleType  //must req
 }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('All fields are required');
  }

  const fare = await getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[ vehicleType ]
  })

  return ride;
}

