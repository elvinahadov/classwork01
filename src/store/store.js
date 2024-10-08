import { create } from 'zustand'

export const useStore = create((set) => ({
    editingProdId:"",
    deletingProdId:"",
    setEditingProdId: (id) => set({ editingProdId: id }),
    setDeletingProdId: (id) => set({ deletingProdId: id }),
}))