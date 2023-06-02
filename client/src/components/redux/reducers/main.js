import { getProductsreducer } from "./Productsreducers";
import {combineReducers} from "redux";

const rootreducer = combineReducers({
    getProductsdata:getProductsreducer
});


export default rootreducer;