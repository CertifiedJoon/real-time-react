export interface IMessage {
  operation: string;
  user: string;
  session: number;
  column: string;
  val: string;
}

export interface ISessionMessage {
  session: number;
}
