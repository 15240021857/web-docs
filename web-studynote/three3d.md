# threejs 3D <Badge type="danger" text="will do" />

## 参考资料

- 视频：https://www.bilibili.com/list/watchlater?oid=1606309202&bvid=BV1Zm421g7oi&spm_id_from=333.788.top_right_bar_window_view_later.content.click

## 是什么？

- 在 web 上展示 3D 文件，并对 3D 图形进行自定义的控制和操作。

## 解决什么问题？

- 需要一些 3D 效果的功能
  - 3D 看房
  - 3D 看车
  - 3D 换肤
- 需要一些 3D 科技效果

## 怎么做？

### 创建第一个 3D 场景

- 创建场景 scene
- 创建相机 camera
- 创建渲染器 renderer
  - 将渲染器的 domElement 加入到页面中
- 创建几何体 geometry
- 创建材质 material
- 创建网格 mesh
  - 将 geometry 和 material，合成并加入到网格中
  - 将网格加到场景中
- 渲染
  - 将场景和相机传入渲染器中渲染
  - 递归调用渲染函数 requestAnimationFrame
- 辅助坐标系 xxhelper
  - 显示出坐标系轴线
- 控制器 xx-control
  - 可拖动场景，移动相机位置进行观察
- 缩放 scale
  - 父级缩放，子级也会缩放
- 旋转 rotate
  - 欧拉角，就是沿着 xyz 轴旋转
  - 父物体也带着子物体一起旋转
- 监听窗口变化
  - window.addEventListener('resize', () => {})
  - 重新设置渲染器大小
  - 重新设置相机比例
  - 重新渲染
- 物体调试控制台 lil-gui
- 手画三角形，正方形
  - 顶点数组 const vertices = new Float32Array([])
  - 每个矩形面，由 2 个三角形，6 个顶点组成
  - 每个顶点由 xyz 三个坐标组成，总共 72 个值
- 一个矩形，由两个三角形组成
  - 所以一个矩形 mesh 可以由两个不同材质
  - 通过分组或传入多个材质，来实现
- three 内置几何体

### 加载 3D 模型

- 导入模型

  - gltf 文件
    - 直接用 GLTFLoader 去解析出 gltf.scene，然后添加到场景中
  - glb 压缩文件：猜测应该是更小
    - 借助 three 内置的 dracoLoader，去解析压缩文件，也能得到 gltf.scene
    - 参考：https://blog.csdn.net/c_wengy/article/details/138078933

- 加载模型
  - GLTFLoader
  - GLTFLoader.load(url, callback)
  - callback 解析出 gltf 对象中，包含 scene
  - 将 scene 加入到场景中
