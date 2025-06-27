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

export const returnMenu = () => ({
  name: 'test-menu',
  isPublished: false
});

export const returnCylinder = () => ({
  sat: true,
  sun: false,
  mon: true,
  tue: false,
  wed: true,
  thu: false,
  fri: false
});

export const returnBranch = () => ({
  name: 'Test Branch',
  displayName: 'test-name',
  status: 'test-status',
  showRating: true,
  instagram: 'some-id',
  telegram:'some-id',
  twitter:'some-id',
  youtube:'some-id',
  eitaa:'some-id'
});

export const returnAddress = () => ({
  country: 'test-country',
  region: 'test-region',
  city: 'test-city',
  area: 'test-area',
  street: 'test-street',
  description: 'test-desc',
});

export const returnOpeningTimes = () => ({
  sat: '08:00-23:00',
  sun: '08:00-23:00',
  mon: '08:00-23:00',
  tue: '08:00-23:00',
  wed: '08:00-23:00',
  thu: '08:00-23:00',
  fri: '08:00-23:00'
});