export interface ApiResponse<T, E = string> {
    error?: E;
    data?: T;
}
