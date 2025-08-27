// 마이페이지 - 자기소개서

import React, { useState, useEffect } from 'react';
import './Resume.css';

const Resume = () => {
    const memberId = 1; // 하드코딩된 memberId. 실제 애플리케이션에서는 인증된 사용자 ID를 사용해야 합니다.
    const [profileData, setProfileData] = useState({
        name: '김골드',
        age: '62세',
        address: '서울시 강남구 테헤란로 123',
        phone: '010-1234-5678',
        email: 'goldnet@example.com',
        education: null,
        experience: null,
        preferredConditions: null,
        introduction: null,
        skills: null,
        strengths: null,
        mbti: null,
        certifications: null,
        portfolio: null,
        preferential: null,
        receiveOffers: true,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await fetch(`http://52.78.64.2:8080/resumes?memberId=${memberId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProfileData((prevData) => ({
                    ...prevData,
                    education: data.education,
                    experience: data.experience,
                    preferredConditions: data.preferredConditions,
                    introduction: data.selfIntroduction,
                    skills: data.skills,
                    strengths: data.strengths,
                    mbti: data.mbti,
                    certifications: data.licensesAbilities,
                    portfolio: data.portfolioUrls,
                    preferential: data.preferentialTreatment,
                }));
            } catch (err) {
                setError(err.message);
                console.error('이력서 불러오기 실패:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchResume();
    }, [memberId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://52.78.64.2:8080/resumes?memberId=${memberId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    education: profileData.education,
                    experience: profileData.experience,
                    preferredConditions: profileData.preferredConditions,
                    selfIntroduction: profileData.introduction,
                    skills: profileData.skills,
                    strengths: profileData.strengths,
                    mbti: profileData.mbti,
                    licensesAbilities: profileData.certifications,
                    portfolioUrls: profileData.portfolio,
                    preferentialTreatment: profileData.preferential,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('이력서 저장 성공:', result);
            alert('이력서가 성공적으로 저장되었습니다!');
        } catch (err) {
            setError(err.message);
            console.error('이력서 저장 실패:', err);
            alert(`이력서 저장 실패: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="resume-editor-container">이력서 정보를 불러오는 중...</div>;
    }

    if (error) {
        return <div className="resume-editor-container">오류: {error}</div>;
    }

    return (
        <div className="resume-editor-container">
            {/* 1. 사용자 기본 정보 섹션 */}
            <header className="profile-header">
                <div className="profile-picture">
                    <span>👤</span>
                </div>
                <div className="profile-info">
                    <h2>
                        {profileData.name} ({profileData.age})
                    </h2>
                    <p>{profileData.address}</p>
                    <p>
                        {profileData.phone} | {profileData.email}
                    </p>
                </div>
                <div className="profile-actions">
                    <button className="edit-profile-btn">회원정보 수정</button>
                </div>
            </header>

            {/* 2. 이력서 상세 정보 섹션 */}
            <main className="resume-body">
                <section className="resume-section">
                    <h3>기본 정보</h3>
                    <div className="form-group">
                        <label>학력</label>
                        <input type="text" name="education" value={profileData.education} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>경력</label>
                        <textarea name="experience" value={profileData.experience} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>희망 근무 조건</label>
                        <input
                            type="text"
                            name="preferredConditions"
                            value={profileData.preferredConditions}
                            onChange={handleChange}
                        />
                    </div>
                </section>

                <section className="resume-section">
                    <h3>자기소개</h3>
                    <textarea
                        name="introduction"
                        value={profileData.introduction}
                        onChange={handleChange}
                        className="intro-textarea"
                    />
                </section>

                <section className="resume-section">
                    <h3>나의 강점</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>스킬</label>
                            <input
                                type="text"
                                name="skills"
                                value={profileData.skills}
                                onChange={handleChange}
                                placeholder="예: OA 활용, 지게차 운전"
                            />
                        </div>
                        <div className="form-group">
                            <label>강점</label>
                            <input
                                type="text"
                                name="strengths"
                                value={profileData.strengths}
                                onChange={handleChange}
                                placeholder="예: 성실함, 책임감"
                            />
                        </div>
                        <div className="form-group">
                            <label>MBTI (선택)</label>
                            <input type="text" name="mbti" value={profileData.mbti} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>자격 / 능력 (선택)</label>
                            <input
                                type="text"
                                name="certifications"
                                value={profileData.certifications}
                                onChange={handleChange}
                                placeholder="예: 지게차운전기능사"
                            />
                        </div>
                        <div className="form-group">
                            <label>포트폴리오 (선택)</label>
                            <input
                                type="text"
                                name="portfolio"
                                value={profileData.portfolio}
                                onChange={handleChange}
                                placeholder="https://..."
                            />
                        </div>
                        <div className="form-group">
                            <label>취업 우대사항 (선택)</label>
                            <input
                                type="text"
                                name="preferential"
                                value={profileData.preferential}
                                onChange={handleChange}
                                placeholder="예: 국가유공자 자녀"
                            />
                        </div>
                    </div>
                </section>

                {/* 3. 제안 받기 및 저장 버튼 */}
                <section className="resume-section offer-section">
                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="receiveOffers"
                            name="receiveOffers"
                            checked={profileData.receiveOffers}
                            onChange={handleChange}
                        />
                        <label htmlFor="receiveOffers">구인자로부터 알바 제의를 받겠습니다.</label>
                    </div>
                </section>

                <div className="save-button-container">
                    <button className="save-btn" onClick={handleSave}>
                        이력서 저장
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Resume;
