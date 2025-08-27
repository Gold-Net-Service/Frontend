import React, { useState, useRef, useEffect } from 'react';

const Header = ({ onNavigate, increaseFontSize, decreaseFontSize, resetFontSize }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const fontMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
            if (fontMenuRef.current && !fontMenuRef.current.contains(event.target)) {
                setIsFontMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsFontMenuOpen(false);
    };

    const toggleFontMenu = () => {
        setIsFontMenuOpen(!isFontMenuOpen);
        setIsMenuOpen(false);
    };

    const handleMenuClick = (action) => {
        if (onNavigate) {
            onNavigate(action);
        }
        setIsMenuOpen(false);
    };

    const handleLogoutClick = () => {
        setIsMenuOpen(false);
        setShowLogoutConfirm(true);
    };

    const handleConfirmLogout = () => {
        console.log('로그아웃이 실행되었습니다.');
        setShowLogoutConfirm(false);
    };

    const handleFontSizeChange = (action) => {
        switch (action) {
            case 'increase':
                increaseFontSize && increaseFontSize();
                break;
            case 'decrease':
                decreaseFontSize && decreaseFontSize();
                break;
            case 'reset':
                resetFontSize && resetFontSize();
                break;
            default:
                // 기본 케이스 처리 (예: 아무것도 하지 않음 또는 에러 로깅)
                console.warn('알 수 없는 폰트 크기 변경 액션:', action);
                break;
        }
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo" onClick={() => onNavigate('jobs')} style={{ cursor: 'pointer' }}>
                    <div className="logo-text">
                        <h1 className="logo-title">GoldNet</h1>
                        <span className="subtitle">노인 일자리 통합 플랫폼</span>
                    </div>
                </div>

                <div className="header-controls">
                    {/* 글씨 크기 조정 메뉴 */}
                    <div className="font-size-menu" ref={fontMenuRef}>
                        <button className="font-size-btn" onClick={toggleFontMenu}>
                            <span className="font-icon">🔤</span>
                            <span className="font-label">글씨크기</span>
                            <span className={`arrow ${isFontMenuOpen ? 'up' : 'down'}`}>▼</span>
                        </button>

                        {isFontMenuOpen && (
                            <div className="font-dropdown-menu">
                                <div className="font-menu-item" onClick={() => handleFontSizeChange('increase')}>
                                    <span className="font-menu-icon">➕</span>
                                    <span>크게</span>
                                </div>
                                <div className="font-menu-item" onClick={() => handleFontSizeChange('decrease')}>
                                    <span className="font-menu-icon">➖</span>
                                    <span>작게</span>
                                </div>
                                <div className="font-menu-divider"></div>
                                <div className="font-menu-item" onClick={() => handleFontSizeChange('reset')}>
                                    <span className="font-menu-icon">🔄</span>
                                    <span>기본크기</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 기존 사용자 메뉴 */}
                    <div className="user-menu" ref={menuRef}>
                        <button className="profile-btn" onClick={toggleMenu}>
                            <div className="profile-icon">
                                <span>👤</span>
                            </div>
                            <span className="profile-name">마이페이지</span>
                            <span className={`arrow ${isMenuOpen ? 'up' : 'down'}`}>▼</span>
                        </button>

                        {isMenuOpen && (
                            <div className="dropdown-menu">
                                <div className="menu-item" onClick={() => handleMenuClick('resume')}>
                                    <span className="menu-icon">📝</span>
                                    <span>자기소개서</span>
                                </div>
                                <div className="menu-item" onClick={() => handleMenuClick('saved-jobs')}>
                                    <span className="menu-icon">⭐</span>
                                    <span>저장한 공고</span>
                                </div>
                                <div className="menu-item" onClick={() => handleMenuClick('applications')}>
                                    <span className="menu-icon">📋</span>
                                    <span>지원 현황</span>
                                </div>
                                {/* AI 추천 메뉴 추가 */}
                                <div className="menu-item" onClick={() => handleMenuClick('ai-recommend')}>
                                    <span className="menu-icon">🧠</span> {/* 적절한 아이콘으로 변경 가능 */}
                                    <span>AI 추천</span>
                                </div>
                                <div className="menu-divider"></div>
                                <div className="menu-item" onClick={() => handleMenuClick('settings')}>
                                    <span className="menu-icon">⚙️</span>
                                    <span>설정</span>
                                </div>
                                <div className="menu-item logout" onClick={handleLogoutClick}>
                                    <span className="menu-icon">🚪</span>
                                    <span>로그아웃</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 로그아웃 확인 창 */}
            {showLogoutConfirm && (
                <div className="confirm-overlay">
                    <div className="confirm-modal">
                        <h3>로그아웃</h3>
                        <p>정말로 로그아웃 하시겠습니까?</p>
                        <div className="modal-buttons">
                            <button className="btn-no" onClick={() => setShowLogoutConfirm(false)}>
                                아니요
                            </button>
                            <button className="btn-yes" onClick={handleConfirmLogout}>
                                예
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .header-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    padding: 1rem 2rem;
                }

                .logo {
                    display: flex;
                    align-items: center;
                }

                .logo-text {
                    display: flex;
                    flex-direction: column;
                }

                .logo-title {
                    font-size: 2.4rem;
                    font-weight: 700;
                    color: #f1e25f;
                    margin: 0;
                    line-height: 1.2;
                }

                .subtitle {
                    font-size: 1.4rem;
                    color: #666;
                    margin-top: 0.2rem;
                }

                /* 헤더 오른쪽 컨트롤들을 묶는 컨테이너 */
                .header-controls {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                /* 글씨 크기 조정 메뉴 스타일 */
                .font-size-menu {
                    position: relative;
                }

                .font-size-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    background: none;
                    border: none;
                    padding: 0.8rem 1.2rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }

                .font-size-btn:hover {
                    background-color: rgba(0, 0, 0, 0.05);
                }

                .font-icon {
                    font-size: 1.5rem;
                    width: 2rem;
                    text-align: center;
                }

                .font-label {
                    font-size: 1.5rem;
                    font-weight: 500;
                    color: #333;
                }

                .font-dropdown-menu {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: white;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    min-width: 14rem;
                    z-index: 1000;
                    margin-top: 0.4rem;
                    overflow: hidden;
                }

                .font-menu-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem 1.4rem;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                    font-size: 1.4rem;
                    color: #333;
                }

                .font-menu-item:hover {
                    background-color: #f5f5f5;
                }

                .font-menu-icon {
                    font-size: 1.4rem;
                    width: 1.8rem;
                    text-align: center;
                    flex-shrink: 0;
                }

                .font-menu-divider {
                    height: 1px;
                    background-color: #e0e0e0;
                    margin: 0.4rem 0;
                }

                /* 기존 사용자 메뉴 스타일 */
                .user-menu {
                    position: relative;
                }

                .profile-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    background: none;
                    border: none;
                    padding: 0.8rem 1.2rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }

                .profile-btn:hover {
                    background-color: rgba(0, 0, 0, 0.05);
                }

                .profile-icon {
                    width: 3.2rem;
                    height: 3.2rem;
                    border-radius: 50%;
                    background-color: #f0f0f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.6rem;
                }

                .profile-name {
                    font-size: 1.5rem;
                    font-weight: 500;
                    color: #333;
                }

                .arrow {
                    font-size: 1rem;
                    color: #666;
                    transition: transform 0.2s;
                }

                .arrow.up {
                    transform: rotate(180deg);
                }

                .dropdown-menu {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: white;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    min-width: 18rem;
                    z-index: 1000;
                    margin-top: 0.4rem;
                }

                .menu-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.2rem 1.6rem;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .menu-item:hover {
                    background-color: #f5f5f5;
                }

                .menu-item:first-child {
                    border-radius: 8px 8px 0 0;
                }

                .menu-item:last-child {
                    border-radius: 0 0 8px 8px;
                }

                .menu-item.logout {
                    color: #e74c3c;
                    font-size: 1.5rem;
                }

                .menu-item.logout:hover {
                    background-color: #fef2f2;
                }

                .menu-icon {
                    font-size: 1.6rem;
                    width: 2rem;
                    text-align: center;
                }

                .menu-divider {
                    height: 1px;
                    background-color: #e0e0e0;
                    margin: 0.4rem 0;
                }

                /* 로그아웃 확인 창 스타일 */
                .confirm-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2000;
                }

                .confirm-modal {
                    background-color: white;
                    padding: 24px;
                    border-radius: 8px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    text-align: center;
                    width: 320px;
                }

                .confirm-modal h3 {
                    margin-top: 0;
                    font-size: 1.25rem;
                }

                .confirm-modal p {
                    margin: 8px 0 24px;
                    color: #333;
                    font-size: 1.3rem;
                }

                .modal-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                }

                .modal-buttons button {
                    padding: 10px 24px;
                    border: none;
                    border-radius: 5px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    font-size: 1.3rem;
                }

                .modal-buttons .btn-no {
                    background-color: #e9ecef;
                    color: #495057;
                }
                .modal-buttons .btn-no:hover {
                    background-color: #ced4da;
                }

                .modal-buttons .btn-yes {
    background-color: #f1e25f;
    color: #333;
}
.modal-buttons .btn-yes:hover {
    background-color: #f9e884;
                }

                /* 반응형 디자인 */
                @media (max-width: 768px) {
                    .header-controls {
                        gap: 0.5rem;
                    }

                    .font-dropdown-menu,
                    .dropdown-menu {
                        right: -1rem;
                    }
                }
            `}</style>
        </header>
    );
};

export default Header;
