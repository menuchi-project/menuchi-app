export enum RolesEnum {
  Admin = 'ADMIN',
  RestaurantOwner = 'RESTAURANT_OWNER'
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