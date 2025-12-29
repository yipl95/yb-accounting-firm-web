import React, { useEffect, useRef, useState } from 'react'
import { ConfigProvider, FloatButton } from 'antd'
import { MessageOutlined, UserAddOutlined, CustomerServiceOutlined, CommentOutlined, PhoneOutlined } from '@ant-design/icons'
import { useStore } from '../store/useStore'

export const WeComFloatAntd: React.FC = () => {
  const { openModal, isModalOpen } = useStore()
  const chatLink =
    import.meta.env.VITE_WECHAT_KF_LINK ??
    'https://work.weixin.qq.com/kfid/kfced2ab49d46dacaf9'
  const addLink =
    import.meta.env.VITE_WECHAT_ADD_LINK ??
    'https://work.weixin.qq.com/ca/cawcde2d5f8fc300f1'
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE ?? '400-123-4567'

  const margin = 28
  const [visible, setVisible] = useState(true)
  const [isMobile] = useState(() => /iphone|android|mobile/.test(navigator.userAgent.toLowerCase()))
  const ref = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState<{ right: number; bottom: number }>(() => ({
    right: margin + 20,
    bottom: margin + 220,
  }))
  const [dragging, setDragging] = useState(false)
  const startRef = useRef<{ dx: number; dy: number; moved: boolean }>({ dx: 0, dy: 0, moved: false })
  // margin defined above

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
  const openDial = () => {
    window.location.href = `tel:${contactPhone}`
  }

  // initial position handled by lazy state initializer

  useEffect(() => {
    const onResize = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const maxRight = window.innerWidth - rect.width - margin
      const maxBottom = window.innerHeight - rect.height - margin
      setPos(({ right, bottom }) => ({
        right: Math.min(Math.max(margin, right), maxRight),
        bottom: Math.min(Math.max(margin, bottom), maxBottom),
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
    const rect = el.getBoundingClientRect()
    const currentLeft = window.innerWidth - pos.right - rect.width
    const currentTop = window.innerHeight - pos.bottom - rect.height
    startRef.current.dx = e.clientX - currentLeft
    startRef.current.dy = e.clientY - currentTop
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nxLeft = e.clientX - startRef.current.dx
    const nyTop = e.clientY - startRef.current.dy
    const maxLeft = window.innerWidth - rect.width - margin
    const maxTop = window.innerHeight - rect.height - margin
    const clampedLeft = Math.min(Math.max(margin, nxLeft), maxLeft)
    const clampedTop = Math.min(Math.max(margin, nyTop), maxTop)
    const changed =
      Math.abs(window.innerWidth - pos.right - rect.width - clampedLeft) > 3 ||
      Math.abs(window.innerHeight - pos.bottom - rect.height - clampedTop) > 3
    if (changed) startRef.current.moved = true
    const newRight = Math.max(margin, window.innerWidth - clampedLeft - rect.width)
    const newBottom = Math.max(margin, window.innerHeight - clampedTop - rect.height)
    setPos({ right: newRight, bottom: newBottom })
  }

  const onPointerUp = () => {
    setDragging(false)
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const currentLeft = window.innerWidth - pos.right - rect.width
    const maxLeft = window.innerWidth - rect.width - margin
    const sideLeft = currentLeft + rect.width / 2 < window.innerWidth / 2
    const snappedLeft = sideLeft ? margin : maxLeft
    const newRight = Math.max(margin, window.innerWidth - snappedLeft - rect.width)
    setPos({ right: newRight, bottom: pos.bottom })
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
        className={`fixed transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${isModalOpen ? 'pointer-events-none' : ''}`}
        style={{ right: pos.right, bottom: pos.bottom, touchAction: 'none', zIndex: isModalOpen ? 30 : 80 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <FloatButton.Group
          shape="circle"
          trigger={isMobile ? 'click' : 'hover'}
          style={{ position: 'static' }}
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
            icon={<PhoneOutlined />}
            description="拨号"
            onClick={openDial}
          />
          <FloatButton
            icon={<CommentOutlined />}
            description="留言"
            onClick={() => openModal()}
          />
        </FloatButton.Group>
      </div>
    </ConfigProvider>
  )
}
