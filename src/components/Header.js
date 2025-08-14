// 웹사이트의 상단 메뉴 바 (네비게이션 바)
import React, { useState, useRef, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (action) => {
    console.log(`${action} 클릭됨`);
    setIsMenuOpen(false);
    // 여기에 각 메뉴 항목에 대한 실제 기능 구현
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>골드넷</h1>
          <span className="subtitle">노인 일자리 통합 플랫폼</span>
        </div>
        
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">1,247</span>
            <span className="stat-label">등록된 일자리</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">89%</span>
            <span className="stat-label">매칭 성공률</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">15,832</span>
            <span className="stat-label">회원 수</span>
          </div>
        </div>

        {/* 사용자 메뉴 */}
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
              <div className="menu-item" onClick={() => handleMenuClick('마이페이지')}>
                <span className="menu-icon">👤</span>
                <span>마이페이지</span>
              </div>
              <div className="menu-item" onClick={() => handleMenuClick('자기소개서')}>
                <span className="menu-icon">📝</span>
                <span>자기소개서</span>
              </div>
              <div className="menu-item" onClick={() => handleMenuClick('저장한 공고')}>
                <span className="menu-icon">⭐</span>
                <span>저장한 공고</span>
              </div>
              <div className="menu-item" onClick={() => handleMenuClick('지원 현황')}>
                <span className="menu-icon">📋</span>
                <span>지원 현황</span>
              </div>
              <div className="menu-divider"></div>
              <div className="menu-item" onClick={() => handleMenuClick('설정')}>
                <span className="menu-icon">⚙️</span>
                <span>설정</span>
              </div>
              <div className="menu-item logout" onClick={() => handleMenuClick('로그아웃')}>
                <span className="menu-icon">🚪</span>
                <span>로그아웃</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        .user-menu {
          position: relative;
          margin-left: 20px;
        }

        .profile-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .profile-btn:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .profile-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .profile-name {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .arrow {
          font-size: 10px;
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
          min-width: 180px;
          z-index: 1000;
          margin-top: 4px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
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
        }

        .menu-item.logout:hover {
          background-color: #fef2f2;
        }

        .menu-icon {
          font-size: 16px;
          width: 20px;
          text-align: center;
        }

        .menu-divider {
          height: 1px;
          background-color: #e0e0e0;
          margin: 4px 0;
        }
      `}</style>
    </header>
  );
};

export default Header;