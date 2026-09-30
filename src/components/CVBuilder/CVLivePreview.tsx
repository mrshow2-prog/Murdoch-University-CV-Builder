import React, { useState, useEffect, useRef } from 'react';
import { CVData, PhotoShape } from '../../types';
import { formatBulletText, escapeHtml } from '../../utils/exportUtils';
import { MurdochLogo } from '../MurdochLogo';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react';

interface CVLivePreviewProps {
  cvData: CVData;
  accentColor: string;
  photoDataUrl: string;
  onPrintPdf?: () => void;
}

export const CVLivePreview: React.FC<CVLivePreviewProps> = ({
  cvData,
  accentColor,
  photoDataUrl,
  onPrintPdf
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [autoScale, setAutoScale] = useState<boolean>(true);

  // Auto-scaling responsive logic
  useEffect(() => {
    const handleResize = () => {
      if (!autoScale || !containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const padding = window.innerWidth < 1024 ? 32 : 64;
      const availableWidth = containerWidth - padding;
      const a4WidthPx = 794; // ~210mm at 96dpi

      if (availableWidth < a4WidthPx) {
        const scale = Math.max(0.4, availableWidth / a4WidthPx);
        setZoomLevel(scale);
      } else {
        setZoomLevel(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [autoScale]);

  const handleZoomChange = (delta: number) => {
    setAutoScale(false);
    setZoomLevel(prev => Math.min(1.5, Math.max(0.4, Number((prev + delta).toFixed(2)))));
  };

  const resetZoom = () => {
    setAutoScale(true);
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const padding = window.innerWidth < 1024 ? 32 : 64;
      const availableWidth = containerWidth - padding;
      const a4WidthPx = 794;
      if (availableWidth < a4WidthPx) {
        setZoomLevel(Math.max(0.4, availableWidth / a4WidthPx));
      } else {
        setZoomLevel(1);
      }
    }
  };

  // --- Dynamic Multi-Page Renderer ---
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    wrapper.innerHTML = '';

    const dummyAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
    const photoSrc = photoDataUrl || dummyAvatar;

    const contactList = [
      cvData.phone,
      cvData.email,
      cvData.location,
      cvData.linkedin,
      cvData.website
    ].filter(Boolean);

    function createNewPage(pageNum: number) {
      const page = document.createElement('div');
      page.className = 'cv-paper text-slate-800 shadow-2xl relative bg-white select-text print:mb-0';
      (page.style as any)['--cv-accent'] = accentColor;
      page.style.position = 'relative';
      page.style.boxSizing = 'border-box';
      page.style.backgroundColor = '#ffffff';

      // Page Badge
      const badge = document.createElement('div');
      badge.className = 'page-badge absolute top-2 right-3 text-[10px] font-bold text-slate-300 no-print select-none';
      badge.innerText = `Page ${pageNum}`;
      page.appendChild(badge);

      // Footer Murdoch Red Logo with rock-solid inline style constraints
      const footer = document.createElement('div');
      footer.className = 'absolute bottom-3.5 right-6 select-none opacity-85';
      footer.style.position = 'absolute';
      footer.style.bottom = '14px';
      footer.style.right = '24px';
      footer.style.userSelect = 'none';
      footer.style.opacity = '0.85';
      footer.style.zIndex = '10';

      footer.innerHTML = `
        <div style="display: flex; align-items: center; height: 20px; width: auto;">
          <svg viewBox="0 0 240 60" width="80" height="20" style="height: 20px; width: 80px; max-height: 20px; max-width: 80px; display: block;" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 50V10H20.5L29 30.5L37.5 10H52V50H40.5V26.5L33 44.5H25L17.5 26.5V50H6Z" fill="#E4002B" />
            <path d="M58 10H70V34C70 41.5 74.5 45.5 81.5 45.5C88.5 45.5 93 41.5 93 34V10H105V34C105 48.5 95 55 81.5 55C68 55 58 48.5 58 34V10Z" fill="#E4002B" />
            <text x="114" y="26" fill="#E4002B" font-family="'Calibri', 'Segoe UI', Arial, sans-serif" font-size="22" font-weight="900" letter-spacing="-0.5">Murdoch</text>
            <text x="114" y="49" fill="#E4002B" font-family="'Calibri', 'Segoe UI', Arial, sans-serif" font-size="22" font-weight="900" letter-spacing="-0.5">University</text>
          </svg>
        </div>
      `;
      page.appendChild(footer);

      return page;
    }

    function checkOverflow(pageEl: HTMLElement) {
      return pageEl.scrollHeight > pageEl.clientHeight + 2;
    }

    let currentPageNum = 1;
    let currentPage = createNewPage(currentPageNum);
    wrapper.appendChild(currentPage);

    // --- RENDER HEADER ON PAGE 1 ---
    const headerDiv = document.createElement('div');
    headerDiv.className = 'flex justify-between items-start mb-3 pb-2 border-b border-slate-200/80';
    
    let photoHtml = '';
    if (cvData.showPhoto) {
      const shapeClass = cvData.photoShape === 'circle' ? 'rounded-full' : 'rounded-md';
      const bgClass = !photoDataUrl ? 'bg-slate-100 p-2' : '';
      photoHtml = `
        <div class="ml-4 flex-shrink-0">
          <img src="${photoSrc}" alt="Profile Headshot" class="w-24 h-24 object-cover border-2 border-slate-200 shadow-sm ${shapeClass} ${bgClass}" />
        </div>
      `;
    }

    headerDiv.innerHTML = `
      <div class="${cvData.showPhoto ? 'text-left flex-1' : 'text-center w-full'}">
        <h1 style="color: ${accentColor}" class="text-2xl font-bold uppercase tracking-wider leading-tight">
          ${escapeHtml(cvData.fullName || 'Sarah Ahmed')}
        </h1>
        ${cvData.headline ? `<div class="text-[11.5pt] font-semibold text-slate-700 mt-0.5 mb-1">${escapeHtml(cvData.headline)}</div>` : ''}
        <div class="text-[9.5pt] text-slate-600 flex ${cvData.showPhoto ? 'justify-start' : 'justify-center'} flex-wrap gap-2 mt-1 items-center">
          ${contactList.map((contact, idx) => `
            <span>${escapeHtml(contact || '')}</span>
            ${idx < contactList.length - 1 ? '<span class="text-slate-300 font-bold">|</span>' : ''}
          `).join('')}
        </div>
      </div>
      ${photoHtml}
    `;
    currentPage.appendChild(headerDiv);

    // --- RENDER SECTIONS ---
    cvData.sections.forEach(sec => {
      if (!sec.visible) return;

      const itemNodes: HTMLElement[] = [];

      if (sec.type === 'text' && sec.text) {
        const paragraphs = sec.text.split('\n').filter(p => p.trim().length > 0);
        paragraphs.forEach(p => {
          const d = document.createElement('div');
          d.className = 'cv-item my-1';
          d.innerHTML = `<p class="text-[10pt] text-slate-700 leading-relaxed">${escapeHtml(p)}</p>`;
          itemNodes.push(d);
        });
      }
      else if (sec.type === 'education' && sec.items) {
        sec.items.forEach(item => {
          const headerHtml = `
            <div class="flex justify-between items-baseline font-bold text-[10.5pt] text-slate-900">
              <span>
                ${escapeHtml(item.degree)}
                ${item.uni ? `, ${escapeHtml(item.uni)}` : ''}
                ${item.location ? ` (${escapeHtml(item.location)})` : ''}
              </span>
              <span class="text-slate-500 font-normal text-[9.5pt] ml-2 whitespace-nowrap">
                ${escapeHtml(item.dates || '')}
              </span>
            </div>
          `;

          const subItems: string[] = [];
          if (item.grade) {
            const cleanGrade = item.grade.replace(/^(Grade\s*\/\s*Classification|Grade|Classification):\s*/i, '');
            subItems.push(`
              <div class="text-[9.5pt] text-slate-700 flex items-start gap-2 mt-0.5">
                <span class="shrink-0 text-slate-500 font-bold select-none">•</span>
                <span class="flex-1 leading-snug">${escapeHtml(cleanGrade)}</span>
              </div>
            `);
          }
          if (sec.showModules && item.modules) {
            const cleanMod = item.modules.replace(/^(Relevant Coursework|Key Modules):\s*/i, '');
            subItems.push(`
              <div class="text-[9.5pt] text-slate-700 flex items-start gap-2 mt-0.5">
                <span class="shrink-0 text-slate-500 font-bold select-none">•</span>
                <span class="flex-1 leading-snug">${escapeHtml(cleanMod)}</span>
              </div>
            `);
          }
          if (sec.showAwards && item.awards) {
            const cleanAward = item.awards.replace(/^(Honors & Awards|Honours & Awards|Awards):\s*/i, '');
            subItems.push(`
              <div class="text-[9.5pt] text-slate-700 flex items-start gap-2 mt-0.5">
                <span class="shrink-0 text-slate-500 font-bold select-none">•</span>
                <span class="flex-1 leading-snug">${escapeHtml(cleanAward)}</span>
              </div>
            `);
          }

          if (subItems.length === 0) {
            const d = document.createElement('div');
            d.className = 'cv-item mb-2';
            d.innerHTML = headerHtml;
            itemNodes.push(d);
          } else {
            const d0 = document.createElement('div');
            d0.className = 'cv-item mb-1';
            d0.innerHTML = headerHtml + subItems[0];
            itemNodes.push(d0);

            for (let i = 1; i < subItems.length; i++) {
              const d = document.createElement('div');
              d.className = 'cv-item mb-1';
              d.innerHTML = subItems[i];
              itemNodes.push(d);
            }
          }
        });
      }
      else if (sec.type === 'experience' && sec.items) {
        sec.items.forEach(item => {
          const headerHtml = `
            <div class="flex justify-between items-baseline font-bold text-[10.5pt] text-slate-900 mb-0.5">
              <span>
                ${escapeHtml(item.title)}
                ${item.company ? `, ${escapeHtml(item.company)}` : ''}
                ${item.country ? ` (${escapeHtml(item.country)})` : ''}
              </span>
              <span class="text-slate-500 font-normal text-[9.5pt] ml-2 whitespace-nowrap">
                ${escapeHtml(item.dates || '')}
              </span>
            </div>
          `;

          const bullets = item.bullets || [];

          if (bullets.length === 0) {
            const d = document.createElement('div');
            d.className = 'cv-item mb-2';
            d.innerHTML = headerHtml;
            itemNodes.push(d);
          } else {
            const d0 = document.createElement('div');
            d0.className = 'cv-item mb-1';
            d0.innerHTML = `
              ${headerHtml}
              <div class="text-[9.5pt] text-slate-700 flex items-start gap-2 mt-0.5">
                <span class="shrink-0 text-slate-500 font-bold select-none">•</span>
                <span class="flex-1 leading-snug">${formatBulletText(bullets[0])}</span>
              </div>
            `;
            itemNodes.push(d0);

            for (let i = 1; i < bullets.length; i++) {
              const d = document.createElement('div');
              d.className = 'cv-item mb-1';
              d.innerHTML = `
                <div class="text-[9.5pt] text-slate-700 flex items-start gap-2 mt-0.5">
                  <span class="shrink-0 text-slate-500 font-bold select-none">•</span>
                  <span class="flex-1 leading-snug">${formatBulletText(bullets[i])}</span>
                </div>
              `;
              itemNodes.push(d);
            }
          }
        });
      }
      else if ((sec.type === 'projects' || sec.type === 'competency_blocks') && sec.items) {
        sec.items.forEach(item => {
          const headerHtml = `
            <div class="flex justify-between items-baseline font-bold text-[10.5pt] text-slate-900 mb-0.5">
              <span>${escapeHtml(item.title)}</span>
              ${item.dates ? `<span class="text-slate-500 font-normal text-[9.5pt] ml-2 whitespace-nowrap">${escapeHtml(item.dates)}</span>` : ''}
            </div>
          `;

          const bullets = item.bullets || [];

          if (bullets.length === 0) {
            const d = document.createElement('div');
            d.className = 'cv-item mb-2';
            d.innerHTML = headerHtml;
            itemNodes.push(d);
          } else {
            const d0 = document.createElement('div');
            d0.className = 'cv-item mb-1';
            d0.innerHTML = `
              ${headerHtml}
              <div class="text-[9.5pt] text-slate-700 flex items-start gap-2 mt-0.5">
                <span class="shrink-0 text-slate-500 font-bold select-none">•</span>
                <span class="flex-1 leading-snug">${formatBulletText(bullets[0])}</span>
              </div>
            `;
            itemNodes.push(d0);

            for (let i = 1; i < bullets.length; i++) {
              const d = document.createElement('div');
              d.className = 'cv-item mb-1';
              d.innerHTML = `
                <div class="text-[9.5pt] text-slate-700 flex items-start gap-2 mt-0.5">
                  <span class="shrink-0 text-slate-500 font-bold select-none">•</span>
                  <span class="flex-1 leading-snug">${formatBulletText(bullets[i])}</span>
                </div>
              `;
              itemNodes.push(d);
            }
          }
        });
      }
      else if (sec.type === 'cert_list' && sec.items && sec.items.length > 0) {
        sec.items.forEach(item => {
          const d = document.createElement('div');
          d.className = 'cv-item flex justify-between items-baseline text-[9.5pt] text-slate-800 mb-1';
          d.innerHTML = `
            <div class="flex items-start gap-2 font-bold flex-1">
              <span class="shrink-0 text-slate-500">•</span>
              <span class="flex-1">${escapeHtml(item.title)}</span>
            </div>
            ${item.dates ? `<span class="text-slate-500 text-[9pt] shrink-0 ml-2">${escapeHtml(item.dates)}</span>` : ''}
          `;
          itemNodes.push(d);
        });
      }
      else if (sec.type === 'tags' && sec.tags && sec.tags.length > 0) {
        const isLanguages = sec.id === 'languages';
        const numCols = isLanguages ? 3 : 2;
        const gridCols = isLanguages ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2';

        for (let i = 0; i < sec.tags.length; i += numCols) {
          const chunk = sec.tags.slice(i, i + numCols);
          const d = document.createElement('div');
          d.className = 'cv-item my-0.5';
          d.innerHTML = `
            <div class="grid ${gridCols} gap-x-4 gap-y-1 text-[9.5pt] text-slate-700">
              ${chunk.map(tag => `
                <div class="flex items-start gap-2">
                  <span class="shrink-0 text-slate-400 font-bold">•</span>
                  <span class="flex-1">${escapeHtml(tag)}</span>
                </div>
              `).join('')}
            </div>
          `;
          itemNodes.push(d);
        }
      }
      else if (sec.type === 'bullets' && sec.bullets && sec.bullets.length > 0) {
        sec.bullets.forEach((b: string) => {
          const d = document.createElement('div');
          d.className = 'cv-item mb-1';
          d.innerHTML = `
            <div class="text-[9.5pt] text-slate-700 flex items-start gap-2 mt-0.5">
              <span class="shrink-0 text-slate-500 font-bold select-none">•</span>
              <span class="flex-1 leading-snug">${formatBulletText(b)}</span>
            </div>
          `;
          itemNodes.push(d);
        });
      }

      if (itemNodes.length === 0) return;

      let itemsInThisSectionOnPrevPage = 0;
      let itemsInThisSectionOnCurrentPage = 0;

      let secWrapper = document.createElement('div');
      secWrapper.className = 'mb-3';

      let secTitle = document.createElement('div');
      secTitle.className = 'cv-section-title';
      secTitle.style.color = accentColor;
      secTitle.style.borderColor = accentColor;
      secTitle.innerText = sec.title;
      secWrapper.appendChild(secTitle);

      currentPage.appendChild(secWrapper);

      if (checkOverflow(currentPage)) {
        currentPage.removeChild(secWrapper);
        currentPageNum++;
        currentPage = createNewPage(currentPageNum);
        wrapper.appendChild(currentPage);

        secWrapper = document.createElement('div');
        secWrapper.className = 'mb-3';
        secTitle = document.createElement('div');
        secTitle.className = 'cv-section-title';
        secTitle.style.color = accentColor;
        secTitle.style.borderColor = accentColor;
        secTitle.innerText = sec.title;
        secWrapper.appendChild(secTitle);
        currentPage.appendChild(secWrapper);
      }

      itemNodes.forEach(itemNode => {
        secWrapper.appendChild(itemNode);

        if (checkOverflow(currentPage)) {
          secWrapper.removeChild(itemNode);

          if (itemsInThisSectionOnCurrentPage === 0) {
            if (secWrapper.parentNode === currentPage) {
              currentPage.removeChild(secWrapper);
            }
          } else {
            itemsInThisSectionOnPrevPage += itemsInThisSectionOnCurrentPage;
          }

          currentPageNum++;
          currentPage = createNewPage(currentPageNum);
          wrapper.appendChild(currentPage);

          secWrapper = document.createElement('div');
          secWrapper.className = 'mb-3';
          secTitle = document.createElement('div');
          secTitle.className = 'cv-section-title';
          secTitle.style.color = accentColor;
          secTitle.style.borderColor = accentColor;

          const isContinued = itemsInThisSectionOnPrevPage > 0;
          secTitle.innerText = isContinued ? `${sec.title} (Cont.)` : sec.title;

          secWrapper.appendChild(secTitle);
          secWrapper.appendChild(itemNode);
          currentPage.appendChild(secWrapper);

          itemsInThisSectionOnCurrentPage = 1;
        } else {
          itemsInThisSectionOnCurrentPage++;
        }
      });
    });

  }, [cvData, accentColor, photoDataUrl]);

  return (
    <div className="w-full h-full flex flex-col bg-slate-200/70 relative overflow-hidden">
      {/* Zoom & View Controls Toolbar */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-slate-300/80 px-4 py-2 flex items-center justify-between z-20 no-print flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Live A4 ATS Preview</span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
            Standard Format
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleZoomChange(-0.1)}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <span className="text-xs font-bold text-slate-700 w-12 text-center select-none">
            {Math.round(zoomLevel * 100)}%
          </span>

          <button
            type="button"
            onClick={() => handleZoomChange(0.1)}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={resetZoom}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded ml-1 flex items-center gap-1 text-xs font-semibold"
            title="Fit to Window"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fit</span>
          </button>
        </div>
      </div>

      {/* Scrollable Preview Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 lg:p-8 flex flex-col items-center"
      >
        <div 
          ref={wrapperRef}
          id="cv-preview-wrapper"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            marginBottom: zoomLevel < 1 ? `-${(1 - zoomLevel) * 1122}px` : '0px'
          }}
          className="transition-transform duration-150 origin-top flex flex-col items-center space-y-8"
        >
          {/* Multi-page pages render dynamically here */}
        </div>
      </div>
    </div>
  );
};
