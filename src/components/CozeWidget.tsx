import React, { useEffect } from 'react';

declare global {
  interface Window {
    CozeWebSDK: {
      WebChatClient: new (options: {
        config: { bot_id: string };
        componentProps?: { title?: string };
      }) => void;
    };
  }
}

export const CozeWidget: React.FC = () => {
  useEffect(() => {
    // Add Coze SDK script
    const script = document.createElement('script');
    script.src = "https://sf-coze-web-cdn.coze.cn/obj/coze-web-sdk/obvi/coze-web-sdk.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    
    script.onload = () => {
      if (window.CozeWebSDK) {
        new window.CozeWebSDK.WebChatClient({
          config: {
            // Get Bot ID from environment variables
            bot_id: import.meta.env.VITE_COZE_BOT_ID || 'YOUR_BOT_ID_HERE', 
          },
          componentProps: {
            title: '元宝智能助手',
          },
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything visible itself, it injects the widget
};
