import React, { useState } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export const ConsultationModal: React.FC = () => {
  const { isModalOpen, closeModal, submitConsultation } = useStore();
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // removed contact phone usage in modal

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);
    try {
      await submitConsultation(formData);
      setIsLoading(false);
      setIsSuccess(true);
    
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', phone: '', message: '' });
        closeModal();
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      const msg =
        typeof err === 'string'
          ? err
          : (err as { message?: string }).message || '';
      const lower = msg.toLowerCase();
      if (lower.includes('webhook not configured')) {
        setErrorMsg('提交失败：通知服务暂不可用，请稍后再试或通过悬浮球入口联系。');
      } else {
        setErrorMsg('提交失败，请稍后再试或通过悬浮球入口联系。');
      }
    }
  };
  
  // removed wechat copy helper

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
              className="w-full max-w-xl bg-white rounded-2xl shadow-2xl pointer-events-auto overflow-y-auto max-h-[85vh]"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center sticky top-0 bg-white z-10 py-3 mb-4 border-b">
                <h3 className="text-xl font-bold text-gray-900">留言</h3>
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
                  <p className="text-gray-500">我们的专业顾问将尽快与您联系。</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {errorMsg}
                      </div>
                    )}
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">留言内容</label>
                      <textarea
                        required
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                        placeholder="请简单描述您的需求..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <div className="sticky bottom-0 bg-white pt-2">
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
                          '提交留言'
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-4">
                      提交即表示您同意我们的隐私政策，我们会严格保密您的信息。
                    </p>
                  </form>
                </div>
              )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
