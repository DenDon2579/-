export interface IFieldError {
  message: string;
  field: string;
}

export interface IErrorResult {
  errorsMessages: IFieldError[];
}
