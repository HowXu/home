# Home - 个人主页

> [English](./README.md) | 中文

![截图](./ss.png)

基于 Vue 3 的个人主页，包含天气显示、音乐播放器、一言诗句、时光胶囊、壁纸设置等功能。

**在线演示**: [howxu.cn](https://howxu.cn)

---

## 目录

- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [环境要求](#环境要求)
- [安装运行](#安装运行)
- [环境变量](#环境变量)
- [项目结构](#项目结构)
- [API 参考](#api-参考)
- [组件说明](#组件说明)
- [工具函数](#工具函数)
- [自定义配置](#自定义配置)
- [构建部署](#构建部署)

---

## 功能特性

- **天气显示** - 基于高德地图 API 的实时天气，支持自动定位
- **音乐播放器** - APlayer 集成，支持网易云音乐歌单
- **一言诗词** - 自定义 API 获取随机语句
- **时光胶囊** - 展示今日/本周/本月/本年的进度
- **壁纸设置** - 多种壁纸来源（默认、每日一图、随机风景、随机动漫）
- **社交链接** - 自定义社交媒体链接，支持悬停提示
- **PWA 支持** - 可离线访问的渐进式 Web 应用
- **响应式设计** - 移动端优先的自适应布局
- **自定义鼠标** - 动画跟随光标效果
- **默哀模式** - 纪念日自动灰度显示

---

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Vue | 3.5.x |
| 构建工具 | Vite | 5.4.x |
| 状态管理 | Pinia | 2.2.x |
| UI 组件库 | Element Plus | 2.8.x |
| 图标库 | Icon Park | 1.4.x |
| 日期工具 | dayjs | 1.11.x |
| 音乐播放器 | APlayer | 1.10.x |

---

## 环境要求

- **Node.js**: >= 22.0.0
- **包管理器**: npm, pnpm 或 yarn

---

## 安装运行

```bash
# 安装依赖
npm install

# 开发服务器 (http://localhost:3000)
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview

# 代码检查与格式化
npm run lint
npm run format
```

---

## 环境变量

在项目根目录创建 `.env` 文件：

```env
# 站点信息
VITE_SITE_NAME=站点名称
VITE_SITE_URL=https://你的域名.com
VITE_SITE_AUTHOR=作者名称
VITE_SITE_MAIN_LOGO=/images/logo.png
VITE_SITE_START=2020-01-01
VITE_SITE_ICP=ICP备案号

# 简介文字（支持 HTML）
VITE_DESC_HELLO=<strong>你好</strong>
VITE_DESC_TEXT=欢迎来到我的主页
VITE_DESC_HELLO_OTHER=<strong>欢迎回来</strong>
VITE_DESC_TEXT_OTHER=探索更多功能

# 音乐播放器（网易云音乐）
VITE_SONG_SERVER=netease
VITE_SONG_TYPE=playlist
VITE_SONG_ID=7452421335
VITE_SONG_API=https://api.example.com/music

# 天气 API（高德地图）
VITE_WEATHER_KEY=你的高德密钥
```

### 变量说明

| 变量名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `VITE_SITE_NAME` | string | 是 | 站点显示名称 |
| `VITE_SITE_URL` | string | 否 | 站点 URL（默认 `imsyy.top`） |
| `VITE_SITE_AUTHOR` | string | 是 | 作者名称 |
| `VITE_SITE_MAIN_LOGO` | string | 是 | 站点 logo 路径 |
| `VITE_SITE_START` | string | 否 | 建站日期（YYYY-MM-DD） |
| `VITE_SITE_ICP` | string | 否 | 网站备案号 |
| `VITE_DESC_HELLO` | string | 是 | 问候语（支持 HTML） |
| `VITE_DESC_TEXT` | string | 是 | 描述文字 |
| `VITE_DESC_HELLO_OTHER` | string | 否 | 开启盒子时的问候语 |
| `VITE_DESC_TEXT_OTHER` | string | 否 | 开启盒子时的描述 |
| `VITE_SONG_SERVER` | string | 否 | 音乐服务器（`netease` 或 `tencent`） |
| `VITE_SONG_TYPE` | string | 否 | 内容类型（`song`, `playlist`, `album` 等） |
| `VITE_SONG_ID` | string | 否 | 歌单/专辑 ID |
| `VITE_SONG_API` | string | 否 | 自定义音乐 API 地址 |
| `VITE_WEATHER_KEY` | string | 否 | 高德地图密钥（未配置则使用备用接口） |

---

## 项目结构

```
src/
├── api/
│   └── index.js           # API 请求函数
├── assets/
│   ├── socialLinks.json   # 社交链接数据（主）
│   ├── socialLinks2.json  # 社交链接数据（次）
│   └── siteLinks.json     # 网站导航链接
├── components/
│   ├── Background.vue     # 壁纸背景
│   ├── Footer.vue         # 页脚（版权/歌词）
│   ├── Hitokoto.vue       # 一言展示
│   ├── Links.vue          # 网站链接区域
│   ├── Loading.vue        # 页面加载动画
│   ├── Message.vue        # 主信息卡片（logo + 简介）
│   ├── MoreContent.vue    # 更多内容占位
│   ├── Music.vue          # 音乐控制面板
│   ├── Player.vue         # APlayer 包装器
│   ├── Set.vue            # 设置面板
│   ├── SocialLinks.vue    # 社交链接组件
│   ├── TimeCapsule.vue     # 时光胶囊
│   └── Weather.vue        # 天气显示
├── store/
│   └── index.js          # Pinia 状态管理
├── style/
│   ├── global.scss       # 全局 SCSS 变量
│   └── style.scss        # 全局样式
├── utils/
│   ├── cursor.js         # 自定义鼠标动画
│   ├── debounce.js       # 防抖工具函数
│   ├── getTime.js        # 时间工具函数
│   └── url.js            # URL 工具函数
└── views/
    ├── Box/
    │   └── index.vue     # 盒子弹窗（时光胶囊 + 更多内容）
    ├── Func/
    │   └── index.vue     # 功能区域（时间 + 天气）
    ├── Main/
    │   ├── Left.vue      # 左侧面板（Message）
    │   └── Right.vue      # 右侧面板（Func + Links）
    └── MoreSet/
        └── index.vue      # 设置弹窗
```

---

## API 参考

所有 API 函数位于 `src/api/index.js`：

### getPlayerList(server, type, id)

获取音乐播放列表。

**参数：**
| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `server` | string | `netease` | 音乐服务器（`netease` 或 `tencent`） |
| `type` | string | `playlist` | 查询类型（`song`, `playlist`, `album` 等） |
| `id` | string | `7452421335` | 歌单/专辑 ID |

**返回：**
```javascript
[
  {
    name: string,      // 歌曲名称
    artist: string,   // 艺术家
    url: string,       // 音频地址
    cover: string,    // 封面图片
    lrc: string       // 歌词地址
  }
]
```

### getHitokoto()

获取一言随机语句。

**返回：**
```javascript
{
  hitokoto: string,  // 语句内容
  from: string       // 来源
}
```

### getAdcode(key)

使用高德地图 API 通过 IP 获取地理位置。

**参数：**
| 名称 | 类型 | 说明 |
|------|------|------|
| `key` | string | 高德地图 API 密钥 |

**返回：**
```javascript
{
  city: string,     // 城市名称
  adcode: string   // 城市编码
}
```

### getWeather(key, city)

使用高德地图 API 获取天气信息。

**参数：**
| 名称 | 类型 | 说明 |
|------|------|------|
| `key` | string | 高德地图 API 密钥 |
| `city` | string | 城市编码 |

**返回：**
```javascript
{
  lives: [{
    weather: string,      // 天气现象
    temperature: string, // 实时气温
    winddirection: string,// 风向描述
    windpower: string     // 风力等级
  }]
}
```

### getOtherWeather()

当未配置高德密钥时使用的备用天气 API。

**返回：**
```javascript
{
  result: {
    city: { City: string },
    condition: {
      day_weather: string,
      min_degree: string,
      max_degree: string,
      day_wind_direction: string,
      day_wind_power: string
    }
  }
}
```

---

## 组件说明

### SocialLinks

展示社交媒体链接，支持悬停提示。

**Props：**
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `source` | string | `socialLinks` | 数据来源（`socialLinks` 或 `socialLinks2`） |

**数据格式**（`src/assets/socialLinks.json`）：
```json
[
  {
    "name": "GitHub",
    "icon": "/images/icon/github.png",
    "tip": "访问我的 GitHub",
    "url": "https://github.com/yourname"
  }
]
```

### Weather

显示当前天气，自动检测用户位置。

**特性：**
- 通过高德 IP API 自动检测城市
- 未配置密钥时使用备用天气 API
- 自动处理风向显示格式

### Music

音乐播放控制面板。

**功能：**
- 播放/暂停控制
- 上一曲/下一曲
- 音量滑块
- 音乐列表弹窗
- 键盘快捷键：`空格键` 切换播放

### TimeCapsule

展示时间进度。

**显示数据：**
- 今日进度（已过小时数）
- 本周进度（已过天数）
- 本月进度（已过天数）
- 本年进度（已过天数）
- 建站时长（如果配置了 `VITE_SITE_START`）

### Player

APlayer 包装组件。

**Props：**
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | string | `#efefef` | 播放器主题色 |
| `volume` | number | `0.7` | 默认音量（0-1） |
| `songServer` | string | `netease` | 音乐服务器 |
| `songType` | string | `playlist` | 内容类型 |
| `songId` | string | `7452421335` | 歌单 ID |
| `listFolded` | boolean | `false` | 列表是否默认折叠 |
| `listMaxHeight` | number | `420` | 列表最大高度（px） |

---

## 工具函数

### getTime.js

```javascript
// 获取当前时间对象
getCurrentTime()
// 返回: { year, month, day, hour, minute, second, weekday }

// 获取时光胶囊数据
getTimeCapsule()
// 返回: { day, week, month, year } 含进度信息

// 显示问候消息
helloInit()

// 检查纪念日（灰度模式）
checkDays()

// 计算建站时长
siteDateStatistics(startDate)
```

### debounce.js

```javascript
// 创建防抖函数
const debouncedFn = debounce(func, wait, immediate)
```

### url.js

```javascript
// 解析站点 URL 用于 logo 显示
getSiteUrl()
// 返回: ['子域名', '域名'] 例如: ['howxu', 'icu']
```

### cursor.js

```javascript
// 初始化自定义鼠标
cursorInit()
```

---

## 自定义配置

### 添加社交链接

编辑 `src/assets/socialLinks.json` 和/或 `src/assets/socialLinks2.json`：

```json
[
  {
    "name": "GitHub",
    "icon": "/images/icon/github.png",
    "tip": "访问我的 GitHub",
    "url": "https://github.com/yourname"
  }
]
```

### 添加网站导航链接

编辑 `src/assets/siteLinks.json`：

```json
[
  {
    "name": "音乐",
    "icon": "CompactDisc",
    "link": "https://music.example.com"
  }
]
```

图标可从 [@vicons/fa](https://www.xicons.org/) 选择。

### 纪念日配置（默哀模式）

编辑 `src/utils/getTime.js` 中的 `anniversaries` 对象：

```javascript
const anniversaries = {
  "4.4": "清明节",
  "5.12": "汶川大地震纪念日",
  "7.7": "中国人民抗日战争纪念日",
  "9.18": "九·一八事变纪念日",
  "12.13": "南京大屠杀死难者国家公祭日",
  // 在此添加更多日期
};
```

### 壁纸来源

壁纸类型定义在 `src/components/Background.vue`：

| 类型 | 来源 | URL |
|------|------|-----|
| 0 | 默认（本地） | `/images/background{N}.jpg` |
| 1 | 每日 Bing | `https://api.dujin.org/bing/1920.php` |
| 2 | 随机风景 | `https://api.vvhan.com/api/wallpaper/views` |
| 3 | 随机动漫 | `https://api.vvhan.com/api/wallpaper/acg` |

---

## 构建部署

### 构建

```bash
npm run build
```

输出目录为 `dist/`。

### PWA

项目使用 Vite PWA 插件。新版本部署后 Service Worker 会自动更新。可在 `vite.config.js` 中配置。

### 部署

网站可部署到任意静态托管服务：

- Cloudflare Pages
- Vercel
- Netlify
- GitHub Pages

---

## License

基于 [imsyy/home](https://github.com/imsyy/home) fork。

本项目仅供个人使用。请遵循原项目的许可证。

---

## 致谢

- [imsyy/home](https://github.com/imsyy/home) - 原项目
- [Element Plus](https://element-plus.org/) - UI 组件库
- [Icon Park](https://iconpark.oceanengine.com/) - 图标库
- [APlayer](https://github.com/MoePlayer/APlayer) - 音乐播放器
