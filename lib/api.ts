import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

const API_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  sortBy?: 'created' | 'updated';
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export const noteApi = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
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
