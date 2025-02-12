import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const HomeComponent: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		// Scene setup
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		let model: THREE.Group;

		// Renderer config
		const width = 800;
		const height = 600;
		renderer.setSize(width, height);

		// 카메라 비율 조정
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		// ... existing code ...
		renderer.setClearColor(0x000000, 0); // 투명 배경
		containerRef.current.appendChild(renderer.domElement);

		// Lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 3);
		scene.add(ambientLight);
		
		const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
		directionalLight.position.set(1, 0.1, 1);
		
		scene.add(directionalLight);

		// Camera position
		camera.position.z = 0;
		camera.position.y = 0;

		// Controls
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;
		controls.enableZoom = false;

		new GLTFLoader().load('/regular_kirby.glb', (gltf) => {
			model = gltf.scene;

			// 모델 중앙 정렬
			const box = new THREE.Box3().setFromObject(model);
			const center = new THREE.Vector3();
			box.getCenter(center);
			model.position.sub(center); // 모델 원점 중앙으로 이동

			// 카메라 위치 자동 조정
			const size = box.getSize(new THREE.Vector3()).length();
			camera.position.set(0, size * 0.5, size * 1.5); // 모델 위쪽 각도에서 조망

			scene.add(model);

			// 컨트롤 설정 (중심 고정)
			controls.target.set(0, 0, 0); // 월드 원점을 중심으로
			controls.update();
			scene.add(model);
		},
		undefined,(error) => {
			console.error('모델 로딩 에러:', error);
		}
		);

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
		};
		animate();

		// Responsive handling
		const onWindowResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};
		window.addEventListener('resize', onWindowResize);

		// Cleanup
		return () => {
			window.removeEventListener('resize', onWindowResize);
			containerRef.current?.removeChild(renderer.domElement);
			renderer.dispose();
		};
	}, []);

	return <div 
		ref={containerRef} 
		style={{ 
		width: '800px', 
		height: '600px',
		margin: 'auto',
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)'
		}} 
	/>;
};

export default HomeComponent;