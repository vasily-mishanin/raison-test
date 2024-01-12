export type FormState = {
    agree: boolean
    email: string
}

export type PopUpElement = HTMLElement & { showModal: Function; closeModal: Function }
