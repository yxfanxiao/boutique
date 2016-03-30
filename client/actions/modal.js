import * as types from "../constants"

export function closeModal() {
    return {
        type: types.MODAL_CLOSE
    }
}

export function openModal() {
    return {
        type: types.MODAL_OPEN
    }
}