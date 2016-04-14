import * as types from "../constants"
import { openModal } from "./modal"
import { updateAccount } from "./user"

function addToCart(info) {
    return {
        type: types.ADD_TO_CART,
        item: info
    }
}

export function getCart(cart) {
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

export function fetchAddItemQuantity(item) {
    return (dispatch, getState) => {
        fetch(`/cart/${item._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({quantity: +item.quantity + 1})
        }).then(res => res.json())
          .then(data => {
              if (data.status === 200) {
                  dispatch(addItemQuantity(item))
              } else {
                  alert("增加失败！")
              }
          })
    }
}

function addItemQuantity(item) {
    return {
        type: types.ADD_ITEM_QUANTITY,
        item
    }
}

export function fetchDecreaseItemQuantity(item) {
    return (dispatch, getState) => {
        fetch(`/cart/${item._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({quantity: +item.quantity - 1})
        }).then(res => res.json())
          .then(data => {
              if (data.status === 200) {
                  dispatch(decreaseItemQuantity(item))
              } else {
                  alert("增加失败！")
              }
          })
    }
}

function decreaseItemQuantity(item) {
    return {
        type: types.DECREASE_ITEM_QUANTITY,
        item
    }
}

export function fetchPay(user, cart) {
    return (dispatch, getState) => {

        const total = cart.map(item => item.quantity * item.retailPrice)
            .reduce((prev, curr) => prev + curr)
        const balance = user.account - total
        fetch(`/cart/pay`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: user.name,
                contact: user.contact,
                carts: cart.map(c => c._id),
                balance: balance
            })
        }).then(res => res.json())
          .then(data => {
              if (data.status === 200) {

                  dispatch(openModal("msg", "支付消息", "支付成功！"))
                  dispatch(updateAccount({
                      ...user,
                      account: balance
                  }))
                  dispatch(getCart([]))
              } else {
                  alert("支付失败！")
              }
          })
    }
}