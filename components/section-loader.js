// ==========================================================================
// 섹션 로더 - JSON 데이터로부터 섹션 동적 생성
// ==========================================================================

/**
 * 섹션 로더 클래스
 */
class SectionLoader {
    constructor() {
        this.sectionsData = null;
        this.loadedSections = [];
    }

    /**
     * JSON 데이터 로드
     * @param {string} dataPath - JSON 파일 경로
     * @returns {Promise} 로딩 Promise
     */
    async loadSectionsData(dataPath = 'data/sections-data.json') {
        try {
            const response = await fetch(dataPath);
            if (!response.ok) {
                throw new Error(`Failed to load sections data: ${response.status}`);
            }
            this.sectionsData = await response.json();
            console.log('📊 Sections data loaded successfully');
            return this.sectionsData;
        } catch (error) {
            console.error('❌ Failed to load sections data:', error);
            // 폴백 데이터 사용
            this.sectionsData = this.getFallbackData();
            return this.sectionsData;
        }
    }

    /**
     * 폴백 데이터 (JSON 로딩 실패 시)
     */
    getFallbackData() {
        return {
            sections: [],
            projectTemplates: {}
        };
    }

    /**
     * 모든 섹션 렌더링
     * @param {string} containerId - 컨테이너 ID
     */
    async renderAllSections(containerId = 'main-container') {
        if (!this.sectionsData) {
            await this.loadSectionsData();
        }

        const container = document.getElementById(containerId) || document.querySelector('.container');
        if (!container) {
            console.error('Container not found:', containerId);
            return;
        }

        // 기존 섹션들 제거 (헤더 제외)
        const existingSections = container.querySelectorAll('.section');
        existingSections.forEach(section => section.remove());

        // 새 섹션들 렌더링
        this.sectionsData.sections.forEach((sectionConfig, index) => {
            setTimeout(() => {
                this.renderSection(sectionConfig, containerId);
            }, index * 100); // 순차적 애니메이션
        });
    }

    /**
     * 개별 섹션 렌더링
     * @param {Object} sectionConfig - 섹션 설정
     * @param {string} containerId - 컨테이너 ID
     */
    renderSection(sectionConfig, containerId = 'main-container') {
        if (!window.SectionManager) {
            console.error('SectionManager not found. Please load section-templates.js first.');
            return;
        }

        const section = window.SectionManager.createFromConfig(sectionConfig);
        window.SectionManager.appendToContainer(containerId, section);
        
        this.loadedSections.push({
            config: sectionConfig,
            element: section
        });

        console.log(`✅ Section rendered: ${sectionConfig.title || sectionConfig.type}`);
    }

    /**
     * 새 프로젝트 추가
     * @param {Object} projectData - 프로젝트 데이터
     * @param {string} templateType - 템플릿 타입 (선택사항)
     */
    addNewProject(projectData, templateType = null) {
        let config = { ...projectData };
        
        // 템플릿 사용
        if (templateType && this.sectionsData.projectTemplates[templateType]) {
            const template = this.sectionsData.projectTemplates[templateType];
            config = { ...template, ...projectData };
        }

        // 고유 ID 생성
        if (!config.id) {
            config.id = `project_${Date.now()}`;
        }

        // 섹션 렌더링
        this.renderSection(config);
        
        // 데이터에 추가
        this.sectionsData.sections.push(config);
        
        console.log(`🆕 New project added: ${config.title}`);
    }

    /**
     * 섹션 제거
     * @param {string} sectionId - 제거할 섹션 ID
     */
    removeSection(sectionId) {
        const sectionIndex = this.loadedSections.findIndex(
            section => section.config.id === sectionId
        );
        
        if (sectionIndex !== -1) {
            const section = this.loadedSections[sectionIndex];
            section.element.remove();
            this.loadedSections.splice(sectionIndex, 1);
            
            // 데이터에서도 제거
            const dataIndex = this.sectionsData.sections.findIndex(
                s => s.id === sectionId
            );
            if (dataIndex !== -1) {
                this.sectionsData.sections.splice(dataIndex, 1);
            }
            
            console.log(`🗑️ Section removed: ${sectionId}`);
        }
    }

    /**
     * 섹션 순서 변경
     * @param {string} sectionId - 이동할 섹션 ID
     * @param {number} newIndex - 새 위치 인덱스
     */
    reorderSection(sectionId, newIndex) {
        const sectionIndex = this.loadedSections.findIndex(
            section => section.config.id === sectionId
        );
        
        if (sectionIndex !== -1 && newIndex >= 0 && newIndex < this.loadedSections.length) {
            const section = this.loadedSections[sectionIndex];
            const container = section.element.parentNode;
            
            // DOM에서 이동
            const targetSection = this.loadedSections[newIndex].element;
            container.insertBefore(section.element, targetSection);
            
            // 배열에서 이동
            this.loadedSections.splice(sectionIndex, 1);
            this.loadedSections.splice(newIndex, 0, section);
            
            console.log(`🔄 Section reordered: ${sectionId} to position ${newIndex}`);
        }
    }

    /**
     * 섹션 데이터 업데이트
     * @param {string} sectionId - 업데이트할 섹션 ID
     * @param {Object} newData - 새 데이터
     */
    updateSection(sectionId, newData) {
        const sectionIndex = this.loadedSections.findIndex(
            section => section.config.id === sectionId
        );
        
        if (sectionIndex !== -1) {
            const section = this.loadedSections[sectionIndex];
            const updatedConfig = { ...section.config, ...newData };
            
            // 기존 엘리먼트 제거
            section.element.remove();
            
            // 새 엘리먼트 생성 및 삽입
            const newElement = window.SectionManager.createFromConfig(updatedConfig);
            const container = document.querySelector('.container');
            
            if (sectionIndex < this.loadedSections.length - 1) {
                const nextSection = this.loadedSections[sectionIndex + 1].element;
                container.insertBefore(newElement, nextSection);
            } else {
                container.appendChild(newElement);
            }
            
            // 데이터 업데이트
            this.loadedSections[sectionIndex] = {
                config: updatedConfig,
                element: newElement
            };
            
            console.log(`📝 Section updated: ${sectionId}`);
        }
    }

    /**
     * 현재 섹션 데이터를 JSON으로 내보내기
     * @returns {string} JSON 문자열
     */
    exportSectionsData() {
        const exportData = {
            sections: this.loadedSections.map(section => section.config),
            projectTemplates: this.sectionsData.projectTemplates,
            exportDate: new Date().toISOString()
        };
        
        return JSON.stringify(exportData, null, 2);
    }

    /**
     * 섹션 데이터 가져오기
     * @returns {Object} 현재 섹션 데이터
     */
    getSectionsData() {
        return this.sectionsData;
    }

    /**
     * 로드된 섹션 목록 가져오기
     * @returns {Array} 로드된 섹션 배열
     */
    getLoadedSections() {
        return this.loadedSections;
    }
}

// 전역 인스턴스 생성
window.SectionLoader = new SectionLoader();

// 편의 함수들
window.SectionUtils = {
    /**
     * 빠른 프로젝트 추가
     * @param {string} title - 프로젝트 제목
     * @param {string} description - 프로젝트 설명
     * @param {Array} techTags - 기술 태그 배열
     */
    quickAddProject: function(title, description, techTags = []) {
        const projectData = {
            type: 'project',
            id: `project_${Date.now()}`,
            title: title,
            description: description,
            techTags: techTags.map(tech => ({ name: tech })),
            meta: ['🆕 NEW PROJECT'],
            hasDetails: false
        };
        
        window.SectionLoader.addNewProject(projectData);
    },

    /**
     * 빠른 섹션 추가
     * @param {string} title - 섹션 제목
     * @param {string} content - 섹션 내용
     */
    quickAddSection: function(title, content) {
        const sectionData = {
            type: 'basic',
            id: `section_${Date.now()}`,
            title: title,
            content: content
        };
        
        window.SectionLoader.renderSection(sectionData);
    },

    /**
     * 데이터 다운로드
     */
    downloadData: function() {
        const data = window.SectionLoader.exportSectionsData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `portfolio-sections-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        console.log('📥 Sections data downloaded');
    }
};

// 즉시 섹션 로딩 시도
(async function immediateLoad() {
    console.log('🚀 Starting immediate section loading...');
    
    // DOM 준비 확인
    const waitForDOM = () => {
        return new Promise(resolve => {
            if (document.readyState !== 'loading') {
                resolve();
            } else {
                document.addEventListener('DOMContentLoaded', resolve);
            }
        });
    };
    
    try {
        await waitForDOM();
        
        // SectionManager 준비 대기 (최대 2초)
        let managerReady = false;
        for (let i = 0; i < 20; i++) {
            if (window.SectionManager) {
                managerReady = true;
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        if (managerReady) {
            const loaded = await window.SectionLoader.loadSections();
            if (loaded && loaded.length > 0) {
                console.log(`✅ Advanced sections loaded: ${loaded.length} sections`);
            }
        } else {
            console.warn('⚠️ SectionManager not ready, letting fallback handle it');
        }
    } catch (error) {
        console.warn('⚠️ Advanced loading failed, fallback will handle:', error);
    }
})();

console.log('📂 Section Loader system loaded successfully!');