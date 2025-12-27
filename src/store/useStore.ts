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
    // In a real app, you would call your backend API here
    // which would then interact with WeChat API
    console.log('Submitting consultation:', data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Consultation submitted successfully. Notification sent to WeChat (Mock).');
  },
}));
