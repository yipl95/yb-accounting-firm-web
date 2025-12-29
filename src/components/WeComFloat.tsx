import React, { useEffect, useRef, useState } from 'react'
import { MessageCircle, UserPlus } from 'lucide-react'

export const WeComFloat: React.FC = () => {
  const chatLink =
    import.meta.env.VITE_WECHAT_KF_LINK ??
    'https://work.weixin.qq.com/kfid/kfced2ab49d46dacaf9'
  const addLink =
    import.meta.env.VITE_WECHAT_ADD_LINK ??
    'https://work.weixin.qq.com/ca/cawcde2d5f8fc300f1'
  const ref = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const startRef = useRef<{ dx: number; dy: number; moved: boolean }>({ dx: 0, dy: 0, moved: false })
  const margin = 16

  const openLink = (link: string) => {
    const ua = navigator.userAgent.toLowerCase()
    const isWechat = ua.includes('micromessenger')
    const isMobile = /iphone|android|mobile/.test(ua)
    if (isWechat || isMobile) {
      window.location.href = link
    } else {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = window.innerWidth - rect.width - margin
    const y = window.innerHeight - rect.height - margin
    setPos({ x: Math.max(margin, x), y: Math.max(margin, y) })
  }, [])

  useEffect(() => {
    const onResize = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const maxX = window.innerWidth - rect.width - margin
      const maxY = window.innerHeight - rect.height - margin
      setPos(({ x, y }) => ({
        x: Math.min(Math.max(margin, x), maxX),
        y: Math.min(Math.max(margin, y), maxY),
      }))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    el.setPointerCapture(e.pointerId)
    setDragging(true)
    startRef.current.moved = false
    startRef.current.dx = e.clientX - pos.x
    startRef.current.dy = e.clientY - pos.y
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = e.clientX - startRef.current.dx
    const ny = e.clientY - startRef.current.dy
    const maxX = window.innerWidth - rect.width - margin
    const maxY = window.innerHeight - rect.height - margin
    const clampedX = Math.min(Math.max(margin, nx), maxX)
    const clampedY = Math.min(Math.max(margin, ny), maxY)
    if (Math.abs(clampedX - pos.x) > 3 || Math.abs(clampedY - pos.y) > 3) {
      startRef.current.moved = true
    }
    setPos({ x: clampedX, y: clampedY })
  }

  const onPointerUp = () => {
    setDragging(false)
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const maxX = window.innerWidth - rect.width - margin
    const sideLeft = pos.x + rect.width / 2 < window.innerWidth / 2
    const snappedX = sideLeft ? margin : maxX
    setPos({ x: snappedX, y: pos.y })
    if (!startRef.current.moved) {
      const ua = navigator.userAgent.toLowerCase()
      const isMobile = /iphone|android|mobile/.test(ua)
      if (isMobile) {
        setOpen((v) => !v)
      }
    }
  }

  const [visible, setVisible] = useState(true)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    let t: number | undefined
    const onScroll = () => {
      setVisible(false)
      if (t) clearTimeout(t)
      t = window.setTimeout(() => setVisible(true), 250)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (t) clearTimeout(t)
    }
  }, [])

  const onMouseEnter = () => {
    const ua = navigator.userAgent.toLowerCase()
    const isMobile = /iphone|android|mobile/.test(ua)
    if (!isMobile) setOpen(true)
  }
  const onMouseLeave = () => {
    const ua = navigator.userAgent.toLowerCase()
    const isMobile = /iphone|android|mobile/.test(ua)
    if (!isMobile) setOpen(false)
  }

  const isLeftSide = typeof window !== 'undefined' ? pos.x < window.innerWidth / 2 : false
  const panelStyle =
    isLeftSide
      ? { left: 'calc(100% + 8px)', top: 0 }
      : { right: 'calc(100% + 8px)', top: 0 }

  return (
    <div
      ref={ref}
      className={`fixed z-[80] transition-all duration-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
      style={{ left: pos.x, top: pos.y, touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <button
          aria-label="客服入口"
          className="flex items-center gap-2 rounded-full bg-emerald-600 text-white shadow-lg px-3 py-3 sm:px-5 sm:py-3 hover:bg-emerald-700 active:scale-[0.98] transition"
          onClick={() => setOpen((v) => !v)}
        >
          <MessageCircle size={22} className="opacity-90" />
          <span className="hidden sm:inline text-sm">微信客服</span>
        </button>
        <div
          className={`absolute ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} transition-opacity duration-150`}
          style={panelStyle}
        >
          <div className="flex flex-col gap-2 bg-white rounded-xl shadow-lg border border-slate-200 p-2">
            <button
              onClick={() => openLink(chatLink)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
            >
              <MessageCircle size={18} />
              <span className="hidden sm:inline text-sm">去聊天</span>
            </button>
            <button
              onClick={() => openLink(addLink)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition"
            >
              <UserPlus size={18} />
              <span className="hidden sm:inline text-sm">添加客服</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
