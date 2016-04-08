import * as types from "../constants"

function addToCart(info) {
    return {
        type: types.ADD_TO_CART,
        item: info
    }
}

function getCart(cart) {
    return {
        type: types.GET_CART,
        cart
    }
}

export function fetchCart(name) {
    return (dispatch, getState) => {
        fetch(`/cart?name=${name}`)
          .then(res => res.json())
          .then(data => {
              if (data.status === 200) {
                  dispatch(getCart(data.data))
              } else {
                  alert("查询购物车失败！")
              }
          })
    }
}

export function fetchAddToCart(info) {
    return (dispatch, getState) => {
        fetch("/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        }).then(res => res.json())
          .then(data => {
              if (data.status === 200) {
                  dispatch(addToCart(info))
              } else {
                  alert("添加到购物车失败！")
              }
          })
    }
}

export function fetchDeleteItem(item) {
    return (dispatch, getState) => {
        fetch(`/cart/${item._id}`, {
            method: "DELETE"
        }).then(res => res.json())
          .then(data => {
              if (data.status === 200) {
                  dispatch(deleteItem(item))
              } else {
                  alert("删除失败！")
              }
          })
    }
}

export function deleteItem(item) {
    return {
        type: types.DELETE_ITEM,
        item
    }
}