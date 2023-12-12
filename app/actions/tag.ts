'use server';

import { revalidatePath } from 'next/cache';

import { type CreateTagReq, type UpdateTagReq } from '@/typings/tag';

import { db } from '@/libs/prisma';

import { DEFAULT_PAGE_SIZE } from '@/constants/unknown';

export async function getTagArticles(params: {
  friendlyURL: string;
  page: number;
}) {
  const take = DEFAULT_PAGE_SIZE;
  const skip = (params.page - 1) * DEFAULT_PAGE_SIZE;

  const tag = await db.tag.findUnique({
    where: {
      friendlyURL: params.friendlyURL,
    },
    include: {
      articles: {
        where: {
          published: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  const articles = tag?.articles.slice(skip, skip + take);
  const total = tag?.articles.length ?? 0;

  return { articles, total };
}

export async function getTagByFriendlyURL(friendlyURL: string) {
  const tag = await db.tag.findUnique({
    where: {
      friendlyURL: friendlyURL,
    },
  });

  return tag;
}

export async function createTag(parsed: CreateTagReq) {
  await db.tag.create({
    data: {
      name: parsed.name,
      friendlyURL: parsed.friendlyURL,
    },
  });

  revalidatePath('/admin/tag');
}

export async function updateTag(parsed: UpdateTagReq) {
  await db.tag.update({
    data: {
      name: parsed.name,
      friendlyURL: parsed.friendlyURL,
    },
    where: {
      id: parsed.id,
    },
  });

  revalidatePath('/admin/tag');
}

export async function deleteTag(id: string) {
  await db.tag.delete({
    where: {
      id,
    },
  });

  revalidatePath('/admin/tag');
}

export async function getTags(params: { page: number }) {
  const take = DEFAULT_PAGE_SIZE;
  const skip = (params.page - 1) * DEFAULT_PAGE_SIZE;

  const tags = await db.tag.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      articles: true,
    },
    skip,
    take,
  });

  const count = await db.tag.count({});

  const total = count ?? 0;

  return { tags, total };
}

export async function getAllTags() {
  return await db.tag.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}
