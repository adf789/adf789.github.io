# 🎮 마인크래프트 스타일 게임 개발자 포트폴리오

마인크래프트의 픽셀아트 스타일을 모티브로 한 반응형 게임 개발자 포트폴리오입니다.

## 🌟 주요 기능

### 🚀 **동적 경력 시스템**
- 실시간으로 경력 연수를 계산하여 표시
- 마인크래프트 블록 테마의 등급 시스템 (흙 → 다이아몬드 → 베드락)
- 호버 시 등급 설명 툴팁 표시

### 🎨 **마인크래프트 스타일 디자인**
- 픽셀아트 느낌의 색상과 그라데이션
- 3D 블록 스타일 버튼과 카드
- 구름이 움직이는 하늘 배경 애니메이션
- 마인크래프트 인벤토리 스타일 UI

### 📱 **완전 반응형**
- 모바일, 태블릿, 데스크톱 모든 디바이스 지원
- 터치 친화적인 버튼 크기
- 가독성을 고려한 폰트 크기 조정

### ⚡ **인터랙티브 요소**
- 프로젝트 상세 정보 토글 기능
- 스킬 바 애니메이션
- 부드러운 스크롤 애니메이션
- 호버 효과와 트랜지션

## 📁 파일 구조

```
portfolio/
├── index.html          # 메인 HTML 파일
├── css/
│   └── style.css       # 메인 CSS 파일
├── js/
│   └── main.js         # JavaScript 기능
├── README.md           # 프로젝트 설명
└── images/             # 이미지 파일 (선택사항)
```

## 🛠️ 설치 및 사용법

### 1. **파일 다운로드**
```bash
# Git으로 클론하거나
git clone https://github.com/yourusername/portfolio.git

# 또는 ZIP 파일을 다운로드하여 압축 해제
```

### 2. **개인 정보 수정**

#### **index.html에서 수정할 부분:**
```html
<!-- 개인 정보 -->
<h1 class="name">김개발자</h1>  <!-- 본인 이름으로 변경 -->

<!-- 연락처 정보 -->
<a href="mailto:your-email@gmail.com" class="contact-item">📧 your-email@gmail.com</a>
<a href="tel:010-1234-5678" class="contact-item">📱 010-1234-5678</a>
<a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" class="contact-item">🔗 github.com/yourusername</a>
```

#### **main.js에서 수정할 부분:**
```javascript
// 경력 시작일 설정
const careerStartDate = new Date('2019-03-01'); // 본인의 실제 시작일로 변경
```

### 3. **GitHub Pages 배포**

#### **Repository 생성:**
1. GitHub에서 `yourusername.github.io` 이름으로 Repository 생성
2. 모든 파일을 업로드

#### **배포:**
```bash
git add .
git commit -m "Add Minecraft-style portfolio"
git push origin main
```

#### **GitHub Pages 활성화:**
1. Repository → Settings → Pages
2. Source: Deploy from a branch
3. Branch: main 선택
4. Save 클릭

### 4. **접속 확인**
```
https://yourusername.github.io
```

## 🎯 커스터마이징 가이드

### **색상 변경**
`css/style.css`에서 주요 색상 변수들을 수정하세요:

```css
/* 주요 색상들 */
--primary-green: #4CAF50;      /* 메인 그린 */
--secondary-brown: #8B4513;    /* 나무 블록 색상 */
--accent-yellow: #FFEB3B;      /* 강조 색상 */
--text-blue: #1976D2;          /* 텍스트 블루 */
```

### **섹션 추가**
새로운 섹션을 추가하려면:

```html
<div class="section">
    <div class="section-header">
        <div class="inventory-icon"></div>
        <span>새로운 섹션</span>
    </div>
    <div class="section-content">
        <!-- 내용 -->
    </div>
</div>
```

### **프로젝트 추가**
새로운 프로젝트 카드:

```html
<div class="project-card">
    <h3 class="project-title">프로젝트 이름</h3>
    <div class="project-meta">
        <span class="meta-item">📱 MOBILE</span>
        <!-- 기타 메타 정보 -->
    </div>
    <div class="project-description">
        프로젝트 설명...
    </div>
    <div class="tech-tags">
        <span class="tech-tag">UNITY</span>
        <!-- 기타 기술 태그 -->
    </div>
</div>
```

## 🔧 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션
- **Vanilla JavaScript**: ES6+ 문법 사용
- **Google Fonts**: Orbitron, JetBrains Mono
- **No Dependencies**: 외부 라이브러리 없음

## 📊 성능 최적화

- **이미지 최적화**: SVG 아이콘 사용
- **CSS 최적화**: 중복 제거 및 압축
- **JavaScript 최적화**: 지연 로딩 및 이벤트 최적화
- **폰트 최적화**: Google Fonts 사전 로드

## 🌐 브라우저 지원

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile Safari iOS 12+
- ✅ Chrome Android 70+

## 📝 라이선스

이 프로젝트는 MIT 라이선스하에 배포됩니다. 자유롭게 사용, 수정, 배포할 수 있습니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 질문이나 제안이 있으시면 언제든 연락주세요!

- **Email**: your-email@gmail.com
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Portfolio**: [https://yourusername.github.io](https://yourusername.github.io)

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!