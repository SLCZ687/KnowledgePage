# SLCZ687.github.io

个人知识库网站，访问地址：**https://slcz687.github.io/**

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
GitHub Pages（托管部署）
```

- 文章与笔记内容**不在**本仓库中，全部来自私有的 [KnowledgeBase](https://github.com/SLCZ687/KnowledgeBase) 仓库
- 本地开发时，`content/` 是指向本地 vault 的符号链接（已在 `.gitignore` 中排除，不会提交）
- CI 构建时通过 `VAULT_TOKEN` secret 检出 KnowledgeBase 到 `content/`

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
