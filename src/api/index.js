const jsonp = (url) => {
  return new Promise((resolve, reject) => {
    const callbackName = `jsonp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `${url}${url.includes("?") ? "&" : "?"}callback=${callbackName}`;
    script.onerror = () => {
      if (window[callbackName]) {
        delete window[callbackName];
      }
      reject(new Error(`JSONP request failed: ${url}`));
    };
    window[callbackName] = (data) => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      delete window[callbackName];
      resolve(data);
    };
    document.head.appendChild(script);
  });
};

export const getPlayerList = async (server, type, id) => {
  console.log(`[Music API] Request - server: ${server}, type: ${type}, id: ${id}`);
  const res = await fetch(
    `${import.meta.env.VITE_SONG_API}?server=${server}&type=${type}&id=${id}`,
  );
  const data = await res.json();
  console.log(`[Music API] Response:`, data);

  if (data[0].url.startsWith("@")) {
    const [handle, jsonpCallback, jsonpCallbackFunction, url] = data[0].url.split("@").slice(1);
    console.log(`[Music API] Using JSONP for: ${url}`);
    const jsonpData = await jsonp(url);
    console.log(`[Music API] JSONP Response:`, jsonpData);
    const domain = (
      jsonpData.req_0.data.sip.find((i) => !i.startsWith("http://ws")) ||
      jsonpData.req_0.data.sip[0]
    ).replace("http://", "https://");

    return data.map((v, i) => ({
      name: v.name || v.title,
      artist: v.artist || v.author,
      url: domain + jsonpData.req_0.data.midurlinfo[i].purl,
      cover: v.cover || v.pic,
      lrc: v.lrc,
    }));
  } else {
    return data.map((v) => ({
      name: v.name || v.title,
      artist: v.artist || v.author,
      url: v.url,
      cover: v.cover || v.pic,
      lrc: v.lrc,
    }));
  }
};

export const getHitokoto = async () => {
  console.log("[Hitokoto API] Request");
  const res = await fetch("https://hittoken.howxu.cn/");
  const data = await res.json();
  console.log("[Hitokoto API] Response:", data);
  return data;
};

export const getAdcode = async (key) => {
  console.log("[Amap API] getAdcode Request - key:", key);
  const res = await fetch(`https://restapi.amap.com/v3/ip?key=${key}`);
  const data = await res.json();
  console.log("[Amap API] getAdcode Response:", data);
  return data;
};

export const getWeather = async (key, city) => {
  console.log(`[Amap API] getWeather Request - key: ${key}, city: ${city}`);
  const res = await fetch(
    `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`,
  );
  const data = await res.json();
  console.log("[Amap API] getWeather Response:", data);
  return data;
};
