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
        // localhost에서는 더 긴 대기 시간 제공
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const maxAttempts = isLocalhost ? 100 : 50; // localhost: 10초, 그 외: 5초 대기
        
        console.log(`🌐 Environment: ${isLocalhost ? 'localhost' : 'production'} (max attempts: ${maxAttempts})`);

        const checkModules = () => {
            const loadedModules = moduleNames.filter(name => window[name]);
            const missingModules = moduleNames.filter(name => !window[name]);
            
            console.log(`📊 Modules loaded: ${loadedModules.length}/${moduleNames.length}`);
            
            // 디버깅: 누락된 모듈 표시
            if (missingModules.length > 0) {
                console.log('❌ Missing modules:', missingModules);
            }

            if (loadedModules.length === moduleNames.length) {
                console.log('✅ All modules loaded successfully!');
                this.finalizeInitialization();
                return;
            }

            attempts++;
            if (attempts >= maxAttempts) {
                console.warn('⚠️ Not all modules loaded, proceeding anyway...');
                console.warn('📋 Final status - Loaded:', loadedModules);
                console.warn('📋 Final status - Missing:', missingModules);
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

// 폴백 시스템 제거됨 - 1차 시도만 사용
console.log('📋 Fallback system disabled - using primary loader only');

console.log('🎮 Main application loaded successfully!');