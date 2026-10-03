// manually sync this type file chat app

export type ChatId = string;
export type ChatMessage = {
  timestamp: number;
  userId: ChatId;
  name: string;
  message: string;
};
export enum ChatPacketType {
  RawMessage = 'raw_message',
  NetworkMessage = 'message',
  RequestHide = 'request_hide',
  SetVisibility = 'set_vis',
}
export type ChatRawMessagePacket = {
  ptype: ChatPacketType.RawMessage;
  data: string;
};
export type ChatNetworkMessagePacket = {
  ptype: ChatPacketType.NetworkMessage;
  data: ChatMessage[];
};
export type ChatRequestFocusPacket = {
  ptype: ChatPacketType.SetVisibility;
  isVisible: boolean;
};
export type ChatRequestHidePacket = {
  ptype: ChatPacketType.RequestHide;
};
export type ChatNetworkPacket = ChatNetworkMessagePacket;
export type ChatAppIncomingPacket =
  | ChatNetworkMessagePacket
  | ChatRequestFocusPacket;
export type ChatAppOutgoingPacket =
  | ChatRawMessagePacket
  | ChatRequestHidePacket;
