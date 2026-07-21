import axios from 'axios';
import type {
  Note,
  FetchNotesParams,
  FetchNotesResponse,
  CreateNoteData,
} from '@/types/note';

const API_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const noteApi = axios.create({
  baseURL: API_URL,
  headers: TOKEN
    ? {
        Authorization: `Bearer ${TOKEN}`,
      }
    : {},
});

export async function fetchNotes({
  page,
  perPage,
  search,
  sortBy,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params = {
    page,
    perPage,
    ...(search ? { search } : {}),
    ...(sortBy ? { sortBy } : {}),
    ...(tag ? { tag } : {}),
  };

  const response = await noteApi.get<FetchNotesResponse>('/notes', {
    params,
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await noteApi.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(note: CreateNoteData): Promise<Note> {
  const response = await noteApi.post<Note>('/notes', note);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await noteApi.delete<Note>(`/notes/${id}`);
  return response.data;
}