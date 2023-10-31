export function joinPaths(base: string, path: string | number): string {
    path = path.toString();
    const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base;
    const trimmedPath = path.startsWith('/') ? path.slice(1) : path;

    return `${trimmedBase}/${trimmedPath}`;
}


export const HOST_API = "https://kitkot.q2k.dev/api";
export const LOGIN_URL = joinPaths(HOST_API, "login/");
export const REGISTER_URL = joinPaths(HOST_API, "register/");
export const RESET_PASSWORD_URL = joinPaths(HOST_API, "reset-password/");
export const GET_VIDEOS_URL = joinPaths(HOST_API, "videos/");
export const GET_PROFILE_URL = joinPaths(HOST_API, "profile/");
export const UPLOAD_VIDEO_URL = joinPaths(HOST_API, "post-video/");
export const GET_WS_ACCESS_TOKEN_URL = joinPaths(HOST_API, "ws-access-token");
export const WS_URL = "wss://ws-service.q2k.dev/ws/kitkot/";
export const LIKE_TOGGLE_URL = joinPaths(HOST_API, "like-toggle/");
export const SET_WATCH_URL = joinPaths(HOST_API, "watch_video/");
export const GET_COMMENTS_URL = joinPaths(HOST_API, "comments");
export const POST_COMMENT_URL = joinPaths(HOST_API, "post-comment/");
export const GET_EXPLORE_VIDEOS_URL = joinPaths(HOST_API, "explore/");
export const SEARCH_URL = joinPaths(HOST_API, "search/");
export const SETTINGS_URL = joinPaths(HOST_API, "save-settings/");
