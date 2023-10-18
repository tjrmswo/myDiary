import { atom } from "recoil"

export const userListData = atom({
    key: 'userList',
    default: [],
})

export const currentId = atom({
    key: 'currentId',
    default: '',
})