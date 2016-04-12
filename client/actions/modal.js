import * as types from "../constants"

export function closeModal() {
    return {
        type: types.MODAL_CLOSE
    }
}

export function openModal(dialog, title, msg) {
    return {
        type: types.MODAL_OPEN,
        dialog,
        title,
        msg
    }
}

export function msg(msg) {
    return {
        type: types.MODAL_MSG,
        msg
    }
}