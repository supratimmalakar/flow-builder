import { v4 } from "uuid"
import { MessageOutlined } from "@ant-design/icons"

// More Node types can be added here according to need
export const nodeTypeList = [
  {
    type: "message",
    Icon: MessageOutlined,
    label: "Message",
    id: v4(),
  },
];