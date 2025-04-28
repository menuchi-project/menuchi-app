import { randomUUID } from "crypto";

export const createUser = () => ({
  id: randomUUID(),
  phoneNumber: '09112345678',
  password: 'P@ssword1234',
  username: 'test_user',
  email: 'test@gmail.com',
  isPhoneNumberVerified: false,
  isEmailVerified: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null
});