# WEBRTC 浏览器音视频媒体技术

## 是什么，解决什么问题？
- 是RTC协议的一种实现，用于在浏览器之间进行实时的音视频通信。
- 解决了传统Web技术在音视频通信方面的问题，如插件依赖、性能问题等。
- 也支持摄像头的实时视频流传输，如摄像机，无人机、机器人等。由于他们传输的视频流是RTSP格式，所以需要流媒体服务器中转成WebRTC格式，才能使用WebRTC来解码播放。

## 原理
- es6+新特性 浏览器原生支持
- 基于udp协议，实现点对点的音视频通信

## 实时视频，视频回放：摄像头，无人机，机器人等
- WebRTC: UDP 协议传输，浏览器原生解码，延迟极低，高实时性，适合实时视频传输。
- flv: 基于http 长连接传输，需要插件解码，延迟略高，适合非实时视频传输。
```html
<video id="rtcVideo" autoplay muted playsinline style="width:800px"></video>
<script>
// ZLMediaKit输出whip地址
const whipUrl = 'http://127.0.0.1:8080/live/camera01/webrtc';

async function startPlay() {
  // 1. 创建RTCPeerConnection连接对象，WebRTC核心
  const pc = new RTCPeerConnection({});
  const videoEl = document.getElementById('rtcVideo');

  // 2. 监听远端媒体轨道（视频/音频过来的时候触发）
  pc.ontrack = (e) => {
    // 把远端拿到的媒体流赋值给video标签播放
    videoEl.srcObject = e.streams[0];
  };

  // 3. 浏览器生成Offer（本地SDP协商描述）
  const offer = await pc.createOffer();
  // 设置本地描述，生成本机的SDP信息
  await pc.setLocalDescription(offer);

  // 4. POST把Offer的SDP发送给ZLMediaKit WHIP接口
  const res = await fetch(whipUrl, {
    method: 'POST',
    body: new RTCSessionDescription(pc.localDescription).sdp,
    headers: {
      'Content-Type': 'application/sdp'
    }
  });
  // 获取服务端返回Answer SDP
  const answerSdp = await res.text();

  // 5. 将服务端Answer设置为远端描述，完成SDP协商
  await pc.setRemoteDescription(new RTCSessionDescription({type:'answer', sdp:answerSdp}));
}

startPlay();
</script>

```

## 屏幕共享

## 音视频通话
