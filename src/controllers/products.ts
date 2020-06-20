import IProduct from "../types/IProduct.ts";
import ProductModel from '../models/ProductsModel.ts';

const model = new ProductModel();

export const getProducts = ({ response }: { response: any }) => {
    const products = model.list();
    response.body = {
        success: true,
        data: products
    }
}

export const getProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    const product: IProduct = model.getById(Number(params.id));

    if (product) {
        response.status = 200
        response.body = {
            success: true,
            data: product
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'Product not found'
        }
    }
}

export const addProduct = async ({ request, response }: { request: any, response: any }) => {    
    const body = await request.body()

    if (!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            msg: 'No data'
        }
    } else {
        const product: IProduct = body.value;
        model.add(product)
        response.status = 201;
        response.body = {
            success: true,
            data: product
        };
    }
}

export const updateProduct = async({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
    const product: IProduct = model.getById(Number(params.id))
    if (product) {
        const body = await request.body();

        const updateData: { name?: string; description?: string; price?: number } = body.value;
        const updatedProduct = {...product, ...updateData};
        model.update(updatedProduct);

        response.status = 200
        response.body = {
            success: true,
            data: updatedProduct
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'Product not found'
        }
    }
}

export const deleteProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    model.delete(Number(params.id));
    response.body = { 
        success: true,
        msg: 'Product removed'
    }
}  
