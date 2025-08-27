// 카카오 지도 API를 이용한 주소 기반 지도 표시 컴포넌트

import React, { useEffect, useRef } from 'react';
import '../styles/mapComponent.css';

const MapComponent = ({ address }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const initMap = () => {
            if (!mapRef.current) return;

            const { kakao } = window;

            // 기본 위치 (서울시청)
            const defaultPosition = new kakao.maps.LatLng(37.5665, 126.978);

            const options = {
                center: defaultPosition,
                level: 3,
            };

            const map = new kakao.maps.Map(mapRef.current, options);

            if (address) {
                const geocoder = new kakao.maps.services.Geocoder();

                geocoder.addressSearch(address, (result, status) => {
                    if (status === kakao.maps.services.Status.OK) {
                        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                        const marker = new kakao.maps.Marker({
                            map: map,
                            position: coords,
                        });

                        // 인포윈도우 생성
                        const infowindow = new kakao.maps.InfoWindow({
                            content: `<div style="width:150px;text-align:center;padding:6px 0;">${address}</div>`,
                        });

                        infowindow.open(map, marker);

                        map.setCenter(coords);
                    }
                });
            }
        };

        // 카카오맵 API 로드 체크
        if (window.kakao && window.kakao.maps) {
            initMap();
        } else {
            const script = document.createElement('script');
            script.async = true;
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_API_KEY&libraries=services&autoload=false`;
            document.head.appendChild(script);

            script.onload = () => {
                window.kakao.maps.load(initMap);
            };
        }
    }, [address]);

    return (
        <div className="map-wrapper">
            <div ref={mapRef} className="kakao-map"></div>
        </div>
    );
};

export default MapComponent;
