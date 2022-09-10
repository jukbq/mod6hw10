export interface OrderRequest {
    images: string;
    name: string;
    count: number;
    price: number;
}

export interface OrderResponse extends OrderRequest {
    id: number;
}