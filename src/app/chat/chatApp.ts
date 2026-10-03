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
}
export type ChatRawMessagePacket = {
  ptype: ChatPacketType.RawMessage;
  data: string;
};
export type ChatNetworkMessagePacket = {
  ptype: ChatPacketType.NetworkMessage;
  data: ChatMessage[];
};
export type ChatRequestHidePacket = {
  ptype: ChatPacketType.RequestHide;
};
export type ChatAppPacket = ChatRawMessagePacket | ChatRequestHidePacket;
export type ChatNetworkPacket = ChatNetworkMessagePacket;
