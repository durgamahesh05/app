import { api } from './api';
import { ENDPOINTS as E } from '../constants/endpoints';
export const receiptService = {
  upload: (uri: string) => {
    const form = new FormData();
    form.append('file', { uri, name: 'receipt.jpg', type: 'image/jpeg' } as any);
    return api(E.receipt.upload, { form });
  },
  extract: (receiptId: string) => api(E.receipt.extract, { body: { receipt_id: receiptId } }),
};
