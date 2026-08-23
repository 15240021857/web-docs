# flv.js <Badge type="danger" text="will do" />

## 是什么？

- flv.js 是 Flash video 视频（FLV）播放器，纯 Js 开发，没有使用 flash，由 blibli 开源。
- Github 地址：https://github.com/Bilibili/flv.js/
- 学习参考：https://blog.csdn.net/An1090239782/article/details/108972491
- html5 的 video 仅支持 MP4 和 webm, flv 可将 xx 格式转成 MP4 格式，喂给 video 来播放。
- 可用于直播，目前主流直播是 xx 格式
## 解决什么问题
- 摄像头设备的视频流是RTSP格式， 浏览无法直接解码播放，需要流媒体服务器中转成FLV/WebRTC等格式，才能使用flv.js/webrtc来播放。
- flv.js 完全由js控制，不需要任何浏览器插件， chrome/edge等现代浏览器直接跑。

```html
<video id="flvVideo" autoplay muted playsinline style="width:800px"></video>
<script>
import flv from 'flv.js';
// ZLMediaKit输出whip地址
const whipUrl = 'http://192.168.1.100:8080/live/1';
if (flv.isSupported()) {
    const flv = new window.FlvPlayer({
        type: 'flv',
        url: whipUrl,
        isLive: true, // true是直播流 false 表示回放流
    }, {
        enableStashBuffer: false, // 关闭缓存，降低延迟
        stashInitialSize: 128
    });
    flv.attachMediaElement('#flvVideo');
    flv.load();
    flv.play();
    flv.on(flv.Events.ERROR, (errType, err) => {
        console.error('flv.js错误',errType,err);
    })
} else {
    console.error('flv.js 不支持当前浏览器');
}


</script>
```
