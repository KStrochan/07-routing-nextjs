import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import NotesClient from './Notes.client';

const PER_PAGE = 10;
const validTags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

interface NotesPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

function getTagFromSlug(slug: string[]): NoteTag | undefined {
  const currentTag = slug[0];

  if (!currentTag || currentTag === 'all') {
    return undefined;
  }

  if (validTags.includes(currentTag as NoteTag)) {
    return currentTag as NoteTag;
  }

  notFound();
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag = getTagFromSlug(slug);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, PER_PAGE, '', 'created', tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: PER_PAGE,
        search: '',
        sortBy: 'created',
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
