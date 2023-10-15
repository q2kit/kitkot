function joinPaths(base: string, path: string): string {
    const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base;
    const trimmedPath = path.startsWith('/') ? path.slice(1) : path;

    return `${trimmedBase}/${trimmedPath}`;
}


export const HOST_API = "https://kitkot.q2k.dev/api";
export const LOGIN_URL = joinPaths(HOST_API, "login/");
export const REGISTER_URL = joinPaths(HOST_API, "register/");
export const RESET_PASSWORD_URL = joinPaths(HOST_API, "reset-password/");
