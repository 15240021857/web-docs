# 前端开发规范

面向前端小组的日常写法：Vue3 + TypeScript + Element Plus 做中后台，UniApp 做 H5 / 小程序 / App。目标不是写成百科，而是让大家用同一种方式开工，新人看完就能抄着做一个列表页。

全篇当手册查。新人先看：**是什么 → 原则 → 接到需求怎么做 → 一页对照**，大约 15 分钟。遇到具体问题再翻对应小节。

和这份规范配套的是：[Git 规范](./git.md)、[Code Review](./code-review.md)、[组件化](../web-engineering/component.md)。格式、提交信息、合并门槛那些文档已经写过的，这里不重复。

## 是什么

前端开发规范是一组**默认写法**，不是审美指南。

它约定四件事：文件放哪、名字怎么起、页面/接口/状态怎么写、什么时候必须抽出公共代码。其余交给 ESLint / Prettier / 提交钩子。人只盯自动化盯不住的：对不对、会不会炸、别人能不能接着改。

默认写法的意思是：没有特殊理由，就按这里做。有理由可以破例，但要在 PR 里写一句为什么。破例多了就变成新约定，补进文档，不要靠口口相传。

## 解决什么问题？

- **同一类页面五种写法**：列表、表单、弹窗、上传，每个人一套，后人看不懂，也不敢复用。
- **不知道文件放哪**：公共组件、页面私有组件、hooks、接口类型散落，找一个方法要翻半个仓库。
- **接口和页面缠在一起**：页面里拼 URL、处理 code、弹 Message，换环境或换端就要改十几处。
- **状态乱放**：能本地解决的进了 Pinia，该进 URL 的筛选条件一刷新就丢。
- **TypeScript 形同虚设**：满屏 `any`，或者为了类型写一堆没人看的泛型。
- **跨端踩坑反复发生**：UniApp 里用了 `window` / `document` / Element Plus，H5 能跑、小程序挂。
- **规范太重，写完没人执行**：一百条细则，Review 只纠结空格，两周后文档作废。

这份规范要解决的，是前六条。最后一条靠「规则少、能自动拦、新人只记开工路径」来防。

## 原则（先记住这 6 条）

1. **先抄再造**。新页面优先复制仓库里最像的旧页面，再改接口和字段。不要从空白 `vue` 文件发明第三种列表。
2. **页面只写编排**。请求进 `api/`，复用逻辑进 `hooks/`，跨页状态进 store，UI 细节进组件。页面里不要出现 `uni.request` / `axios` 和一长串列配置。
3. **类型为业务服务**。接口入参出参、组件 props、字典枚举要有类型；不要为了「够企业级」上复杂泛型。禁止新增 `any`。
4. **能自动拦的，人不盯**。格式、导入顺序、提交前缀、`any`、未使用变量，交给 CI。Review 看正确性和一致性，见 [Code Review](./code-review.md)。
5. **出现 3 次再抽**。只在一个页面用的，放页面旁边。两个页面开始像，先忍；第三次再抽到 `components/` 或 `hooks/`。
6. **一端一套 UI 库**。中后台用 Element Plus；UniApp 用 uni 组件或 uView。不要在小程序 / App 页面里引 `el-*`。

破例可以，但要能一句话说清。说不清就按默认来。

## 接到需求怎么做（新人按这个下手）

不要从「我该先读哪本 Vue 书」开始。按下面 8 步走，第一周就能独立交一个普通 CRUD。

| 步骤 | 做什么 | 完成标准 |
| --- | --- | --- |
| 1. 对标 | 在仓库里找一个同类页（列表 / 表单 / 详情） | 能指出要抄的文件路径 |
| 2. 目录 | 在对应模块下建页面，需要的私有组件放旁边 | 路径符合下文「仓库长什么样」 |
| 3. 类型 | 先写接口入参、出参、列表项类型 | `api/xxx.ts` 里能看到类型，页面不再写裸 `any` |
| 4. 接口 | 只在 `api/` 里发请求，页面调用函数 | 页面里搜不到 URL 字符串 |
| 5. 页面 | 抄对标页：查询、表格/列表、空态、分页、权限 | 三种态都有：loading / 空 / 错误 |
| 6. 联调 | 本地跑通主路径，再补失败和空数据 | 自己用自测清单过一遍 |
| 7. 自测 | 按下文章单勾，不要等测试替你发现 | PR 描述里写「怎么验」 |
| 8. 提交 | 按 [Git 规范](./git.md) 写 message，PR 指明重点文件 | 描述 + 自测说明，等人 Review |

**第一周只做模块内页面。** 不要改 `components/common`、请求封装、路由守卫、构建配置。那些是公共层，走 [会审候选](./code-review.md)。

### 自测清单（提 PR 前自己勾）

- 有数据 / 无数据 / 接口失败，三种都能看到界面，不是白屏或转圈停住。
- 查询会把页码重置到第 1 页；删除最后一条会回到上一页，不会停在空页。
- 按钮连点不会重复提交（提交中禁用或锁住）。
- 没权限的按钮或菜单看不到，或点了有明确提示。
- 刷新当前页：该还在的筛选条件还在（该进 URL 的不要只放内存）。
- UniApp：微信开发者工具、H5 各点一遍主路径，不要只在 H5 里看一眼。

## 怎么做

### 1. 仓库长什么样

先认目录，再写代码。名字可以微调，**职责不要混**：页面、接口、公共组件、页面私有组件、store 分开放。

#### 中后台（Vue3 + Vite + Element Plus）

```text
src/
├── api/                    # 按业务模块拆，只放请求函数和入参出参类型
│   └── user.ts
├── assets/                 # 静态图、字体；能走 CDN 的大图不要打进仓库
├── components/
│   ├── common/             # 纯 UI，不感知业务（ProTable、SearchBar）
│   └── business/           # 跨模块业务组件（UserSelector、DeptTree）
├── hooks/                  # 跨页面复用的组合式函数 useXxx
├── layouts/                # 壳子：顶栏、侧栏、多页签
├── router/
├── stores/                 # Pinia，只放跨页共享
├── styles/                 # 全局变量、重置、Element Plus 主题覆盖
├── types/                  # 多模块共用的类型（分页、登录用户）
├── utils/                  # 无 UI 的纯函数，不要塞 Vue 组件逻辑
├── views/
│   └── user/
│       ├── list.vue        # 列表页
│       ├── detail.vue
│       ├── components/     # 仅本模块用
│       └── hooks/          # 仅本模块用
└── App.vue
```

#### UniApp（H5 / 小程序 / App）

```text
src/
├── api/
├── components/             # 跨页组件；页面私有仍放 pages/xxx/components
├── hooks/
├── pages/                  # 必须在 pages.json 注册，和文件路径一致
│   └── user/
│       ├── list.vue
│       └── detail.vue
├── static/                 # UniApp 静态资源目录约定，勿乱放
├── stores/
├── utils/
├── App.vue
├── main.ts
├── pages.json
├── manifest.json
└── uni.scss                # 全局样式变量
```

**放哪，按这张表，不要争论：**

| 东西 | 放哪 | 不要放哪 |
| --- | --- | --- |
| 只被一个页面用的区块 | `views/xxx/components` 或 `pages/xxx/components` | `components/common` |
| 两个以上模块都要用的业务块 | `components/business` | 某个页面目录里让别人来抄 |
| 纯 UI、不谈业务 | `components/common` | 带着「订单状态」这种业务词 |
| 请求 | `api/模块.ts` | `.vue` 里直接拼 URL |
| 跨页登录态、权限、字典 | `stores/` | 每个页面自己 `localStorage.getItem` |
| 当前页筛选、弹窗显隐 | 页面自己的 `ref` | Pinia |
| 可分享、可刷新保持的查询条件 | 路由 query（中后台） | 只放在组件内存 |
| 跨端差异（支付、文件选图） | `utils/platform` 或 `#ifdef` 收口 | 页面里到处 `#ifdef` |

公共组件建议自包含：自己的 `types.ts`、必要的 `api.ts` 放在组件目录里，和 [组件化](../web-engineering/component.md) 一致。

### 2. 命名（看名字就知道是什么）

| 种类 | 约定 | 例子 |
| --- | --- | --- |
| 页面 / 组件文件 | PascalCase 或模块内 `list.vue` / `detail.vue`，组内选一种后不要混 | `UserList.vue` 或 `user/list.vue` |
| 组件名 | 多词，避免单字母、避免 `My` / `Temp` / `Test` | `DeptTree`、`OrderFilter` |
| hooks | `use` + 动词或名词 | `useUserList`、`usePermission` |
| api 函数 | 动词开头，和后端动作对应 | `getUserList`、`createUser`、`updateUser`、`deleteUser` |
| 事件 | `on` + 动词（模板）；`defineEmits` 用动词原形 | `@click="onSubmit"`，`emit('change')` |
| 布尔 | `is` / `has` / `can` / `show` | `isLoading`、`hasPermission`、`showDialog` |
| 常量 / 字典 | 大写下划线，或 `as const` 对象 | `ORDER_STATUS`、`PageSize` |
| css 类 | 组件名前缀，避免全局裸类名 | `.user-list__filter` |
| 路由 name | 与页面含义一致 | `UserList`、`UserDetail` |

**禁止：** `data1`、`temp`、`obj`、`fn`、`handleClick1`、`aaa`。实在是回调参数，用 `item` / `index` / `row` 这种一看就懂的。

中英文混用可以，但同一个概念必须同一个词：用户不要这页叫 `user`、那页叫 `member`、接口里又叫 `account`。以后端字段为准，前端别再翻译一层。

### 3. Vue3 组件怎么写

新代码统一 `<script setup lang="ts">`。老的 Options API 页面能不动就不动；动到这块逻辑时再顺手迁，不要专门开「全量重构」PR。

单文件推荐顺序：**template → script → style**。script 内部按这个排，后来的人不用从上看到下猜：

```vue
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getUserList, type UserItem, type UserListParams } from '@/api/user'
import { usePermission } from '@/hooks/usePermission'

const props = defineProps<{
  deptId?: string
}>()

const emit = defineEmits<{
  select: [row: UserItem]
}>()

const loading = ref(false)
const list = ref<UserItem[]>([])
const query = ref<UserListParams>({ page: 1, pageSize: 20, keyword: '' })

const canCreate = computed(() => usePermission('user:create'))

async function fetchList() {
  loading.value = true
  try {
    const data = await getUserList(query.value)
    list.value = data.records
  } finally {
    loading.value = false
  }
}

function onSearch() {
  query.value.page = 1
  fetchList()
}

onMounted(fetchList)
</script>
```

**组内默认：**

- 用 `ref` 做独立值（含对象也行）；需要一坨表单字段绑 `el-form` 时，用 `reactive` 可以，但不要解构它（会丢响应）。
- 列表、弹窗显隐、loading 用 `ref`，不要全部塞进一个巨大 `reactive(state)`。
- 双向绑定优先 `defineModel()`（Vue 3.4+），不要再手写 `emit('update:xxx')`，除非要兼容旧组件。
- `v-for` 的 `key` 用业务 id。列表会排序、删除、筛选时，禁止用 `index` 当 key。
- `v-if` 和 `v-for` 不要写在同一个元素上。
- 需要 `keep-alive` 的页面，用 `defineOptions({ name: 'UserList' })`，和路由 name 对齐。
- 子组件要对父组件暴露方法时才 `defineExpose`。弹窗可以自己管显隐：父组件 `ref.open()`，不要每个页面再维护一套 `visible`。这点和 [组件化](../web-engineering/component.md) 里 dialog 的写法一致。
- 不要在模板里写复杂计算，放到 `computed` 或方法里。
- 不要用 `watch` 当业务流程引擎。用户点了按钮就调函数；只有「跟路由 / props 同步」才用 `watch`。

**页面里直接跳过的写法：**

- 新文件再写 `export default { data, methods }`。
- 为了「优雅」上 `provide/inject` 传普通表单字段（用 props）。
- 用 `mitt` / 全局事件总线传邻页数据（用路由参数或 store）。
- 在 `setup` 顶层做需要登录态、且可能失败的重请求还不处理错误。

### 4. TypeScript：够用就好

TypeScript 是为了改字段时编辑器报警，不是为了展示类型体操。

**要写类型的地方：**

- `api/` 的入参、出参、列表项。
- 组件 `props` / `emits` / `defineModel`。
- 字典、状态码、权限码：用字面量联合或 `as const`，不要满天飞 `string`。
- 工具函数的输入输出。

**不要写的地方：**

- 每个局部 `const name = ref('')` 再标一遍 `ref<string>`。
- 为一次映射写三级泛型。
- `as any` 消红线。消不掉就补类型；实在来不及，用 `unknown` 再收窄，并在 PR 里说明。

```ts
// api/user.ts —— 页面不要再定义一份 UserItem
export interface UserListParams {
  page: number
  pageSize: number
  keyword?: string
  deptId?: string
}

export interface UserItem {
  id: string
  name: string
  status: 0 | 1
}

export interface PageResult<T> {
  records: T[]
  total: number
}

export function getUserList(params: UserListParams) {
  return request.get<PageResult<UserItem>>('/user/list', { params })
}
```

共用的分页、登录用户放 `types/`。只有一个接口用的类型，就放在该 `api` 文件里一起导出，不要先建空的 `types/user.ts` 凑仪式感。

`interface` 用在会扩展的对象结构；联合、工具类型用 `type`。不要争论哪个「更规范」，组内按这句即可。

### 5. 请求与接口

所有端都走统一封装（中后台 `axios` 实例，UniApp `uni.request` 包一层）。页面和组件只调 `api/` 里的函数。

**封装层统一做：**

- 带 token、租户、端类型等公共头。
- 解包 `{ code, data, message }`：成功返回 `data`，失败抛错并默认 toast。
- 401 走登录过期，不要每个页面自己跳登录。
- 超时、网络错误给一句人话，不要把原始报错甩到界面。

**页面层要自己处理的：**

- 这个请求失败时不想 toast（静默刷新），调封装时带 `silent`。
- 搜索防抖、连点取消上一请求，避免「后发先至」把旧结果盖到新查询上。
- 提交按钮的 loading，和列表 loading 分开，不要共用一个 `loading` 把整页转死。

```ts
// 页面里这样用
const data = await getUserList(query.value)

// 不要这样
uni.request({ url: '/user/list', data: query.value })
axios.get('/api/user/list?page=' + page)
```

**约定：**

- 一个模块一个 `api` 文件，函数名见名知意。不要搞 `api.user.list()` 深封装，也没有收益。
- 改接口字段，先改类型再改页面，让编译器把调用点报出来。
- Mock 用现有方案即可，见 [Mock](../web-engineering/mock.md)。不要在业务文件里写死一套假数据还提交上去。
- 环境变量用 `VITE_` / 项目已有前缀，`.env.development` / `.env.production` 分开放。密钥、私钥、真机密码禁止进仓库。

### 6. 状态放哪

问三个问题，就能决定，不必先上 store：

| 问 | 是 | 放哪 |
| --- | --- | --- |
| 刷新 / 分享还要在？ | 中后台的筛选、分页、tab | 路由 query |
| 很多页都读、都可能改？ | 登录用户、权限码、全局字典 | Pinia |
| 只有这页用？ | 弹窗、表单、临时选中行 | 组件 `ref` |

Pinia 用 setup 写法，和组件一致：

```ts
export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const profile = ref<UserProfile | null>(null)

  function setToken(value: string) {
    token.value = value
  }

  return { token, profile, setToken }
})
```

**不要：** 把列表数据放进全局 store「方便详情页用」。详情页自己请求，或走路由 `id`。全局缓存列表是脏数据的常见来源。

字典：启动时拉一次放 store，或按需拉进 `hooks/useDict`。页面里不要写死 `{ label: '启用', value: 1 }` 复制十份。

### 7. Element Plus（中后台）

Element Plus 是默认 UI。能直接用的不要包一层；**反复出现的组合**再抽。

**直接用：** `el-button`、`el-input`、`el-select`、`el-date-picker`、单次 `el-dialog`。

**值得抽（仓库里应该已经有，或第三次出现时抽）：**

- 查询区 + 表格 + 分页（列、接口不同，壳子相同）。
- 带校验的上传、带权限的按钮。
- 字典下拉（传入 dictCode 即可）。

**表单固定写法：**

- `el-form` 必须 `:model` + `:rules` + `ref`，提交先 `await formRef.value.validate()`。
- 提交中按钮 `:loading` / `:disabled`，防止连点。
- 校验信息写人话：「请输入手机号」，不要「输入不能为空」还对不上字段。
- 重置用表单 `resetFields`，不要手写每个字段 `= ''` 还漏一个。

**表格固定写法：**

- 列多或要在多个页复用时，列配置抽成数组或子组件，不要 200 行 `el-table-column` 堆在页面里。
- 空数据用 `el-empty` 或表格空插槽，不要只显示一张没表头的白表。
- 操作列按钮超过 3 个，收进「更多」。权限用指令或函数包一下，不要只靠「这个角色大概看不到菜单」。

消息反馈统一：`ElMessage.success/error`、危险操作用 `ElMessageBox.confirm`。不要有的用 `alert`，有的用 Element，有的自己写 Toast。

主题色、圆角、间距走 CSS 变量，在 `styles/` 覆盖 Element Plus 变量。页面里不要写死 `#409EFF`。

### 8. UniApp 跨端

UniApp 页面是 Vue，但运行时不是浏览器。**H5 能跑不等于能合。**

**必须遵守：**

- 新页面先在 `pages.json` 注册，路径和文件一致，标题写在 `style.navigationBarTitleText`（或项目统一的自定义顶栏配置）。
- 样式用 `rpx`，安全区用官方变量 / `safe-area-inset-*`。不要按某个安卓机的 px 微调完当完成。
- 跳转用 `uni.navigateTo` / `redirectTo` / `switchTab` / `reLaunch`，搞清这四个区别。能返回的用 `navigateTo`，登录进首页用 `reLaunch`，tab 页只能 `switchTab`。
- 请求、存储、选图、支付走 `uni.*` 或项目封装，不要用 `window` / `document` / `localStorage` / `XMLHttpRequest`。
- 条件编译尽量收口到 `utils/platform.ts` 或单独 `.mp.vue` / 适配文件。页面里超过 2 处 `#ifdef`，就该抽。
- 长列表优先分页，或用项目选定的列表方案（如 z-paging）。不要一次性 `v-for` 几百条。
- 图片给宽高，避免滚动时高度跳动。大图压过再进 `static`。
- 真机 / 微信开发者工具至少验一条主路径。只盯 Chrome 里的 H5，小程序上线必炸。

**禁止：**

- 在 `pages/` 里引入 Element Plus。
- 用 `v-html` 渲染接口富文本还不消毒（能不用就不用；要用走项目指定的富文本组件）。
- 依赖 H5 的 DOM 测量（`getBoundingClientRect` 一把梭）。要用 `uni.createSelectorQuery`。
- 把 token 打进 `console.log` 提交上去。

两端能复用的是：`api` 的函数签名和类型、纯 `utils`、不含 DOM 的 hooks。UI 和路由不要强行一套代码打天下。

### 9. 样式

- 组件样式默认 `scoped`。改子组件或 Element Plus 内部用 `:deep()`，并写注释说明改的是哪一块。禁止无范围的全局选择器「顺便改掉所有表格」。
- 间距、字号、颜色用 `styles/` 或 `uni.scss` 里的变量。同样是 16px 灰字，不要每个页写一遍魔法数。
- 布局用 flex / grid。不要用负 margin + 绝对定位堆出「只有这台显示器是齐的」效果。
- 少用 `!important`。用了要能说清是在覆盖第三方，并尽快收到主题覆盖里。
- 中后台不要在业务页写一套新的按钮颜色。UniApp 自定义导航栏注意状态栏高度，不要内容顶到电量上。

### 10. 什么时候抽组件、hooks、utils

按「出现次数 × 有没有独立名字」判断，不要为了目录好看先建空壳。

| 场景 | 做法 |
| --- | --- |
| 只用一次的区块 | 写在页面里；超过 80 行或明显一段 UI，挪到页面 `components/` |
| 同模块两个页在用 | 放到该模块 `components/` 或 `hooks/` |
| 第三个模块也要 | 升到 `components/business` 或 `hooks/`，并给一个不带模块黑话的名字 |
| 无 UI、无请求的计算 | `utils/` |
| 有状态、要在生命周期里干活 | `hooks/useXxx`，返回值显式列出 |
| 「通用表格」却耦合了订单字段 | 抽失败了，拆回去，别继续加 `if (type === 'order')` |

hooks 必须显式返回，调用方一眼能看见拿了什么。不要学 mixins 往外偷偷塞同名变量，见 [Vue 笔记 · hooks](../web-studynote/vue.md)。

公共组件的 props 只谈通用能力（`title`、`modelValue`、`disabled`）。订单金额、审批流节点不要漏进 `components/common`。

改了 `components/`、`hooks/`、`utils/`、`api` 封装、`router`、`stores` 基础结构：PR 打 `会审候选`，按 [Code Review](./code-review.md) 走。

### 11. 列表页和表单页：默认骨架

组里 80% 的工作是这两类。骨架对齐了，规范就立住了。

**列表页必须具备：** 查询区、表格/卡片列表、分页、loading、空态、错误态、权限按钮。中后台查询条件能进 URL 的就进（关键字、状态、页码）。

查询点击 → `page = 1` → 拉列表。分页变化 → 只改页码再拉。不要「查询」和「翻页」两套互不同步的参数对象。

**表单页必须具备：** 校验、提交锁、失败可重试、离开未保存是否提示（长表单才需要，短弹窗不必）。编辑页进入先拉详情，再填入表单，注意别在详情返回前把空表单提交上去。

弹窗表单：打开时重置；关闭时清校验。不要上次校验红框留到下一条数据上。

### 12. 路由、权限、安全（只记会出事的）

- 中后台路由按模块拆文件，再在入口合并。`meta` 至少有 `title`、权限码。页面标题、菜单高亮都读 `meta`，不要写死。
- 未登录进需登录页 → 去登录，并把目标地址记下，登录完跳回来。无权限 → 统一 403 页，不要空白。
- 按钮权限和菜单权限用同一套权限码。只藏按钮不够，接口失败也要当无权限处理，不能当「未知错误」。
- 禁止把密钥、AK/SK、生产 token 写进代码或提交 `.env.production` 里的真密钥。见 [安全相关](../web-engineering/secret.md)（若文档仍在补，先做到「仓库里搜不到密码」）。
- 用户输入不要 `v-html` 直出。文件上传限制类型和大小，预览用 URL 而不是把本地路径当生产地址。

### 13. 自动化能拦的，人不要盯

下面这些合入前必须过，会议和 Review 里禁止再聊空格：

- ESLint + Prettier（保存或提交时自动修）。
- `vue-tsc --noEmit` 或项目同等类型检查。
- 提交信息符合 [commitlint](./git.md)：`feat` / `fix` / `perf` / `refactor` / `docs` / `chore`。
- CI：lint + 类型检查 + 构建。构建不过不能合。

本地没装钩子的，以 CI 为准，不要说「我机器是好的」。新增 `any`、调试用的 `console.log`（尤其是带接口数据 / token 的）应当被 lint 或 Review 拦下。

人工 Review 的顺序仍然是：做对没有 → 公共层 → 是否重复造轮子 → 性能 / 安全。见 [Code Review](./code-review.md)。

### 14. 注释和文档

代码优先靠名字说话。注释只写**为什么**，以及非显而易见的坑（兼容某个旧接口、某个端的 bug）。

禁止：把函数名翻译成中文再写一遍；大段注释掉的死代码提交上去（用 git 就行）；TODO 不署名、不写日期。`// TODO(张三, 2026-09-20): 等后端改完状态枚举` 可以留，没人认领的 TODO 下个迭代当债清掉。

公共 hooks / 业务组件：在文件头用三五行说明「干什么、怎么用、不要用来干什么」。比单独再开一篇 wiki 容易活下去。

## 几种常见卡法，按这个处理

**「规范太多，不知道先守哪条」**  
只守原则 6 条 + 列表/表单骨架 + 接口不进页面。其余用到再查。

**「这个页面比较特殊，我另写一套」**  
先对着骨架说特殊在哪。只多一个筛选或一个自定义列，不算特殊。真特殊（画布、大屏、地图）可以破例，PR 里写一句，不要让特殊页污染公共表格。

**「要不要先封装万能 ProTable」**  
不要作为落地第一步。先让三个列表页长得像，再抽壳子。一上来万能表格，后面全是 `if`。

**「类型报错，先 `as any` 上线」**  
不允许进主分支。当天要发的热修可以在行内用 `unknown` 收窄，并开后续 issue。把 `any` 当习惯，规范就死了。

**「小程序上样式错位 / API 不存在」**  
先查有没有用浏览器 API、有没有用 `el-*`、`pages.json` 有没有注册。这三类占了 UniApp 新人问题的大半。

**「公共组件我改了一点点」**  
再小也是公共层。自己的模块先兼容，PR 标出影响面，打 `会审候选`。不要默默改默认值让别的页一起变。

**「老页面和规范不一致，要不要全改」**  
不动就不改。改到哪个函数，那个函数按新规范写。禁止「顺手重构半个模块」和需求混在一个 PR。

**「新人说看完还是不会写」**  
让他对着「接到需求怎么做」抄最近一个已合并的列表 PR，而不是从本文第 1 节再读一遍。规范是对照表，不是教材。

## 建议的落地节奏（先跑 4 周）

不要第一天上 40 条 lint 规则和万能脚手架。按四周把习惯立住：

1. **第 1 周**：目录和命名按本文对齐；新页面必须 `<script setup lang="ts">`；新人用「接到需求怎么做」交第一个列表页。旧页面不整改。
2. **第 2 周**：新接口必须走 `api/` + 类型；列表必须有 loading / 空 / 错误。Review 按自测清单拦，不拦命名审美。
3. **第 3 周**：提交钩子和 CI 真正拦住格式、`any`、构建失败。人不再评论缩进。周四会审把本周「又出现的第三种列表写法」收成一条约定，补进本文。
4. **第 4 周**：复盘——重复问题有没有少、有没有规则没人守、有没有规则太烦。**只改一处**（例如「查询条件进 URL」或「抽一个查询条」）。不要推翻重写文档。

工具保持现有即可：Vite / HBuilderX、ESLint、GitLab 或 GitHub、群里一份规范链接。缺的不是新平台，是「新页面有没有对标页、PR 有没有按清单勾」。

四周后，这份文档只通过会审结论变厚，不通过有人突然加一章变厚。

## 一页对照（打印或置顶群公告）

```text
技术栈：中后台 Vue3 + TS + Element Plus；移动端 UniApp。一端一套 UI，禁止小程序引 el-*
原则：先抄再造；页面只编排；禁止新增 any；出现 3 次再抽；格式交给 CI
目录：api / views|pages / components/common|business / hooks / stores / utils
页面：script setup + 先抄同类页；列表必须有 loading / 空 / 错误；查询重置页码
接口：只在 api/ 发请求；入参出参写类型；401 和 toast 走封装
状态：仅本页用 ref；跨页用 Pinia；要刷新还在的筛选进路由 query
表单：rules + validate + 提交锁；弹窗开关要重置校验
UniApp：pages.json 先注册；用 uni.* 和 rpx；#ifdef 收口；H5 和小程序都要点
抽离：页面私有放模块内；公共层改动打「会审候选」
新人：对标 → 建目录 → 写类型和 api → 抄页面 → 自测清单 → 按 Git 规范提 PR
不盯：空格、引号、import 顺序、变量名好不好听
配套：git.md / code-review.md；新约定只从会审补进来
```

## 参考

- Vue3 官方风格指南：https://cn.vuejs.org/style-guide/
- Vue3 文档：https://cn.vuejs.org/
- Element Plus：https://element-plus.org/zh-CN/
- UniApp：https://uniapp.dcloud.net.cn/
- 组内 [Code Review](./code-review.md)、[Git 规范](./git.md)、[组件化](../web-engineering/component.md)
- vue3 源码笔记：https://mp.weixin.qq.com/s?__biz=MzU2NjU3Nzg2Mg==&mid=2247533741&idx=1&sn=c572a28ed468f49b9be95d61a939f65b&chksm=fca85b04cbdfd212a5cdda1f49aac7dca4b970048532daf443943bd9dd1a2398c82e84627472&cur_album_id=2050073385933520900&scene=189#wechat_redirect
