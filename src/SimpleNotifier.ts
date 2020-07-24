export class SimpleNotifier<T> {
  private _handle: ((t: T) => void) | null = null;

  register = (handle: (t: T) => void) => {
    this._handle = handle;
  };

  clear = () => {
    this._handle = null;
  };

  notify = (t: T) => {
    this._handle?.(t);
  };
}
