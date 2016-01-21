// Mock client-server processing

import _products from "./productsList.json";

const TIMEOUT = 100;

export default {
    getProducts(cb, timeout) {
        setTimeout(() => cb(_products), timeout || TIMEOUT);
    }
}