import { FieldErrors } from "tsoa";

export type ErrorValidationResponse = {
  succuss: boolean;
  fields: FieldErrors;
}