'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { type ColumnDef } from '@tanstack/react-table';
import { useImmer } from 'use-immer';

import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  PATHS,
  PLACEHODER_TEXT,
} from '@/config';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Combobox } from '@/components/ui/combobox';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import {
  IconSolarAddSquare,
  IconSolarCalendarMark,
  IconSolarHashtagSquare,
  IconSolarMinimalisticMagnifer,
  IconSolarPen,
  IconSolarRestart,
  IconSolarSortFromBottomToTopLinear,
  IconSolarSortFromTopToBottomLinear,
  IconSolarTag,
  IconSolarTextField,
} from '@/components/icons';
import { IllustrationNoContent } from '@/components/illustrations';
import { PageHeader } from '@/components/page-header';

import {
  type GetSnippetsDTO,
  type Snippet,
  useGetSnippets,
} from '@/features/snippet';
import { type Tag, useGetAllTags } from '@/features/tag';
import { toSlashDateString } from '@/lib/utils';

import { DeleteSnippetButton } from '../../components';

export const AdminSnippetListPage = () => {
  const router = useRouter();
  const [params, updateParams] = useImmer<GetSnippetsDTO>({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const [inputParams, updateInputParams] = useImmer<
    Omit<GetSnippetsDTO, 'pageIndex' | 'pageSize'>
  >({
    slug: undefined,
    title: undefined,
    tags: undefined,
  });

  const getSnippetsQuery = useGetSnippets(params);
  const data = React.useMemo(
    () => getSnippetsQuery.data?.snippets ?? [],
    [getSnippetsQuery],
  );

  const getTagsQuery = useGetAllTags();
  const tags = React.useMemo(() => {
    return getTagsQuery.data?.tags ?? [];
  }, [getTagsQuery]);

  const columns: ColumnDef<Snippet>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: () => (
        <div className="flex space-x-1 items-center">
          <IconSolarTextField className="text-sm" />
          <span>标题</span>
        </div>
      ),
    },
    {
      accessorKey: 'slug',
      header: () => (
        <div className="flex space-x-1 items-center">
          <IconSolarHashtagSquare className="text-sm" />
          <span>slug</span>
        </div>
      ),
    },
    {
      accessorKey: 'tags',
      header: () => (
        <div className="flex space-x-1 items-center">
          <IconSolarTag className="text-sm" />
          <span>标签</span>
        </div>
      ),
      cell: ({ row }) => {
        const tags: Tag[] = row.getValue('tags') ?? [];

        return (
          <div className="flex flex-wrap gap-2">
            {tags.length
              ? tags.map((tag) => <Badge key={tag.id}>{tag.name}</Badge>)
              : PLACEHODER_TEXT}
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: () => (
        <Button
          variant="ghost"
          onClick={() => {
            handleOrderChange('createdAt');
          }}
        >
          <IconSolarCalendarMark className="text-sm" />
          <span className="mx-1">创建时间</span>
          {params.order === 'asc' && params.orderBy == 'createdAt' && (
            <IconSolarSortFromBottomToTopLinear />
          )}
          {params.order === 'desc' && params.orderBy == 'createdAt' && (
            <IconSolarSortFromTopToBottomLinear />
          )}
        </Button>
      ),
      cell({ row }) {
        return toSlashDateString(row.getValue('createdAt'));
      },
    },
    {
      accessorKey: 'updatedAt',
      header: () => (
        <Button
          variant="ghost"
          onClick={() => {
            handleOrderChange('updatedAt');
          }}
        >
          <IconSolarCalendarMark className="text-sm" />
          <span className="mx-1">更新时间</span>
          {params.order === 'asc' && params.orderBy == 'updatedAt' && (
            <IconSolarSortFromBottomToTopLinear />
          )}
          {params.order === 'desc' && params.orderBy == 'updatedAt' && (
            <IconSolarSortFromTopToBottomLinear />
          )}
        </Button>
      ),
      cell({ row }) {
        return toSlashDateString(row.getValue('updatedAt'));
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const record = row.original;
        return (
          <div className="flex gap-2 items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={'icon'}
                  variant="ghost"
                  onClick={() => handleGoToEdit(record.id)}
                >
                  <IconSolarPen className="text-base" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>编辑</TooltipContent>
            </Tooltip>
            <DeleteSnippetButton id={record.id} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader breadcrumbList={[PATHS.ADMIN_HOME, PATHS.ADMIN_SNIPPET]} />

      <div className="grid gap-4 grid-cols-4">
        <Input
          placeholder="请输入标题"
          value={inputParams.title}
          onChange={(v) =>
            updateInputParams((draft) => {
              draft.title = v.target.value;
            })
          }
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <Input
          placeholder="请输入slug"
          value={inputParams.slug}
          onChange={(v) =>
            updateInputParams((draft) => {
              draft.slug = v.target.value;
            })
          }
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <Combobox
          options={
            tags?.map((el) => ({
              label: el.name,
              value: el.id,
            })) ?? []
          }
          multiple
          clearable
          selectPlaceholder="请选择标签"
          value={inputParams.tags}
          onValueChange={(v) => {
            updateInputParams((draft) => {
              draft.tags = v;
            });
          }}
        />
        <div className="flex items-center space-x-4">
          <Button onClick={handleSearch}>
            <IconSolarMinimalisticMagnifer className="mr-2" />
            搜索
          </Button>
          <Button onClick={handleReset}>
            <IconSolarRestart className="mr-2" />
            重置
          </Button>
          <Button onClick={handleGoToCreate}>
            <IconSolarAddSquare className="mr-2 text-base" />
            创建 Snippet
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        total={getSnippetsQuery.data?.total}
        loading={getSnippetsQuery.isLoading}
        params={{ ...params }}
        updateParams={updateParams}
        noResult={
          <div className="grid place-content-center gap-4 py-16">
            <IllustrationNoContent />
            <p>暂无内容</p>
            <Button onClick={handleGoToCreate}>去创建</Button>
          </div>
        }
      />
    </div>
  );

  function handleSearch() {
    updateParams((draft) => {
      draft.title = inputParams.title;
      draft.slug = inputParams.slug;
      draft.tags = inputParams.tags;
    });
  }

  function handleReset() {
    updateInputParams((draft) => {
      draft.title = '';
      draft.slug = '';
      draft.tags = undefined;
    });
    updateParams((draft) => {
      draft.title = '';
      draft.slug = '';
      draft.tags = undefined;
      draft.pageIndex = DEFAULT_PAGE_INDEX;
      draft.order = undefined;
      draft.orderBy = undefined;
    });
  }

  function handleOrderChange(orderBy: GetSnippetsDTO['orderBy']) {
    updateParams((draft) => {
      if (draft.orderBy !== orderBy) {
        draft.orderBy = orderBy;
        draft.order = 'asc';
      } else {
        if (draft.order === 'desc') {
          draft.orderBy = undefined;
          draft.order = undefined;
        } else if (draft.order === 'asc') {
          draft.order = 'desc';
        } else {
          draft.order = 'asc';
        }
      }
    });
  }

  function handleGoToCreate() {
    router.push(PATHS.ADMIN_SNIPPET_CREATE);
  }

  function handleGoToEdit(id: string) {
    router.push(`${PATHS.ADMIN_SNIPPET_EDIT}/${id}`);
  }
};