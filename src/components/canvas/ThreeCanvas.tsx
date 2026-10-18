'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { sound } from '@/lib/audio';

interface ThreeCanvasProps {
  onObjectClick?: (objectName: string) => void;
}

export function ThreeCanvas({ onObjectClick }: ThreeCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfff8f1, 0.025);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.0);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Warm berry rim light
    const rimLight = new THREE.PointLight(0xa34063, 2.5, 15);
    rimLight.position.set(-4, -2, 4);
    scene.add(rimLight);

    // Golden starlight glow
    const starPointLight = new THREE.PointLight(0xfbbf24, 2.0, 10);
    starPointLight.position.set(0, 1.8, 2);
    scene.add(starPointLight);

    // 3. Volumetric Stardust Particles
    const starCount = 650;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color(0xf59e0b), // Amber gold
      new THREE.Color(0xa34063), // Berry rose
      new THREE.Color(0xa855f7), // Lavender
      new THREE.Color(0xfff8f1), // Warm cream
    ];

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 35;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 45 - 5;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5;

      const col = palette[Math.floor(Math.random() * palette.length)];
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. Build Lumi (The 3D Procedural Star-Weaver Baby)
    const lumiGroup = new THREE.Group();
    lumiGroup.name = 'lumi_character';

    // Body/Head (Cute pearlescent cloud shape)
    const headGeo = new THREE.SphereGeometry(1.25, 48, 48);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0xfffcf7,
      roughness: 0.25,
      metalness: 0.05,
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.castShadow = true;
    headMesh.receiveShadow = true;
    lumiGroup.add(headMesh);

    // Rosy Cheeks
    const cheekMat = new THREE.MeshBasicMaterial({ color: 0xffa3be, transparent: true, opacity: 0.5 });
    const cheekGeo = new THREE.SphereGeometry(0.24, 16, 16);
    
    const leftCheek = new THREE.Mesh(cheekGeo, cheekMat);
    leftCheek.position.set(-0.62, -0.15, 0.98);
    leftCheek.scale.set(1, 0.6, 0.5);
    lumiGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeo, cheekMat);
    rightCheek.position.set(0.62, -0.15, 0.98);
    rightCheek.scale.set(1, 0.6, 0.5);
    lumiGroup.add(rightCheek);

    // Expressive Eyes (Big glossy sockets with warm glowing pinpricks)
    const eyeSocketGeo = new THREE.SphereGeometry(0.22, 24, 24);
    const eyeSocketMat = new THREE.MeshBasicMaterial({ color: 0x1f1624 });

    const leftEye = new THREE.Mesh(eyeSocketGeo, eyeSocketMat);
    leftEye.position.set(-0.44, 0.16, 1.05);
    lumiGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeSocketGeo, eyeSocketMat);
    rightEye.position.set(0.44, 0.16, 1.05);
    lumiGroup.add(rightEye);

    // Glowing pupil lights
    const pupilGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });

    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(-0.4, 0.22, 1.22);
    lumiGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
    rightPupil.position.set(0.48, 0.22, 1.22);
    lumiGroup.add(rightPupil);

    // Star Antenna & Golden Halo
    const antennaStemGeo = new THREE.CylinderGeometry(0.03, 0.05, 0.5, 12);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0xd97706,
      emissiveIntensity: 0.4,
    });
    const stem = new THREE.Mesh(antennaStemGeo, goldMat);
    stem.position.set(0, 1.45, 0);
    lumiGroup.add(stem);

    // Glowing Golden Star on top of antenna (Easter Egg Target!)
    const starGeoShape = new THREE.OctahedronGeometry(0.3, 0);
    const starMatGlow = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.8,
      metalness: 0.5,
      roughness: 0.1,
    });
    const headStar = new THREE.Mesh(starGeoShape, starMatGlow);
    headStar.position.set(0, 1.8, 0);
    headStar.name = 'lumi_star_antenna';
    lumiGroup.add(headStar);

    // Orbiting Stardust Rings around Star
    const ringGeo = new THREE.TorusGeometry(0.55, 0.02, 12, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xfbcfe8, transparent: true, opacity: 0.7 });
    const haloRing = new THREE.Mesh(ringGeo, ringMat);
    haloRing.rotation.x = Math.PI / 3;
    haloRing.position.set(0, 1.8, 0);
    lumiGroup.add(haloRing);

    // Lavender Constellation Scarf
    const scarfGeo = new THREE.TorusGeometry(1.05, 0.24, 16, 32);
    const scarfMat = new THREE.MeshStandardMaterial({
      color: 0xc4b5fd,
      roughness: 0.6,
      metalness: 0.1,
    });
    const scarf = new THREE.Mesh(scarfGeo, scarfMat);
    scarf.rotation.x = Math.PI / 2;
    scarf.position.set(0, -0.95, 0);
    lumiGroup.add(scarf);

    // Floating Mitten Hands
    const handGeo = new THREE.SphereGeometry(0.28, 24, 24);
    const leftHand = new THREE.Mesh(handGeo, headMat);
    leftHand.position.set(-1.45, -0.4, 0.4);
    lumiGroup.add(leftHand);

    const rightHand = new THREE.Mesh(handGeo, headMat);
    rightHand.position.set(1.45, -0.4, 0.4);
    lumiGroup.add(rightHand);

    scene.add(lumiGroup);

    // 5. 3D Showcase Artifacts (Positioned along scroll path)
    const artifactsGroup = new THREE.Group();
    artifactsGroup.position.set(0, -5, 0);

    // Artifact 1: The Celestial Music Sphere (Interactive!)
    const musicSphereGeo = new THREE.IcosahedronGeometry(0.9, 1);
    const musicSphereMat = new THREE.MeshStandardMaterial({
      color: 0xa34063,
      metalness: 0.4,
      roughness: 0.2,
      emissive: 0x831843,
      emissiveIntensity: 0.25,
      wireframe: false,
    });
    const musicSphere = new THREE.Mesh(musicSphereGeo, musicSphereMat);
    musicSphere.position.set(-2.5, 0, 0);
    musicSphere.name = 'music_sphere';

    // Golden orbit ring around music sphere
    const musicRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.03, 16, 40),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    );
    musicRing.rotation.x = Math.PI / 4;
    musicSphere.add(musicRing);
    artifactsGroup.add(musicSphere);

    // Artifact 2: The Starlight Incubator Lantern
    const lanternGeo = new THREE.CylinderGeometry(0.45, 0.55, 1.2, 16, 1, true);
    const lanternMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.7,
      opacity: 0.9,
      transparent: true,
      roughness: 0.15,
      ior: 1.4,
    });
    const lantern = new THREE.Mesh(lanternGeo, lanternMat);
    lantern.position.set(0, 0.2, 0);
    lantern.name = 'dream_lantern';

    // Core Ember inside lantern
    const ember = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    lantern.add(ember);
    artifactsGroup.add(lantern);

    // Artifact 3: Meteor Cradle Blocks
    const blockGroup = new THREE.Group();
    blockGroup.position.set(2.5, 0, 0);
    blockGroup.name = 'meteor_cradle';

    const cubeGeo = new THREE.BoxGeometry(0.65, 0.65, 0.65);
    const cubeMat1 = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.3 });
    const cubeMat2 = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 });
    const cubeMat3 = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 });

    const c1 = new THREE.Mesh(cubeGeo, cubeMat1);
    c1.position.set(0, 0.35, 0);
    c1.rotation.set(0.3, 0.4, 0.1);
    blockGroup.add(c1);

    const c2 = new THREE.Mesh(cubeGeo, cubeMat2);
    c2.position.set(0.35, -0.35, 0.2);
    c2.rotation.set(-0.2, 0.5, 0.3);
    blockGroup.add(c2);

    const c3 = new THREE.Mesh(cubeGeo, cubeMat3);
    c3.position.set(-0.4, -0.3, -0.15);
    c3.rotation.set(0.4, -0.2, 0.2);
    blockGroup.add(c3);

    artifactsGroup.add(blockGroup);
    scene.add(artifactsGroup);

    // 6. Interactive Mouse & Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);
    const targetCameraPos = new THREE.Vector3(0, 0, 7.5);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handlePointerMove);

    // Click handler for 3D interactive objects
    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([headStar, musicSphere, lantern, c1, c2, c3], true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.name === 'lumi_star_antenna' || hit === headStar) {
          sound.playChord([783.99, 987.77, 1174.66]); // G5, B5, D6
          onObjectClick?.('lumi_star');
        } else if (hit.name === 'music_sphere' || hit === musicSphere) {
          sound.playLullaby();
          onObjectClick?.('music_sphere');
        } else if (hit.name === 'dream_lantern' || hit === lantern) {
          sound.playChime(659.25, 0.8);
          onObjectClick?.('dream_lantern');
        } else {
          sound.playClick();
          onObjectClick?.('meteor_blocks');
        }
      }
    };
    window.addEventListener('click', handleClick);

    // Scroll-linked camera travel
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? window.scrollY / totalScroll : 0;

      // Smoothly navigate camera down through the 3D layers
      // Layer 1 (0-30%): Hero at (0, 0, 7.5)
      // Layer 2 (30-70%): Workshop at (0, -5, 8.5)
      // Layer 3 (70-100%): Rooftop/Nursery at (0, -10.5, 8)
      if (progress < 0.35) {
        const p = progress / 0.35;
        targetCameraPos.set(0, -p * 3, 7.5 + p * 0.5);
      } else if (progress < 0.7) {
        const p = (progress - 0.35) / 0.35;
        targetCameraPos.set(0.5 * Math.sin(p * Math.PI), -3 - p * 4, 8.0 + p * 0.5);
      } else {
        const p = (progress - 0.7) / 0.3;
        targetCameraPos.set(0, -7 - p * 3.5, 8.5 - p * 0.5);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 8. Main 60 FPS Render Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      camera.position.lerp(targetCameraPos, 0.05);

      // Starfield subtle drift
      starField.rotation.y = elapsedTime * 0.02;
      starField.rotation.x = elapsedTime * 0.01;

      // Lumi gentle hovering & breathing
      lumiGroup.position.y = Math.sin(elapsedTime * 1.8) * 0.12;
      
      // Floating hands soft waving
      leftHand.position.y = -0.4 + Math.sin(elapsedTime * 2.2 + 0.5) * 0.08;
      rightHand.position.y = -0.4 + Math.cos(elapsedTime * 2.2) * 0.08;

      // Head tilts and looks towards user pointer
      const targetRotationY = mouse.x * 0.45;
      const targetRotationX = -mouse.y * 0.3;
      lumiGroup.rotation.y = THREE.MathUtils.lerp(lumiGroup.rotation.y, targetRotationY, 0.06);
      lumiGroup.rotation.x = THREE.MathUtils.lerp(lumiGroup.rotation.x, targetRotationX, 0.06);

      // Antenna star & halo spinning
      headStar.rotation.y = elapsedTime * 1.2;
      headStar.rotation.z = Math.sin(elapsedTime * 2) * 0.2;
      haloRing.rotation.z = elapsedTime * 0.8;

      // Interactive artifacts rotation
      musicSphere.rotation.y = elapsedTime * 0.6;
      musicSphere.rotation.x = Math.sin(elapsedTime * 0.5) * 0.3;
      musicRing.rotation.z = elapsedTime * 1.1;

      lantern.rotation.y = elapsedTime * 0.4;
      ember.position.y = Math.sin(elapsedTime * 3) * 0.08;

      blockGroup.rotation.y = elapsedTime * 0.3;
      c1.rotation.x += 0.01;
      c2.rotation.y += 0.015;
      c3.rotation.z += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onObjectClick]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-auto z-0"
      style={{ touchAction: 'pan-y' }}
      aria-label="3D Interactive Canvas: Lumi the Star-Weaver"
    />
  );
}
