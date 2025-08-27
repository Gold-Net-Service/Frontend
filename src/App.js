// App.js

import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
// import SearchFilter from './components/SearchFilter';
import JobCard from './components/JobCard';
import Statistics from './components/Statistics';
import AIRecommendation from './components/AIRecommendation';
import JobDetail from './components/JobDetail';
import Resume from './components/mypage/Resume';
import SavedJobs from './components/mypage/SavedJobs';
import Applications from './components/mypage/Applications';

function App() {
    const [currentTab, setCurrentTab] = useState('jobs');
    const [selectedJob, setSelectedJob] = useState(null);
    const [fontSize, setFontSize] = useState(1);
    const [jobs, setJobs] = useState([]); // 초기값을 빈 배열로 설정
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize * 16}px`;
    }, [fontSize]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://52.78.64.2:8080/api/postings');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const formattedJobs = data.map((job) => ({
                    id: job.id,
                    company: job.brandName,
                    position: job.title,
                    salary: job.salaryInfo,
                    location: job.location,
                    ageGroup: job.preferredAgeGroup,
                    experience: '정보 없음', // API 응답에 없음, 기본값 설정
                    category: job.category,
                    title: job.title,
                    brand: job.brandName,
                    workDays: job.workDays,
                    workHours: job.workHours,
                    education: '정보 없음', // API 응답에 없음, 기본값 설정
                    address: job.workRegion,
                    description: job.detailedDescription,
                    benefits: ['4대보험 완비'], // API 응답에 없음, 기본값 설정
                }));
                setJobs(formattedJobs);
            } catch (error) {
                console.error('Fetching jobs failed:', error);
                // 에러 발생 시 사용자에게 알리거나, 대체 데이터를 로드할 수 있습니다.
            } finally {
                setIsLoading(false); // 로딩 완료
            }
        };

        fetchJobs();
    }, []); // 빈 의존성 배열은 컴포넌트가 마운트될 때 한 번만 실행됨

    const handleIncreaseFontSize = () => {
        setFontSize((prevSize) => Math.min(prevSize + 0.1, 1.4));
    };

    const handleDecreaseFontSize = () => {
        setFontSize((prevSize) => Math.max(prevSize - 0.1, 0.8));
    };

    const handleResetFontSize = () => {
        setFontSize(1);
    };

    const [userProfile, setUserProfile] = useState({
        age: '',
        previousJob: '',
        skills: [],
        preferredLocation: '',
        preferredSalary: '',
    });

    const handleApplyClick = (job) => {
        setSelectedJob(job);
    };

    const handleCloseJobDetail = () => {
        setSelectedJob(null);
    };

    const renderContent = () => {
        switch (currentTab) {
            case 'jobs':
                return (
                    <div className="jobs-section">
                        {/* <SearchFilter jobs={jobs} setJobs={setJobs} /> */}
                        <div className="job-results">
                            {isLoading && <h3>일자리 정보를 불러오는 중...</h3>}
                            <div className="job-grid">
                                {!isLoading && jobs.length === 0 ? (
                                    <p>일치하는 일자리가 없습니다.</p>
                                ) : (
                                    jobs.map((job) => (
                                        <JobCard key={job.id} job={job} onApplyClick={handleApplyClick} />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 'ai-recommend':
                return <AIRecommendation userProfile={userProfile} setUserProfile={setUserProfile} jobs={jobs} />;

            case 'statistics':
                return <Statistics jobs={jobs} />;

            case 'resume':
                return <Resume />;

            case 'saved-jobs':
                return <SavedJobs />;

            case 'applications':
                return <Applications />;

            case 'training':
                return (
                    <div className="training-section">
                        <h2>맞춤형 훈련 프로그램</h2>
                        <p>기존 경력을 활용한 재취업 지원 훈련과 신규 직무 적응 교육을 제공합니다.</p>
                    </div>
                );

            default:
                return (
                    <div className="jobs-section">
                        {/* <SearchFilter jobs={jobs} setJobs={setJobs} /> */}
                        <div className="job-results">
                            {/* <h3>전체 {jobs.length}개의 일자리</h3> */}
                            <div className="job-grid">
                                {jobs.map((job) => (
                                    <JobCard key={job.id} job={job} onApplyClick={handleApplyClick} />
                                ))}
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="App">
            <Header
                onNavigate={setCurrentTab}
                increaseFontSize={handleIncreaseFontSize}
                decreaseFontSize={handleDecreaseFontSize}
                resetFontSize={handleResetFontSize}
            />

            <main className="main-content">{renderContent()}</main>

            {selectedJob && <JobDetail job={selectedJob} onClose={handleCloseJobDetail} />}
        </div>
    );
}

export default App;
