'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from '@/app/notes/[id]/NoteDetails.module.css';

export default function NotePreviewClient() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      {isLoading && <p>Loading, please wait...</p>}
      {(isError || !note) && <p>Something went wrong.</p>}

      {note && (
        <main className={css.main}>
          <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{note.title}</h2>
              </div>
              <p className={css.tag}>{note.tag}</p>
              <p className={css.content}>{note.content}</p>
              <p className={css.date}>
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </main>
      )}
    </Modal>
  );
}
