export type ActionType = {
  type: string;
  payload?: any;
  error?: boolean;
  meta?: any;
};

export interface Action {
  type: string;
  meta?: any;
}

export interface PayloadAction<T> extends Action {
  payload: T;
}

export interface PayloadOrErrorAction<T> extends Action {
  payload: T | Error;
  error?: boolean;
}

export function emptyActionCreator(type: string): () => Action {
  const fn = function(): Action {
    return {
      type
    };
  };
  fn.toString = () => type;
  return fn;
}

export function payloadActionCreator<T>(
  type: string
): (payload: T) => PayloadAction<T> {
  const fn = function(payload: T): PayloadAction<T> {
    return {
      type,
      payload
    };
  };
  fn.toString = () => type;
  return fn;
}

export function payloadOrErrorActionCreator<T>(
  type: string
): (payload: T | Error) => PayloadOrErrorAction<T> {
  const fn = function(payload: T | Error): PayloadOrErrorAction<T> {
    return payload instanceof Error
      ? {
          type,
          payload,
          error: true
        }
      : {
          type,
          payload
        };
  };
  fn.toString = () => type;
  return fn;
}
