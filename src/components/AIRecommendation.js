import React, { useState, useEffect } from 'react';

const AIRecommendation = () => {
    const memberId = 1; // 하드코딩된 memberId
    const [recommendations, setRecommendations] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(true);
    const [error, setError] = useState(null);

    const fetchRecommendations = async (isRefresh = false) => {
        setIsAnalyzing(true);
        setError(null);
        try {
            const endpoint = isRefresh
                ? `http://52.78.64.2:8080/api/recommendations/jobs/refresh?memberId=${memberId}&limit=10`
                : `http://52.78.64.2:8080/api/recommendations/jobs?memberId=${memberId}&limit=10`;

            const response = await fetch(endpoint, {
                method: isRefresh ? 'POST' : 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            const formattedRecommendations = data.map((rec) => {
                return {
                    job: {
                        id: rec.jobPostingId,
                        company: rec.brandName,
                        position: rec.title,
                        salary: rec.salaryInfo,
                        location: rec.location,
                        ageGroup: rec.preferredAgeGroup,
                        experience: '정보 없음',
                        category: rec.category,
                        title: rec.title,
                        brand: rec.brandName,
                        workDays: rec.workDays,
                        workHours: rec.workHours,
                        education: '정보 없음',
                        address: rec.workRegion || rec.location,
                        description: rec.detailedDescription,
                        benefits: ['4대보험 완비'],
                    },
                    matchScore: rec.matchingScore,
                    reasons: [rec.matchingReason || 'AI가 이력서와 잘 매칭되었다고 판단했습니다'],
                    skillGaps: [],
                };
            });

            setRecommendations(formattedRecommendations);
        } catch (err) {
            setError(err.message);
            console.error('AI 추천 불러오기 실패:', err);
        } finally {
            setIsAnalyzing(false);
        }
    };

    useEffect(() => {
        // 컴포넌트 마운트 시 초기 추천 데이터 불러오기
        fetchRecommendations();
    }, [memberId]); // memberId가 변경될 때마다 다시 불러오기

    const renderRecommendations = () => (
        <div className="recommendations-result">
            <h2 className="recommendations-title">🎯 맞춤 일자리 추천</h2>
            {error && <p className="error-message">오류: {error}</p>}
            {recommendations.length === 0 && !isAnalyzing && !error ? (
                <p className="no-results">추천 일자리가 없습니다.</p>
            ) : (
                <div className="recommendations-grid">
                    {recommendations.map((rec, index) => (
                        <div key={index} className="recommendation-card">
                            <div className="card-header">
                                <div className="match-score-badge">
                                    <span className="score-number">{rec.matchScore}%</span>
                                    <span className="score-label">매칭</span>
                                </div>
                                <div className="company-info">
                                    <h3 className="company-name">{rec.job.company}</h3>
                                    <h4 className="position-title">{rec.job.position}</h4>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="job-details">
                                    <div className="detail-item">
                                        <span className="icon">💰</span>
                                        <span className="value">{rec.job.salary}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="icon">📍</span>
                                        <span className="value">{rec.job.location}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="icon">📅</span>
                                        <span className="value">{rec.job.workDays}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="icon">⏰</span>
                                        <span className="value">{rec.job.workHours}</span>
                                    </div>
                                </div>

                                <div className="matching-info">
                                    <div className="match-reasons">
                                        <h5>✅ 매칭 이유</h5>
                                        <ul>
                                            {rec.reasons.map((reason, i) => (
                                                <li key={i}>{reason}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="card-actions">
                                    <a
                                        href="https://www.seniorro.or.kr:4431/noin/main.do"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-apply"
                                    >
                                        지원하기
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="refresh-section">
                <button className="btn-refresh" onClick={() => fetchRecommendations(true)}>
                    새로운 추천 받기
                </button>
            </div>
        </div>
    );

    const renderAnalyzing = () => (
        <div className="analyzing-screen">
            <div className="loading-animation">
                <div className="spinner"></div>
                <h3>AI가 맞춤 일자리를 분석중입니다...</h3>
                <p>경력과 조건을 바탕으로 최적의 일자리를 찾고 있어요</p>
            </div>
        </div>
    );

    if (isAnalyzing) return renderAnalyzing();
    return renderRecommendations();
};

export default AIRecommendation;
