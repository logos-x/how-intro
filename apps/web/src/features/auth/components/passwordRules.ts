export type PasswordRule = {
  key: string;
  label: string;
  test: (value: string) => boolean;
};

export const PASSWORD_RULES: PasswordRule[] = [
  { key: "length", label: "≥ 8 ký tự", test: (v) => v.length >= 8 },
  { key: "upper", label: "Chữ hoa (A-Z)", test: (v) => /[A-Z]/.test(v) },
  { key: "lower", label: "Chữ thường (a-z)", test: (v) => /[a-z]/.test(v) },
  {
    key: "special",
    label: "Số & ký tự đặc biệt",
    test: (v) => /[0-9!@#$%^&*]/.test(v),
  },
];

/** Số rule đã đạt — dùng làm điểm độ mạnh (0 → PASSWORD_RULES.length). */
export function countPassedRules(password: string) {
  return PASSWORD_RULES.filter((rule) => rule.test(password)).length;
}

export function isPasswordValid(password: string) {
  return countPassedRules(password) === PASSWORD_RULES.length;
}
