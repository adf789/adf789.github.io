# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Minecraft-style game developer portfolio website** written in Korean. It's a single-page application showcasing a game developer's experience, projects, and skills with a Minecraft-themed pixelated design.

### Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, ES6+ JavaScript (no frameworks)
- **Architecture**: Modular ES6 class-based system with dynamic loading
- **Styling**: Minecraft-inspired pixel art design with animations
- **Data**: JSON-based content management system

## Development Commands

### Local Development Server
```bash
# Start local server with proper MIME types for modules
python serve.py
# Access at: http://localhost:8080/
```

**Note**: The `serve.py` script is specifically configured to handle ES6 modules with correct MIME types and CORS headers.

### Testing
```bash
# Open test.html in browser for component testing
# No automated test framework is currently configured
```

## Architecture Overview

### Core System Design
The application follows a **modular architecture** with ES6 classes and dynamic section loading:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   SECTION       │◄──►│   DATA LAYER     │◄──►│   CAREER        │
│   SYSTEM        │    │                  │    │   MANAGER       │
│                 │    │ • sections-data  │    │                 │
│ • Dynamic Load  │    │ • JSON Config    │    │ • Experience    │
│ • Template Mgr  │    │ • Content Cache  │    │ • Title Updates │
│ • Error Handling│    │ • Asset Loading  │    │ • Grade System  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
           │                       │                       │
           └───────────────────────┼───────────────────────┘
                                   ▼
                        ┌──────────────────┐
                        │   UI LAYER       │
                        │                  │
                        │ • Animations     │
                        │ • Interactions   │
                        │ • Media Manager  │
                        └──────────────────┘
```

### Key Components

#### 1. Section System (`modules/section-system.js`)
- **Purpose**: Central orchestrator for section loading and initialization
- **Key Features**: 
  - Advanced template system with fallback mechanisms
  - Performance monitoring with timing marks
  - Error handling with retry logic
  - Section duplication prevention

#### 2. Career Manager (`modules/career-manager.js`)
- **Purpose**: Dynamic career experience calculation and title updates
- **Key Features**:
  - Real-time experience calculation from start date (2020-11-11)
  - Minecraft-style grade system (DIRT → BEDROCK)
  - Skill rotation every 30 seconds
  - Daily title updates at midnight

#### 3. Section Loading System
- **SectionLoader** (`components/section-loader.js`): JSON data loading with caching
- **SectionTemplateManager** (`components/section-templates.js`): Dynamic HTML template generation
- **Data Source**: `data/sections-data.json` - Centralized content configuration

### Module Dependencies
```javascript
// Core modules load order:
1. section-templates.js (template system)
2. section-loader.js (data loading)
3. modules/section-system.js (orchestration)
4. modules/career-manager.js (career calculations)
5. assets/js/main.js (initialization)
```

### Content Management System

#### sections-data.json Structure
- **sections[]**: Array of section configurations
- **projectTemplates{}**: Reusable project templates
- **Dynamic Content**: Supports HTML, code samples, media galleries

#### Section Types
- **basic**: Simple content sections
- **project**: Project showcases with expandable details
- **skills**: Interactive skill bars with animations
- **code**: Repository links and code samples

### Performance & Features

#### Key Performance Optimizations
- **Resource Management**: Object pooling patterns
- **Caching Strategy**: Cache busting for JSON data
- **Memory Optimization**: 40% memory reduction techniques
- **Animation Performance**: 60 FPS stable frame rate targeting

#### Minecraft Theme Implementation
- **Visual Design**: Pixel art inspired colors and gradients
- **Interactive Elements**: 3D block-style buttons and cards
- **Animations**: Moving cloud background, skill bar animations
- **Typography**: Minecraft inventory-style UI components

### File Organization
- **modules/**: Core business logic (career, content, animations)
- **components/**: Template and loading systems
- **data/**: JSON configuration files
- **assets/**: Static resources (CSS, images, icons)
- **examples/**: Usage examples for section system

## Important Notes

### Career Date Configuration
The career start date is hardcoded in `modules/career-manager.js:7`:
```javascript
this.startDate = new Date('2020-11-11'); // Update for different developer
```

### Section System Behavior
- **Primary System**: Advanced template loading with error handling
- **Fallback Disabled**: System designed to fail gracefully without fallback UI
- **Timeout Disabled**: No automatic timeout for section loading

### Korean Language Content
All content is in Korean. When making changes:
- Maintain Korean text encoding (UTF-8)
- Respect Korean UI/UX conventions
- Preserve existing Korean comments and documentation

### Browser Compatibility
- Chrome 70+, Firefox 65+, Safari 12+, Edge 79+
- Mobile Safari iOS 12+, Chrome Android 70+
- No polyfills included - uses modern ES6+ features

## Development Guidelines

### When Adding New Sections
1. Update `data/sections-data.json` with new section configuration
2. Use existing section types or extend `projectTemplates`
3. Add any new icons to `assets/images/icons/`
4. Test section loading with browser dev tools network tab

### When Modifying Career System  
1. Update start date in `CareerManager` constructor
2. Test grade system transitions
3. Verify tooltip displays correctly
4. Check midnight update timing

### Performance Considerations
- Images are optimized SVG icons where possible
- CSS uses hardware acceleration for animations
- JavaScript uses modern optimization patterns (object pooling, caching)
- No external dependencies to minimize bundle size