function joinPaths(base: string, path: string): string {
    const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base;
    const trimmedPath = path.startsWith('/') ? path.slice(1) : path;

    return `${trimmedBase}/${trimmedPath}`;
}


const HOST_API = "https://kitkot.q2k.dev/api";
const LOGIN_URL = joinPaths(HOST_API, "login/");
const REGISTER_URL = joinPaths(HOST_API, "register/");

export { LOGIN_URL, REGISTER_URL };
