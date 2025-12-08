// src/types.ts

// Category tipini dışarıya açıyoruz (export)
export type Category = 'SETUP' | 'BASIC' | 'BRANCHING' | 'REMOTE' | 'UNDO' | 'ADVANCED';

export interface Command {
    id: string;
    category: Category;
    cmd: string;
    description: string;
    tips?: string;
}