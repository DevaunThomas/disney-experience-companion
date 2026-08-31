import "server-only";

import { randomBytes, randomUUID, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const usersFile = path.join(process.cwd(), "data", "users.json");

type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
};

const testUser = {
  id: "test-user",
  name: "Test Disney Guest",
  email: "test@disneycompanion.local",
  password: "Disney123!",
};

async function readUsers(): Promise<StoredUser[]> {
  try {
    return JSON.parse(await fs.readFile(usersFile, "utf8")) as StoredUser[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function hashPassword(password: string, salt: string) {
  return ((await scrypt(password, salt, 64)) as Buffer).toString("hex");
}

export async function createUser(name: string, email: string, password: string) {
  const users = await readUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((user) => user.email === normalizedEmail) || normalizedEmail === testUser.email) {
    return { error: "An account with that email already exists." } as const;
  }

  const salt = randomBytes(16).toString("hex");
  const user: StoredUser = {
    id: randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    passwordSalt: salt,
    passwordHash: await hashPassword(password, salt),
  };

  await fs.writeFile(usersFile, JSON.stringify([...users, user], null, 2), "utf8");
  return { user: { id: user.id, name: user.name, email: user.email } } as const;
}

export async function verifyCredentials(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (
    process.env.NODE_ENV !== "production" &&
    normalizedEmail === testUser.email &&
    password === testUser.password
  ) {
    return { id: testUser.id, name: testUser.name, email: testUser.email };
  }

  const user = (await readUsers()).find((candidate) => candidate.email === normalizedEmail);
  if (!user) return null;

  const attemptedHash = Buffer.from(await hashPassword(password, user.passwordSalt), "hex");
  const storedHash = Buffer.from(user.passwordHash, "hex");
  if (attemptedHash.length !== storedHash.length || !timingSafeEqual(attemptedHash, storedHash)) return null;

  return { id: user.id, name: user.name, email: user.email };
}
