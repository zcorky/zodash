import Cache from '@zodash/cache';

const cache = new Cache(100);

import { dataURL } from './dataURL';

export interface WechatArticleShareOption {
  url: string;
  title: string;
}

export async function wechatArticleShare(options: WechatArticleShareOption) {
  const { url, title } = options;
  const key = `${url}:${title}`;
  if (cache.get(key)) {
    return cache.get(key);
  }

  const _dataUrl = await dataURL(url);

  const res = `
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="110" viewBox="0 0 100% 110" fill="none">
    <style>
      .header {
        font: 500 14px 'Segoe UI', Ubuntu, Sans-Serif;
        fill: #374151;
        animation: fadeInAnimation 0.8s ease-in-out forwards;
      }

      .stat {
        font: 400 12px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif;
      }

      .stagger {
        opacity: 0;
        animation: fadeInAnimation 0.3s ease-in-out forwards;
      }

      .light {
        fill: #6B7280;
        font-weight: 300
      }

      /* Animations */
      @keyframes scaleInAnimation {
        from {
          transform: translate(-5px, 5px) scale(0);
        }

        to {
          transform: translate(-5px, 5px) scale(1);
        }
      }

      @keyframes fadeInAnimation {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

    </style>

    <rect class="stagger" style="animation-delay: 900ms" data-testid="card-bg" x="0.5" y="0.5" rx="2" height="90%" stroke="#E5E7EB" width="99%" fill="#fffefe" stroke-opacity="1" />

    <g data-testid="main-card-body" transform="translate(-6, 0)">
      <g transform="translate(0, 6)">
        <g transform="translate(0, 35)">
          <g class="stagger" style="animation-delay: 450ms" transform="translate(25, 0)">>
            <text x="0" y="0" class="header" data-testid="header">${title}</text>
          </g>
        </g>
        <g transform="translate(0, 45)">
          <g class="stagger" style="animation-delay: 600ms" transform="translate(25, 0)">
            <svg class="light" viewBox="0 0 16 16" version="1.1" width="12" height="12" y="9" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path>
            </svg>
            <text class="stat light" x="20" y="22">${url}</text>
          </g>
        </g>
      </g>

      <g transform="translate(230, 18)" >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="64" height="64">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" x="0" y="0">
            <a href="${url}" target="_blank">
              <circle class="stagger" style="animation-delay: 300ms" r="128" cx="64" cy="64" stroke-width="1" stroke="" fill="url(#SvgjsPattern4297)">
                <title>${title}</title>
              </circle>
            </a>
          </svg>
          <defs>
            <pattern x="0" y="0" width="128" height="128" patternUnits="userSpaceOnUse" id="SvgjsPattern4297">
              <image width="64" height="64" href="${_dataUrl}"></image>
            </pattern>
          </defs>
        </svg>
      </g>
    </g>
  </svg>
  `;

  cache.set(key, res);

  return res;
}
