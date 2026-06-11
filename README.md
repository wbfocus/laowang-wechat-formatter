# 公众号一键排版助手（老汪洞察专版）

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/wbfocus/laowang-wechat-formatter.svg?style=social)](https://github.com/wbfocus/laowang-wechat-formatter/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/wbfocus/laowang-wechat-formatter.svg)](https://github.com/wbfocus/laowang-wechat-formatter/issues)

**在线体验：[https://type.accunion.cn](https://type.accunion.cn)**

老汪洞察官方出品，基于 Typezen 深度优化，专为微信公众号内容创作者打造的 Markdown 一键转微信排版工具。输入 Markdown，智能 AI 结构优化，外加 72 套高颜值模板，全流程便捷提效，结果可直接粘贴进微信公众平台。

## 核心特性

- **AI 一键排版**：100%对接 DeepSeek、Kimi、阿里云通义千问等国产大模型，精准优化 Markdown 标题、列表、引用、加粗、分隔线等排版结构，内容不润色、不丢失一句话。
- **微信专属视觉还原**：内置 72 套美观主题模板，六大风格随选，样式高度适配微信后台，支持彩色、投影、圆角等高级排版体验。
- **自定义细节**：字号、行距、段落间距、页面留白、字间距、图片圆角统统可以手动调整。
- **响应式三栏工作台**：实时手机框预览，桌面/平板/手机都顺手。
- **一键无痕复制**：所有样式自动内联，无需担心粘贴丢样。

## AI 一键排版：全面国产大模型驱动

本系统已全量切换为国内主流大模型服务（DeepSeek、Kimi、阿里云通义千问）。所有 AI 排版均仅优化 Markdown 结构，绝不修改原文内容。

- **模型 API 灵活配置**：仅需在本地浏览器填写 API Key 与模型信息即可。
- **隐私保护**：所有 API 配置只保存在本地，排版请求仅用于临时中转调用模型服务，不做任何持久化存储。
- **流式体验**：AI 优化结果实时回写编辑区，所见即所得。
- **内容安全提示**：AI 只动排版结构绝不润色删改内容，确保写作成果原汁原味。

## Markdown 语法原生适配

- 普通文本、段落、1-6 级标题
- 换行、引用、加粗/斜体
- 有序/无序/多级列表
- 代码块与内联代码
- 分隔线、链接、图片，并支持多图自适应并排
- 转义符、嵌入 HTML 标签全面兼容
- 所有语法均针对微信编辑器场景美化适配

## 主题模板

共 72 套主题，归为六大类：

1. 新粗野风（12套）：高饱和撞色、粗黑线条，极强视觉冲击力；
2. 极简纯净风（12套）：无冗余、极简优雅；
3. 商务沉稳风（12套）：规范细致，专业商务场合最佳；
4. 文艺诗意风（12套）：细腻舒展，文艺表达利器；
5. 极客科技风（12套）：现代感强，模块化与渐变色；
6. 节庆欢庆风（12套）：节日氛围、明快色彩。

## 技术架构

- **前端框架**：Next.js 16.2.0 (App Router) + React 19.2.4
- **样式方案**：Tailwind CSS 4
- **类型语言**：TypeScript 5
- **Markdown 解析**：marked 17.0.4
- **AI 接入**：原生支持 DeepSeek、Kimi、阿里云通义千问
- **图标**：lucide-react、@lobehub/icons
- **代码质量**：Biome

## 快速上手

### 环境准备

- Node.js 20.9.0 及以上
- npm 或 pnpm

### 本地运行

```bash
# 克隆项目
git clone https://github.com/wbfocus/laowang-wechat-formatter.git

# 进入项目目录
cd laowang-wechat-formatter

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 开始体验。

### 构建及生产部署

```bash
npm run build
npm run start
```

## 特别说明

- 微信公众平台仅允许内联样式，系统自动将所有样式映射至标签 `style=""`，复制即用。
- AI 一键排版功能需自行配置国产大模型服务 API Key。所有配置仅保存在本地浏览器，请妥善保存自己的 Key。

## 参与共建

欢迎关注、试用、反馈建议，老汪洞察团队长期维护。

### 开源贡献建议

1. Fork 本仓库
2. 新建分支进行开发
3. 合理描述你的提交与 Pull Request
4. 期待你的加入共同完善工具！

## 官方平台

- 在线体验：[https://type.accunion.cn](https://type.accunion.cn)
- GitHub 仓库：[https://github.com/wbfocus/laowang-wechat-formatter](https://github.com/wbfocus/laowang-wechat-formatter)
- 老汪主站：[https://www.accunion.cn](https://www.accunion.cn)
- 原版链接：[https://github.com/mspringjade/wechat-formatter](https://github.com/mspringjade/wechat-formatter)

---

如果你觉得项目有用，欢迎 Star 支持！老汪团队持续优化，不负每一份关注。
