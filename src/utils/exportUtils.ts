import { CVData, TemplateType } from '../types';
import { jsPDF } from 'jspdf';

export function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function formatBulletText(text: string): string {
  if (!text) return '';
  if (text.includes(':')) {
    const parts = text.split(':');
    const head = parts.shift();
    const rest = parts.join(':');
    return `<strong class="text-slate-800">${escapeHtml(head || '')}:</strong>${escapeHtml(rest)}`;
  }
  return escapeHtml(text);
}

export function exportToDraft(cvData: CVData, template: TemplateType, accentColor: string, photoDataUrl: string): void {
  const draftPayload = {
    version: '2.0',
    template,
    accentColor,
    photoDataUrl,
    data: cvData,
    lastUpdated: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(draftPayload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeName = (cvData.fullName || 'Murdoch_Student').replace(/\s+/g, '_');
  a.download = `${safeName}_Draft.cv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function hexToRgb(hex: string): [number, number, number] {
  let clean = (hex || '#1B365D').replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return [27, 54, 93];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function getMurdochLogoDataUrl(): Promise<string> {
  return new Promise((resolve) => {
    try {
      const svgString = `<svg viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 50V10H20.5L29 30.5L37.5 10H52V50H40.5V26.5L33 44.5H25L17.5 26.5V50H6Z" fill="#E4002B" />
        <path d="M58 10H70V34C70 41.5 74.5 45.5 81.5 45.5C88.5 45.5 93 41.5 93 34V10H105V34C105 48.5 95 55 81.5 55C68 55 58 48.5 58 34V10Z" fill="#E4002B" />
        <text x="114" y="26" fill="#E4002B" font-family="'Segoe UI', Arial, sans-serif" font-size="22" font-weight="900" letter-spacing="-0.5">Murdoch</text>
        <text x="114" y="49" fill="#E4002B" font-family="'Segoe UI', Arial, sans-serif" font-size="22" font-weight="900" letter-spacing="-0.5">University</text>
      </svg>`;
      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 480;
        canvas.height = 120;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 480, 120);
          resolve(canvas.toDataURL('image/png'));
        } else {
          resolve('');
        }
        URL.revokeObjectURL(url);
      };
      img.onerror = () => resolve('');
      img.src = url;
    } catch (e) {
      resolve('');
    }
  });
}

export async function exportToPDF(cvData: CVData, accentColorHex?: string, photoDataUrl?: string): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const logoDataUrl = await getMurdochLogoDataUrl();

  const [primaryR, primaryG, primaryB] = hexToRgb(accentColorHex || '#1B365D');
  const leftMargin = 16;
  const rightMargin = 194;
  const contentWidth = 178; // 194 - 16
  let y = 14;
  const pageHeight = 297;
  const footerReserved = 22;
  const maxY = pageHeight - footerReserved;

  function renderPageFooter() {
    if (logoDataUrl) {
      try {
        // Draw official Murdoch University red logo in footer at bottom right (matches preview h-4.5)
        doc.addImage(logoDataUrl, 'PNG', 168, 282, 22, 5.5);
      } catch (e) { /* ignore */ }
    }
  }

  let currentSecTitle = '';
  let currentSecHasItemsOnPrevPage = false;

  function checkPageBreak(neededHeight: number) {
    if (y + neededHeight > maxY) {
      renderPageFooter();
      doc.addPage();
      y = 16;

      if (currentSecTitle && currentSecHasItemsOnPrevPage) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(primaryR, primaryG, primaryB);
        doc.text(`${currentSecTitle} (CONT.)`, leftMargin, y);
        y += 1.8;

        doc.setDrawColor(primaryR, primaryG, primaryB);
        doc.setLineWidth(0.5);
        doc.line(leftMargin, y, rightMargin, y);
        y += 5.5;
      }
    }
  }

  // --- HEADER BLOCK ---
  const hasPhoto = cvData.showPhoto && photoDataUrl;
  const headerTextWidth = hasPhoto ? contentWidth - 32 : contentWidth;

  // Full Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(primaryR, primaryG, primaryB);
  
  if (hasPhoto) {
    doc.text((cvData.fullName || 'FULL NAME').toUpperCase(), leftMargin, y);
    try {
      doc.addImage(photoDataUrl, 'JPEG', 164, y - 4, 26, 26);
    } catch (e) { /* ignore */ }
  } else {
    doc.text((cvData.fullName || 'FULL NAME').toUpperCase(), leftMargin + (contentWidth / 2), y, { align: 'center' });
  }
  y += 6;

  // Headline / Target Role
  if (cvData.headline) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85); // Slate 700
    if (hasPhoto) {
      doc.text(cvData.headline, leftMargin, y);
    } else {
      doc.text(cvData.headline, leftMargin + (contentWidth / 2), y, { align: 'center' });
    }
    y += 5;
  }

  // Contact Info Row
  const contactItems = [cvData.phone, cvData.email, cvData.location, cvData.linkedin, cvData.website].filter(Boolean);
  if (contactItems.length > 0) {
    const contactStr = contactItems.join('  |  ');
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    if (hasPhoto) {
      const lines = doc.splitTextToSize(contactStr, headerTextWidth);
      doc.text(lines, leftMargin, y);
      y += lines.length * 4.2;
    } else {
      const lines = doc.splitTextToSize(contactStr, contentWidth);
      lines.forEach((line: string) => {
        doc.text(line, leftMargin + (contentWidth / 2), y, { align: 'center' });
        y += 4.2;
      });
    }
  }

  // Header Divider Line
  y += 1;
  doc.setDrawColor(226, 232, 240); // Slate 200
  doc.setLineWidth(0.4);
  doc.line(leftMargin, y, rightMargin, y);
  y += 5;

  // Helper function to draw item title & date safely without overlapping
  function drawHeaderWithRightDate(titleText: string, dateText?: string) {
    checkPageBreak(8);
    currentSecHasItemsOnPrevPage = true;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42); // Slate 900

    const dateWidth = dateText ? doc.getTextWidth(dateText) + 4 : 0;
    const availableTitleWidth = contentWidth - dateWidth;

    const titleLines = doc.splitTextToSize(titleText, availableTitleWidth);
    doc.text(titleLines, leftMargin, y);

    if (dateText) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(100, 116, 139); // Slate 500
      doc.text(dateText, rightMargin, y, { align: 'right' });
    }

    y += titleLines.length * 4.6;
  }

  // Helper function to draw formatted bullets without text overlapping or double printing
  function drawFormattedBullet(bulletText: string, indentX = 16, maxWidth = 178) {
    if (!bulletText || !bulletText.trim()) return;
    const cleanText = bulletText.replace(/^[\s•\-*]+/, '').trim();
    
    checkPageBreak(5);
    currentSecHasItemsOnPrevPage = true;

    // Bullet dot symbol
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139); // Slate 500
    doc.text('•', indentX, y);

    const textX = indentX + 4;
    const availableW = maxWidth - 4;
    const lineSpacing = 4.6; // Matches CSS leading-snug

    doc.setFontSize(9.5);

    const colonIndex = cleanText.indexOf(':');
    if (colonIndex > 0 && colonIndex < 40) {
      const prefix = cleanText.substring(0, colonIndex + 1); // e.g. "Relevant Coursework:"
      const rest = cleanText.substring(colonIndex + 1).trim();

      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 41, 59); // Slate 800
      const prefixWidth = doc.getTextWidth(prefix + ' ');

      if (!rest) {
        doc.text(prefix, textX, y);
        y += lineSpacing;
        return;
      }

      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85); // Slate 700

      const words = rest.split(' ');
      let currentLine = '';
      let isFirstLine = true;

      words.forEach((word) => {
        const lineCap = isFirstLine ? (availableW - prefixWidth) : availableW;
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        
        if (doc.getTextWidth(testLine) <= lineCap) {
          currentLine = testLine;
        } else {
          if (isFirstLine) {
            doc.setFont("helvetica", "bold");
            doc.text(prefix, textX, y);
            doc.setFont("helvetica", "normal");
            doc.text(currentLine, textX + prefixWidth, y);
            isFirstLine = false;
          } else {
            doc.setFont("helvetica", "normal");
            doc.text(currentLine, textX, y);
          }
          y += lineSpacing;
          checkPageBreak(4);
          currentLine = word;
        }
      });

      if (currentLine) {
        if (isFirstLine) {
          doc.setFont("helvetica", "bold");
          doc.text(prefix, textX, y);
          doc.setFont("helvetica", "normal");
          doc.text(currentLine, textX + prefixWidth, y);
        } else {
          doc.setFont("helvetica", "normal");
          doc.text(currentLine, textX, y);
        }
        y += lineSpacing;
      }
    } else {
      // Regular bullet
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      const lines = doc.splitTextToSize(cleanText, availableW);
      checkPageBreak(lines.length * lineSpacing);
      doc.text(lines, textX, y);
      y += lines.length * lineSpacing;
    }
  }

  // --- SECTIONS LOOP ---
  const visibleSections = cvData.sections.filter(s => s.visible !== false);

  visibleSections.forEach(section => {
    currentSecTitle = section.title.toUpperCase();
    currentSecHasItemsOnPrevPage = false;

    // If less than 28mm space remains at bottom of page, start section on fresh page
    if (y > 238) {
      checkPageBreak(999);
    } else {
      checkPageBreak(12);
    }

    // Section Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(primaryR, primaryG, primaryB);
    doc.text(section.title.toUpperCase(), leftMargin, y);
    y += 1.8;

    // Accent Underline
    doc.setDrawColor(primaryR, primaryG, primaryB);
    doc.setLineWidth(0.5);
    doc.line(leftMargin, y, rightMargin, y);
    y += 5.5;

    // --- SECTION TYPE RENDERING ---
    if (section.type === 'text' && section.text) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      const lines = doc.splitTextToSize(section.text, contentWidth);
      checkPageBreak(lines.length * 4.8);
      currentSecHasItemsOnPrevPage = true;
      doc.text(lines, leftMargin, y);
      y += lines.length * 4.8 + 3.0;
    }
    else if (section.type === 'education' && section.items && Array.isArray(section.items)) {
      section.items.forEach(edu => {
        const mainTitle = [
          edu.degree,
          edu.uni ? edu.uni : null,
          edu.location ? `(${edu.location})` : null
        ].filter(Boolean).join(', ');

        drawHeaderWithRightDate(mainTitle, edu.dates);

        // Sub items (Grade, Relevant Coursework, Awards)
        if (edu.grade) {
          const cleanGrade = edu.grade.replace(/^(Grade\s*\/\s*Classification|Grade|Classification):\s*/i, '');
          drawFormattedBullet(cleanGrade, leftMargin + 2, contentWidth - 2);
        }

        if (section.showModules && edu.modules) {
          const cleanMod = edu.modules.replace(/^(Relevant Coursework|Key Modules):\s*/i, '');
          drawFormattedBullet(cleanMod, leftMargin + 2, contentWidth - 2);
        }

        if (section.showAwards && edu.awards) {
          const cleanAward = edu.awards.replace(/^(Honors & Awards|Honours & Awards|Awards):\s*/i, '');
          drawFormattedBullet(cleanAward, leftMargin + 2, contentWidth - 2);
        }

        y += 1.5;
      });
    }
    else if (section.type === 'experience' && section.items && Array.isArray(section.items)) {
      section.items.forEach(exp => {
        const titleLine = [
          exp.title,
          exp.company ? exp.company : null,
          exp.country ? `(${exp.country})` : null
        ].filter(Boolean).join(', ');

        drawHeaderWithRightDate(titleLine, exp.dates);

        // Bullets
        if (exp.bullets && Array.isArray(exp.bullets)) {
          exp.bullets.forEach((bullet: string) => {
            drawFormattedBullet(bullet, leftMargin, contentWidth);
          });
        }
        y += 1.5;
      });
    }
    else if ((section.type === 'projects' || section.type === 'competency_blocks') && section.items && Array.isArray(section.items)) {
      section.items.forEach(item => {
        drawHeaderWithRightDate(item.title || '', item.dates);

        if (item.bullets && Array.isArray(item.bullets)) {
          item.bullets.forEach((bullet: string) => {
            drawFormattedBullet(bullet, leftMargin, contentWidth);
          });
        }
        y += 1.5;
      });
    }
    else if (section.type === 'cert_list' && section.items && Array.isArray(section.items)) {
      section.items.forEach(cert => {
        const certStr = [cert.title, cert.issuer].filter(Boolean).join(' - ');
        drawHeaderWithRightDate(`• ${certStr}`, cert.dates);
      });
      y += 1.5;
    }
    else if (section.type === 'tags' && section.tags && Array.isArray(section.tags)) {
      checkPageBreak(10);

      const isLanguages = section.id === 'languages' || section.title.toLowerCase().includes('language');
      const numCols = isLanguages ? 3 : 2;
      const colWidth = contentWidth / numCols;

      let currentCol = 0;
      let startY = y;

      section.tags.forEach((tag) => {
        const xPos = leftMargin + (currentCol * colWidth);
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(148, 163, 184); // Slate 400
        doc.text('•', xPos, y);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(51, 65, 85); // Slate 700
        doc.text(tag, xPos + 4, y);

        currentCol++;
        if (currentCol >= numCols) {
          currentCol = 0;
          y += 4.5;
        }
      });

      if (currentCol !== 0) {
        y += 4.5;
      }
      y += 2;
    }
    else if (section.type === 'bullets' && section.bullets && Array.isArray(section.bullets)) {
      section.bullets.forEach((bullet: string) => {
        drawFormattedBullet(bullet, leftMargin, contentWidth);
      });
      y += 1.5;
    }
  });

  // Render Footer on Last Page
  renderPageFooter();

  // Render Footer on Last Page
  renderPageFooter();

  // Save PDF
  const safeName = (cvData.fullName || 'Murdoch_Student_CV').trim().replace(/\s+/g, '_');
  doc.save(`${safeName}.pdf`);
}

/**
 * Native Vector Print / Save as PDF Function.
 * Triggers the browser's native print engine with 100% vector typography, 
 * sharp SVG logos, selectable text, and exact A4 page breaks with ZERO canvas distortion.
 */
export function printCVNative(): void {
  try {
    // Ensure all styles and fonts are ready, then trigger native print
    window.print();
  } catch (e) {
    console.error("Print trigger error:", e);
    window.print();
  }
}

