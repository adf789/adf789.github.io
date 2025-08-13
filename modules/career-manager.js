// ==========================================================================
// Career Management Module - 경력 계산 및 타이틀 업데이트
// ==========================================================================

export class CareerManager {
    constructor() {
        this.startDate = new Date('2020-11-11'); // 게임 개발 시작일
        this.titleElement = document.getElementById('dynamic-title');
        this.baseTitle = '🎮 GAME DEVELOPER';
        this.skills = ['UNITY & UNREAL', 'C# SPECIALIST', 'MOBILE GAME EXPERT'];
        
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

        const randomSkill = this.skills[Math.floor(Math.random() * this.skills.length)];
        
        // 경력에 따른 레벨 시스템
        let grade = this.getCurrentLevel();

        const tooltipText = `0-1년 : 🟤 DIRT
1-3년: 🔘 STONE
3-5년: ⚪ IRON
5-7년: 🟡 GOLD
7-10년: 🟣 OBSIDIAN
10-15년: 🔵 DIAMOND
15년+: ⚫ BEDROCK`;

        const newTitle = `${this.baseTitle} • GRADE ${grade} • ${randomSkill} 🎮`;
        
        this.titleElement.textContent = newTitle;
        this.titleElement.title = tooltipText;
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

        if (experience.years >= 15) {
            return '⚫ BEDROCK';
        } else if (experience.years >= 10) {
            return '🔵 DIAMOND';
        } else if (experience.years >= 7) {
            return '🟣 OBSIDIAN';
        } else if (experience.years >= 5) {
            return '🟡 GOLD';
        } else if (experience.years >= 3) {
            return '⚪ IRON';
        } else if (experience.years >= 1) {
            return '🔘 STONE';
        } else {
            return '🟤 DIRT';
        }
    }
}

// 전역 인스턴스 생성
window.CareerManager = new CareerManager();

console.log('👨‍💼 Career Manager loaded successfully!');