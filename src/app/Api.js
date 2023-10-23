import axios from "axios";

axios.defaults.baseURL="http://localhost:8080"

export const getProduct = async () => await axios.get(`/products`)
export const getSingleProduct = async (id) => await axios.get(`/products/${id}`)
export const getFilterProduct = async (value) => await axios.get(`/products?${value}`)
export const getProductCategory = async (value) => await axios.get(`/category?`)
export const getProductbrand = async (value) => await axios.get(`/brand?`)

// export const postAddUser = async (value) => await axios.post(`/users/`,value)
// export const loginUser = async (value) => await axios.get(`/users/`,value)

export const cartData = async (value) => await axios.post(`/cart/`,value)
export const cartDataByUser = async (value) => await axios.get(`/cart/${value}`)
export const cartDataUpdate = async (value) => await axios.put(`/cart/${value.id}`,value)
export const cartDataDelete = async (value) => await axios.delete(`/cart/${value}`,)
// export const updateUserApi = async (user) => axios.put(`/user/${user.id}`,user)

export const postAddUser = async (value) => await axios.post(`https://real-pear-fly-kilt.cyclic.app/accounts/register`,value)
export const loginUser = async (value) => await axios.post("https://real-pear-fly-kilt.cyclic.app/accounts/authenticate",value)

export const orderData = async (value) => await axios.post(`/orders/`,value)