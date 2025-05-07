export const returnUser = () => ({
  phoneNumber: '09123456789',
  password: 'P@ssword1234',
  username: 'test_user',
  email: 'test@gmail.com'
});

let categoryNameIndex = 0;
export const returnCategoryName = () => ({
    name: `test-category-name-${categoryNameIndex++}`
});

export const returnRestaurant = () => ({
  name: 'Test Restaurant',
  displayName: 'test-restaurant',
  slang: 'test-slang',
  instagram: 'some-id',
  telegram:'some-id',
  twitter:'some-id',
  youtube:'some-id',
  eitaa:'some-id'
});

export const returnItem = () => ({
  name: 'some-name',
  ingredients: 'some-ingredients',
  price: 2_000_000
});