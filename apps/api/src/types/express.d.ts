declare namespace Express {
  interface User {
    id: string;
    email: string | null;
    roleId: string;
    roleName: string;
  }
}
