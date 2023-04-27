import { Toast } from 'primereact/toast';
import { useCallback, useRef } from 'react';

export interface ToastOptions {
  severity: 'success' | 'info' | 'warn' | 'error';
  summary: string;
  detail: string;
}

export const useToast = () => {
  const toast = useRef<Toast>(null);
  const showToast = useCallback(({ severity, summary, detail }: ToastOptions) => {
    if (toast.current) {
      toast.current.show({
        severity,
        summary,
        detail,
      });
    }
  }, []);

  return { toast, showToast };
};
