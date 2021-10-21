<h1 align="center">
  <a href="https://tomoyart.github.io/Vue_Mask_Map/">
    <img
      src="https://i.imgur.com/TUag8pB.png"
      alt="Mask Map"
      width="200"
    />
  </a>
  <br>
  Mask Map
  <br>
</h1>

<h4 align="center">
  口罩地圖網站：Vue.js 開發
</h4>

<p align="center">
  <a  href="https://tomoyart.github.io/Vue_Mask_Map/">
    <img src="https://img.shields.io/badge/Demo-MaskMap-blue">
  </a>
</p>

<p align="center">
  <a href="#作品介紹">作品介紹</a> •
  <a href="#檔案結構">檔案結構</a> •
  <a href="#使用套件">使用套件</a>
</p>

<img src="https://i.imgur.com/l2Dduxp.jpg">
<h4>
  <a href="https://tomoyart.github.io/Vue_Mask_Map/">Demo</a>
</h4>


## 作品介紹

### 使用技術
|            |              技術／套件              |
| :--------: | :----------------------------------: |
|  前端框架  |               Vue/Vuex               |
|  地圖套件  |               Leaflet                |
|  部署環境  |               GitHub Page            |
| 第三方 API | 健保特約機構口罩剩餘數量明細清單 |
| 第三方 API | OpenStreetMap |


### 網站特色

#### 特色一
- 點選藥局卡片的icon，直接飛越到目標藥局的位置。

![Fly To Position](https://imgur.com/fn53L2R)

#### 特色二
- 捕捉使用者當前地理位置，並自動搜尋該區域的資料，顯示與藥局的距離。
<div>Icons made by <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
![Coupon jigsaw puzzle game imgur](https://i.imgur.com/SZP74Dc.gif)

#### 特色三
- 將地圖圖標整合成群組，並顯示該區域的數量與範圍，進而提升網站效能與使用者體驗。

![Markers To Number](https://i.imgur.com/01u89L6.gifv)

## 專案架構
```
    src
    ├── assets
    │   ├── icon                              # 網站內使用的圖示
    │   └── scss
    │         ├── helper
    │         │     └──custom.scss            # Bootstrap 客製化設定
    │         │
    │         └── all.scss                    # scss的編譯進入點
    │
    ├── components
    │   ├── InstructionsForUse                # 網站的使用說明書
    │   ├── MaskMap                           # 地圖
    │   ├── Sidebar                           # 側邊欄
    │   ├── SidebarStoreCard                  # 側邊欄的藥局卡片
    │   └── UserLocation                      # 使用者的地理位置
    │
    ├── plugins
    │   └── leaflet.js                        # 封裝Leaflet套件的商業邏輯
    │
    ├── store
    │   └── index.js                          # Vuex 資料狀態的管理
    │
    ├── App.vue                               # Vue的頂層元件
    │
    └── main.js                               # Webpack進入點
 ```

## 使用套件

- [vue](https://github.com/vuejs/vue)
- [vuex](https://github.com/vuejs/vuex)
- [axios](https://github.com/axios/axios)
- [vue-axios](https://github.com/imcvampire/vue-axios)
- [bootstrap](https://github.com/twbs/bootstrap)
- [bootstrap-icons](https://github.com/twbs/icons)
- [leaflet](https://github.com/Leaflet/Leaflet)
- [leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)
