import { Injectable } from '@angular/core';
import { GetProductsOptions, ProductModel } from "../../shared/models/product.model";
import { Observable } from "rxjs";
import { HttpService } from "../../shared/services/http.service";
import { Paginated } from "../../shared/models/paginated.model";
import { defaultOptions } from "../../shared/constants/default-get-products-options.const";
import { AddProductDto, UpdateProductDto } from "../../shared/dto/products.dto";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpService,
  ) { }

  public getProducts(options?: GetProductsOptions): Observable<Paginated<ProductModel[]> | null> {
    const mergedOptions: GetProductsOptions = { ...defaultOptions, ...options };
    const searchQuery = `search=${mergedOptions.search || ''}`;
    const sortQuery =`sort=${mergedOptions.sort || ''}`;
    const ascQuery = `asc=${mergedOptions.asc || ''}`;
    const pageQuery = `page=${mergedOptions.page}`;
    const limitQuery = `limit=${mergedOptions.limit}`;
    const queries = [searchQuery, sortQuery, ascQuery, pageQuery, limitQuery].join('&');
    return this.http.get<Paginated<ProductModel[]>>(`store/product?${queries}`);
  }

  public getProductById(id: string): Observable<ProductModel | null> {
    return this.http.get<ProductModel>(`store/product/${id}`);
  }

  public addProduct(payload: AddProductDto): Observable<ProductModel | null> {
    return this.http.post<ProductModel, AddProductDto>('store/product', payload);
  }

  public updateProduct(id: string, payload: UpdateProductDto): Observable<ProductModel | null> {
    return this.http.put<ProductModel, UpdateProductDto>('store/product', id, payload);
  }
}
