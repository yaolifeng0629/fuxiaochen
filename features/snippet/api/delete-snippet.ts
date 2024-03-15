import { useMutation } from '@tanstack/react-query';

import { showErrorToast, showSuccessToast } from '@/components/ui/toast';

import { invalidateGetSnippetsQuery } from './get-snippets';

import { deleteSnippetByID } from '../actions';

export const useDeleteSnippet = () => {
  return useMutation({
    mutationKey: ['delete_Snippet'],
    mutationFn: (id: string) => deleteSnippetByID(id),
    async onSuccess() {
      showSuccessToast('操作成功');
      await invalidateGetSnippetsQuery();
    },
    onError(error) {
      showErrorToast(`操作失败: ${error.message}`);
    },
  });
};