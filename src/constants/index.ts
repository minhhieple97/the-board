export const MIN_PASSWORD_LENGTH = 6;
export const AUTH_COOKIE_NAME = "theboard-session";
export const MAX_AUTH_COOKIE_AGE = 60 * 60 * 24 * 30;
export const QUERY_KEYS = {
  CURRENT_USER: "currentUser",
  WORKSPACES: "workspaces",
};

export const MAX_FILE_SIZE = 1024 * 1024; // 1MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const MEMBER_TYPES = {
  USER: "user",
  ADMIN: "admin",
} as const;