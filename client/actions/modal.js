import * as types from "../constants"

export function closeModal() {
    return {
        type: types.MODAL_CLOSE
    }
}

export function openModal(dialog, title) {
    return {
        type: types.MODAL_OPEN,
        dialog,
        title
    }
}