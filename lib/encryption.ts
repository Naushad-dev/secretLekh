import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;

/**
 * Encrypts a string using a server-side secret.
 */
export function encrypt(text: string): string {
    const secret = process.env.ENCRYPTION_SECRET;
    if (!secret) throw new Error('ENCRYPTION_SECRET is not set');

    const salt = crypto.randomBytes(SALT_LENGTH);
    const iv = crypto.randomBytes(IV_LENGTH);

    // Derive a key from the server secret
    const key = crypto.scryptSync(secret, salt, 32);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();

    return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
}

/**
 * Decrypts a string using a server-side secret.
 */
export function decrypt(ciphertext: string): string {
    const secret = process.env.ENCRYPTION_SECRET;
    if (!secret) throw new Error('ENCRYPTION_SECRET is not set');

    const buffer = Buffer.from(ciphertext, 'base64');

    const salt = buffer.subarray(0, SALT_LENGTH);
    const iv = buffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const tag = buffer.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    const encrypted = buffer.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);

    const key = crypto.scryptSync(secret, salt, 32);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
}
