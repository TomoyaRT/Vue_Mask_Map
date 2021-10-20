import { Icon } from "leaflet";

/**
 * 創造圖標模板
 * @param {*} color
 * @returns
 */
export function createPopup(data) {
  return `
    <h3 class="fs-4 fw-bold mb-2">${data.properties.name}</h3>
    <p class="fs-8 m-0 mb-1">地址 | ${data.properties.address}</p>
    <p class="fs-8 m-0 mb-1">連絡電話 | ${data.properties.phone}</p>
    <p class="fs-8 m-0 mb-1">備註 | ${data.properties.note}</p>
    <p class="fs-8 m-0 mb-2 text-gray-500">資訊更新於 ${data.properties.updated} 天前</p>
    <div class="d-flex mb-2 justify-content-between">
      <button type="button" class="btn btn-secondary me-1 text-white w-475">成人口罩 ${data.properties.mask_adult} 個</button>
      <button type="button" class="btn btn-secondary text-white w-475">兒童口罩 ${data.properties.mask_child} 個</button>
    </div>
    <a href="https://www.google.com/search?q=${data.properties.name}" target="_blank"
      class="btn btn-primary text-white w-100 mb-2"> Google 關鍵字搜尋
    <a href="https://www.google.com/maps/search/${data.properties.name}/@${data.geometry.coordinates},${data.geometry.coordinates}" target="_blank"
      class="btn btn-success text-white w-100"> Google Map 路線導航
  `
}

/**
 * 圖標顏色設定
 * @param {String} color
 * @returns
 */
const iconColor = color =>
  new Icon({
    iconUrl: color !== 'user' ? require(`@/assets/icon/${color}-icon.svg`) : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
    shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

/**
 * 圖標顏色篩選器
 * @param {Object} store
 * @returns
 */
export function iconFilter(store) {
  if (store === undefined) return iconColor('user');
  const adult = store.properties.mask_adult;
  const child = store.properties.mask_child;

  if (adult + child <= 1000) return iconColor('soldout');
  if (adult + child <= 2000) return iconColor('less');
  if (adult + child <= 3000) return iconColor('average');
  if (adult + child > 3000) return iconColor('more');
}
