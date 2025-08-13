// ==========================================================================
// 간단한 섹션 시스템 - 폴백용
// ==========================================================================

/**
 * 간단한 섹션 데이터
 */
const SIMPLE_SECTIONS = [
    {
        title: "PLAYER PROFILE",
        content: `
            <p style="font-size: 0.9em; line-height: 1.8; color: #424242;">
                🏗️ <strong>BUILDING EXPERIENCE:</strong> 5년<br>
                🎯 <strong>SPECIALIZATION:</strong> 게임 세계 구축 및 최적화<br>
                ⚡ <strong>CORE SKILLS:</strong> Unity & Unreal Engine을 활용한 크로스 플랫폼 게임 개발<br><br>
                
                마인크래프트처럼 무한한 가능성을 가진 게임 세계를 만드는 것이 저의 목표입니다. 
                한 블록 한 블록 쌓아 올리듯 안정적이고 확장 가능한 코드를 작성하며, 
                플레이어들이 멋진 모험을 할 수 있는 게임을 만들어갑니다. 
                성능 최적화와 메모리 관리를 통해 어떤 디바이스에서도 부드럽게 실행되는 게임을 구현합니다.
            </p>
        `
    },
    {
        title: "COMPLETED PROJECTS",
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
                    <span class="tech-tag">ADDRESSABLES</span>
                </div>
                
                <button class="details-toggle" onclick="toggleDetails('project1')">
                    VIEW TECHNICAL DETAILS
                </button>
                
                <div class="details-content" id="project1">
                    <h4 style="color: #1976D2; margin-bottom: 15px; font-size: 0.8em;">📊 PERFORMANCE METRICS</h4>
                    <div class="performance-stats">
                        <div class="stat-item">
                            <div class="stat-value">40%</div>
                            <div class="stat-label">메모리 절감</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">60FPS</div>
                            <div class="stat-label">안정 프레임</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">200ms</div>
                            <div class="stat-label">UI 반응속도</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">15MB</div>
                            <div class="stat-label">런타임 메모리</div>
                        </div>
                    </div>
                    
                    <h4 style="color: #1976D2; margin: 20px 0 10px 0; font-size: 0.8em;">🏗️ SYSTEM ARCHITECTURE</h4>
                    <div class="architecture-diagram">
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   UI MANAGER    │◄──►│  RESOURCE POOL   │◄──►│  NETWORK MGR    │
│                 │    │                  │    │                 │
│ • Panel Stack   │    │ • Asset Bundle   │    │ • Mirror Net    │
│ • Event System  │    │ • Object Pool    │    │ • Sync System   │
│ • Animation Mgr │    │ • Memory Monitor │    │ • PvP Handler   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
           │                       │                       │
           └───────────────────────┼───────────────────────┘
                                   ▼
                        ┌──────────────────┐
                        │   GAME CORE      │
                        │                  │
                        │ • State Machine  │
                        │ • Event Bus      │
                        │ • Save System    │
                        └──────────────────┘
                    </div>
                    
                    <h4 style="color: #1976D2; margin: 20px 0 10px 0; font-size: 0.8em;">💻 CODE SAMPLE</h4>
                    <div class="code-snippet">// 최적화된 UI 매니저 핵심 로직
public class UIManager : MonoBehaviour 
{
    private Dictionary&lt;Type, UIPanel&gt; panelCache = new();
    private Stack&lt;UIPanel&gt; panelStack = new();
    
    public T ShowPanel&lt;T&gt;() where T : UIPanel
    {
        if (!panelCache.TryGetValue(typeof(T), out var panel))
        {
            panel = ResourcePool.Instance.GetPanel&lt;T&gt;();
            panelCache[typeof(T)] = panel;
        }
        
        panelStack.Push(panel);
        panel.Show();
        return panel as T;
    }
}</div>
                </div>
            </div>
        `
    },
    {
        title: "SKILL INVENTORY",
        content: `
            <div class="skills-grid">
                <div class="skill-category">
                    <h3>🎮 GAME ENGINES</h3>
                    <div class="skill-item">
                        <span>Unity (5년 경험)</span>
                        <div class="skill-level"><div class="skill-fill" style="width: 95%"></div></div>
                    </div>
                    <div class="skill-item">
                        <span>Unreal Engine (2년 경험)</span>
                        <div class="skill-level"><div class="skill-fill" style="width: 80%"></div></div>
                    </div>
                </div>
                
                <div class="skill-category">
                    <h3>💻 PROGRAMMING</h3>
                    <div class="skill-item">
                        <span>C# (실무 5년)</span>
                        <div class="skill-level"><div class="skill-fill" style="width: 90%"></div></div>
                    </div>
                    <div class="skill-item">
                        <span>C++ (실무 2년)</span>
                        <div class="skill-level"><div class="skill-fill" style="width: 75%"></div></div>
                    </div>
                    <div class="skill-item">
                        <span>Python (학습 중)</span>
                        <div class="skill-level"><div class="skill-fill" style="width: 60%"></div></div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "CODE REPOSITORY",
        content: `
            <div class="code-block">
                <div style="color: #E1BEE7; margin-bottom: 15px; font-weight: 500;">
                    🔗 GITHUB REPOSITORY ACCESS<br>
                    📍 URL: github.com/developer/game-frameworks<br>
                    ✅ STATUS: PUBLIC ACCESS GRANTED
                </div>
                <div class="code-line">MODULAR UI FRAMEWORK SYSTEM</div>
                <div class="code-line">OPTIMIZED OBJECT POOLING MANAGER</div>
                <div class="code-line">EVENT DRIVEN GAMESTATE CONTROLLER</div>
                <div class="code-line">CROSS PLATFORM INPUT WRAPPER</div>
                <div style="color: #4CAF50; margin-top: 15px; font-weight: 500;">
                    ✅ DOWNLOAD COMPLETE • ALL SYSTEMS OPERATIONAL
                </div>
            </div>
        `
    }
];

/**
 * 간단한 섹션 로더
 */
function loadSimpleSections() {
    console.log('🔄 Loading simple sections...');
    
    const container = document.getElementById('main-container') || document.querySelector('.container');
    if (!container) {
        console.error('Container not found');
        return;
    }
    
    // 로딩 메시지 제거
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
        loadingMessage.remove();
    }
    
    // 섹션들 생성
    SIMPLE_SECTIONS.forEach((sectionData, index) => {
        const section = document.createElement('div');
        section.className = 'section';
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
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
        
        // 순차적 애니메이션
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200 + 100);
    });
    
    console.log('✅ Simple sections loaded successfully');
}

/**
 * 새 섹션 추가 함수 (간단한 버전)
 */
function addSimpleSection(title, content) {
    const container = document.getElementById('main-container') || document.querySelector('.container');
    if (!container) return;
    
    const section = document.createElement('div');
    section.className = 'section';
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    section.innerHTML = `
        <div class="section-header">
            <div class="inventory-icon"></div>
            <span>${title}</span>
        </div>
        <div class="section-content">
            ${content}
        </div>
    `;
    
    container.appendChild(section);
    
    setTimeout(() => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }, 100);
    
    console.log(`✅ Simple section added: ${title}`);
}

// 전역으로 노출
window.loadSimpleSections = loadSimpleSections;
window.addSimpleSection = addSimpleSection;

console.log('📋 Simple sections system loaded');