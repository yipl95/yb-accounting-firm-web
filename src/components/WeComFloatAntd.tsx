import React, { useEffect, useRef, useState } from 'react'
import { ConfigProvider, FloatButton } from 'antd'
import { MessageOutlined, UserAddOutlined, CustomerServiceOutlined, CommentOutlined } from '@ant-design/icons'
import { useStore } from '../store/useStore'

export const WeComFloatAntd: React.FC = () => {
  const { openModal } = useStore()
  const chatLink =
    import.meta.env.VITE_WECHAT_KF_LINK ??
    'https://work.weixin.qq.com/kfid/kfced2ab49d46dacaf9'
  const addLink =
    import.meta.env.VITE_WECHAT_ADD_LINK ??
    'https://work.weixin.qq.com/ca/cawcde2d5f8fc300f1'

  const [visible, setVisible] = useState(true)
  const [isMobile] = useState(() => /iphone|android|mobile/.test(navigator.userAgent.toLowerCase()))
  const ref = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const startRef = useRef<{ dx: number; dy: number; moved: boolean }>({ dx: 0, dy: 0, moved: false })
  const margin = 28

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

  const openLink = (link: string) => {
    const ua = navigator.userAgent.toLowerCase()
    const inWechat = ua.includes('micromessenger')
    const mobile = /iphone|android|mobile/.test(ua)
    if (inWechat || mobile) {
      window.location.href = link
    } else {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const topOffset = 220
    const leftShift = 20
    const x = window.innerWidth - rect.width - margin - leftShift
    const y = window.innerHeight - rect.height - margin - topOffset
    setPos({
      x: Math.max(margin, x),
      y: Math.max(margin, y),
    })
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
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          FloatButton: {
            colorPrimary: '#10b981',
          },
        },
      }}
    >
      <div
        ref={ref}
        className={`fixed z-[80] transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ left: pos.x, top: pos.y, touchAction: 'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <FloatButton.Group
          shape="circle"
          trigger={isMobile ? 'click' : 'hover'}
          style={{ right: 0, bottom: 0 }}
          icon={<CustomerServiceOutlined />}
          type="primary"
        >
          <FloatButton
            icon={<MessageOutlined />}
            description="聊天"
            onClick={() => openLink(chatLink)}
          />
          <FloatButton
            icon={<UserAddOutlined />}
            description="加微"
            onClick={() => openLink(addLink)}
          />
          <FloatButton
            icon={<CommentOutlined />}
            description="咨询"
            onClick={() => openModal()}
          />
        </FloatButton.Group>
      </div>
    </ConfigProvider>
  )
}
