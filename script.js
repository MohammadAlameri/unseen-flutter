// Global variables
let currentLanguage = 'en';
let currentTheme = 'light';

// Load saved preferences from localStorage
function loadPreferences() {
    const savedLanguage = localStorage.getItem('flutterBookLanguage');
    const savedTheme = localStorage.getItem('flutterBookTheme');
    
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
    if (savedTheme) {
        currentTheme = savedTheme;
    }
}

// Save preferences to localStorage
function savePreferences() {
    localStorage.setItem('flutterBookLanguage', currentLanguage);
    localStorage.setItem('flutterBookTheme', currentTheme);
}

// Test to verify JavaScript is loading
console.log('Script loaded successfully!');

// Language and theme functions
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    savePreferences();
    updateLanguage();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    savePreferences();
    updateTheme();
}

function updateLanguage() {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-en][data-ar]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update language button
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        const span = langBtn.querySelector('span');
        if (span) {
            span.textContent = span.getAttribute(`data-${currentLanguage}`);
        }
    }
}

function updateTheme() {
    document.body.className = `${currentTheme}-theme`;
    
    // Update theme icon
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        const icon = themeBtn.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
        }
    }
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded!'); // Debug log
    
    // Load saved preferences first
    loadPreferences();
    
    // Initialize language and theme
    updateLanguage();
    updateTheme();
    
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.part-card, .feature');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Function to show part details
function showPart(partNumber) {
    console.log('showPart called with:', partNumber);
    
    const partTitles = {
        en: {
            1: "Part 1: Flutter Fundamentals",
            2: "Part 2: Advanced Internals", 
            3: "Part 3: Performance & Optimization"
        },
        ar: {
            1: "الجزء الأول: أساسيات Flutter",
            2: "الجزء الثاني: الآليات الداخلية المتقدمة",
            3: "الجزء الثالث: الأداء والتحسين"
        }
    };

    const partDescriptions = {
        en: {
            1: "This part covers the fundamental concepts of Flutter including widgets, rendering, and the widget tree. You'll learn about StatelessWidget, StatefulWidget, and how Flutter's rendering pipeline works.",
            2: "Dive deep into Flutter's internal mechanisms including the rendering engine, animation system, and how Flutter communicates with the native platform.",
            3: "Learn advanced techniques for optimizing Flutter applications including performance profiling, memory management, and building efficient custom widgets."
        },
        ar: {
            1: "يغطي هذا الجزء المفاهيم الأساسية لـ Flutter بما في ذلك العناصر والعرض وشجرة العناصر. ستتعلم عن StatelessWidget و StatefulWidget وكيف يعمل خط أنابيب العرض في Flutter.",
            2: "غوص عميق في الآليات الداخلية لـ Flutter بما في ذلك محرك العرض ونظام الرسوم المتحركة وكيف يتواصل Flutter مع المنصة الأصلية.",
            3: "تعلم تقنيات متقدمة لتحسين تطبيقات Flutter بما في ذلك تشخيص الأداء وإدارة الذاكرة وبناء عناصر مخصصة فعالة."
        }
    };

    const partChapters = {
        en: {
            1: [
                "Introduction to Flutter Architecture",
                "Understanding the Widget Tree",
                "State Management Fundamentals",
                "Rendering Pipeline Deep Dive",
                "Custom Widgets Basics",
                "Performance Basics",
                "Debugging Techniques"
            ],
            2: [
                "Flutter Engine Internals",
                "Rendering System Architecture",
                "Animation Framework",
                "Platform Channels",
                "Custom RenderObjects",
                "Advanced State Management",
                "Memory Management",
                "Testing Strategies"
            ],
            3: [
                "Performance Profiling",
                "Memory Optimization",
                "Custom RenderObjects",
                "Advanced Animations",
                "Platform-Specific Optimizations"
            ]
        },
        ar: {
            1: [
                "مقدمة في هندسة Flutter",
                "فهم شجرة العناصر",
                "أساسيات إدارة الحالة",
                "غوص عميق في خط أنابيب العرض",
                "أساسيات العناصر المخصصة",
                "أساسيات الأداء",
                "تقنيات التصحيح"
            ],
            2: [
                "الآليات الداخلية لمحرك Flutter",
                "هندسة نظام العرض",
                "إطار الرسوم المتحركة",
                "قنوات المنصة",
                "كائنات العرض المخصصة",
                "إدارة الحالة المتقدمة",
                "إدارة الذاكرة",
                "استراتيجيات الاختبار"
            ],
            3: [
                "تشخيص الأداء",
                "تحسين الذاكرة",
                "كائنات العرض المخصصة",
                "الرسوم المتحركة المتقدمة",
                "التحسينات الخاصة بالمنصة"
            ]
        }
    };

    // Create modal HTML with clickable chapters
    const modalHTML = `
        <div id="modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            backdrop-filter: blur(5px);
        ">
            <div style="
                background: ${currentTheme === 'dark' ? '#2d3748' : 'white'};
                border-radius: 20px;
                padding: 40px;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            ">
                <button onclick="closeModal()" style="
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: ${currentTheme === 'dark' ? '#e2e8f0' : '#666'};
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.3s ease;
                ">×</button>
                
                <h2 style="color: ${currentTheme === 'dark' ? '#e2e8f0' : '#333'}; margin-bottom: 20px; font-size: 2rem;">${partTitles[currentLanguage][partNumber]}</h2>
                <p style="color: ${currentTheme === 'dark' ? '#a0aec0' : '#666'}; margin-bottom: 30px; line-height: 1.6;">${partDescriptions[currentLanguage][partNumber]}</p>
                <h3 style="color: ${currentTheme === 'dark' ? '#e2e8f0' : '#333'}; margin-bottom: 15px;">${currentLanguage === 'en' ? 'Chapters:' : 'الفصول:'}</h3>
                <ul style="list-style: none; padding: 0;">
                    ${partChapters[currentLanguage][partNumber].map((chapter, index) => `
                        <li onclick="showChapterPage(${partNumber}, ${index + 1}, '${chapter}')" style="
                            padding: 15px;
                            border-bottom: 1px solid ${currentTheme === 'dark' ? '#4a5568' : '#eee'};
                            display: flex;
                            align-items: center;
                            cursor: pointer;
                            transition: background 0.3s ease;
                            border-radius: 8px;
                            margin-bottom: 5px;
                        " onmouseover="this.style.background='${currentTheme === 'dark' ? '#4a5568' : '#f8f9fa'}'" onmouseout="this.style.background='transparent'">
                            <span style="
                                background: var(--primary-color);
                                color: white;
                                width: 35px;
                                height: 35px;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                margin-right: 15px;
                                font-size: 0.9rem;
                                font-weight: bold;
                            ">${index + 1}</span>
                            <span style="color: ${currentTheme === 'dark' ? '#e2e8f0' : '#333'}; font-weight: 500;">${chapter}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add click outside to close
    document.getElementById('modal').addEventListener('click', function(e) {
        if (e.target.id === 'modal') {
            closeModal();
        }
    });

    // Add escape key to close
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Function to show chapter page
function showChapterPage(partNumber, chapterNumber, chapterTitle) {
    console.log('showChapterPage called with:', partNumber, chapterNumber, chapterTitle);
    
    // First try to get content from the book data
    getChapterContent(partNumber, chapterNumber).then(content => {
        if (content) {
            displayChapterPage(partNumber, chapterNumber, content);
        } else {
            // If no content found, show coming soon message
            showComingSoonMessage(partNumber, chapterNumber);
        }
    }).catch(error => {
        console.error('Error loading chapter content:', error);
        showComingSoonMessage(partNumber, chapterNumber);
    });
}

// Function to get chapter content
function getChapterContent(partNumber, chapterNumber) {
    // Import the book content data based on language
    const bookDataModule = currentLanguage === 'ar' ? 
        import('./src/data/bookContentArabic.js') : 
        import('./src/data/bookContent.js');
    
    return bookDataModule.then(module => {
        const { bookData, getChapterById } = currentLanguage === 'ar' ? 
            { bookData: module.bookDataArabic, getChapterById: module.getChapterByIdArabic } :
            { bookData: module.bookData, getChapterById: module.getChapterById };
        
        // Find the chapter in the book data
        const chapter = getChapterById(chapterNumber);
        
        if (chapter) {
            return {
                title: chapter.title,
                content: chapter.content
            };
        }
        
        return null;
    }).catch(error => {
        console.error('Error loading chapter content:', error);
        return null;
    });
}

// Function to display the chapter page with navigation and dark theme support
function displayChapterPage(partNumber, chapterNumber, content) {
    // Get navigation info
    getAllChaptersForLanguage().then(allChapters => {
        const currentIndex = allChapters.findIndex(chapter => 
            chapter.partId === partNumber && chapter.id === chapterNumber
        );
        
        const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;
        const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;

    // Create full chapter page with dark theme support
    const chapterPageHTML = `
        <div class="chapter-page" style="
            min-height: 100vh;
            background: ${currentTheme === 'dark' ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
            padding: 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        ">
            <div class="chapter-content" style="
                max-width: 1200px;
                margin: 0 auto;
                background: ${currentTheme === 'dark' ? '#2d3748' : 'white'};
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                overflow: hidden;
            ">
                <div class="chapter-header" style="
                    background: ${currentTheme === 'dark' ? 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
                    color: white;
                    padding: 40px;
                    text-align: center;
                ">
                    <div class="chapter-meta" style="
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        margin-bottom: 20px;
                        font-size: 14px;
                        opacity: 0.9;
                    ">
                        <span style="
                            background: rgba(255,255,255,0.2);
                            padding: 8px 16px;
                            border-radius: 20px;
                        ">${currentLanguage === 'en' ? 'Part' : 'الجزء'} ${partNumber}</span>
                        <span style="
                            background: rgba(255,255,255,0.2);
                            padding: 8px 16px;
                            border-radius: 20px;
                        ">${currentLanguage === 'en' ? 'Chapter' : 'الفصل'} ${chapterNumber}</span>
                    </div>
                    <h1 class="chapter-title" style="
                        font-size: 2.5rem;
                        font-weight: bold;
                        margin: 0;
                        line-height: 1.2;
                    ">${content.title}</h1>
                </div>
                
                <div class="chapter-text" style="
                    padding: 40px;
                    line-height: 1.8;
                    font-size: 16px;
                    color: ${currentTheme === 'dark' ? '#e2e8f0' : '#333'};
                ">
                    ${content.content}
                </div>
                
                <div class="chapter-nav" style="
                    padding: 30px 40px;
                    background: ${currentTheme === 'dark' ? '#4a5568' : '#f8f9fa'};
                    border-top: 1px solid ${currentTheme === 'dark' ? '#2d3748' : '#e9ecef'};
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 15px;
                ">
                    <div class="nav-left">
                        ${prevChapter ? `
                            <button class="nav-btn prev-btn" onclick="navigateToChapter(${prevChapter.partId}, ${prevChapter.id}, '${prevChapter.title}')" style="
                                background: #667eea;
                                color: white;
                                border: none;
                                padding: 12px 24px;
                                border-radius: 8px;
                                cursor: pointer;
                                font-size: 14px;
                                font-weight: 500;
                                transition: all 0.3s ease;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            " onmouseover="this.style.background='#5a6fd8'" onmouseout="this.style.background='#667eea'">
                                ← ${currentLanguage === 'en' ? 'Previous Chapter' : 'الفصل السابق'}
                            </button>
                        ` : ''}
                    </div>
                    
                    <div class="nav-center">
                        <button class="nav-btn close-btn" onclick="closeChapterPage()" style="
                            background: #6c757d;
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 500;
                            transition: all 0.3s ease;
                        " onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">
                            ${currentLanguage === 'en' ? 'Close Chapter' : 'إغلاق الفصل'}
                        </button>
                    </div>
                    
                    <div class="nav-right">
                        ${nextChapter ? `
                            <button class="nav-btn next-btn" onclick="navigateToChapter(${nextChapter.partId}, ${nextChapter.id}, '${nextChapter.title}')" style="
                                background: #667eea;
                                color: white;
                                border: none;
                                padding: 12px 24px;
                                border-radius: 8px;
                                cursor: pointer;
                                font-size: 14px;
                                font-weight: 500;
                                transition: all 0.3s ease;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            " onmouseover="this.style.background='#5a6fd8'" onmouseout="this.style.background='#667eea'">
                                ${currentLanguage === 'en' ? 'Next Chapter' : 'الفصل التالي'} →
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;

        // Replace the entire page content
        document.body.innerHTML = chapterPageHTML;
        
        // Re-apply theme
        updateTheme();
    }).catch(error => {
        console.error('Error loading chapters for navigation:', error);
        // Fallback: display chapter without navigation
        const chapterPageHTML = `
            <div class="chapter-page" style="
                min-height: 100vh;
                background: ${currentTheme === 'dark' ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
                padding: 20px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            ">
                <div class="chapter-content" style="
                    max-width: 1200px;
                    margin: 0 auto;
                    background: ${currentTheme === 'dark' ? '#2d3748' : 'white'};
                    border-radius: 20px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    overflow: hidden;
                ">
                    <div class="chapter-header" style="
                        background: ${currentTheme === 'dark' ? 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
                        color: white;
                        padding: 40px;
                        text-align: center;
                    ">
                        <h1 class="chapter-title" style="
                            font-size: 2.5rem;
                            font-weight: bold;
                            margin: 0;
                            line-height: 1.2;
                        ">${content.title}</h1>
                    </div>
                    
                    <div class="chapter-text" style="
                        padding: 40px;
                        line-height: 1.8;
                        font-size: 16px;
                        color: ${currentTheme === 'dark' ? '#e2e8f0' : '#333'};
                    ">
                        ${content.content}
                    </div>
                    
                    <div class="chapter-nav" style="
                        padding: 30px 40px;
                        background: ${currentTheme === 'dark' ? '#4a5568' : '#f8f9fa'};
                        border-top: 1px solid ${currentTheme === 'dark' ? '#2d3748' : '#e9ecef'};
                        display: flex;
                        justify-content: center;
                    ">
                        <button class="nav-btn" onclick="goBack()" style="
                            background: #6c757d;
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 500;
                            transition: all 0.3s ease;
                        " onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">
                            ${currentLanguage === 'en' ? '← Back to Parts' : '← العودة للأجزاء'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.innerHTML = chapterPageHTML;
        updateTheme();
    });
}

// Function to show coming soon message with dark theme support
function showComingSoonMessage(partNumber, chapterNumber) {
    const comingSoonHTML = `
        <div class="chapter-page" style="
            min-height: 100vh;
            background: ${currentTheme === 'dark' ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
            padding: 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        ">
            <div class="chapter-content" style="
                max-width: 800px;
                margin: 0 auto;
                background: ${currentTheme === 'dark' ? '#2d3748' : 'white'};
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                padding: 60px;
                text-align: center;
            ">
                <div style="font-size: 4rem; margin-bottom: 30px;">🚧</div>
                <h1 style="
                    font-size: 2.5rem;
                    color: ${currentTheme === 'dark' ? '#e2e8f0' : '#333'};
                    margin-bottom: 20px;
                ">${currentLanguage === 'en' ? 'Chapter Content Coming Soon...' : 'محتوى الفصل قريباً...'}</h1>
                <p style="
                    font-size: 18px;
                    color: ${currentTheme === 'dark' ? '#a0aec0' : '#666'};
                    line-height: 1.6;
                    margin-bottom: 40px;
                ">${currentLanguage === 'en' 
                    ? "This chapter content is being developed. Check back soon for comprehensive tutorials, code examples, and detailed explanations." 
                    : "يتم تطوير محتوى هذا الفصل. تحقق مرة أخرى قريباً للحصول على دروس شاملة وأمثلة كود وشرحات مفصلة."}</p>
                
                <div class="chapter-nav" style="
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                ">
                    <button class="nav-btn" onclick="goBack()" style="
                        background: #667eea;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 500;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='#5a6fd8'" onmouseout="this.style.background='#667eea'">
                        ${currentLanguage === 'en' ? '← Back to Parts' : '← العودة للأجزاء'}
                    </button>
                    <button class="nav-btn" onclick="closeChapterPage()" style="
                        background: #6c757d;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 500;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">
                        ${currentLanguage === 'en' ? 'Close Chapter' : 'إغلاق الفصل'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.innerHTML = comingSoonHTML;
    updateTheme();
}

// Function to get all chapters for current language
function getAllChaptersForLanguage() {
    // Import the book content data based on language
    const bookDataModule = currentLanguage === 'ar' ? 
        import('./src/data/bookContentArabic.js') : 
        import('./src/data/bookContent.js');
    
    return bookDataModule.then(module => {
        const { getAllChapters } = currentLanguage === 'ar' ? 
            { getAllChapters: module.getAllChaptersArabic } :
            { getAllChapters: module.getAllChapters };
        
        return getAllChapters();
    }).catch(error => {
        console.error('Error loading chapters:', error);
        // Fallback to hardcoded chapters if import fails
        if (currentLanguage === 'en') {
            return [
                { partId: 1, id: 1, title: "Beyond the Widget: Understanding Flutter's Three Trees" },
                { partId: 1, id: 2, title: "The Flutter Build Process: From Dart to Native" },
                { partId: 2, id: 11, title: "Responsive Design and Adaptive UIs" },
                { partId: 2, id: 12, title: "MVVM Architecture in Flutter" },
                { partId: 3, id: 18, title: "Essential Flutter Packages" },
                { partId: 3, id: 20, title: "Practical Problem-Solving Scenarios" }
            ];
        } else {
            return [
                { partId: 1, id: 1, title: "ما وراء الـ Widget: فهم الأشجار الثلاث لـ Flutter" },
                { partId: 1, id: 2, title: "عملية بناء Flutter: من Dart إلى Native" },
                { partId: 2, id: 11, title: "التصميم المتجاوب وواجهات المستخدم التكيفية" },
                { partId: 2, id: 12, title: "هندسة MVVM في Flutter" },
                { partId: 3, id: 18, title: "الحزم الأساسية لـ Flutter" },
                { partId: 3, id: 20, title: "سيناريوهات حل المشاكل العملية" }
            ];
        }
    });
}

// Function to navigate to a specific chapter
function navigateToChapter(partNumber, chapterNumber, chapterTitle) {
    showChapterPage(partNumber, chapterNumber, chapterTitle);
}

// Navigation functions
function goBack() {
    location.reload(); // Simple way to go back to main page
}

function closeChapterPage() {
    location.reload(); // Simple way to go back to main page
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.remove();
    }
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to stats
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect to part cards
    const partCards = document.querySelectorAll('.part-card');
    partCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 150);
        });
    });
}); 