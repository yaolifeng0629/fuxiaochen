import Link from 'next/link';

import { MoveLeft } from 'lucide-react';

import { BytemdViewer } from '@/components/bytemd';
import { Wrapper } from '@/components/wrapper';

import { PATHS, PLACEHODER_TEXT } from '@/constants';
import { TagList } from '@/features/tag';
import { cn, prettyDateWithWeekday } from '@/lib/utils';

import { SnippetEventTracking } from '../components/snippet-event-tracking';
import { type Snippet } from '../types';

type SnippetDetailProps = {
  snippet: Snippet;
  uv?: number;
};

export const SnippetDetailPage = ({ snippet, uv = 0 }: SnippetDetailProps) => {
  return (
    <Wrapper className="flex flex-col min-h-screen pt-8">
      <div>
        <Link
          href={PATHS.SITE_BLOG}
          className={cn(
            'text-sm flex items-center space-x-1 transition-colors py-2',
            'text-muted-foreground hover:text-primary',
          )}
        >
          <MoveLeft className="w-3.5 h-3.5" />
          <span>返回片段</span>
        </Link>
      </div>
      <div className="text-muted-foreground flex items-center space-x-4 pt-8 pb-4 text-sm">
        <p>发布于&nbsp;&nbsp;{prettyDateWithWeekday(snippet.createdAt)}</p>
        <p>{uv || PLACEHODER_TEXT}&nbsp;&nbsp;人浏览过</p>
      </div>
      <h1 className="break-all py-6 text-4xl font-semibold">{snippet.title}</h1>

      <p className="text-neutral-500 py-4">{snippet.description}</p>
      <BytemdViewer body={snippet.body || ''} />
      <div className="pt-4 pb-14">
        <TagList tags={snippet.tags} />
      </div>
      <SnippetEventTracking snippetID={snippet.id} />
    </Wrapper>
  );
};
