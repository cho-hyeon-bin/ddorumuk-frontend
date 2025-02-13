import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const HomeComponent: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		// 기본 씬 설정
		const scene = new THREE.Scene();
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
		renderer.setSize(800, 600);
		containerRef.current.appendChild(renderer.domElement);

		// 조명 설정
		scene.add(new THREE.AmbientLight(0xffffff, 3));
		const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
		directionalLight.position.set(1, 0.1, 1);
		scene.add(directionalLight);

		// 컨트롤 설정
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;
		controls.enableZoom = false;

		// 모델 로드
		new GLTFLoader().load('/regular_kirby.glb', (gltf) => {
			const model = gltf.scene;
			const box = new THREE.Box3().setFromObject(model);
			const center = new THREE.Vector3();
			box.getCenter(center);
			model.position.sub(center);

			const size = box.getSize(new THREE.Vector3()).length();
			camera.position.set(0, size * 0.5, size * 1.5);
			controls.target.set(0, 0, 0);
			scene.add(model);
		});

		// 애니메이션 루프
		const animate = () => {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
		};
		animate();

		// 클린업
		return () => {
			renderer.dispose();
			containerRef.current?.removeChild(renderer.domElement);
		};
	}, []);

	return <div ref={containerRef} style={{ 
		width: '800px', 
		height: '600px',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	}} />;
};

export default HomeComponent;