class AppError {
  constructor(
    public readonly message: string,
    public readonly errorCode: number = 400,
    ) {}
}

export { AppError };
