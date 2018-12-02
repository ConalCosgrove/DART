const request = require('superagent');
const xml2js = require('xml2js');

/**
 * getStations
 * @return {Object} JSON object containing train stations, and their codes
 *                  amongst other information
 */
function getStations() {
  return new Promise((resolve, reject) => {
    request
      .get("http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML")
      .then((res) => {
        xml2js.parseString(res.text, (err, result) => {
          if (err) {
            reject(new Error('Could not retreive list of stations'));
          } else {
            resolve(result.ArrayOfObjStation.objStation);
          }
        });
      });
  });
}
/**
 * getTrainsToStation
 * Returns promise that resolves to an object of all trains serving
 * supplied station within the time provided.
 * @param {String} stationCode - Code of station to query
 * @param {String} timeSpan - max arrival time (in minutes) of trains to return
 * @return {Object} JSON of trains arriving at the desired station within the timespan
 */

function getTrainsToStation(stationCode, timeSpan) {
  return new Promise((resolve, reject) => {
    request
      .get(
        `http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=${stationCode}&NumMins=${timeSpan}`
      )
      .then((res) => {
        xml2js.parseString(res.text, (err, result) => {
          if (err) {
            reject(new Error('Could not get train data'));
          } else {
            resolve(result.ArrayOfObjStation.objStation);
          }
        });
      });
  });
}
module.exports = {
  getStations,
  getTrainsToStation,
};
