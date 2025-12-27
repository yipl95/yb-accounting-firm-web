import React, { useEffect } from 'react';

declare global {
  interface Window {
    CozeWebSDK: any;
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
            // Replace with your actual Bot ID from Coze
            bot_id: 'YOUR_BOT_ID_HERE', 
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
