import React from 'react'
import { MessageCircle } from 'lucide-react'

export const WeComFloat: React.FC = () => {
  const link =
    import.meta.env.VITE_WECHAT_KF_LINK ??
    'https://work.weixin.qq.com/kfid/kfced2ab49d46dacaf9'

  const handleClick = () => {
    const ua = navigator.userAgent.toLowerCase()
    const isWechat = ua.includes('micromessenger')
    const isMobile = /iphone|android|mobile/.test(ua)
    if (isWechat || isMobile) {
      window.location.href = link
    } else {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-[80] sm:right-6 sm:bottom-6">
      <button
        aria-label="微信客服"
        onClick={handleClick}
        className="flex items-center gap-2 rounded-full bg-primary text-white shadow-lg px-4 py-2 sm:px-5 sm:py-3 hover:bg-blue-600 active:scale-[0.98] transition"
      >
        <MessageCircle size={20} className="opacity-90" />
        <span className="text-sm sm:text-base">微信客服</span>
      </button>
    </div>
  )
}
