// ==========================================================================
// 새 섹션 추가 헬퍼 파일 (가독성 개선 버전)
// 이 파일을 수정해서 새 섹션을 추가하세요!
// ==========================================================================

/**
 * 여기에 새 섹션을 추가하세요!
 * content를 배열로 작성하면 가독성이 좋아집니다.
 */
const NEW_SECTIONS = [
    // 예제 1: 도구 및 언어 섹션 (배열 방식)
    {
        title: "LANGUAGES & TOOLS",
        content: [
            '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; text-align: center;">',
              
              '<div style="padding: 15px; background: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px;">',
                '<div style="font-size: 2em; margin-bottom: 10px;">🎮</div>',
                '<strong>Unity</strong><br>',
                '<span style="color: #666; font-size: 0.8em;">5년 경험</span>',
              '</div>',
              
              '<div style="padding: 15px; background: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px;">',
                '<div style="font-size: 2em; margin-bottom: 10px;">⚡</div>',
                '<strong>Unreal</strong><br>',
                '<span style="color: #666; font-size: 0.8em;">2년 경험</span>',
              '</div>',
              
              '<div style="padding: 15px; background: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px;">',
                '<div style="font-size: 2em; margin-bottom: 10px;">💻</div>',
                '<strong>C#</strong><br>',
                '<span style="color: #666; font-size: 0.8em;">전문가</span>',
              '</div>',
              
              '<div style="padding: 15px; background: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px;">',
                '<div style="font-size: 2em; margin-bottom: 10px;">🐍</div>',
                '<strong>Python</strong><br>',
                '<span style="color: #666; font-size: 0.8em;">중급</span>',
              '</div>',
              
            '</div>'
        ]
    },

    // 예제 2: 사이드 프로젝트 섹션 (배열 방식)
    {
        title: "SIDE PROJECTS",
        content: [
            '<div class="project-card">',
              '<h3 class="project-title">개인 프로젝트: 2D 플랫포머 게임</h3>',
              
              '<div class="project-meta">',
                '<span class="meta-item">🎮 INDIE</span>',
                '<span class="meta-item">👤 SOLO</span>',
                '<span class="meta-item">⏰ 6 MONTHS</span>',
              '</div>',
              
              '<div class="project-description">',
                '<strong>개요:</strong> 복고풍 2D 플랫포머 게임 개발<br>',
                '<strong>주요 기능:</strong>',
                '<ul>',
                  '<li>🎯 정교한 물리 엔진 구현</li>',
                  '<li>🎨 픽셀 아트 스타일 그래픽</li>',
                  '<li>🎵 레트로 사운드트랙</li>',
                  '<li>💾 세이브/로드 시스템</li>',
                '</ul>',
              '</div>',
              
              '<div class="tech-tags">',
                '<span class="tech-tag">Unity 2D</span>',
                '<span class="tech-tag">C#</span>',
                '<span class="tech-tag">Pixel Art</span>',
              '</div>',
              
            '</div>'
        ]
    },

    // 예제 3: 연락처 섹션 (배열 방식)
    {
        title: "GET IN TOUCH",
        content: [
            '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">',
              
              '<h3 style="margin: 0 0 20px 0; font-size: 1.5em;">💬 함께 만들어요!</h3>',
              
              '<p style="margin: 0 0 25px 0; opacity: 0.9; line-height: 1.6;">',
                '새로운 프로젝트나 협업 기회가 있으시면 언제든 연락주세요.<br>',
                '게임 개발, 기술 상담, 멘토링까지 다양한 형태로 도움을 드릴 수 있습니다.',
              '</p>',
              
              '<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">',
                '<a href="mailto:kpoint776@email.com" style="background: rgba(255,255,255,0.2); padding: 12px 20px; border-radius: 25px; text-decoration: none; color: white; transition: all 0.3s;">',
                  '📧 이메일 보내기',
                '</a>',
                '<a href="https://github.com/adf789" style="background: rgba(255,255,255,0.2); padding: 12px 20px; border-radius: 25px; text-decoration: none; color: white; transition: all 0.3s;">',
                  '💻 GitHub 보기',
                '</a>',
              '</div>',
              
            '</div>'
        ]
    }
];

/**
 * 배열 content를 문자열로 변환하는 헬퍼 함수
 */
function processContent(content) {
    return Array.isArray(content) ? content.join('') : content;
}

/**
 * 아래 부분은 수정하지 마세요!
 * 페이지 로드 시 자동으로 섹션들을 추가합니다.
 */
document.addEventListener('DOMContentLoaded', function() {
    // 1초 후에 새 섹션들 추가 (기본 섹션 로드 완료 후)
    setTimeout(() => {
        if (NEW_SECTIONS.length > 0) {
            console.log(`🆕 ${NEW_SECTIONS.length}개의 새 섹션을 추가합니다...`);
            
            NEW_SECTIONS.forEach((section, index) => {
                setTimeout(() => {
                    if (typeof window.addSimpleSection === 'function') {
                        const content = processContent(section.content);
                        window.addSimpleSection(section.title, content);
                        console.log(`✅ 섹션 추가됨: ${section.title}`);
                    }
                }, index * 300); // 순차적으로 추가
            });
        }
    }, 1000);
});

console.log('🔧 Section adder loaded successfully!');