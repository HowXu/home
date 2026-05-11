<template>
  <div class="weather" v-if="weatherData.adCode.city && weatherData.weather.weather">
    <span>{{ weatherData.adCode.city }}&nbsp;</span>
    <span>{{ weatherData.weather.weather }}&nbsp;</span>
    <span>{{ weatherData.weather.temperature }}℃</span>
    <span class="sm-hidden">
      &nbsp;{{ formatWinddirection(weatherData.weather.winddirection) }}
    </span>
    <span class="sm-hidden">{{ weatherData.weather.windpower }}&nbsp;级</span>
  </div>
  <div class="weather" v-else>
    <span>天气数据获取失败</span>
  </div>
</template>

<script setup>
import { getAdcode, getWeather } from "@/api";

const mainKey = import.meta.env.VITE_WEATHER_KEY;
console.log("[Weather] VITE_WEATHER_KEY:", mainKey ? "已配置" : "未配置", mainKey);

const weatherData = reactive({
  adCode: {
    city: null,
    adcode: null,
  },
  weather: {
    weather: null,
    temperature: null,
    winddirection: null,
    windpower: null,
  },
});

const formatWinddirection = (dir) => {
  if (!dir) return "";
  return dir.endsWith("风") ? dir : dir + "风";
};


const getWeatherData = async () => {
  try {
    if (!mainKey || mainKey.trim() === "") {
      throw new Error("Empty API key");
    }

    const city = await getAdcode(mainKey);

    if(city.status !== "1"){
      throw new Error("City info error");
    }

    const city_adcode = (!city.adcode || city.adcode.length === 0) ? "360100" : city.adcode;

    const weather = await getWeather(mainKey,city_adcode);

    if(weather.status !== "1"){
      throw new Error("Weather info error");
    }

    const live = weather.lives[0]

    weatherData.adCode = {
        city: live.city === "" ?  "未知地区" : live.city,
        adcode: live.adcode
      };

    weatherData.weather = {
        weather: live.weather,
        temperature: live.temperature, 
        winddirection: live.winddirection,
        windpower: live.windpower,
      };

  } catch (error) {
    console.error("[Weather] Error:", error);
    ElMessage({
      message: "天气信息获取失败: " + error.message,
    });
  }
};

onMounted(() => {
  console.log("[Weather] Component mounted");
  getWeatherData();
});
</script>
