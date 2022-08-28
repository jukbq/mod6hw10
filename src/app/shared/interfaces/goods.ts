import { ComponentsResponse } from "./components";


export interface GoodsRequest {
    component: ComponentsResponse;
    name: string;
    compound: string;
    weight: string;
    price: number;
    images: string;

}

export interface GoodsResponse extends GoodsRequest {
    id: number;
}