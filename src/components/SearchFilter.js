// 노인 사용자층을 고려하여 UI를 단순화한 일자리 검색 필터 컴포넌트

import React, { useState } from 'react';

const SearchFilter = ({ jobs, setJobs }) => {
    const [originalJobs] = useState(jobs);

    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        category: '',
    });

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const applyFilters = () => {
        console.log('적용할 필터:', filters);

        let filteredJobs = [...originalJobs];

        // 1. 키워드 필터링 (직무명, 회사명, 설명)
        if (filters.keyword) {
            const keyword = filters.keyword.toLowerCase();
            filteredJobs = filteredJobs.filter(
                (job) =>
                    job.position.toLowerCase().includes(keyword) ||
                    job.company.toLowerCase().includes(keyword) ||
                    job.description?.toLowerCase().includes(keyword)
            );
        }

        // 2. 근무 지역 필터링
        if (filters.location) {
            filteredJobs = filteredJobs.filter((job) => job.location === filters.location);
        }

        // 3. 업직종 필터링
        if (filters.category) {
            filteredJobs = filteredJobs.filter((job) => job.category === filters.category);
        }

        setJobs(filteredJobs);
    };

    const clearFilters = () => {
        setFilters({
            keyword: '',
            location: '',
            category: '',
        });
        setJobs(originalJobs);
    };

    return (
        <div className="search-filter">
            <div className="filter-section">
                {/* <h3>🔍 쉽고 빠른 일자리 찾기</h3> */}
                <div className="filter-grid">
                    {/* 키워드 검색 */}
                    <div className="filter-item">
                        <label>키워드</label>
                        <input
                            type="text"
                            placeholder="예: 경비, 청소, 돌봄"
                            value={filters.keyword}
                            onChange={(e) => handleFilterChange('keyword', e.target.value)}
                        />
                    </div>

                    {/* 근무 지역 선택 */}
                    <div className="filter-item">
                        <label>서울시</label>

                        <select
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                        >
                            <option value="">자치구별</option>
                            <option value="종로구">종로구</option>
                            <option value="중구">중구</option>
                            <option value="용산구">용산구</option>
                            <option value="성동구">성동구</option>
                            <option value="광진구">광진구</option>
                            <option value="동대문구">동대문구</option>
                            <option value="중랑구">중랑구</option>
                            <option value="성북구">성북구</option>
                            <option value="강북구">강북구</option>
                            <option value="도봉구">도봉구</option>
                            <option value="노원구">노원구</option>
                            <option value="은평구">은평구</option>
                            <option value="서대문구">서대문구</option>
                            <option value="마포구">마포구</option>
                            <option value="양천구">양천구</option>
                            <option value="강서구">강서구</option>
                            <option value="구로구">구로구</option>
                            <option value="금천구">금천구</option>
                            <option value="영등포구">영등포구</option>
                            <option value="동작구">동작구</option>
                            <option value="관악구">관악구</option>
                            <option value="서초구">서초구</option>
                            <option value="강남구">강남구</option>
                            <option value="송파구">송파구</option>
                            <option value="강동구">강동구</option>

                            {/* 필요에 따라 다른 지역 추가 */}
                        </select>
                    </div>

                    {/* 업직종 선택 */}
                    <div className="filter-item">
                        <label>하는 일</label>
                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                        >
                            <option value="">모든 종류</option>
                            <option value="물류/배송">물류/배송</option>
                            <option value="청소/미화">청소/미화</option>
                            <option value="경비/보안">경비/보안</option>
                            <option value="돌봄/요양">돌봄/요양</option>
                            <option value="조리/급식">조리/급식</option>
                            <option value="사무/관리">사무/관리</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>
                </div>

                <div className="filter-buttons">
                    <button className="btn-apply-filter" onClick={applyFilters}>
                        찾아보기
                    </button>
                    <button className="btn-clear-filter" onClick={clearFilters}>
                        처음부터
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;
