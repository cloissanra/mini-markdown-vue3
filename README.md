# Mini Markdown Vue

一个基于Vue 3和Monorepo架构的Markdown编辑器，支持实时预览和语法高亮。

## 功能特点

- **实时预览**：边写边看，所见即所得
- **语法高亮**：支持代码块语法高亮
- **目录导航**：自动生成文档目录
- **同步滚动**：编辑和预览区域同步滚动

## 技术栈

- **Vue 3**：渐进式JavaScript框架
- **TypeScript**：类型安全的JavaScript超集
- **Vite**：现代前端构建工具
- **pnpm**：快速、节省磁盘空间的包管理器
- **Monorepo**：使用pnpm workspace管理多包项目
- **Tailwind CSS**：实用优先的CSS框架
- **Marked**：Markdown解析器
- **Highlight.js**：代码语法高亮库

## 项目结构

```
mini-markdown-vue/
├── apps/                  # 应用
│   └── app/               # 主应用
├── packages/              # 包
│   ├── core/              # 核心功能
│   └── ui/                # UI组件
├── .github/               # GitHub配置
├── .husky/                # Git钩子
├── pnpm-workspace.yaml    # pnpm工作区配置
└── package.json           # 项目配置
```

## 快速开始

### 安装依赖

确保你已经安装了[pnpm]

```bash
npm install -g pnpm
```

#### 安装根目录依赖

```bash
pnpm install
```

#### 全局安装单个依赖

```bash
pnpm add <package-name> -w
```

#### 某个子项目安装依赖

```bash
pnpm add <package-name> -w --filter <package-name>
```

### 构建

#### 构建core

```bash
cd packages/core
pnpm build
```

#### 构建ui

```bash
cd packages/ui
pnpm build
```

#### 构建主应用

```bash
cd apps/app
pnpm build
```

### 开发

```bash
pnpm dev
```

### 测试

```bash
pnpm test
```

### 代码检查

```bash
pnpm lint
```

## 许可证

MIT
