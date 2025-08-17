// ==========================================================================
// UI Interactions Module - 사용자 인터페이션 및 모달 관리
// ==========================================================================

export class UIInteractions {
    constructor() {
        this.modal = document.getElementById('imageModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalCaption = document.getElementById('modalCaption');
        
        this.init();
    }

    /**
     * 초기화
     */
    init() {
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
    }

    /**
     * 이벤트 리스너 설정
     */
    setupEventListeners() {
        // ESC 키로 모달 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeImageModal();
            }
        });

        // 모달 외부 클릭시 닫기
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeImageModal();
                }
            });
        }
    }

    /**
     * 키보드 단축키 설정
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl + / 로 단축키 도움말 표시
            if (e.ctrlKey && e.key === '/') {
                e.preventDefault();
                this.showKeyboardShortcuts();
            }
        });
    }

    /**
     * 프로젝트 세부사항 토글
     * @param {string} projectId - 프로젝트 ID
     */
    toggleDetails(projectId) {
        const details = document.getElementById(projectId);
        if (!details) {
            console.warn(`Project details not found: ${projectId}`);
            return;
        }

        const isVisible = details.style.display === 'block';
        
        if (isVisible) {
            // 숨기기 애니메이션
            details.style.maxHeight = details.scrollHeight + 'px';
            details.style.overflow = 'hidden';
            details.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out';
            
            requestAnimationFrame(() => {
                details.style.maxHeight = '0px';
                details.style.opacity = '0';
            });

            setTimeout(() => {
                details.style.display = 'none';
                details.style.maxHeight = '';
                details.style.overflow = '';
                details.style.transition = '';
                details.style.opacity = '';
            }, 300);
        } else {
            // 보이기 애니메이션
            details.style.display = 'block';
            details.style.maxHeight = '0px';
            details.style.opacity = '0';
            details.style.overflow = 'hidden';
            details.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out';
            
            requestAnimationFrame(() => {
                details.style.maxHeight = details.scrollHeight + 'px';
                details.style.opacity = '1';
            });

            setTimeout(() => {
                details.style.maxHeight = '';
                details.style.overflow = '';
                details.style.transition = '';
            }, 300);
        }

        // 버튼 텍스트 업데이트
        const button = document.querySelector(`[onclick="toggleDetails('${projectId}')"]`);
        if (button) {
            button.textContent = isVisible ? 'VIEW TECHNICAL DETAILS' : 'HIDE TECHNICAL DETAILS';
        }
    }

    /**
     * 이미지 모달 열기
     * @param {HTMLImageElement} img - 이미지 엘리먼트
     */
    openImageModal(img) {
        if (!this.modal || !this.modalImage || !img) return;

        this.modalImage.src = img.src;
        this.modalImage.alt = img.alt;
        
        // 캡션 설정
        const caption = img.nextElementSibling;
        if (caption && caption.classList.contains('media-caption')) {
            this.modalCaption.textContent = caption.textContent;
        } else {
            this.modalCaption.textContent = img.alt || '';
        }

        // 모달 표시
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 스크롤 방지

        // 포커스 설정 (접근성)
        this.modal.focus();

        // 애니메이션
        this.modal.style.opacity = '0';
        requestAnimationFrame(() => {
            this.modal.style.transition = 'opacity 0.3s ease';
            this.modal.style.opacity = '1';
        });
    }

    /**
     * 이미지 모달 닫기
     */
    closeImageModal() {
        if (!this.modal) return;

        // 이미지 다시 표시
        if (this.modalImage) {
            this.modalImage.style.display = 'block';
        }

        // 애니메이션으로 닫기
        this.modal.style.transition = 'opacity 0.3s ease';
        this.modal.style.opacity = '0';

        setTimeout(() => {
            this.modal.style.display = 'none';
            document.body.style.overflow = ''; // 스크롤 복원
            this.modal.style.opacity = '';
            this.modal.style.transition = '';
        }, 300);
    }

    /**
     * 키보드 단축키 도움말 표시
     */
    showKeyboardShortcuts() {
        const shortcuts = `
🎮 키보드 단축키

• ESC: 모달 닫기
• Ctrl + /: 이 도움말 표시
• Tab: 포커스 이동
• Enter: 버튼 활성화
• Space: 스크롤 다운
• Shift + Space: 스크롤 업
        `.trim();

        alert(shortcuts);
    }

    /**
     * 부드러운 스크롤 (앵커 링크용)
     * @param {string} targetId - 대상 엘리먼트 ID
     */
    smoothScrollTo(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    /**
     * 알림 메시지 표시
     * @param {string} message - 메시지
     * @param {string} type - 타입 (success, error, info)
     */
    showNotification(message, type = 'info') {
        // 기존 알림 제거
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 스타일 설정
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });

        // 타입별 색상
        const colors = {
            success: '#4CAF50',
            error: '#F44336',
            info: '#2196F3',
            warning: '#FF9800'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // 애니메이션으로 표시
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });

        // 3초 후 자동 제거
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
}

// 전역 인스턴스 생성
window.UIInteractions = new UIInteractions();

// 전역 함수로 노출 (기존 코드 호환성)
window.toggleDetails = (projectId) => window.UIInteractions.toggleDetails(projectId);
window.openImageModal = (img) => window.UIInteractions.openImageModal(img);
window.closeImageModal = () => window.UIInteractions.closeImageModal();

console.log('🖱️ UI Interactions loaded successfully!');