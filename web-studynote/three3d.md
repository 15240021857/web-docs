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
  - 将集合体和材质，合成并加入到网格中
  - 将网格加到场景中
- 渲染
  - 将场景和相机传入渲染器中渲染
  - 递归调用渲染函数 requestAnimationFrame
