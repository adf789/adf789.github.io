// ==========================================================================
// 섹션 템플릿 시스템 - 재사용 가능한 섹션 컴포넌트
// ==========================================================================

/**
 * 섹션 템플릿 관리자
 */
class SectionTemplateManager {
    constructor() {
        this.templates = new Map();
        this.initializeTemplates();
    }

    /**
     * 기본 템플릿들 초기화
     */
    initializeTemplates() {
        // 기본 섹션 템플릿
        this.registerTemplate('basic', {
            title: '',
            icon: '',
            content: '',
            hasDetails: false
        });

        // 프로젝트 카드 템플릿
        this.registerTemplate('project', {
            title: '',
            meta: [],
            description: '',
            techTags: [],
            hasDetails: true,
            detailsContent: ''
        });

        // 스킬 섹션 템플릿
        this.registerTemplate('skills', {
            title: 'SKILL INVENTORY',
            categories: []
        });

        // 미디어 갤러리 템플릿
        this.registerTemplate('media', {
            title: '',
            items: []
        });
    }

    /**
     * 템플릿 등록
     * @param {string} name - 템플릿 이름
     * @param {Object} structure - 템플릿 구조
     */
    registerTemplate(name, structure) {
        this.templates.set(name, structure);
    }

    /**
     * 기본 섹션 생성
     * @param {Object} config - 섹션 설정
     * @returns {HTMLElement} 생성된 섹션 엘리먼트
     */
    createBasicSection(config) {
        const section = document.createElement('div');
        section.className = 'section';
        
        // content가 배열인 경우 문자열로 합치기
        let content = Array.isArray(config.content) 
            ? config.content.join('') 
            : config.content;

        // CareerManager를 통한 경력 정보 치환
        if (window.CareerManager && typeof window.CareerManager !== 'undefined') {
            const yearCount = window.CareerManager.getExperienceYearCountData();
            const experience = window.CareerManager.getExperienceData();
            const experienceText = `${yearCount}년차(${experience.startYear}.${experience.startMonth}~)`;
            content = String(content).replace('[EXPERIENCE]', experienceText);
        } else {
            // CareerManager가 없는 경우 기본값 사용
            content = String(content).replace('[EXPERIENCE]', '5년차');
        }
        
        // URL과 code-line 링크 처리
        content = this.processLinksInContent(content);
        
        section.innerHTML = `
            <div class="section-header">
                <div class="inventory-icon"></div>
                <span>${config.title}</span>
            </div>
            <div class="section-content">
                ${content}
            </div>
        `;

        return section;
    }

    /**
     * 프로젝트 카드 섹션 생성
     * @param {Object} config - 프로젝트 설정
     * @returns {HTMLElement} 생성된 프로젝트 섹션
     */
    createProjectSection(config) {
        const section = document.createElement('div');
        section.className = 'section';
        
        const projectCard = this.createProjectCard(config);
        
        section.innerHTML = `
            <div class="section-header">
                <div class="inventory-icon"></div>
                <span>${config.sectionTitle || 'COMPLETED PROJECTS'}</span>
            </div>
            <div class="section-content">
                ${projectCard}
            </div>
        `;

        return section;
    }

    /**
     * 프로젝트 카드 생성
     * @param {Object} project - 프로젝트 정보
     * @returns {string} 프로젝트 카드 HTML
     */
    createProjectCard(project) {
        const metaItems = project.meta.map(item => 
            `<span class="meta-item">${item}</span>`
        ).join('');

        const techTags = project.techTags.map(tech => 
            `<span class="tech-tag">
                ${tech.icon ? `<img src="${tech.icon}" alt="${tech.name}" class="tech-icon" onerror="this.style.display='none'">` : ''}
                ${tech.name}
            </span>`
        ).join('');

        // description이 배열인 경우 문자열로 합치기
        const description = Array.isArray(project.description) 
            ? project.description.join('') 
            : project.description;

        const detailsButton = project.hasDetails ? 
            `<button class="details-toggle" onclick="toggleDetails('${project.id}')">
                VIEW TECHNICAL DETAILS
            </button>` : '';

        const detailsContent = project.hasDetails ? 
            `<div class="details-content" id="${project.id}">
                ${Array.isArray(project.detailsContent) 
                    ? project.detailsContent.join('\n') 
                    : project.detailsContent}
            </div>` : '';

        return `
            <div class="project-card">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-meta">
                    ${metaItems}
                </div>
                <div class="project-description">
                    ${description}
                </div>
                <div class="tech-tags">
                    ${techTags}
                </div>
                ${detailsButton}
                ${detailsContent}
            </div>
        `;
    }

    /**
     * 스킬 섹션 생성
     * @param {Object} config - 스킬 설정
     * @returns {HTMLElement} 생성된 스킬 섹션
     */
    createSkillsSection(config) {
        const section = document.createElement('div');
        section.className = 'section';
        
        const skillCategories = config.categories.map(category => {
            const skillItems = category.skills.map(skill => `
                <div class="skill-item">
                    <span>${skill.name}</span>
                    <div class="skill-level">
                        <div class="skill-fill" data-width="${skill.level}%"></div>
                    </div>
                </div>
            `).join('');

            return `
                <div class="skill-category">
                    <h3>${category.title}</h3>
                    ${skillItems}
                </div>
            `;
        }).join('');

        section.innerHTML = `
            <div class="section-header">
                <div class="inventory-icon"></div>
                <span>${config.title}</span>
            </div>
            <div class="section-content">
                <div class="skills-grid">
                    ${skillCategories}
                </div>
            </div>
        `;

        return section;
    }

    /**
     * 미디어 갤러리 섹션 생성
     * @param {Object} config - 미디어 설정
     * @returns {HTMLElement} 생성된 미디어 섹션
     */
    createMediaSection(config) {
        const section = document.createElement('div');
        section.className = 'section';
        
        const mediaItems = config.items.map(item => {
            if (item.type === 'image') {
                return `
                    <div class="media-item">
                        <img src="${item.src}" 
                             alt="${item.alt}"
                             onclick="openImageModal(this)"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <div class="image-fallback screenshot-placeholder" style="display: none;">
                            ${item.fallback}
                        </div>
                        <p class="media-caption">${item.caption}</p>
                    </div>
                `;
            } else if (item.type === 'video') {
                return `
                    <div class="media-item video-container">
                        <video controls poster="${item.poster}"
                               onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                            ${item.sources.map(src => `<source src="${src.url}" type="${src.type}">`).join('')}
                            Your browser does not support the video tag.
                        </video>
                        <div class="image-fallback screenshot-placeholder" style="display: none;">
                            ${item.fallback}
                        </div>
                        <p class="media-caption">${item.caption}</p>
                    </div>
                `;
            }
        }).join('');

        section.innerHTML = `
            <div class="section-header">
                <div class="inventory-icon"></div>
                <span>${config.title}</span>
            </div>
            <div class="section-content">
                <div class="media-gallery">
                    ${mediaItems}
                </div>
            </div>
        `;

        return section;
    }

    /**
     * 코드 블록 섹션 생성
     * @param {Object} config - 코드 설정
     * @returns {HTMLElement} 생성된 코드 섹션
     */
    createCodeSection(config) {
        const section = document.createElement('div');
        let content = Array.isArray(config.content) 
            ? config.content.join('') 
            : config.content;
        
        // URL과 code-line을 링크로 변환
        // handleCodeLineClick 함수 참조(url)
        content = this.processLinksInContent(content);
        
        section.className = 'section';
        
        section.innerHTML = `
            <div class="section-header">
                <div class="inventory-icon"></div>
                <span>${config.title}</span>
            </div>
            <div class="section-content">
                <div class="code-block">
                    ${content}
                </div>
            </div>
        `;

        return section;
    }

    /**
     * content에서 URL과 code-line을 클릭 가능한 링크로 변환
     * @param {string} content - 원본 content
     * @returns {string} 링크가 추가된 content
     */
    processLinksInContent(content) {
        // GitHub URL을 클릭 가능한 링크로 변환
        content = content.replace(
            /(github\.com\/[^\s<]+)/g, 
            '<a href="https://$1" target="_blank" rel="noopener noreferrer" style="color: #64B5F6; text-decoration: underline; cursor: pointer;">$1</a>'
        );

        // code-line 요소들을 클릭 가능한 링크로 변환
        content = content.replace(
            /<div class="code-line">([^<]+)<\/div>/g,
            '<div class="code-line clickable-code-line" onclick="handleCodeLineClick(\'$1\')" style="cursor: pointer; transition: background-color 0.2s ease;" onmouseover="this.style.backgroundColor=\'rgba(100, 181, 246, 0.1)\'" onmouseout="this.style.backgroundColor=\'transparent\'">$1</div>'
        );

        return content;
    }

    /**
     * 컨테이너에 섹션 추가
     * @param {string} containerId - 컨테이너 ID
     * @param {HTMLElement} section - 추가할 섹션
     */
    appendToContainer(containerId, section) {
        const container = document.getElementById(containerId) || document.querySelector('.container');
        if (container) {
            container.appendChild(section);
            
            // 애니메이션 초기화
            if (typeof initScrollAnimations === 'function') {
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 100);
            }
        }
    }

    /**
     * JSON 설정에서 섹션 생성
     * @param {Object} config - 섹션 설정
     * @returns {HTMLElement} 생성된 섹션
     */
    createFromConfig(config) {
        switch (config.type) {
            case 'basic':
                return this.createBasicSection(config);
            case 'project':
                return this.createProjectSection(config);
            case 'skills':
                return this.createSkillsSection(config);
            case 'media':
                return this.createMediaSection(config);
            case 'code':
                return this.createCodeSection(config);
            default:
                console.warn(`Unknown section type: ${config.type}`);
                return this.createBasicSection(config);
        }
    }
}

// 전역 인스턴스 생성
window.SectionManager = new SectionTemplateManager();

// 사용 예제 함수들
window.SectionHelpers = {
    /**
     * 새 프로젝트 추가
     * @param {Object} projectData - 프로젝트 데이터
     */
    addProject: function(projectData) {
        const section = window.SectionManager.createProjectSection(projectData);
        window.SectionManager.appendToContainer('main-container', section);
    },

    /**
     * 새 스킬 섹션 추가
     * @param {Object} skillsData - 스킬 데이터
     */
    addSkills: function(skillsData) {
        const section = window.SectionManager.createSkillsSection(skillsData);
        window.SectionManager.appendToContainer('main-container', section);
    },

    /**
     * 기본 섹션 추가
     * @param {string} title - 제목
     * @param {string} content - 내용
     */
    addBasicSection: function(title, content) {
        const section = window.SectionManager.createBasicSection({ title, content });
        window.SectionManager.appendToContainer('main-container', section);
    }
};

// code-line 클릭 핸들러 전역 함수
window.handleCodeLineClick = function(codeLineText) {
    // GitHub 레포지토리 URL 매핑
    const codeLineUrls = {
        'LAST SURVIVOR': 'https://github.com/adf789/Last_Survivor',
        'RUNE MUSIC': 'https://github.com/adf789/RuneMusic',
        'TOY PARTY': 'https://github.com/adf789/ToyParty',
        'TIMELESS SCRIPT': 'https://github.com/adf789/TimelessScript',
        'PORTFOLIOE': 'https://github.com/adf789/PortfolioE'
    };

    const url = codeLineUrls[codeLineText];
    if (url) {
        // 새 탭에서 GitHub 링크 열기
        window.open(url, '_blank', 'noopener,noreferrer');
    } else {
        // URL 매핑이 없는 경우 메인 레포지토리로 이동
        window.open('https://github.com/adf789', '_blank', 'noopener,noreferrer');
    }
    
    // 클릭 피드백 효과
    if (window.Event && window.Event.target) {
        window.Event.target.style.backgroundColor = 'rgba(100, 181, 246, 0.3)';
        setTimeout(() => {
            window.Event.target.style.backgroundColor = 'transparent';
        }, 200);
    }
};

console.log('🧩 Section Template System loaded successfully!');