import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SelectComponent = () => {
	const [address, setAddress] = useState<string>('위치 정보 불러오는 중...');

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					const apiKey = '43d76d872e040e27684f64d8d82529f9'; // Kakao Maps API 키 입력
					const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;

					try {
						const response = await axios.get(url, {
							headers: {
								Authorization: `KakaoAK ${apiKey}`,
							}
						});
						if (response.data.documents && response.data.documents.length > 0) {
							const address = response.data.documents[0].address.address_name;
							setAddress(address);
						} else {
							setAddress('주소를 찾을 수 없습니다.');
						}
					} catch (error) {
						console.error('주소를 가져오는데 실패했습니다:', error);
						setAddress('주소를 가져오는데 실패했습니다.');
					}
				},
				(error) => {
					console.error('위치 정보를 가져오는데 실패했습니다:', error);
					setAddress('위치 정보를 가져오는데 실패했습니다.');
				}
			);
		} else {
			console.error('이 브라우저는 Geolocation을 지원하지 않습니다.');
			setAddress('이 브라우저는 Geolocation을 지원하지 않습니다.');
		}
	}, []);

	return <h1>현재 위치: {address}</h1>;
};

export default SelectComponent;