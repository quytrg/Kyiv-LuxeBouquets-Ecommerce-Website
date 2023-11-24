import createApiClient from "../api.service";
import systemConfig from '@/config/system/index.js'

class ProductService {
  constructor(baseUrl=`/${systemConfig.apiPrefix}/${systemConfig.clientPrefix}/products`) {
    this.api = createApiClient(baseUrl);
  }
  
  async getProductsOfCategory(category) {
    return (await this.api.get(`/${category}`)).data;
  }

  async getProductDetail(slug) {
    return (await this.api.get(`/product-detail/${slug}`)).data;
  }
  // async create(data) {
  //   return (await this.api.post("/", data)).data;
  // }
  // async deleteAll() {
  //   return (await this.api.delete("/")).data;
  // }
  // async get(id) {
  //   return (await this.api.get(`/${id}`)).data;
  // }
  // async update(id, data) {
  //   return (await this.api.put(`/${id}`, data)).data;
  // }
  // async delete(id) {
  //   return (await this.api.delete(`/${id}`)).data;
  // }
}

export default new ProductService();
