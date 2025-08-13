// ==========================================================================
// Section System Module - 섹션 시스템 통합 관리
// ==========================================================================

export class SectionSystem {
    constructor() {
        this.isInitialized = false;
        this.fallbackMode = false;
        this.loadingTimeout = null;
        this.retryCount = 0;
        this.maxRetries = 3;
        
        this.init();
    }

    /**
     * 초기화
     */
    init() {
        this.markTiming('section-system-init-start');
        this.initializeSectionSystem();
    }

    /**
     * 섹션 시스템 초기화
     */
    async initializeSectionSystem() {
        console.log('🏗️ Initializing section system...');
        
        // 로딩 타임아웃 설정 (10초)
        this.loadingTimeout = setTimeout(() => {
            console.warn('⚠️ Section loading timeout, switching to fallback');
            this.loadFallbackSections();
        }, 10000);

        try {
            // 1단계: 고급 템플릿 시스템 시도
            if (await this.tryAdvancedSystem()) {
                this.clearLoadingTimeout();
                this.isInitialized = true;
                this.markTiming('section-system-init-end');
                console.log('✅ Advanced section system initialized successfully');
                return;
            }

            // 2단계: 단순 시스템 시도
            if (await this.trySimpleSystem()) {
                this.clearLoadingTimeout();
                this.isInitialized = true;
                this.markTiming('section-system-init-end');
                console.log('✅ Simple section system initialized successfully');
                return;
            }

            // 3단계: 하드코딩된 폴백
            throw new Error('All section systems failed');

        } catch (error) {
            console.error('❌ Section system initialization failed:', error);
            this.loadFallbackSections();
        }
    }

    /**
     * 고급 템플릿 시스템 시도
     * @returns {boolean} 성공 여부
     */
    async tryAdvancedSystem() {
        try {
            // SectionLoader와 SectionTemplateManager 확인
            if (!window.SectionManager || !window.SectionLoader) {
                console.log('🔄 Advanced components not ready, waiting...');
                return false;
            }

            // 섹션 데이터 로드 시도
            const loaded = await window.SectionLoader.loadSections();
            if (loaded && loaded.length > 0) {
                this.hideLoadingMessage();
                return true;
            }

            return false;
        } catch (error) {
            console.warn('Advanced system failed:', error);
            return false;
        }
    }

    /**
     * 단순 시스템 시도
     * @returns {boolean} 성공 여부
     */
    async trySimpleSystem() {
        try {
            // Simple sections 함수 확인
            if (typeof window.addSimpleSection !== 'function') {
                console.log('🔄 Simple section function not available');
                return false;
            }

            // 기본 섹션들 추가
            const basicSections = this.getBasicSections();
            
            for (const section of basicSections) {
                window.addSimpleSection(section.title, section.content);
            }

            this.hideLoadingMessage();
            return true;
        } catch (error) {
            console.warn('Simple system failed:', error);
            return false;
        }
    }

    /**
     * 폴백 섹션 로드
     */
    loadFallbackSections() {
        console.log('🆘 Loading fallback sections...');
        this.clearLoadingTimeout();
        this.fallbackMode = true;

        try {
            const fallbackSections = this.getFallbackSections();
            const container = document.querySelector('.container');
            
            if (container) {
                fallbackSections.forEach((section, index) => {
                    setTimeout(() => {
                        this.createFallbackSection(section, container);
                    }, index * 200);
                });
                
                this.hideLoadingMessage();
                this.isInitialized = true;
                console.log('✅ Fallback sections loaded');
            }
        } catch (error) {
            console.error('❌ Even fallback failed:', error);
            this.showErrorMessage();
        }
    }

    /**
     * 기본 섹션 데이터
     * @returns {Array} 기본 섹션 배열
     */
    getBasicSections() {
        return [
            {
                title: 'PLAYER PROFILE',
                content: `
                    <p style="font-size: 0.9em; line-height: 1.8; color: #424242;">
                        🏗️ <strong>BUILDING EXPERIENCE:</strong> 5년<br>
                        🎯 <strong>SPECIALIZATION:</strong> 게임 세계 구축 및 최적화<br>
                        ⚡ <strong>CORE SKILLS:</strong> Unity & Unreal Engine을 활용한 크로스 플랫폼 게임 개발<br><br>
                        
                        마인크래프트처럼 무한한 가능성을 가진 게임 세계를 만드는 것이 저의 목표입니다. 
                        한 블록 한 블록 쌓아 올리듯 안정적이고 확장 가능한 코드를 작성하며, 
                        플레이어들이 멋진 모험을 할 수 있는 게임을 만들어갑니다.
                    </p>
                `
            },
            {
                title: 'COMPLETED PROJECTS',
                content: `
                    <div class="project-card">
                        <h3 class="project-title">[COMPANY A] MOBILE RPG WORLD</h3>
                        <div class="project-meta">
                            <span class="meta-item">📱 MOBILE</span>
                            <span class="meta-item">👥 TEAM: 15</span>
                            <span class="meta-item">⏰ 18 MONTHS</span>
                            <span class="meta-item">📈 1M+ DOWNLOADS</span>
                        </div>
                        <div class="project-description">
                            <strong>ROLE:</strong> 메인 클라이언트 개발자 (UI 시스템, 전투 시스템)<br>
                            <strong>ACHIEVEMENTS:</strong>
                            <ul>
                                <li>🧱 Unity UGUI 기반 모듈형 UI 프레임워크 설계</li>
                                <li>⚡ 메모리 사용량 40% 절감을 위한 리소스 최적화</li>
                                <li>⚔️ 실시간 PvP 전투 시스템 네트워크 동기화</li>
                                <li>🚀 크로스 플랫폼 자동 빌드 파이프라인 구축</li>
                            </ul>
                        </div>
                        <div class="tech-tags">
                            <span class="tech-tag">UNITY 2021.3</span>
                            <span class="tech-tag">C#</span>
                            <span class="tech-tag">UGUI</span>
                            <span class="tech-tag">MIRROR NET</span>
                        </div>
                    </div>
                `
            }
        ];
    }

    /**
     * 폴백 섹션 데이터
     * @returns {Array} 폴백 섹션 배열
     */
    getFallbackSections() {
        return [
            {
                title: 'PLAYER PROFILE',
                content: `
                    <p style="font-size: 0.9em; line-height: 1.8; color: #424242;">
                        🎮 <strong>GAME DEVELOPER</strong> • 5년 경력<br>
                        🏗️ Unity & Unreal Engine 전문가<br>
                        ⚡ 모바일 게임 개발 및 최적화 전문<br><br>
                        게임 세계를 구축하고 플레이어에게 즐거움을 선사하는 것이 목표입니다.
                    </p>
                `,
                type: 'basic'
            },
            {
                title: 'CORE SKILLS',
                content: `
                    <div style="display: grid; gap: 15px;">
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <strong>🎮 Game Engines</strong><br>
                            Unity (5년), Unreal Engine (2년)
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <strong>💻 Programming</strong><br>
                            C# (전문), C++ (숙련), Python (기초)
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <strong>📱 Platforms</strong><br>
                            Mobile (iOS/Android), PC, Console
                        </div>
                    </div>
                `,
                type: 'basic'
            },
            {
                title: 'PROJECT EXPERIENCE',
                content: `
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                        <h4 style="margin: 0 0 10px 0; color: #1976D2;">모바일 RPG 게임</h4>
                        <p style="margin: 0; color: #666;">
                            📱 플랫폼: Mobile (iOS/Android)<br>
                            ⏰ 기간: 18개월<br>
                            👥 팀 규모: 15명<br>
                            📈 성과: 100만+ 다운로드
                        </p>
                    </div>
                `,
                type: 'basic'
            }
        ];
    }

    /**
     * 폴백 섹션 생성
     * @param {Object} sectionData - 섹션 데이터
     * @param {HTMLElement} container - 컨테이너 엘리먼트
     */
    createFallbackSection(sectionData, container) {
        const section = document.createElement('div');
        section.className = 'section';
        
        section.innerHTML = `
            <div class="section-header">
                <div class="inventory-icon"></div>
                <span>${sectionData.title}</span>
            </div>
            <div class="section-content">
                ${sectionData.content}
            </div>
        `;

        container.appendChild(section);

        // 애니메이션 효과
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        requestAnimationFrame(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }

    /**
     * 로딩 메시지 숨기기
     */
    hideLoadingMessage() {
        const loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            loadingMessage.style.transition = 'opacity 0.3s ease';
            loadingMessage.style.opacity = '0';
            
            setTimeout(() => {
                loadingMessage.style.display = 'none';
            }, 300);
        }
    }

    /**
     * 에러 메시지 표시
     */
    showErrorMessage() {
        const container = document.querySelector('.container');
        if (!container) return;

        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="text-align: center; padding: 50px; color: #666;">
                <div style="font-size: 3em; margin-bottom: 20px;">⚠️</div>
                <h3>섹션을 로드할 수 없습니다</h3>
                <p>페이지를 새로고침하거나 잠시 후 다시 시도해주세요.</p>
                <button onclick="location.reload()" style="padding: 10px 20px; background: #1976D2; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    🔄 새로고침
                </button>
            </div>
        `;

        const loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            loadingMessage.replaceWith(errorDiv);
        } else {
            container.appendChild(errorDiv);
        }
    }

    /**
     * 로딩 타임아웃 정리
     */
    clearLoadingTimeout() {
        if (this.loadingTimeout) {
            clearTimeout(this.loadingTimeout);
            this.loadingTimeout = null;
        }
    }

    /**
     * 타이밍 마크
     * @param {string} name - 마크 이름
     */
    markTiming(name) {
        if ('performance' in window && performance.mark) {
            performance.mark(name);
        }
    }

    /**
     * 시스템 상태 확인
     * @returns {Object} 상태 정보
     */
    getSystemStatus() {
        return {
            initialized: this.isInitialized,
            fallbackMode: this.fallbackMode,
            retryCount: this.retryCount,
            hasAdvancedSystem: !!(window.SectionManager && window.SectionLoader),
            hasSimpleSystem: typeof window.addSimpleSection === 'function'
        };
    }

    /**
     * 섹션 추가 (외부 API)
     * @param {string} title - 섹션 제목
     * @param {string} content - 섹션 내용
     */
    addSection(title, content) {
        if (window.addSimpleSection) {
            window.addSimpleSection(title, content);
        } else if (window.SectionHelpers) {
            window.SectionHelpers.addBasicSection(title, content);
        } else {
            // 폴백: 직접 DOM 조작
            const container = document.querySelector('.container');
            if (container) {
                this.createFallbackSection({ title, content }, container);
            }
        }
    }

    /**
     * 시스템 재시작
     */
    restart() {
        this.isInitialized = false;
        this.fallbackMode = false;
        this.retryCount = 0;
        this.clearLoadingTimeout();
        
        // 기존 섹션들 제거
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => section.remove());
        
        // 로딩 메시지 다시 표시
        const container = document.querySelector('.container');
        if (container) {
            const loadingMessage = document.createElement('div');
            loadingMessage.id = 'loading-message';
            loadingMessage.innerHTML = '🔄 섹션을 다시 로드하는 중...';
            loadingMessage.style.cssText = 'text-align: center; padding: 50px; color: #666;';
            container.appendChild(loadingMessage);
        }
        
        // 재초기화
        setTimeout(() => {
            this.initializeSectionSystem();
        }, 500);
    }
}

// 전역 인스턴스 생성
window.SectionSystem = new SectionSystem();

// 전역 함수로 노출 (기존 코드 호환성)
window.initializeSectionSystem = () => window.SectionSystem.initializeSectionSystem();
window.loadFallbackSections = () => window.SectionSystem.loadFallbackSections();

console.log('🏗️ Section System loaded successfully!');