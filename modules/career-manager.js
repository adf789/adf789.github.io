// ==========================================================================
// Career Management Module - 경력 계산 및 타이틀 업데이트
// ==========================================================================

export class CareerManager {
    constructor() {
        this.startDate = new Date('2019-03-01'); // 게임 개발 시작일
        this.titleElement = document.getElementById('dynamic-title');
        this.baseTitle = '🎮 GAME DEVELOPER';
        this.skills = ['UNITY & UNREAL MASTER', 'C# SPECIALIST', 'MOBILE GAME EXPERT'];
        
        this.init();
    }

    /**
     * 초기화
     */
    init() {
        this.updateTitle();
        this.startTitleAnimation();
    }

    /**
     * 경력 계산
     * @returns {Object} 경력 정보 {years, months, totalMonths}
     */
    calculateExperience() {
        const now = new Date();
        const diffTime = Math.abs(now - this.startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const totalMonths = Math.floor(diffDays / 30.44); // 평균 월 일수
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        return {
            years,
            months,
            totalMonths,
            startDate: this.startDate.toLocaleDateString('ko-KR'),
            currentDate: now.toLocaleDateString('ko-KR')
        };
    }

    /**
     * 타이틀 업데이트
     */
    updateTitle() {
        if (!this.titleElement) return;

        const experience = this.calculateExperience();
        const randomSkill = this.skills[Math.floor(Math.random() * this.skills.length)];
        
        // 경력에 따른 레벨 시스템
        let level = '';
        if (experience.years >= 5) {
            level = 'SENIOR';
        } else if (experience.years >= 3) {
            level = 'INTERMEDIATE';
        } else if (experience.years >= 1) {
            level = 'JUNIOR';
        } else {
            level = 'TRAINEE';
        }

        const newTitle = `${this.baseTitle} • ${level} (${experience.years}Y ${experience.months}M) • ${randomSkill} 🎮`;
        
        this.titleElement.textContent = newTitle;
        this.titleElement.title = `게임 개발 경력: ${experience.years}년 ${experience.months}개월 (${experience.startDate} ~ ${experience.currentDate})`;
    }

    /**
     * 타이틀 애니메이션 시작
     */
    startTitleAnimation() {
        // 30초마다 타이틀 업데이트 (스킬 로테이션)
        setInterval(() => {
            this.updateTitle();
        }, 30000);

        // 매일 자정에 경력 업데이트
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const msUntilMidnight = tomorrow.getTime() - now.getTime();
        
        setTimeout(() => {
            this.updateTitle();
            // 이후 24시간마다 반복
            setInterval(() => {
                this.updateTitle();
            }, 24 * 60 * 60 * 1000);
        }, msUntilMidnight);
    }

    /**
     * 경력 정보 가져오기 (다른 모듈에서 사용)
     * @returns {Object} 경력 정보
     */
    getExperienceData() {
        return this.calculateExperience();
    }

    /**
     * 레벨 정보 가져오기
     * @returns {string} 현재 레벨
     */
    getCurrentLevel() {
        const experience = this.calculateExperience();
        if (experience.years >= 5) return 'SENIOR';
        if (experience.years >= 3) return 'INTERMEDIATE';
        if (experience.years >= 1) return 'JUNIOR';
        return 'TRAINEE';
    }
}

// 전역 인스턴스 생성
window.CareerManager = new CareerManager();

console.log('👨‍💼 Career Manager loaded successfully!');