import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const mainStore = defineStore("main", () => {
  const imgLoadStatus = ref(false);
  const innerWidth = ref(null);
  const coverType = ref("0");
  const siteStartShow = ref(false);
  const musicClick = ref(false);
  const musicIsOk = ref(false);
  const musicVolume = ref(0);
  const musicOpenState = ref(false);
  const backgroundShow = ref(false);
  const boxOpenState = ref(false);
  const mobileOpenState = ref(false);
  const mobileFuncState = ref(false);
  const setOpenState = ref(false);
  const playerState = ref(false);
  const playerTitle = ref(null);
  const playerArtist = ref(null);
  const playerLrc = ref("歌词加载中");
  const playerLrcShow = ref(true);
  const footerBlur = ref(true);
  const playerAutoplay = ref(false);
  const playerLoop = ref("all");
  const playerOrder = ref("list");

  const setInnerWidth = (value) => {
    innerWidth.value = value;
    if (value >= 720) {
      mobileOpenState.value = false;
      mobileFuncState.value = false;
    }
  };

  const togglePlayerState = () => {
    playerState.value = !playerState.value;
  };

  const setPlayerLrc = (value) => {
    playerLrc.value = value;
  };

  const setPlayerData = (title, artist) => {
    playerTitle.value = title;
    playerArtist.value = artist;
  };

  const setImgLoadStatus = (value) => {
    imgLoadStatus.value = value;
  };

  return {
    imgLoadStatus,
    innerWidth,
    coverType,
    siteStartShow,
    musicClick,
    musicIsOk,
    musicVolume,
    musicOpenState,
    backgroundShow,
    boxOpenState,
    mobileOpenState,
    mobileFuncState,
    setOpenState,
    playerState,
    playerTitle,
    playerArtist,
    playerLrc,
    playerLrcShow,
    footerBlur,
    playerAutoplay,
    playerLoop,
    playerOrder,
    setInnerWidth,
    togglePlayerState,
    setPlayerLrc,
    setPlayerData,
    setImgLoadStatus,
  };
}, {
  persist: {
    paths: [
      "coverType",
      "musicVolume",
      "siteStartShow",
      "musicClick",
      "playerLrcShow",
      "footerBlur",
      "playerAutoplay",
      "playerLoop",
      "playerOrder",
    ],
  },
});