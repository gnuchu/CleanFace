import { settingsStorage } from "settings";
import * as messaging from "messaging";

settingsStorage.onchange = function (evt) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    if (evt.key === "USDateFormat") {
      let data = JSON.parse(evt.newValue);
      messaging.peerSocket.send(data);
    }
  }
}