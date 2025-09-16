# 挂号页面生成器 (Registration-Page-Generator)

一个专门用于医疗挂号页面设计的可视化工具，能够快速生成标准化的挂号预约成功页面。

## 🌟 在线预览

- IPFS (Vercel): [https://registration-page-generator.vercel.app/](https://registration-page-generator.vercel.app/)

## 📝 项目介绍

挂号页面生成器是一个专为医疗机构、软件开发商设计的工具，用于快速生成标准化的挂号预约成功页面。用户可以通过右侧配置面板设置就诊信息，左侧实时预览挂号页面效果，并支持导出功能。

### 主要功能

- 📋 **可视化配置**：通过表单配置就诊人信息、就诊日期、医院科室等
- 🖼️ **实时预览**：左侧实时显示配置后的挂号预约成功页面效果
- 💾 **导出功能**：支持将设计好的页面导出为图片格式
- 🔄 **数据持久化**：自动保存配置信息到本地存储

## 🛠️ 技术栈

- **前端框架**：React 18 + TypeScript 5
- **构建工具**：Vite 5
- **样式方案**：TailwindCSS 3
- **UI组件**：Ant Design 5 + Lucide React (图标库)
- **图片导出**：snapdom
- **状态管理**：Zustand 4
- **存储方案**：LocalStorage

## 🚀 安装与使用

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

### 构建项目

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

## 🔍 使用流程

1. 在右侧配置面板输入就诊人信息（姓名、身份证）
2. 选择就诊日期和时间段
3. 设置就诊医院和科室信息
4. 左侧实时预览挂号页面效果
5. 点击导出按钮导出挂号页面图片

## 📄 许可证

[MIT](LICENSE)