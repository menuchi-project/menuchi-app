export enum RolesEnum {
  Admin = 'ADMIN',
  RestaurantOwner = 'RESTAURANT_OWNER',
  RestaurantCustomer = 'RESTAURANT_CUSTOMER'
}

export enum CookieNames {
  SessionId = 'session-id',
  AccessToken = 'access-token'
}

export enum PermissionScope {
  Restaurant,
  Branch,
  Backlog,
  Menu
}

export enum SessionUpdateScope {
  Restaurant,
  Menu
}

export enum OrderStatus {
  Pending = 'PENDING',
  Canceled = 'CANCELED',
  Preparing = 'PREPARING',
  Ready = 'READY',
  Done = 'DONE'
}