import { notification, message, Tooltip, Popconfirm, Button } from "antd";
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

export const ConfirmButtonTooltip = ({
  messageTitleTooltip,
  messageTitlePopconfirm,
  handleOnclick,
  placementTooltip = "bottom",
  color,
  key,
  okText,
  cancelText,
  sizeButton = "small",
  typeButton = "text",
  dangerButton = false,
  classNameIcon,
  colorIcon,
}) => (
  <Tooltip
    placement={placementTooltip}
    title={messageTitleTooltip}
    color={color}
    key={key}
  >
    <Popconfirm
      title={messageTitlePopconfirm}
      okText={okText}
      cancelText={cancelText}
      onConfirm={() => handleOnclick()}
    >
      <Button
        className="m-2"
        size={sizeButton}
        type={typeButton}
        danger={dangerButton}
      >
        <i
          className={classNameIcon}
          style={{ color: colorIcon }}
          aria-hidden="true"
        ></i>
      </Button>
    </Popconfirm>
  </Tooltip>
);
