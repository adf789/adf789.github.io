// ==========================================================================
// Main Application Entry Point - Legacy compatibility mode
// ==========================================================================

/**
 * Main Application Controller - Non-module version for compatibility
 */
class PortfolioApp {
    constructor() {
        this.modules = {};
        this.isInitialized = false;
        this.initStartTime = performance.now();
        
        this.init();
    }

    /**
     * 애플리케이션 초기화
     */
    init() {
        console.log('🚀 Portfolio App initializing (legacy mode)...');
        
        try {
            // DOM 준비 대기
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.waitForModules());
            } else {
                this.waitForModules();
            }
        } catch (error) {
            console.error('❌ App initialization failed:', error);
            this.handleInitError(error);
        }
    }

    /**
     * 모듈 로드 대기
     */
    async waitForModules() {
        console.log('⏳ Waiting for modules to load...');
        
        const moduleNames = [
            'CareerManager', 'UIInteractions', 'AnimationManager', 
            'MediaManager', 'PerformanceMonitor', 'ContentGenerator', 'SectionSystem'
        ];

        let attempts = 0;
        const maxAttempts = 50; // 5초 대기

        const checkModules = () => {
            const loadedModules = moduleNames.filter(name => window[name]);
            console.log(`📊 Modules loaded: ${loadedModules.length}/${moduleNames.length}`);

            if (loadedModules.length === moduleNames.length) {
                this.finalizeInitialization();
                return;
            }

            attempts++;
            if (attempts >= maxAttempts) {
                console.warn('⚠️ Not all modules loaded, proceeding anyway...');
                this.finalizeInitialization();
                return;
            }

            setTimeout(checkModules, 100);
        };

        checkModules();
    }

    /**
     * 초기화 완료 처리
     */
    finalizeInitialization() {
        const initTime = performance.now() - this.initStartTime;
        
        // 로드된 모듈들 등록
        const moduleNames = [
            'CareerManager', 'UIInteractions', 'AnimationManager', 
            'MediaManager', 'PerformanceMonitor', 'ContentGenerator', 'SectionSystem'
        ];

        moduleNames.forEach(name => {
            if (window[name]) {
                this.modules[name] = window[name];
            }
        });

        this.isInitialized = true;
        
        // 성능 측정
        if (window.PerformanceMonitor) {
            window.PerformanceMonitor.markTiming('app-init-complete');
        }

        // 초기화 완료 로그
        console.log(`🎉 Portfolio App initialized in ${initTime.toFixed(2)}ms`);
        console.log('📊 Loaded modules:', Object.keys(this.modules));

        // 개발 도구 노출
        window.portfolioApp = this;
        window.debugModules = () => {
            console.log('🔍 Module Status:');
            Object.keys(this.modules).forEach(name => {
                console.log(`  ${name}:`, this.modules[name]);
            });
        };

        // 초기화 완료 이벤트
        document.dispatchEvent(new CustomEvent('portfolio-app-ready', {
            detail: { 
                modules: this.modules,
                initTime: initTime
            }
        }));
    }

    /**
     * 초기화 오류 처리
     */
    handleInitError(error) {
        console.error('💥 Critical initialization error:', error);
        
        // 에러 메시지 표시
        const container = document.querySelector('.container');
        if (container) {
            const errorDiv = document.createElement('div');
            errorDiv.innerHTML = `
                <div style="text-align: center; padding: 50px; color: #d32f2f; background: #ffebee; border-radius: 8px; margin: 20px;">
                    <h3>🚨 애플리케이션 초기화 실패</h3>
                    <p>시스템을 시작할 수 없습니다. 페이지를 새로고침하거나 개발자에게 문의하세요.</p>
                    <button onclick="location.reload()" style="padding: 10px 20px; background: #d32f2f; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                        🔄 페이지 새로고침
                    </button>
                </div>
            `;
            container.appendChild(errorDiv);
        }
    }

    /**
     * 애플리케이션 상태 확인
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            modules: Object.keys(this.modules),
            moduleCount: Object.keys(this.modules).length,
            performance: window.PerformanceMonitor ? window.PerformanceMonitor.generateReport() : null
        };
    }
}

// 애플리케이션 시작
const app = new PortfolioApp();

// 추가적인 폴백 시스템 - 5초 후에도 섹션이 없으면 강제 로드
setTimeout(() => {
    const sections = document.querySelectorAll('.section');
    const loadingMessage = document.getElementById('loading-message');
    
    if (sections.length === 0 && loadingMessage) {
        console.log('🆘 Emergency fallback: forcing simple sections');
        if (window.loadSimpleSections) {
            window.loadSimpleSections();
        } else {
            // 최종 폴백
            loadingMessage.innerHTML = `
                <div style="text-align: center; padding: 50px;">
                    <h3>⚠️ 콘텐츠 로딩 중 문제가 발생했습니다</h3>
                    <p>페이지를 새로고침해주세요</p>
                    <button onclick="location.reload()" style="padding: 10px 20px; background: #1976D2; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        🔄 새로고침
                    </button>
                </div>
            `;
        }
    }
}, 5000);

console.log('🎮 Main application loaded successfully!');