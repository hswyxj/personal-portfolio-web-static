'use client'

import Script from 'next/script';

export default function Live2DWidget() {
  return (
    <Script
      src="https://l2dwidget.js.org/lib/L2Dwidget.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== 'undefined' && (window as any).L2Dwidget) {
          ;(window as any).L2Dwidget.init({
            model: {
              jsonPath: 'https://unpkg.com/live2d-widget-model-miku@1.0.5/assets/miku.model.json',
              scale: 1,
            },
            display: {
              position: 'left',
              width: 180,
            },
            mobile: {
              show: true,
              scale: 0.5,
            },
            react: {
              opacityDefault: 0.7,
              opacityOnHover: 0.2,
            },
          });
        }
      }}
    />
  );
}
