import { useMutation } from '@tanstack/react-query';

import { toast } from '@/components/ui/use-toast';

import { invalidateGetTagsQuery } from './get-tags';

import { deleteTagByID } from '../actions';

export const useDeleteTag = () => {
  return useMutation({
    mutationKey: ['delete_tag'],
    mutationFn: (id: string) => deleteTagByID(id),
    async onSuccess() {
      toast({
        title: '操作成功',
      });
      await invalidateGetTagsQuery();
    },
    onError(error) {
      toast({
        variant: 'destructive',
        title: '操作失败',
        description: error.message,
      });
    },
  });
};