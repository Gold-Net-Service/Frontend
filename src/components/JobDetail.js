// 채용 공고 상세 정보 모달 UI 컴포넌트

import React from 'react';
import MapComponent from './MapComponent';
import '../styles/jobDetail.css';

const JobDetail = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div className="job-detail-overlay" onClick={onClose}>
            {/* 모달 내부 클릭 시 닫히지 않도록 이벤트 전파 방지 */}
            <div className="job-detail-container" onClick={(e) => e.stopPropagation()}>
                {/* 헤더 영역 */}
                <div className="job-detail-header">
                    <h2>{job.title}</h2> {/* 공고 제목 */}
                    <button className="close-btn" onClick={onClose}>
                        ✕ {/* 닫기 버튼 */}
                    </button>
                </div>

                {/* 콘텐츠 영역 */}
                <div className="job-detail-content">
                    {/* 1. 근무 조건 섹션 */}
                    <section className="detail-section">
                        <h3>근무 조건</h3>
                        <div className="condition-grid">
                            {/* 각 조건 항목 */}
                            <div className="condition-item">
                                <span className="label">업직종:</span>
                                <span className="value">{job.category || '정보 없음'}</span>
                            </div>
                            <div className="condition-item">
                                <span className="label">브랜드:</span>
                                <span className="value">{job.brand || '정보 없음'}</span>
                            </div>
                            <div className="condition-item">
                                <span className="label">급여:</span>
                                <span className="value">
                                    {job.salary === '0' ? '정보 없음' : job.salary || '정보 없음'}
                                </span>
                            </div>
                            <div className="condition-item">
                                <span className="label">근무요일:</span>
                                <span className="value">
                                    {job.workDays === '0일' ? '정보 없음' : job.workDays || '정보 없음'}
                                </span>
                            </div>
                            <div className="condition-item">
                                <span className="label">근무시간:</span>
                                <span className="value">
                                    {job.workHours === '0시간' ? '정보 없음' : job.workHours || '정보 없음'}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* 2. 모집 조건 섹션 */}
                    <section className="detail-section">
                        <h3>모집 조건</h3>
                        <div className="condition-grid">
                            <div className="condition-item">
                                <span className="label">학력:</span>
                                <span className="value">{job.education || '정보 없음'}</span>
                            </div>
                        </div>
                    </section>

                    {/* 3. 근무 지역 섹션 */}
                    <section className="detail-section">
                        <h3>근무 지역</h3>
                        <div className="location-info">
                            <p className="address">{job.address || '정보 없음'}</p>
                        </div>
                    </section>

                    {/* 4. 상세 요강 섹션 */}
                    <section className="detail-section">
                        <h3>상세 요강</h3>
                        <div className="job-description">
                            {job.description.includes('노인공익활동사업') ? (
                                <div className="detailed-requirements">
                                    <h4>노인공익활동사업</h4>
                                    <div className="requirement-item">
                                        <h5>1. 활동시간</h5>
                                        <p>총 10회(일 3시간) / 월 30시간 활동</p>
                                    </div>
                                    <div className="requirement-item">
                                        <h5>2. 활동비</h5>
                                        <p>월 29만원</p>
                                    </div>
                                    <div className="requirement-item">
                                        <h5>3. 신청자격</h5>
                                        <ul>
                                            <li>65세 이상 기초연금수급자, 직역연금수급자(배우자 포함)</li>
                                            <li>
                                                직역연금수급자(배우자 포함) 중 보건복지부 장관이 정하는 기준을 충족한
                                                자는 참여 가능
                                            </li>
                                            <li>65세 이상 대기자가 없는 경우 60-64세 차상위계층도 참여 가능</li>
                                        </ul>
                                    </div>
                                    <div className="requirement-item">
                                        <h5>4. 신청제외자</h5>
                                        <ul>
                                            <li>
                                                국민기초생활보장법에 의한 생계급여 수급자 (의료급여, 교육급여, 주거급여
                                                수급자는 신청 가능)
                                            </li>
                                            <li>국민건강보험 직장가입자</li>
                                            <li>
                                                장기요양보험 등급 판정자 1~5등급, 인지지원등급 (인지지원등급자의 경우
                                                전문의의 활동 가능 진단서 첨부 시에 한해 신청 가능)
                                            </li>
                                            <li>
                                                정부부처 및 지자체에서 추진하는 일자리사업에 2개 이상 참여하고 있는 자
                                            </li>
                                            <li>국내 거주자 중 외국민인 자</li>
                                        </ul>
                                    </div>
                                    <div className="requirement-item">
                                        <h5>5. 참여자 선발</h5>
                                        <p>개별면담을 통해 참여자 선발 기준표 작성하여 고득점자 순으로 통합 선발</p>
                                    </div>
                                    <div className="requirement-item">
                                        <h5>6. 준비서류</h5>
                                        <ul>
                                            <li>주민등록등본 1부</li>
                                            <li>기초연금수령확인서 1부</li>
                                            <li>통장사본 1부</li>
                                        </ul>
                                    </div>
                                    <div className="requirement-item">
                                        <h5>7. 신청장소</h5>
                                        <p>수서종합사회복지관 2층</p>
                                    </div>
                                </div>
                            ) : (
                                <p>{job.description || '정보 없음'}</p>
                            )}
                        </div>
                    </section>
                </div>

                {/* 푸터 버튼 영역 */}
                <div className="job-detail-footer">
                    <a
                        href="https://www.seniorro.or.kr:4431/noin/main.do"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="apply-btn"
                    >
                        지원하기
                    </a>
                    <button className="bookmark-btn">저장하기</button> {/* 북마크 버튼 */}
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
