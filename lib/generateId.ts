import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    10
);

const alphanumeric = customAlphabet(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    8
);

export function generateNoteId(): string {
    return nanoid();
}

export function generatePassword(): string {
    return alphanumeric();
}
