export enum LogRecordType {
  Connected = 'connected',
  Disconnected = 'disconnected',
  MessageReceived = 'message_received',
  MessageSent = 'message_sent',
  SocketError = 'ws_error',
  HttpError = 'http_error',
}

export interface LogRecord {
  timestamp: string;
  type: LogRecordType;
  title?: string;
  data: any;
}
