import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";
import { display } from "display";
import { geolocation } from "geolocation";
// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const timeLabel = document.getElementById("timeLabel");
const dateLabel = document.getElementById("dateLabel");
const heartRateLabel = document.getElementById("heartRateLabel");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();

  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }

  let minutes = util.zeroPad(today.getMinutes());
  let seconds = util.zeroPad(today.getSeconds());

  let day = util.zeroPad(today.getDate());
  let month = util.zeroPad(today.getMonth() + 1);
  let year = today.getFullYear();

  timeLabel.text = `${hours}:${minutes}:${seconds}`;
  dateLabel.text = `${day}/${month}/${year}`;
  
   if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
    const hrm = new HeartRateSensor();
    hrm.addEventListener("reading", () => {
      //Update heart rate here.
      heartRateLabel.text = "\u2665 " + `${hrm.heartRate}`;
    });
    display.addEventListener("change", () => {
      // Automatically stop the sensor when the screen is off to conserve battery
      if (display.on) {
        hrm.start();
      }
      else {
        hrm.stop();
      }
    });

    hrm.start();
  }
}
