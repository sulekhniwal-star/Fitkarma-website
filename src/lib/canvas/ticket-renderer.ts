export interface PassRenderOptions {
  fullName: string;
  badgeNumber: number; // Seat number (e.g. 42 -> #042) or waitlist position (#127)
  date?: string;
  securityHash?: string;
  locale?: 'en' | 'hi';
}

export function formatBadgeNumber(num: number, isVip = true): string {
  if (isVip) {
    return `#${String(num).padStart(3, '0')}`;
  }
  return `#${num}`;
}

export function drawTicketNotches(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  notchY: number,
  radius: number
): void {
  ctx.save();
  ctx.fillStyle = '#0D0F12';
  // Left cutout
  ctx.beginPath();
  ctx.arc(0, notchY, radius, -Math.PI / 2, Math.PI / 2, false);
  ctx.fill();

  // Right cutout
  ctx.beginPath();
  ctx.arc(width, notchY, radius, Math.PI / 2, -Math.PI / 2, false);
  ctx.fill();
  ctx.restore();
}

/**
 * Renders high-resolution (1200x1500) front texture for Phase 1 VIP Beta Pass
 */
export function renderVipPassTexture(
  canvas: HTMLCanvasElement,
  options: PassRenderOptions
): void {
  canvas.width = 1200;
  canvas.height = 1500;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;
  const isHindi = options.locale === 'hi';
  const formattedSeat = formatBadgeNumber(options.badgeNumber, true);
  const formattedDate = options.date || new Date().toLocaleDateString(isHindi ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const securityHash = options.securityHash || `FK-VIP-${String(options.badgeNumber).padStart(4, '0')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  // 1. Base Luxury Obsidian Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#14181D');
  bgGrad.addColorStop(0.5, '#0D0F12');
  bgGrad.addColorStop(1, '#0A0C0E');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle noise / carbon lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
  ctx.lineWidth = 1;
  for (let y = 0; y < height; y += 12) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 2. Dual Metallic Gold Border
  ctx.strokeStyle = '#D6A84B';
  ctx.lineWidth = 6;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  ctx.strokeStyle = 'rgba(214, 168, 75, 0.35)';
  ctx.lineWidth = 2;
  ctx.strokeRect(52, 52, width - 104, height - 104);

  // 3. Ticket Notch Cutouts at y = 1050
  drawTicketNotches(ctx, width, height, 1050, 45);

  // Perforated line across notches
  ctx.save();
  ctx.strokeStyle = 'rgba(214, 168, 75, 0.4)';
  ctx.lineWidth = 3;
  ctx.setLineDash([12, 10]);
  ctx.beginPath();
  ctx.moveTo(60, 1050);
  ctx.lineTo(width - 60, 1050);
  ctx.stroke();
  ctx.restore();

  // 4. Header: FitKarma Vector Typography
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 64px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText('Fit', width / 2 - 80, 160);

  ctx.fillStyle = '#36C96A';
  ctx.fillText('Karma', width / 2 + 55, 160);

  // Tagline
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(
    isHindi ? 'भारत का AI-संचालित फिटनेस इकोसिस्टम' : "INDIA'S AI-POWERED HEALTH ECOSYSTEM",
    width / 2,
    210
  );

  // VIP Gold Ribbon
  ctx.fillStyle = '#D6A84B';
  ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText('★ PHASE 1 VIP BETA ACCESS ★', width / 2, 290);

  // 5. Centerpiece: Gold-Embossed Seat Badge
  ctx.save();
  // Badge Outer Glow Box
  ctx.fillStyle = 'rgba(214, 168, 75, 0.08)';
  ctx.strokeStyle = '#D6A84B';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(width / 2 - 320, 380, 640, 360, 32);
  ctx.fill();
  ctx.stroke();

  // Label
  ctx.fillStyle = '#D6A84B';
  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(
    isHindi ? 'आधिकारिक VIP सीट संख्या' : 'OFFICIAL VIP SEAT BADGE',
    width / 2,
    450
  );

  // Gigantic Seat Number
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 130px monospace, sans-serif';
  ctx.shadowColor = 'rgba(214, 168, 75, 0.6)';
  ctx.shadowBlur = 25;
  ctx.fillText(formattedSeat, width / 2, 600);
  ctx.restore();

  // Badge Subtext
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(
    isHindi ? 'संस्थापक सदस्य · 1,000 में से सीमित' : 'FOUNDING MEMBER · 1 OF 1,000 STRICTLY CAPPED',
    width / 2,
    690
  );

  // 6. Member Identity Section
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(isHindi ? 'आरक्षित सदस्य' : 'RESERVED TO', width / 2, 820);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(options.fullName, width / 2, 880);

  ctx.fillStyle = '#6B7280';
  ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(
    `${isHindi ? 'सत्यापन तिथि:' : 'Verified on:'} ${formattedDate}`,
    width / 2,
    940
  );

  // 7. Ticket Bottom Stub (Below notches)
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '600 20px monospace';
  ctx.fillText(securityHash, width / 2, 1140);

  ctx.fillStyle = '#36C96A';
  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText('✓ VERIFIED VIP EARLY ADOPTER', width / 2, 1220);

  ctx.fillStyle = '#4B5563';
  ctx.font = '400 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText('Digital Personal Data Protection (DPDP) Act Compliant', width / 2, 1290);
  ctx.fillText('fitkarma.in', width / 2, 1340);
}

/**
 * Renders high-resolution front texture for Phase 2 Waitlist Pass
 */
export function renderWaitlistPassTexture(
  canvas: HTMLCanvasElement,
  options: PassRenderOptions
): void {
  canvas.width = 1200;
  canvas.height = 1500;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;
  const isHindi = options.locale === 'hi';
  const formattedPosition = formatBadgeNumber(options.badgeNumber, false);
  const formattedDate = options.date || new Date().toLocaleDateString(isHindi ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const securityHash = options.securityHash || `FK-WTL-${String(options.badgeNumber).padStart(4, '0')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  // Base Obsidian with Deep Blue Hue
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#101622');
  bgGrad.addColorStop(0.5, '#0D0F12');
  bgGrad.addColorStop(1, '#080B10');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Dual Electric Cobalt Border
  ctx.strokeStyle = '#3B82F6';
  ctx.lineWidth = 6;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  ctx.strokeStyle = 'rgba(59, 130, 246, 0.35)';
  ctx.lineWidth = 2;
  ctx.strokeRect(52, 52, width - 104, height - 104);

  // Ticket Notches
  drawTicketNotches(ctx, width, height, 1050, 45);

  ctx.save();
  ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
  ctx.lineWidth = 3;
  ctx.setLineDash([12, 10]);
  ctx.beginPath();
  ctx.moveTo(60, 1050);
  ctx.lineTo(width - 60, 1050);
  ctx.stroke();
  ctx.restore();

  // Header
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 64px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText('Fit', width / 2 - 80, 160);

  ctx.fillStyle = '#36C96A';
  ctx.fillText('Karma', width / 2 + 55, 160);

  ctx.fillStyle = '#60A5FA';
  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText('★ PHASE 2 PRIORITY WAITLIST ★', width / 2, 270);

  // Queue Rank Centerpiece
  ctx.save();
  ctx.fillStyle = 'rgba(59, 130, 246, 0.08)';
  ctx.strokeStyle = '#3B82F6';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(width / 2 - 320, 380, 640, 360, 32);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#60A5FA';
  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(
    isHindi ? 'आपकी लाइव कतार स्थिति' : 'LIVE QUEUE POSITION',
    width / 2,
    450
  );

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 130px monospace, sans-serif';
  ctx.shadowColor = 'rgba(59, 130, 246, 0.6)';
  ctx.shadowBlur = 25;
  ctx.fillText(formattedPosition, width / 2, 600);
  ctx.restore();

  ctx.fillStyle = '#9CA3AF';
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(
    isHindi ? 'स्वचालित FIFO पदोन्नति कतार' : 'AUTOMATIC FIFO PROMOTION QUEUE',
    width / 2,
    690
  );

  // Member Identity
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(isHindi ? 'प्रतीक्षा सूची सदस्य' : 'WAITLISTED MEMBER', width / 2, 820);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(options.fullName, width / 2, 880);

  ctx.fillStyle = '#6B7280';
  ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(
    `${isHindi ? 'पंजीकरण तिथि:' : 'Registered on:'} ${formattedDate}`,
    width / 2,
    940
  );

  // Bottom Stub
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '600 20px monospace';
  ctx.fillText(securityHash, width / 2, 1140);

  ctx.fillStyle = '#60A5FA';
  ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText('AUTO-PROMOTES TO PHASE 1 ON DROPOUTS', width / 2, 1220);

  ctx.fillStyle = '#4B5563';
  ctx.font = '400 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText('fitkarma.in', width / 2, 1340);
}

/**
 * Renders dark carbon weave back face for 3D card
 */
export function renderPassBackTexture(
  canvas: HTMLCanvasElement,
  isVip = true
): void {
  canvas.width = 1200;
  canvas.height = 1500;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;
  const accentColor = isVip ? '#D6A84B' : '#3B82F6';

  // Dark Carbon Weave
  ctx.fillStyle = '#0B0D10';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 2;
  for (let x = 0; x < width + height; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x - height, height);
    ctx.stroke();
  }

  // Border
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  drawTicketNotches(ctx, width, height, 1050, 45);

  // Center Emblem
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 54px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText('FitKarma VIP Ecosystem', width / 2, 450);

  ctx.fillStyle = accentColor;
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText('FOUNDING CHARTER TERMS', width / 2, 510);

  ctx.fillStyle = '#9CA3AF';
  ctx.font = '400 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  const rules = [
    '• Strictly limited to 1,000 verified founding members in Phase 1.',
    '• Exclusive lifetime founding member badge and early product previews.',
    '• Full data sovereignty under the Indian DPDP Act with zero ad tracking.',
    '• Non-transferable digital VIP seat allocation.',
  ];
  rules.forEach((rule, idx) => {
    ctx.fillText(rule, width / 2, 620 + idx * 60);
  });

  ctx.fillStyle = '#4B5563';
  ctx.font = '500 20px monospace';
  ctx.fillText('AUTHENTIC SECURE DIGITAL PASS', width / 2, 1200);
  ctx.fillText('fitkarma.in', width / 2, 1280);
}

/**
 * Triggers client-side high-resolution PNG download
 */
export function exportCanvasAsPng(canvas: HTMLCanvasElement, filename: string): void {
  const dataUrl = canvas.toDataURL('image/png');
  const anchor = document.createElement('a');
  anchor.download = filename;
  anchor.href = dataUrl;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
