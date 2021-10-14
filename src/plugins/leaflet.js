
import { Icon } from "leaflet";

const iconColor = color =>
  new Icon({
    iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

export function iconFilter(store) {
  const adult = store.properties.mask_adult;
  const child = store.properties.mask_child;

  if (adult + child <= 1000) return iconColor('grey');
  if (adult + child <= 2000) return iconColor('red');
  if (adult + child <= 3000) return iconColor('yellow');
  if (adult + child > 3000) return iconColor('blue');
}
