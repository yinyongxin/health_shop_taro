import { DependencyList, useEffect, useState } from "react";

export interface Options<TData, TParams> {
  manual?: boolean;
  onBefore?: (params: TParams) => void;
  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;
  defaultParams?: TParams;
  refreshDeps?: DependencyList;
}

export const useRequest = <FP extends unknown[], FD>(
  fun: (...rest: FP) => Promise<FD> | FD,
  options?: Options<FD, FP>,
) => {
  const { refreshDeps, manual = false } = options || {};
  const [data, setData] = useState<FD>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const run = async (...params: FP) => {
    options?.onBefore?.(params);
    let newData!: Awaited<FD>;
    let newError!: Error;
    try {
      setLoading(true);
      // 由于 fun 函数期望的参数类型是 FP，而 params 是 FP 类型，直接展开传入以解决类型不匹配问题
      newData = await fun(...params);
      setData(newData);
      setError(undefined);
      options?.onSuccess?.(newData, params);
    } catch (e: unknown) {
      newError = e as Error;
      setData(undefined);
      setError(newError);
      options?.onError?.(newError, params);
    } finally {
      setLoading(false);
      options?.onFinally?.(params, newData, newError);
    }
  };

  useEffect(() => {
    if (manual) {
      return;
    }
    const defaultParams = options?.defaultParams || ([] as unknown as FP);
    run(...defaultParams);
  }, refreshDeps || []);

  return {
    data,
    loading,
    run,
    error,
  };
};
