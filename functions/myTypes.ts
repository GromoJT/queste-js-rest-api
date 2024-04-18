export type MyResponse<T> = 
    | 
    {
        error: string;
    }
    |
    {
        data : T
    };

