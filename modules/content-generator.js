// ==========================================================================
// Content Generator Module - 동적 콘텐츠 생성 및 내보내기
// ==========================================================================

export class ContentGenerator {
    constructor() {
        this.sections = [];
        this.projectData = {};
        this.personalInfo = {};
        
        this.init();
    }

    /**
     * 초기화
     */
    init() {
        this.loadContentData();
        this.setupExportButtons();
    }

    /**
     * 현재 콘텐츠 데이터 로드
     */
    async loadContentData() {
        try {
            // 섹션 데이터 로드
            if (window.SectionLoader && window.SectionLoader.sectionsData) {
                this.sections = window.SectionLoader.sectionsData.sections || [];
            } else {
                // JSON 파일에서 직접 로드
                const response = await fetch('data/sections-data.json');
                const data = await response.json();
                this.sections = data.sections || [];
            }

            // 개인 정보 추출
            this.extractPersonalInfo();
            
            console.log('📄 Content data loaded:', this.sections.length, 'sections');
        } catch (error) {
            console.error('Failed to load content data:', error);
            this.loadFallbackContent();
        }
    }

    /**
     * 개인 정보 추출
     */
    extractPersonalInfo() {
        // HTML에서 개인 정보 추출
        const nameElement = document.querySelector('.name');
        const titleElement = document.querySelector('.title');
        const contactElements = document.querySelectorAll('.contact-item');

        this.personalInfo = {
            name: nameElement ? nameElement.textContent.trim() : '김경한',
            title: titleElement ? titleElement.textContent.trim() : 'GAME DEVELOPER',
            contacts: Array.from(contactElements).map(el => ({
                type: this.getContactType(el.textContent),
                value: el.textContent.trim(),
                href: el.getAttribute('href')
            }))
        };

        // 경력 정보 추가
        if (window.CareerManager) {
            this.personalInfo.experience = window.CareerManager.getExperienceData();
            this.personalInfo.level = window.CareerManager.getCurrentLevel();
        }
    }

    /**
     * 연락처 타입 감지
     * @param {string} text - 연락처 텍스트
     * @returns {string} 연락처 타입
     */
    getContactType(text) {
        if (text.includes('@')) return 'email';
        if (text.includes('010') || text.includes('tel:')) return 'phone';
        if (text.includes('github')) return 'github';
        if (text.includes('linkedin')) return 'linkedin';
        return 'other';
    }

    /**
     * 폴백 콘텐츠 로드
     */
    loadFallbackContent() {
        this.sections = [
            {
                type: 'basic',
                title: 'PLAYER PROFILE',
                content: '🎮 게임 개발자 • 5년 경력 • Unity & Unreal Engine 전문가'
            }
        ];
        
        this.personalInfo = {
            name: '김경한',
            title: 'GAME DEVELOPER',
            contacts: []
        };
        
        console.warn('Using fallback content data');
    }

    /**
     * Word 문서용 콘텐츠 생성
     * @returns {string} Word 문서 HTML 콘텐츠
     */
    generateWordContent() {
        const sections = this.sections.map(section => this.formatSectionForWord(section)).join('\n\n');
        
        const wordContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${this.personalInfo.name} - 이력서</title>
    <style>
        body { 
            font-family: 'Malgun Gothic', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .header { 
            text-align: center; 
            border-bottom: 2px solid #1976D2; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
        }
        .name { 
            font-size: 28px; 
            font-weight: bold; 
            color: #1976D2; 
            margin-bottom: 10px; 
        }
        .title { 
            font-size: 16px; 
            color: #666; 
            margin-bottom: 15px; 
        }
        .contact-info { 
            font-size: 14px; 
            color: #555; 
        }
        .section { 
            margin-bottom: 25px; 
            page-break-inside: avoid; 
        }
        .section-title { 
            font-size: 18px; 
            font-weight: bold; 
            color: #1976D2; 
            border-bottom: 1px solid #ccc; 
            padding-bottom: 5px; 
            margin-bottom: 15px; 
        }
        .project-card { 
            margin-bottom: 20px; 
            padding: 15px; 
            border: 1px solid #e0e0e0; 
            border-radius: 5px; 
        }
        .project-title { 
            font-size: 16px; 
            font-weight: bold; 
            color: #333; 
            margin-bottom: 10px; 
        }
        .tech-tags { 
            margin-top: 10px; 
        }
        .tech-tag { 
            display: inline-block; 
            background: #f5f5f5; 
            padding: 3px 8px; 
            border-radius: 3px; 
            font-size: 12px; 
            margin-right: 5px; 
            margin-bottom: 5px; 
        }
        ul { 
            margin: 10px 0; 
            padding-left: 20px; 
        }
        li { 
            margin-bottom: 5px; 
        }
        .performance-stats { 
            display: none; 
        }
        .architecture-diagram { 
            font-family: monospace; 
            font-size: 11px; 
            background: #f8f9fa; 
            padding: 10px; 
            border-radius: 3px; 
            white-space: pre; 
            overflow-x: auto; 
        }
        .code-snippet { 
            font-family: monospace; 
            font-size: 11px; 
            background: #f8f9fa; 
            padding: 10px; 
            border-radius: 3px; 
            white-space: pre-wrap; 
        }
        .media-gallery { 
            display: none; 
        }
        @media print {
            body { margin: 0; padding: 10px; }
            .section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${this.personalInfo.name}</div>
        <div class="title">${this.cleanTitle(this.personalInfo.title)}</div>
        <div class="contact-info">
            ${this.formatContactsForWord()}
        </div>
        ${this.generateCareerSummary()}
    </div>
    
    ${sections}
    
    <div class="section">
        <div class="section-title">문서 생성 정보</div>
        <p>생성일: ${new Date().toLocaleDateString('ko-KR')}</p>
        <p>생성 시간: ${new Date().toLocaleTimeString('ko-KR')}</p>
        <p>섹션 수: ${this.sections.length}개</p>
    </div>
</body>
</html>
        `.trim();

        return wordContent;
    }

    /**
     * 섹션을 Word 형식으로 포맷
     * @param {Object} section - 섹션 데이터
     * @returns {string} 포맷된 HTML
     */
    formatSectionForWord(section) {
        let content = '';
        
        switch (section.type) {
            case 'basic':
                content = this.formatBasicSection(section);
                break;
            case 'project':
                content = this.formatProjectSection(section);
                break;
            case 'skills':
                content = this.formatSkillsSection(section);
                break;
            case 'code':
                content = this.formatCodeSection(section);
                break;
            default:
                content = this.formatBasicSection(section);
        }

        return `
            <div class="section">
                <div class="section-title">${section.title}</div>
                ${content}
            </div>
        `;
    }

    /**
     * 기본 섹션 포맷
     * @param {Object} section - 섹션 데이터
     * @returns {string} 포맷된 HTML
     */
    formatBasicSection(section) {
        const content = Array.isArray(section.content) 
            ? section.content.join('') 
            : section.content;
        
        return this.cleanHTMLForWord(content);
    }

    /**
     * 프로젝트 섹션 포맷
     * @param {Object} section - 섹션 데이터
     * @returns {string} 포맷된 HTML
     */
    formatProjectSection(section) {
        const description = Array.isArray(section.description) 
            ? section.description.join('') 
            : section.description;

        const meta = section.meta ? section.meta.join(' • ') : '';
        const techTags = section.techTags ? 
            section.techTags.map(tech => `<span class="tech-tag">${tech.name}</span>`).join('') : '';

        return `
            <div class="project-card">
                <div class="project-title">${section.title}</div>
                ${meta ? `<div style="color: #666; margin-bottom: 10px;">${meta}</div>` : ''}
                <div>${this.cleanHTMLForWord(description)}</div>
                ${techTags ? `<div class="tech-tags"><strong>기술 스택:</strong><br>${techTags}</div>` : ''}
            </div>
        `;
    }

    /**
     * 스킬 섹션 포맷
     * @param {Object} section - 섹션 데이터
     * @returns {string} 포맷된 HTML
     */
    formatSkillsSection(section) {
        if (!section.categories) return '';

        return section.categories.map(category => {
            const skills = category.skills.map(skill => 
                `<li>${skill.name} (${skill.level}%)</li>`
            ).join('');

            return `
                <div style="margin-bottom: 20px;">
                    <h4>${category.title}</h4>
                    <ul>${skills}</ul>
                </div>
            `;
        }).join('');
    }

    /**
     * 코드 섹션 포맷
     * @param {Object} section - 섹션 데이터
     * @returns {string} 포맷된 HTML
     */
    formatCodeSection(section) {
        return `<div class="code-snippet">${this.cleanHTMLForWord(section.content)}</div>`;
    }

    /**
     * HTML을 Word용으로 정리
     * @param {string} html - 원본 HTML
     * @returns {string} 정리된 HTML
     */
    cleanHTMLForWord(html) {
        if (!html) return '';
        
        return html
            // 이모지를 텍스트로 변환
            .replace(/🏗️/g, '[건축]')
            .replace(/🎯/g, '[타겟]')
            .replace(/⚡/g, '[번개]')
            .replace(/🎮/g, '[게임]')
            .replace(/📱/g, '[모바일]')
            .replace(/👥/g, '[팀]')
            .replace(/⏰/g, '[시간]')
            .replace(/📈/g, '[성장]')
            .replace(/🧱/g, '[블록]')
            .replace(/⚔️/g, '[검]')
            .replace(/🚀/g, '[로켓]')
            .replace(/🎓/g, '[졸업모]')
            .replace(/📜/g, '[인증서]')
            .replace(/🏆/g, '[트로피]')
            .replace(/💻/g, '[컴퓨터]')
            .replace(/🔧/g, '[도구]')
            .replace(/📚/g, '[책]')
            // 불필요한 스타일 제거
            .replace(/style="[^"]*"/g, '')
            // 미디어 갤러리 제거
            .replace(/<div class="media-gallery">[\s\S]*?<\/div>/g, '')
            // 이미지 관련 제거
            .replace(/<img[^>]*>/g, '[이미지]')
            // 성능 통계 제거
            .replace(/<div class="performance-stats">[\s\S]*?<\/div>/g, '')
            // 기타 정리
            .replace(/\n\s*\n/g, '\n')
            .trim();
    }

    /**
     * 타이틀 정리
     * @param {string} title - 원본 타이틀
     * @returns {string} 정리된 타이틀
     */
    cleanTitle(title) {
        return title.replace(/🎮/g, '').replace(/•/g, '|').trim();
    }

    /**
     * 연락처 정보 Word 형식으로 포맷
     * @returns {string} 포맷된 연락처
     */
    formatContactsForWord() {
        return this.personalInfo.contacts.map(contact => {
            const cleanValue = contact.value.replace(/📧|📱|🔗/g, '').trim();
            return cleanValue;
        }).join(' • ');
    }

    /**
     * 경력 요약 생성
     * @returns {string} 경력 요약 HTML
     */
    generateCareerSummary() {
        if (!this.personalInfo.experience) return '';

        const exp = this.personalInfo.experience;
        return `
            <div style="margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                <strong>경력 요약:</strong> ${exp.years}년 ${exp.months}개월 
                (${exp.startDate} ~ ${exp.currentDate})
                ${this.personalInfo.level ? ` • ${this.personalInfo.level} 레벨` : ''}
            </div>
        `;
    }

    /**
     * PDF용 콘텐츠 생성
     * @returns {string} PDF 콘텐츠
     */
    generatePDFContent() {
        // Word 콘텐츠와 동일하지만 PDF 최적화 스타일 적용
        const wordContent = this.generateWordContent();
        
        // PDF 전용 스타일 추가
        return wordContent.replace(
            '</style>',
            `
            @page { 
                size: A4; 
                margin: 20mm; 
            }
            body { 
                font-size: 12px; 
            }
            .section { 
                page-break-inside: avoid; 
            }
            </style>`
        );
    }

    /**
     * 내보내기 버튼 설정
     */
    setupExportButtons() {
        // Word 내보내기
        window.exportToWord = () => {
            try {
                const content = this.generateWordContent();
                const blob = new Blob([content], { type: 'application/msword' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${this.personalInfo.name}_이력서_${new Date().toISOString().split('T')[0]}.doc`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                if (window.UIInteractions) {
                    window.UIInteractions.showNotification('Word 문서가 다운로드되었습니다', 'success');
                }
            } catch (error) {
                console.error('Word export failed:', error);
                if (window.UIInteractions) {
                    window.UIInteractions.showNotification('Word 내보내기에 실패했습니다', 'error');
                }
            }
        };

        // PDF 내보내기
        window.exportToPDF = () => {
            try {
                const content = this.generatePDFContent();
                const printWindow = window.open('', '_blank');
                printWindow.document.write(content);
                printWindow.document.close();
                
                printWindow.onload = () => {
                    printWindow.print();
                    setTimeout(() => {
                        printWindow.close();
                    }, 1000);
                };
                
                if (window.UIInteractions) {
                    window.UIInteractions.showNotification('PDF 인쇄 창이 열렸습니다', 'info');
                }
            } catch (error) {
                console.error('PDF export failed:', error);
                if (window.UIInteractions) {
                    window.UIInteractions.showNotification('PDF 내보내기에 실패했습니다', 'error');
                }
            }
        };
    }

    /**
     * 콘텐츠 새로고침
     */
    async refreshContent() {
        await this.loadContentData();
        console.log('📄 Content refreshed');
    }

    /**
     * 섹션 데이터 가져오기
     * @returns {Array} 섹션 배열
     */
    getSections() {
        return this.sections;
    }

    /**
     * 개인 정보 가져오기
     * @returns {Object} 개인 정보
     */
    getPersonalInfo() {
        return this.personalInfo;
    }
}

// 전역 인스턴스 생성
window.ContentGenerator = new ContentGenerator();

// 전역 함수로 노출 (기존 코드 호환성은 ContentGenerator에서 처리)
console.log('📝 Content Generator loaded successfully!');