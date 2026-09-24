declare namespace Express {
  interface Request {
    user?: {
      id: string;
      email: string | null;
      roleId: string;
      roleName: string;
    };
  }
}
