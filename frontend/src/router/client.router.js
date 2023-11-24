import ClientLayout from "@/views/client/layouts/default.vue"
import Home from "@/views/client/pages/Home/Home.vue"
import Shop from "@/views/client/pages/Shop/Shop.vue"
import Products from "@/views/client/pages/Products/Products.vue"
import ProductDetail from "@/views/client/pages/ProductDetail/ProductDetail.vue"

const clientRouter = [
  {
    path: "/",
    name: "ClientLayout",
    component: ClientLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "category",
        name: "Shop",
        component: Shop,
      },
      {
        path: "category/:categoryname",
        name: "Products",
        component: Products,
      },
      {
        path:"collection-product/:slug",
        name: "ProductDetail",
        component: ProductDetail,
      }
    ]
  },
]

export default clientRouter
