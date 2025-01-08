import { baseRequestClient } from '#/api/request';

export enum ApiPath {
  Categories = '/api/Categories',
}

export namespace CategoriesApi {
  /** 分类数据项 */
  export interface Category {
    id: string;
    name: string;
    description: string;
    creationTime: string;
  }

  /** 获取分类列表返回值 */
  export type GetCategoriesResult = Category[];
}

/**
 * 获取分类列表
 */
export async function getCategoriesApi() {
  return baseRequestClient.get<CategoriesApi.GetCategoriesResult>(
    ApiPath.Categories,
  );
}
