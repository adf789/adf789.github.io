// ==========================================================================
// 섹션 템플릿 시스템 사용 예제
// ==========================================================================

/**
 * 사용 예제 모음
 */
const SectionExamples = {
    
    /**
     * 새 프로젝트 섹션 추가 예제
     */
    addNewProjectExample() {
        const newProject = {
            type: 'project',
            id: 'project_vr_game',
            sectionTitle: 'VR PROJECTS',
            title: '[COMPANY B] VR ADVENTURE WORLD',
            meta: [
                '🥽 VR',
                '👥 TEAM: 8',
                '⏰ 12 MONTHS',
                '🏆 AWARD WINNER'
            ],
            description: `
                <strong>ROLE:</strong> VR 시스템 개발자 (상호작용 시스템, 최적화)<br>
                <strong>ACHIEVEMENTS:</strong>
                <ul>
                    <li>🥽 Oculus, HTC Vive 크로스 플랫폼 VR 시스템 구축</li>
                    <li>⚡ VR 환경에서 90FPS 안정화를 위한 최적화</li>
                    <li>🤲 직관적인 핸드 트래킹 및 제스처 인식 시스템</li>
                    <li>🌍 대규모 VR 월드 스트리밍 시스템 개발</li>
                </ul>
            `,
            techTags: [
                { name: 'UNITY VR', icon: 'assets/images/icons/unity-icon.svg' },
                { name: 'OCULUS SDK', icon: 'assets/images/icons/oculus-icon.svg' },
                { name: 'STEAMVR', icon: 'assets/images/icons/steamvr-icon.svg' },
                { name: 'C#', icon: 'assets/images/icons/csharp-icon.svg' }
            ],
            hasDetails: true,
            detailsContent: `
                <h4 style="color: #1976D2; margin-bottom: 15px; font-size: 0.8em;">📊 VR PERFORMANCE METRICS</h4>
                <div class="performance-stats">
                    <div class="stat-item">
                        <div class="stat-value">90FPS</div>
                        <div class="stat-label">VR 프레임</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">20ms</div>
                        <div class="stat-label">모션 지연</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">99%</div>
                        <div class="stat-label">트래킹 정확도</div>
                    </div>
                </div>
                <h4 style="color: #1976D2; margin: 20px 0 10px 0; font-size: 0.8em;">🥽 VR FEATURES</h4>
                <div class="code-snippet">// VR 핸드 트래킹 시스템
public class VRHandTracking : MonoBehaviour 
{
    public void UpdateHandGestures()
    {
        foreach (var hand in VRHands)
        {
            var gesture = GestureRecognizer.Detect(hand.joints);
            if (gesture.confidence > 0.8f)
            {
                TriggerInteraction(gesture.type);
            }
        }
    }
}</div>
            `
        };
        
        window.SectionLoader.addNewProject(newProject);
        console.log('🆕 VR 프로젝트 예제가 추가되었습니다!');
    },

    /**
     * 새 스킬 섹션 추가 예제
     */
    addNewSkillsExample() {
        const newSkills = {
            type: 'skills',
            title: 'ADDITIONAL SKILLS',
            categories: [
                {
                    title: '🌐 WEB TECHNOLOGIES',
                    skills: [
                        { name: 'React (3년 경험)', level: 85 },
                        { name: 'Node.js (2년 경험)', level: 70 },
                        { name: 'TypeScript (1년 경험)', level: 65 }
                    ]
                },
                {
                    title: '🛠️ TOOLS & WORKFLOW',
                    skills: [
                        { name: 'Git (실무 5년)', level: 95 },
                        { name: 'Docker (학습 중)', level: 40 },
                        { name: 'Jenkins (실무 1년)', level: 60 }
                    ]
                }
            ]
        };
        
        const section = window.SectionManager.createSkillsSection(newSkills);
        window.SectionManager.appendToContainer('main-container', section);
        console.log('🆕 스킬 섹션 예제가 추가되었습니다!');
    },

    /**
     * 기본 섹션 추가 예제
     */
    addBasicSectionExample() {
        const basicSection = {
            type: 'basic',
            title: 'EDUCATION & CERTIFICATION',
            content: `
                <p style="font-size: 0.9em; line-height: 1.8; color: #424242;">
                    🎓 <strong>EDUCATION:</strong><br>
                    • 컴퓨터공학과 학사 (2016-2020)<br>
                    • 게임 프로그래밍 전공<br><br>
                    
                    📜 <strong>CERTIFICATIONS:</strong><br>
                    • Unity Certified Developer (2021)<br>
                    • AWS Cloud Practitioner (2022)<br>
                    • 정보처리기사 (2020)<br><br>
                    
                    🏆 <strong>AWARDS:</strong><br>
                    • 인디게임 페스티벌 우수상 (2021)<br>
                    • 대학생 게임 개발 경진대회 1위 (2019)
                </p>
            `
        };
        
        const section = window.SectionManager.createBasicSection(basicSection);
        window.SectionManager.appendToContainer('main-container', section);
        console.log('🆕 기본 섹션 예제가 추가되었습니다!');
    },

    /**
     * 템플릿을 사용한 프로젝트 추가 예제
     */
    addProjectWithTemplateExample() {
        const webProject = {
            id: 'project_web_portfolio',
            title: '[FREELANCE] INTERACTIVE WEB PORTFOLIO',
            description: `
                <strong>ROLE:</strong> 풀스택 웹 개발자<br>
                <strong>ACHIEVEMENTS:</strong>
                <ul>
                    <li>🎨 인터랙티브 애니메이션과 3D 효과</li>
                    <li>📱 완전한 반응형 웹 디자인</li>
                    <li>⚡ 최적화된 성능 (90+ Lighthouse 점수)</li>
                </ul>
            `,
            meta: ['🌐 WEB', '👤 SOLO', '⏰ 3 MONTHS'],
            techTags: [
                { name: 'React', icon: 'assets/images/icons/react-icon.svg' },
                { name: 'Three.js', icon: 'assets/images/icons/threejs-icon.svg' },
                { name: 'GSAP', icon: 'assets/images/icons/gsap-icon.svg' }
            ]
        };
        
        // 웹 프로젝트 템플릿 사용
        window.SectionLoader.addNewProject(webProject, 'web-project');
        console.log('🆕 템플릿 기반 웹 프로젝트가 추가되었습니다!');
    },

    /**
     * 모든 예제 실행
     */
    runAllExamples() {
        console.log('🚀 모든 섹션 예제를 실행합니다...');
        
        setTimeout(() => this.addNewProjectExample(), 500);
        setTimeout(() => this.addNewSkillsExample(), 1000);
        setTimeout(() => this.addBasicSectionExample(), 1500);
        setTimeout(() => this.addProjectWithTemplateExample(), 2000);
        
        console.log('✅ 모든 예제가 순차적으로 추가됩니다!');
    },

    /**
     * 섹션 데이터 내보내기 예제
     */
    exportDataExample() {
        window.SectionUtils.downloadData();
        console.log('📥 섹션 데이터가 다운로드됩니다!');
    },

    /**
     * 빠른 추가 함수들 예제
     */
    quickAddExamples() {
        // 빠른 프로젝트 추가
        window.SectionUtils.quickAddProject(
            '빠른 모바일 앱',
            '<strong>간단한 설명:</strong> React Native로 개발한 날씨 앱',
            ['React Native', 'JavaScript', 'API']
        );
        
        // 빠른 섹션 추가
        window.SectionUtils.quickAddSection(
            'CONTACT INFO',
            '<p>연락처 및 추가 정보를 여기에 입력하세요.</p>'
        );
        
        console.log('⚡ 빠른 추가 예제가 실행되었습니다!');
    }
};

// 개발자 도구에서 사용할 수 있도록 전역으로 노출
window.SectionExamples = SectionExamples;

// 사용법 안내
console.log(`
🧩 섹션 템플릿 시스템 사용법:

1. 새 프로젝트 추가:
   SectionExamples.addNewProjectExample()

2. 새 스킬 섹션 추가:
   SectionExamples.addNewSkillsExample()

3. 기본 섹션 추가:
   SectionExamples.addBasicSectionExample()

4. 모든 예제 실행:
   SectionExamples.runAllExamples()

5. 빠른 추가:
   SectionUtils.quickAddProject('제목', '설명', ['태그1', '태그2'])
   SectionUtils.quickAddSection('제목', '내용')

6. 데이터 내보내기:
   SectionUtils.downloadData()
`);

console.log('📚 Section usage examples loaded successfully!');