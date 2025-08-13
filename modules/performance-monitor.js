// ==========================================================================
// Performance Monitor Module - 성능 모니터링 및 최적화
// ==========================================================================

export class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: [],
            memory: [],
            timing: {},
            errors: []
        };
        this.isMonitoring = false;
        this.monitoringInterval = null;
        this.frameCount = 0;
        this.lastFrameTime = performance.now();
        this.lowPerformanceThreshold = 30; // FPS
        this.memoryWarningThreshold = 50; // MB
        
        this.init();
    }

    /**
     * 초기화
     */
    init() {
        this.detectDeviceCapabilities();
        this.startMonitoring();
        this.setupPerformanceObserver();
        this.monitorMemoryUsage();
    }

    /**
     * 디바이스 성능 감지
     */
    detectDeviceCapabilities() {
        const capabilities = {
            memory: navigator.deviceMemory || 4,
            cores: navigator.hardwareConcurrency || 4,
            connection: this.getConnectionInfo(),
            gpu: this.getGPUInfo(),
            screen: {
                width: screen.width,
                height: screen.height,
                pixelRatio: window.devicePixelRatio || 1
            }
        };

        // 성능 점수 계산
        const performanceScore = this.calculatePerformanceScore(capabilities);
        
        this.deviceCapabilities = capabilities;
        this.performanceScore = performanceScore;
        
        console.log('🔍 Device Capabilities:', capabilities);
        console.log('📊 Performance Score:', performanceScore);
        
        return capabilities;
    }

    /**
     * 연결 정보 가져오기
     */
    getConnectionInfo() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (!connection) return { effectiveType: 'unknown', downlink: 0 };
        
        return {
            effectiveType: connection.effectiveType,
            downlink: connection.downlink,
            rtt: connection.rtt,
            saveData: connection.saveData
        };
    }

    /**
     * GPU 정보 가져오기
     */
    getGPUInfo() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) return { renderer: 'unknown', vendor: 'unknown' };
        
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (!debugInfo) return { renderer: 'webgl', vendor: 'unknown' };
        
        return {
            renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
            vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
        };
    }

    /**
     * 성능 점수 계산
     * @param {Object} capabilities - 디바이스 성능 정보
     * @returns {number} 성능 점수 (0-100)
     */
    calculatePerformanceScore(capabilities) {
        let score = 50; // 기본 점수
        
        // 메모리 점수 (0-25점)
        if (capabilities.memory >= 8) score += 25;
        else if (capabilities.memory >= 4) score += 15;
        else if (capabilities.memory >= 2) score += 5;
        else score -= 10;
        
        // CPU 점수 (0-20점)
        if (capabilities.cores >= 8) score += 20;
        else if (capabilities.cores >= 4) score += 15;
        else if (capabilities.cores >= 2) score += 10;
        else score += 5;
        
        // 네트워크 점수 (0-15점)
        const connectionType = capabilities.connection.effectiveType;
        if (connectionType === '4g') score += 15;
        else if (connectionType === '3g') score += 10;
        else if (connectionType === '2g') score += 5;
        else score += 0;
        
        // 화면 해상도 점수 (0-10점)
        const totalPixels = capabilities.screen.width * capabilities.screen.height;
        if (totalPixels >= 2073600) score += 10; // 1920x1080 이상
        else if (totalPixels >= 921600) score += 7;  // 1280x720 이상
        else if (totalPixels >= 480000) score += 5;  // 800x600 이상
        else score += 3;
        
        return Math.max(0, Math.min(100, score));
    }

    /**
     * 성능 모니터링 시작
     */
    startMonitoring() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        this.startFPSMonitoring();
        this.startTimingMeasurement();
        
        // 5초마다 메트릭 수집
        this.monitoringInterval = setInterval(() => {
            this.collectMetrics();
        }, 5000);
        
        console.log('📈 Performance monitoring started');
    }

    /**
     * FPS 모니터링 시작
     */
    startFPSMonitoring() {
        const measureFPS = (timestamp) => {
            this.frameCount++;
            
            if (timestamp - this.lastFrameTime >= 1000) {
                const fps = Math.round((this.frameCount * 1000) / (timestamp - this.lastFrameTime));
                this.metrics.fps.push({
                    timestamp: Date.now(),
                    value: fps
                });
                
                // FPS 히스토리 제한 (최근 60개)
                if (this.metrics.fps.length > 60) {
                    this.metrics.fps.shift();
                }
                
                // 저성능 감지
                if (fps < this.lowPerformanceThreshold) {
                    this.handleLowPerformance(fps);
                }
                
                this.frameCount = 0;
                this.lastFrameTime = timestamp;
            }
            
            if (this.isMonitoring) {
                requestAnimationFrame(measureFPS);
            }
        };
        
        requestAnimationFrame(measureFPS);
    }

    /**
     * 타이밍 측정 시작
     */
    startTimingMeasurement() {
        // Page Load 시간 측정
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.metrics.timing.pageLoad = loadTime;
            
            // Navigation Timing API 사용
            if (performance.getEntriesByType) {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    this.metrics.timing.navigation = {
                        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
                        tcp: navigation.connectEnd - navigation.connectStart,
                        request: navigation.responseEnd - navigation.requestStart,
                        response: navigation.responseEnd - navigation.responseStart,
                        dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                        load: navigation.loadEventEnd - navigation.loadEventStart
                    };
                }
            }
        });

        // 커스텀 타이밍 측정
        this.markTiming('app-init-start');
    }

    /**
     * Performance Observer 설정
     */
    setupPerformanceObserver() {
        if (!('PerformanceObserver' in window)) return;

        // Long Task 감지
        try {
            const longTaskObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.duration > 50) { // 50ms 이상의 긴 작업
                        console.warn(`🐌 Long task detected: ${entry.duration.toFixed(2)}ms`);
                        this.metrics.errors.push({
                            type: 'long-task',
                            duration: entry.duration,
                            timestamp: Date.now()
                        });
                    }
                });
            });
            longTaskObserver.observe({ entryTypes: ['longtask'] });
        } catch (e) {
            console.log('Long task monitoring not supported');
        }

        // Layout Shift 감지
        try {
            const clsObserver = new PerformanceObserver((list) => {
                let clsValue = 0;
                list.getEntries().forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                
                if (clsValue > 0.1) { // CLS 임계값
                    console.warn(`📐 Layout shift detected: ${clsValue.toFixed(4)}`);
                }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
            console.log('Layout shift monitoring not supported');
        }
    }

    /**
     * 메모리 사용량 모니터링
     */
    monitorMemoryUsage() {
        if (!('memory' in performance)) {
            console.log('Memory monitoring not supported');
            return;
        }

        setInterval(() => {
            const memory = performance.memory;
            const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
            const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
            const limitMB = Math.round(memory.jsHeapSizeLimit / 1048576);
            
            this.metrics.memory.push({
                timestamp: Date.now(),
                used: usedMB,
                total: totalMB,
                limit: limitMB
            });
            
            // 메모리 히스토리 제한
            if (this.metrics.memory.length > 60) {
                this.metrics.memory.shift();
            }
            
            // 메모리 경고
            if (usedMB > this.memoryWarningThreshold) {
                console.warn(`💾 High memory usage: ${usedMB}MB`);
            }
            
        }, 10000); // 10초마다
    }

    /**
     * 메트릭 수집
     */
    collectMetrics() {
        const currentMetrics = {
            timestamp: Date.now(),
            fps: this.getCurrentFPS(),
            memory: this.getCurrentMemory(),
            performance: this.performanceScore,
            errors: this.metrics.errors.length
        };
        
        // 성능 데이터 로깅 (개발 모드에서만)
        if (process?.env?.NODE_ENV === 'development') {
            console.log('📊 Performance Metrics:', currentMetrics);
        }
        
        return currentMetrics;
    }

    /**
     * 현재 FPS 가져오기
     */
    getCurrentFPS() {
        const recentFPS = this.metrics.fps.slice(-5); // 최근 5개
        if (recentFPS.length === 0) return 0;
        
        const average = recentFPS.reduce((sum, item) => sum + item.value, 0) / recentFPS.length;
        return Math.round(average);
    }

    /**
     * 현재 메모리 사용량 가져오기
     */
    getCurrentMemory() {
        if (this.metrics.memory.length === 0) return null;
        return this.metrics.memory[this.metrics.memory.length - 1];
    }

    /**
     * 저성능 처리
     * @param {number} fps - 현재 FPS
     */
    handleLowPerformance(fps) {
        console.warn(`⚠️ Low performance detected: ${fps} FPS`);
        
        // 애니메이션 최적화
        if (window.AnimationManager) {
            window.AnimationManager.isLowPerformanceDevice = true;
            window.AnimationManager.setupPerformanceOptimizations();
        }
        
        // 이미지 로딩 최적화
        if (window.MediaManager) {
            // 미디어 로딩 지연
        }
        
        // 성능 모드 알림
        if (window.UIInteractions) {
            window.UIInteractions.showNotification(
                '성능 최적화 모드가 활성화되었습니다', 
                'warning'
            );
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
     * 타이밍 측정
     * @param {string} name - 측정 이름
     * @param {string} startMark - 시작 마크
     * @param {string} endMark - 종료 마크
     */
    measureTiming(name, startMark, endMark) {
        if ('performance' in window && performance.measure) {
            try {
                performance.measure(name, startMark, endMark);
                const measure = performance.getEntriesByName(name)[0];
                this.metrics.timing[name] = measure.duration;
                console.log(`⏱️ ${name}: ${measure.duration.toFixed(2)}ms`);
            } catch (e) {
                console.warn(`Failed to measure ${name}:`, e);
            }
        }
    }

    /**
     * 성능 보고서 생성
     * @returns {Object} 성능 보고서
     */
    generateReport() {
        const report = {
            device: this.deviceCapabilities,
            performanceScore: this.performanceScore,
            metrics: {
                averageFPS: this.getCurrentFPS(),
                currentMemory: this.getCurrentMemory(),
                timing: this.metrics.timing,
                errorCount: this.metrics.errors.length
            },
            recommendations: this.generateRecommendations()
        };
        
        return report;
    }

    /**
     * 성능 개선 권장사항 생성
     * @returns {Array} 권장사항 목록
     */
    generateRecommendations() {
        const recommendations = [];
        const currentFPS = this.getCurrentFPS();
        const currentMemory = this.getCurrentMemory();
        
        if (currentFPS < 30) {
            recommendations.push('애니메이션 효과를 줄여서 성능을 개선할 수 있습니다');
        }
        
        if (currentMemory && currentMemory.used > 50) {
            recommendations.push('메모리 사용량이 높습니다. 브라우저를 새로고침해보세요');
        }
        
        if (this.metrics.errors.length > 5) {
            recommendations.push('성능 이슈가 감지되었습니다. 개발자에게 문의하세요');
        }
        
        return recommendations;
    }

    /**
     * 모니터링 중지
     */
    stopMonitoring() {
        this.isMonitoring = false;
        
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
            this.monitoringInterval = null;
        }
        
        console.log('📈 Performance monitoring stopped');
    }

    /**
     * 디바이스 최적화 설정 적용
     */
    optimizeForDevice() {
        const score = this.performanceScore;
        
        if (score < 40) {
            // 저성능 디바이스
            document.documentElement.classList.add('low-performance');
            console.log('🔧 Low performance optimizations applied');
        } else if (score > 80) {
            // 고성능 디바이스
            document.documentElement.classList.add('high-performance');
            console.log('🚀 High performance features enabled');
        }
        
        return score;
    }
}

// 전역 인스턴스 생성
window.PerformanceMonitor = new PerformanceMonitor();

// 전역 함수로 노출 (기존 코드 호환성)
window.optimizeAnimationsForDevice = () => window.PerformanceMonitor.optimizeForDevice();
window.detectLowPerformanceDevice = () => window.PerformanceMonitor.performanceScore < 40;
window.monitorPerformance = () => window.PerformanceMonitor.startMonitoring();

console.log('📊 Performance Monitor loaded successfully!');