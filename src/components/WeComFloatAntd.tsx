import React, { useEffect, useState } from 'react'
import { FloatButton } from 'antd'
import { MessageOutlined, UserAddOutlined } from '@ant-design/icons'

export const WeComFloatAntd: React.FC = () => {
  const chatLink =
    import.meta.env.VITE_WECHAT_KF_LINK ??
    'https://work.weixin.qq.com/kfid/kfced2ab49d46dacaf9'
  const addLink =
    import.meta.env.VITE_WECHAT_ADD_LINK ??
    'https://work.weixin.qq.com/ca/cawcde2d5f8fc300f1'

  const [visible, setVisible] = useState(true)
  const [isMobile] = useState(() => /iphone|android|mobile/.test(navigator.userAgent.toLowerCase()))

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

  return (
    <FloatButton.Group
      shape="circle"
      trigger={isMobile ? 'click' : 'hover'}
      style={{ right: 16, bottom: 16, opacity: visible ? 1 : 0, transition: 'opacity .2s' }}
      icon={<MessageOutlined />}
    >
      <FloatButton
        icon={<MessageOutlined />}
        tooltip="去聊天"
        onClick={() => openLink(chatLink)}
      />
      <FloatButton
        icon={<UserAddOutlined />}
        tooltip="添加客服"
        onClick={() => openLink(addLink)}
      />
    </FloatButton.Group>
  )
}
