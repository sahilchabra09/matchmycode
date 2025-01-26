"use server";

import { db } from "../db";

interface User {
  clerkId: string;
  first_name: string;
  last_name: string;
  email: string;
  name: string;
  role: string;
}

export async function createUser(user: User) {
  return await db.users.create({
    data: {
      clerkId: user.clerkId,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  });
}