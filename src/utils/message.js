import { createApp } from "vue";
import Message from "../components/Message.vue";
import ConfirmDialog from "../components/ConfirmDialog.vue";
import i18n from "../i18n.js";

// 获取翻译的辅助函数
const t = (key, defaultValue = "") => {
  try {
    return i18n.global.t(key) || defaultValue;
  } catch {
    return defaultValue;
  }
};

class MessageService {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    // 创建消息容器
    this.container = document.createElement("div");
    this.container.id = "message-container";
    document.body.appendChild(this.container);
  }

  show(options) {
    const app = createApp(Message, {
      ...options,
      onClose: () => {
        app.unmount();
        this.container.removeChild(this.container.lastChild);
      },
    });

    const instance = app.mount(document.createElement("div"));
    this.container.appendChild(instance.$el);
  }

  success(message, title = null) {
    this.show({
      type: "success",
      title: title || t("common.success"),
      message,
    });
  }

  error(message, title = null) {
    this.show({
      type: "error",
      title: title || t("common.error"),
      message,
    });
  }

  warning(message, title = null) {
    this.show({
      type: "warning",
      title: title || t("common.warning"),
      message,
    });
  }

  info(message, title = null) {
    this.show({
      type: "info",
      title: title || t("common.info"),
      message,
    });
  }

  confirm(message, title = null) {
    return new Promise((resolve) => {
      const app = createApp(ConfirmDialog, {
        title: title || t("common.confirm"),
        message,
        onConfirm: () => {
          app.unmount();
          document.body.removeChild(document.body.lastChild);
          resolve(true);
        },
        onCancel: () => {
          app.unmount();
          document.body.removeChild(document.body.lastChild);
          resolve(false);
        },
      });

      const instance = app.mount(document.createElement("div"));
      document.body.appendChild(instance.$el);
    });
  }
}

// 创建全局实例
const messageService = new MessageService();

// 全局方法
export const showMessage = (message, type = "info", title = "") => {
  const titles = {
    success: t("common.success"),
    error: t("common.error"),
    warning: t("common.warning"),
    info: t("common.info"),
  };

  messageService.show({
    type,
    title: title || titles[type],
    message,
  });
};

export const showSuccess = (message, title = null) => {
  messageService.success(message, title);
};

export const showError = (message, title = null) => {
  messageService.error(message, title);
};

export const showWarning = (message, title = null) => {
  messageService.warning(message, title);
};

export const showInfo = (message, title = null) => {
  messageService.info(message, title);
};

export const showConfirm = (message, title = null) => {
  return messageService.confirm(message, title);
};

export default messageService;
