/// <reference types="react-scripts" />

declare module 'readable-fractions' {
  export const toReadableFraction: {
    (num: number, str: true): string;
    (num: number): { denominator: number; error: number; numerator: number };
  };
}

declare module 'bugout' {
  type MethodRegisterFn<IncomingArgs, ReplyArgs = IncomingArgs> = {
    (
      address: string,
      args: IncomingArgs,
      reply: (response: ReplyArgs) => void,
    ): void;
  };

  type BugoutOptions = {
    seed?: string;
  };

  type EventHandlers = {
    /** on receiving a freeform message */
    message: (address: string, message: any) => void;
    /** on seeing a server */
    server: (address: string) => void;
    /** on seeing a client */
    seen: (address: string) => void;
  };
  type EventType = keyof EventHandlers;

  type MethodDescription<InputArgs, ResponseArgs> = {
    input: InputArgs;
    response: ResponseArgs;
  };

  type MethodConfig = {
    [methodName: string]: MethodDescription;
  };

  class Bugout<MethodConfig extends MethodDescription = any> {
    constructor(options?: BugoutOptions | string);

    /** registers a remote API a peer can invoke */
    register<MethodName extends keyof MethodConfig>(
      methodName: MethodName,
      method: MethodRegisterFn<
        MethodConfig[MethodName]['input'],
        MethodConfig[MethodName]['response']
      >,
    ): void;

    /** the seed can be used to recreate the server's key in a new instance */
    seed: string;

    /** the public connection key for this server */
    address(): string;

    /** subscribes to events */
    on<T extends EventType>(eventType: T, handler: EventHandlers<T>): void;

    /** sends a freeform message */
    send(message: any): void;

    /** invokes an API method on the remote server */
    rpc<MethodName extends keyof MethodConfig>(
      methodName: MethodName,
      input: MethodConfig[MethodName]['input'],
      responseHandler: (result: MethodConfig[MethodName]['response']) => void,
    ): void;

    /** close the channel */
    close(): void;
  }

  export default Bugout;
}

declare module 'qrcode.react' {
  const QRCode: any;
  export default QRCode;
}

declare module 'react-qr-reader' {
  const QRReader: any;
  export default QRReader;
}
