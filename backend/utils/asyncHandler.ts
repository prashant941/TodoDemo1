import type { Request, Response, NextFunction, RequestHandler } from "express";

export const AsyncHandler = (
  requestHandler: RequestHandler
): RequestHandler => {
  interface AsyncRequestHandler {
    (req: Request, res: Response, next: NextFunction): Promise<void>;
  }

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Error" });
    }
  };
};
