import React, { useState } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export const ConsultationModal: React.FC = () => {
  const { isModalOpen, closeModal, submitConsultation } = useStore();
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await submitConsultation(formData);
    setIsLoading(false);
    setIsSuccess(true);
    
    // Reset after success
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', phone: '', message: '' });
      closeModal();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">免费咨询</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-500">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">提交成功</h4>
                  <p className="text-gray-500">我们的专业顾问将尽快通过微信与您联系。</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="您的称呼"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">联系电话/微信号</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="方便我们添加您的微信"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">咨询内容</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                      placeholder="请简单描述您的需求..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        提交中...
                      </>
                    ) : (
                      '提交咨询'
                    )}
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-4">
                    提交即表示您同意我们的隐私政策，我们会严格保密您的信息。
                  </p>
                </form>
              )}
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
