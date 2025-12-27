# 元宝会计师事务所官网 Demo

这是一个使用 React + TypeScript + Vite + Tailwind CSS 构建的会计事务所官网 Demo。

## 功能特性

- **响应式设计**：完美适配 PC 端和移动端（H5）。
- **公司展示**：包含 Hero Banner、服务项目、关于我们、优势展示等模块。
- **咨询功能**：点击"立即咨询"弹出表单，模拟发送信息到后台/微信。
- **Coze 客服集成**：预留了 Coze AI 机器人接入代码。
- **状态管理**：使用 Zustand 管理应用状态。

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Framer Motion (动画)
- Lucide React (图标)

## 快速开始

1.  **安装依赖**

    ```bash
    pnpm install
    ```

2.  **启动开发服务器**

    ```bash
    pnpm dev
    ```

3.  **构建生产版本**

    ```bash
    pnpm build
    ```

## 配置说明

### Coze 机器人接入

打开 `src/components/CozeWidget.tsx`，将 `YOUR_BOT_ID_HERE` 替换为您在 Coze 平台上创建的 Bot ID。

```typescript
new window.CozeWebSDK.WebChatClient({
  config: {
    bot_id: 'YOUR_BOT_ID_HERE', // 替换这里
  },
  // ...
});
```

### 微信消息通知

目前 `src/store/useStore.ts` 中的 `submitConsultation` 方法为模拟实现。
您需要对接后端 API，在后端调用微信开放平台接口或使用企业微信机器人 Webhook 来实现真实的消息推送。

## 部署

本项目已配置好适配 Vercel 的构建命令。

1.  将代码提交到 GitHub。
2.  在 Vercel 中导入项目。
3.  Vercel 会自动识别 Vite 项目，点击 Deploy 即可。
