// 개별 일자리 공고 카드

import React from 'react';

const JobCard = ({ job, onApplyClick }) => {
    const getCompanyLogo = (company) => {
        const logos = {
            '쿠팡 풀필먼트 서비스': '🏢',
            오아시스: '🌊',
            이마트: '🛒',
        };
        return logos[company] || '🏢';
    };

    const getAgeGroupColor = (ageGroup) => {
        switch (ageGroup) {
            case '50대':
                return '#4CAF50';
            case '60대':
                return '#2196F3';
            case '70대':
                return '#FF9800';
            default:
                return '#9E9E9E';
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            '물류/배송': '#E3F2FD',
            '운송/배송': '#F3E5F5',
            '유통/판매': '#E8F5E8',
        };
        return colors[category] || '#F5F5F5';
    };

    const handleApplyClick = () => {
        if (onApplyClick) {
            onApplyClick(job);
        }
    };

    return (
        <div className="job-card">
            <div className="job-card-header">
                <div className="company-info">
                    <span className="company-logo">{getCompanyLogo(job.company)}</span>
                    <div>
                        <h3 className="company-name">{job.company}</h3>
                        <span className="job-category" style={{ backgroundColor: getCategoryColor(job.category) }}>
                            {job.category}
                        </span>
                    </div>
                </div>
                <div className="age-badge" style={{ backgroundColor: getAgeGroupColor(job.ageGroup) }}>
                    {job.ageGroup}
                </div>
            </div>

            <div className="job-card-body">
                <h4 className="position-title">{job.position}</h4>
                <div className="job-details">
                    <div className="detail-item">
                        <span className="detail-icon">💰</span>
                        <span className="detail-text">{job.salary}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-icon">📍</span>
                        <span className="detail-text">{job.location}</span>
                    </div>
                </div>
            </div>

            <div className="job-card-footer">
                <button className="btn-apply" onClick={handleApplyClick}>
                    상세보기
                </button>
                <button className="btn-save">저장</button>
            </div>
        </div>
    );
};

export default JobCard;
