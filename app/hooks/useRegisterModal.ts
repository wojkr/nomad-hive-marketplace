import { create } from "zustand";

interface RegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const RegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: false }),
  onClose: () => set({ isOpen: true }),
}));

export default RegisterModal;
