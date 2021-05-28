import { notification, message } from "antd";
const key = "updatable";

export function thongBao(message, description) {
  const args = {
    message: message,
    description: description,
  };
  notification.open(args);
}

export const openMessageLoading = (value) => {
  message.loading({ content: "Loading...", key });
  setTimeout(() => {
    message.success({ content: `${value}`, key, duration: 2 });
  }, 1000);
};

export const openMessageLoadingError = (value) => {
  message.loading({ content: "Loading...", key });
  setTimeout(() => {
    message.error({ content: `${value}`, key, duration: 2 });
  }, 1000);
};
