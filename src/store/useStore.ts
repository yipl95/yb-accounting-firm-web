import { create } from 'zustand';

interface ConsultationState {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  // Mock function for sending message
  submitConsultation: (data: { name: string; phone: string; message: string }) => Promise<void>;
}

export const useStore = create<ConsultationState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  submitConsultation: async (data) => {
    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const detail = await res.text();
        throw new Error(detail || 'Submit failed');
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
}));
