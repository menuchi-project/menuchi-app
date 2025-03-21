/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12} is not a valid UUID
 * @format uuid
 * @example "52907745-7672-470e-a803-a2f8feb52944"
 */
export type UUID = string;

/**
 * Email address format.
 * @pattern ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ is not a valid email
 * @format email
 * @example "example@example.com"
 */
export type Email = string;

/**
 * URL format.
 * @pattern ^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$ is not a valid URL
 * @format uri
 * @example "https://example.com/example"
 */
export type URL = string;

/**
 * Iran phone number format.
 * Supports formats: +989123456789, 09123456789
 * @pattern ^(\+98|0)?9\d{9}$ is not a valid phone number
 */
export type IranPhoneNumber = string;

/**
 * @isString should be a string
 * @minLength 2 length must be between 2 and 50
 * @maxLength 50 length must be between 2 and 50
 * @example "string"
 */
export type DefaultString = string;

/**
 * @isBoolean should be boolean
 */
export type Boolean = boolean;

