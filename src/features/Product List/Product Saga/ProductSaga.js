import { getFilterProduct, getProduct, getProductCategory, getProductbrand, getSingleProduct } from "../../../app/Api";
import {call, put, takeLatest} from "redux-saga/effects";
import { failureCategoryProduct, failureFilterProduct, failureProduct, failureProductBrand, failureSingleProduct, successCategoryProduct, successFilterProduct, successProduct, successProductBrand, successSingleProduct} from "../ProductAction";

export function* getProductList(){
    try{
        const productList = yield call(getProduct)
        yield put(successProduct(productList.data))
    }
    catch(error){
        yield put(failureProduct(error))
    }
}

export function* getCategoryList(){
    try{
        const productCategory = yield call(getProductCategory)
        yield put(successCategoryProduct(productCategory.data))
    }
    catch(error){
        yield put(failureCategoryProduct(error))
    }
}

export function* getBrandList(){
    try{
        const productBrand = yield call(getProductbrand)
        yield put(successProductBrand(productBrand.data))
    }
    catch(error){
        yield put(failureProductBrand(error))
    }
}

export function* getFilterProductList({payload}){
    // filter = {"category":["laptop","clothes"]}
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page=1&_limit=10}
    try{
        let des = ''
        // for(let obj in payload){
        //     des += `${obj}=${payload[obj]}&`
        // }

        for(let obj in payload.filterData){
            const category_ = payload.filterData[obj]
            if(category_.length){
                const lastCategory_ = category_[category_.length-1]
                des += `${obj}=${lastCategory_}&`
            } 
        }

        for(let obj in payload.sortData){
            des += `${obj}=${payload.sortData[obj]}&`
        }
        
        for(let obj in payload.pagination){
            des += `${obj}=${payload.pagination[obj]}&`
        }

        const productFilterList = yield call(getFilterProduct,des)
        const totalItems = productFilterList.headers["x-total-count"]
        yield put(successFilterProduct({product:productFilterList.data,totalItems:totalItems}))
    }
    catch(error){
        yield put(failureFilterProduct(error))
    }
}

export function* getSingleProductDetail({payload}){
    try{
        const singleProduct = yield call(getSingleProduct,payload)
        yield put(successSingleProduct(singleProduct.data))
    }
    catch(error){
        yield put(failureSingleProduct(error))
    }
}

export function* watchProductList(){
    yield takeLatest("REQUESTPRODUCT",getProductList)
    yield takeLatest("REQUESTFILTERPRODUCT",getFilterProductList)
    yield takeLatest("REQUESTPRODUCTBRAND",getBrandList)
    yield takeLatest("REQUESTCATEGORYPRODUCT",getCategoryList)
    yield takeLatest("REQUESTSINGLEPRODUCT",getSingleProductDetail)
}


