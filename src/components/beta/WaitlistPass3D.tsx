'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  renderWaitlistPassTexture,
  renderPassBackTexture,
  exportCanvasAsPng,
  formatBadgeNumber,
} from '@/lib/canvas/ticket-renderer';
import { Download, Sparkles, RefreshCw } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export interface WaitlistPass3DProps {
  fullName: string;
  waitlistPosition: number;
  date?: string;
  securityHash?: string;
}

export function WaitlistPass3D({
  fullName = 'Waitlisted Member',
  waitlistPosition = 127,
  date,
  securityHash,
}: WaitlistPass3DProps) {
  const t = useTranslations('beta.pass');
  const locale = useLocale() as 'en' | 'hi';

  const containerRef = useRef<HTMLDivElement>(null);
  const frontCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Textures
    const frontCanvas = document.createElement('canvas');
    frontCanvasRef.current = frontCanvas;
    renderWaitlistPassTexture(frontCanvas, {
      fullName,
      badgeNumber: waitlistPosition,
      date,
      securityHash,
      locale,
    });

    const backCanvas = document.createElement('canvas');
    renderPassBackTexture(backCanvas, false);

    // 2. Three.js Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || 380;
    const height = Math.min(width * 1.35, 520);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 7.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const frontTexture = new THREE.CanvasTexture(frontCanvas);
    frontTexture.colorSpace = THREE.SRGBColorSpace;

    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.colorSpace = THREE.SRGBColorSpace;

    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.7,
      roughness: 0.3,
    });

    const materials = [
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      new THREE.MeshStandardMaterial({ map: frontTexture, roughness: 0.35 }),
      new THREE.MeshStandardMaterial({ map: backTexture, roughness: 0.35 }),
    ];

    const cardGeometry = new THREE.BoxGeometry(3.0, 4.0, 0.08);
    const cardMesh = new THREE.Mesh(cardGeometry, materials);

    const cardGroup = new THREE.Group();
    cardGroup.add(cardMesh);
    scene.add(cardGroup);

    // 3. Lighting & Cobalt Back-Glow
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const frontKeyLight = new THREE.DirectionalLight(0xe8f0fe, 1.8);
    frontKeyLight.position.set(4, 5, 6);
    scene.add(frontKeyLight);

    const cobaltBackLight = new THREE.PointLight(0x3b82f6, 4.0, 12);
    cobaltBackLight.position.set(0, 0, -1.0);
    scene.add(cobaltBackLight);

    // 4. Drag Rotation
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let currentRotationY = 0;
    let currentRotationX = 0;

    function onPointerDown(e: PointerEvent) {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      renderer.domElement.style.cursor = 'grabbing';
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX));
    }

    function onPointerUp() {
      isDragging = false;
      renderer.domElement.style.cursor = 'grab';
    }

    const dom = renderer.domElement;
    dom.style.cursor = 'grab';
    dom.style.touchAction = 'none';
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 5. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Floating sine-wave
      cardGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      if (!isDragging) {
        targetRotationY += 0.002;
      }

      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;

      cardMesh.rotation.y = currentRotationY;
      cardMesh.rotation.x = currentRotationX;

      renderer.render(scene, camera);
    }

    animate();

    function handleResize() {
      if (!container) return;
      const newWidth = container.clientWidth || 380;
      const newHeight = Math.min(newWidth * 1.35, 520);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      frontTexture.dispose();
      backTexture.dispose();
      cardGeometry.dispose();
    };
  }, [fullName, waitlistPosition, date, securityHash, locale]);

  function handleDownload() {
    if (!frontCanvasRef.current) return;
    setDownloading(true);
    const filename = `FitKarma-Waitlist-Pass-${waitlistPosition}.png`;
    exportCanvasAsPng(frontCanvasRef.current, filename);
    setTimeout(() => setDownloading(false), 800);
  }

  const formattedPosition = formatBadgeNumber(waitlistPosition, false);

  return (
    <div className="flex flex-col items-center">
      {/* 3D Canvas Stage with Cobalt Backlight Glow */}
      <div className="relative w-full max-w-[380px] flex items-center justify-center py-4 select-none">
        {/* Cobalt Backlight Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[440px] bg-gradient-to-tr from-[#3B82F6]/25 via-[#60A5FA]/20 to-[#36C96A]/10 rounded-full blur-[70px] pointer-events-none animate-pulse" />

        <div ref={containerRef} className="relative z-10 w-full flex items-center justify-center" />
      </div>

      <div className="flex items-center gap-2 text-xs text-[#60A5FA] font-medium mt-1 mb-6 bg-[#3B82F6]/10 px-3.5 py-1.5 rounded-full border border-[#3B82F6]/25">
        <Sparkles className="w-3.5 h-3.5" />
        <span>{t('drag_hint')}</span>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className="w-full max-w-sm flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6] text-white font-black text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:brightness-110 active:scale-[0.99] transition disabled:opacity-50"
      >
        {downloading ? (
          <RefreshCw className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4 stroke-[2.5]" />
        )}
        <span>{t('download')}</span>
      </button>

      <p className="text-xs text-gray-500 mt-2.5">
        Exports ultra-sharp 1200x1500 px PNG image for WhatsApp Status & Instagram Story
      </p>
    </div>
  );
}

