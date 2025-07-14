import { useMutation } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { apiService } from '../../api';

interface SuccessResponse<T = any> {
  message: string;
  data?: T;
}
interface UseApiMutationOptions {
  params?: Record<string, any>;
}

export const useApiMutation = <
  TData = any,
  TResponseData = any,
  TResponse extends AxiosResponse<
    SuccessResponse<TResponseData>
  > = AxiosResponse<SuccessResponse<TResponseData>>,
>(
  method: 'post' | 'put' | 'delete',
  endpoint: string,
  options?: UseApiMutationOptions
) => {
  const { params } = options || {};

  const mutation = useMutation<TResponse, AxiosError<SuccessResponse>, TData>({
    mutationKey: [method, endpoint],
    mutationFn: (data?: TData) => {
      switch (method) {
        case 'post':
          return apiService.post(endpoint, data, { params });
        case 'put':
          return apiService.put(endpoint, data, { params });
        case 'delete':
          if ((data as any)?.id) {
            return apiService.delete(`${endpoint}/${(data as any).id}`, {
              params,
            });
          }
          throw new Error('ID is required for DELETE operation');
        default:
          throw new Error('Unsupported method');
      }
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message, {
        autoClose: 2000,
        position: 'bottom-center',
        className: 'bg-black-400',
        progressClassName: 'fancy-progress-bar',
      });
      toast.clearWaitingQueue();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message, {
        autoClose: 2000,
        position: 'bottom-center',
        className: 'black-background',
        progressClassName: 'fancy-progress-bar',
      });
      toast.clearWaitingQueue();
    },
  });

  return mutation;
};
