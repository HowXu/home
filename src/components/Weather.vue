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
import { getAdcode, getWeather, getOtherWeather } from "@/api";

const mainKey = import.meta.env.VITE_WEATHER_KEY;
console.log("[Weather] VITE_WEATHER_KEY:", mainKey ? "已配置" : "未配置");

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

const getTemperature = (min, max) => {
  try {
    const average = (Number(min) + Number(max)) / 2;
    return Math.round(average);
  } catch (error) {
    console.error("[Weather] getTemperature error:", error);
    return "NaN";
  }
};

const getWeatherData = async () => {
  console.log("[Weather] getWeatherData started, mainKey:", mainKey);
  try {
    if (!mainKey) {
      console.log("[Weather] No API key, using fallback API");
      const result = await getOtherWeather();
      console.log("[Weather] getOtherWeather result:", result);

      if (!result || !result.result) {
        throw new Error("备用天气API返回数据格式错误: " + JSON.stringify(result));
      }

      const data = result.result;
      if (!data.city || !data.condition) {
        throw new Error("备用天气API数据结构错误: " + JSON.stringify(result));
      }

      weatherData.adCode = {
        city: data.city.City || "未知地区",
      };
      weatherData.weather = {
        weather: data.condition.day_weather,
        temperature: getTemperature(data.condition.min_degree, data.condition.max_degree),
        winddirection: data.condition.day_wind_direction,
        windpower: data.condition.day_wind_power,
      };
      console.log("[Weather] Weather data updated:", weatherData);
    } else {
      console.log("[Weather] Using Amap API");
      const adCode = await getAdcode(mainKey);
      console.log("[Weather] getAdcode result:", adCode);

      if (adCode.infocode !== "10000") {
        throw new Error(`地区查询失败, infocode: ${adCode.infocode}, info: ${adCode.info}`);
      }

      weatherData.adCode = {
        city: adCode.city,
        adcode: adCode.adcode,
      };
      console.log("[Weather] adCode updated:", weatherData.adCode);

      const result = await getWeather(mainKey, weatherData.adCode.adcode);
      console.log("[Weather] getWeather result:", result);

      if (!result || !result.lives || !result.lives[0]) {
        throw new Error("天气API返回数据格式错误: " + JSON.stringify(result));
      }

      weatherData.weather = {
        weather: result.lives[0].weather,
        temperature: result.lives[0].temperature,
        winddirection: result.lives[0].winddirection,
        windpower: result.lives[0].windpower,
      };
      console.log("[Weather] Weather data updated:", weatherData);
    }
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