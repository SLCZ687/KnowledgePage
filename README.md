# KnowledgePage（SLCZ687 知识库）

个人知识库网站，访问地址：**https://slcz687.github.io/KnowledgePage/**

> 本仓库只承载知识库；个人主页由独立仓库 `SLCZ687/SLCZ687.github.io` 提供，占用根域名
> `https://slcz687.github.io/`。两者独立构建、独立部署。
> 注意：GitHub Pages 项目站点路径区分大小写，URL 必须与仓库名 `KnowledgePage` 完全一致。

## 架构

```
KnowledgeBase（私有仓库，Obsidian vault，内容源头）
        │
        │  GitHub Actions 拉取（每 6 小时 / 手动触发）
        ▼
本仓库（Quartz 5 静态站生成器）
        │
        │  npx quartz build → 静态 HTML
        ▼
GitHub Pages（项目站点，挂载在 /KnowledgePage 子路径）
```

- 文章与笔记内容**不在**本仓库中，全部来自私有的 [KnowledgeBase](https://github.com/SLCZ687/KnowledgeBase) 仓库
- 本地开发时，`content/` 是指向本地 vault 的符号链接（已在 `.gitignore` 中排除，不会提交）
- CI 构建时通过 `VAULT_TOKEN` secret 检出 KnowledgeBase 到 `content/`
- 站点部署在子路径下，`quartz.config.yaml` 的 `baseUrl` 必须写成 `slcz687.github.io/KnowledgePage`，
  否则站内链接、字体、RSS、sitemap 都会指向根域名

## 常用操作

| 操作 | 位置 |
|---|---|
| 写文章/笔记 | KnowledgeBase 仓库（Obsidian 直接编辑） |
| 改网站配置（标题、字体、配色、组件布局） | `quartz.config.yaml` |
| 改主页内容 | KnowledgeBase 根目录 `index.md` |
| 自定义样式 | `quartz/styles/custom.scss` |
| 本地预览 | `npm i && npx quartz build --serve` → http://localhost:8080 |
| 手动触发部署 | Actions 页面运行「Deploy Quartz to GitHub Pages」 |

## 部署流水线

`.github/workflows/deploy.yml`：

1. 检出本仓库 + 检出 KnowledgeBase 到 `content/`
2. `npm ci` → `npx quartz build`
3. 构建产物 `public/` 部署到 GitHub Pages

触发条件：push 到 `main`、每 6 小时定时、手动 `workflow_dispatch`。

## 致谢

基于 [Quartz](https://quartz.jzhao.xyz)（MIT License，见 `LICENSE.txt`）构建。
