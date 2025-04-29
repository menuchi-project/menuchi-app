import { randomUUID } from "crypto";

export const returnUser = () => ({
  id: randomUUID(),
  phoneNumber: '09123456789',
  password: 'P@ssword1234',
  username: 'test_user',
  email: 'test@gmail.com',
  isPhoneNumberVerified: false,
  isEmailVerified: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null
});