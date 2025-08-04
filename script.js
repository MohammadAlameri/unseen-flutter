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
    const body = document.body;
    const theme = currentTheme;
    
    // Apply theme to body
    body.setAttribute('data-theme', theme);
    
    // Update CSS variables based on theme
    if (theme === 'dark') {
        body.style.setProperty('--primary-color', '#667eea');
        body.style.setProperty('--secondary-color', '#764ba2');
        body.style.setProperty('--accent-color', '#f093fb');
        body.style.setProperty('--text-color', '#f7fafc');
        body.style.setProperty('--text-light', '#e2e8f0');
        body.style.setProperty('--bg-color', '#1a202c');
        body.style.setProperty('--card-bg', '#2d3748');
        body.style.setProperty('--border-color', '#4a5568');
        body.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.3)');
        body.style.setProperty('--code-bg', '#4a5568');
        body.style.setProperty('--code-color', '#fbbf24');
        body.style.setProperty('--header-bg', 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)');
        body.style.setProperty('--nav-bg', '#2d3748');
        body.style.setProperty('--modal-bg', '#2d3748');
        body.style.setProperty('--modal-text', '#f7fafc');
        body.style.setProperty('--modal-border', '#4a5568');
        body.style.setProperty('--title-color', '#f7fafc');
        body.style.setProperty('--subtitle-color', '#e2e8f0');
    } else {
        body.style.setProperty('--primary-color', '#667eea');
        body.style.setProperty('--secondary-color', '#764ba2');
        body.style.setProperty('--accent-color', '#f093fb');
        body.style.setProperty('--text-color', '#1a202c');
        body.style.setProperty('--text-light', '#4a5568');
        body.style.setProperty('--bg-color', '#ffffff');
        body.style.setProperty('--card-bg', '#ffffff');
        body.style.setProperty('--border-color', '#e2e8f0');
        body.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
        body.style.setProperty('--code-bg', '#f7fafc');
        body.style.setProperty('--code-color', '#d63384');
        body.style.setProperty('--header-bg', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
        body.style.setProperty('--nav-bg', '#f8fafc');
        body.style.setProperty('--modal-bg', '#ffffff');
        body.style.setProperty('--modal-text', '#1a202c');
        body.style.setProperty('--modal-border', '#e2e8f0');
        body.style.setProperty('--title-color', '#2d3748');
        body.style.setProperty('--subtitle-color', '#4a5568');
    }
    
    // Update theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
    
    // Save theme preference
    savePreferences();
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

    // Load chapters dynamically from book data with retry mechanism
    const loadModule = (retryCount = 0) => {
        const bookDataModule = currentLanguage === 'ar' ? 
            import('./src/data/bookContentArabic.js') : 
            import('./src/data/bookContent.js');
        
        return bookDataModule.then(module => {
            console.log('Module loaded in showPart:', module);
            console.log('Module keys:', Object.keys(module));
            
            // Check if the required exports exist
            const bookData = currentLanguage === 'ar' ? module.bookDataArabic : module.bookData;
            const getPartById = currentLanguage === 'ar' ? module.getPartByIdArabic : module.getPartById;
            
            console.log('getPartById function:', getPartById);
            console.log('bookData:', bookData);
            
            if (!getPartById) {
                console.error('getPartById function not found in module');
                throw new Error('getPartById function not found');
            }
            
            if (!bookData) {
                console.error('bookData not found in module');
                throw new Error('bookData not found');
            }
            
            const part = getPartById(partNumber);
            console.log('Found part:', part);
            
            const chapters = part ? part.chapters : [];
            console.log('Chapters found:', chapters);
            
            if (!chapters || chapters.length === 0) {
                console.error('No chapters found for part:', partNumber);
                throw new Error('No chapters found for part');
            }

            // Create modal HTML with dynamic chapters
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
                        background: var(--modal-bg);
                        border-radius: 20px;
                        padding: 40px;
                        max-width: 600px;
                        max-height: 80vh;
                        overflow-y: auto;
                        position: relative;
                        box-shadow: 0 20px 40px var(--shadow-color);
                        border: 1px solid var(--modal-border);
                    ">
                        <button onclick="closeModal()" style="
                            position: absolute;
                            top: 15px;
                            right: 20px;
                            background: none;
                            border: none;
                            font-size: 2rem;
                            cursor: pointer;
                            color: var(--modal-text);
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: background 0.3s ease;
                        ">×</button>
                        
                        <h2 style="color: var(--modal-text); margin-bottom: 20px; font-size: 2rem;">${partTitles[currentLanguage][partNumber]}</h2>
                        <p style="color: var(--text-light); margin-bottom: 30px; line-height: 1.6;">${partDescriptions[currentLanguage][partNumber]}</p>
                        <h3 style="color: var(--modal-text); margin-bottom: 15px;">${currentLanguage === 'en' ? 'Chapters:' : 'الفصول:'}</h3>
                        <ul style="list-style: none; padding: 0;">
                            ${chapters.map((chapter, index) => `
                                <li onclick="showChapterPage(${partNumber}, ${chapter.id}, '${chapter.title}')" style="
                                    padding: 15px;
                                    border-bottom: 1px solid var(--border-color);
                                    display: flex;
                                    align-items: center;
                                    cursor: pointer;
                                    transition: background 0.3s ease;
                                    border-radius: 8px;
                                    margin-bottom: 5px;
                                " onmouseover="this.style.background='var(--code-bg)'" onmouseout="this.style.background='transparent'">
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
                                    ">${chapter.id}</span>
                                    <span style="color: var(--modal-text); font-weight: 500;">${chapter.title}</span>
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
        }).catch(error => {
            console.error('Error loading part data:', error);
            console.error('Error details:', error.message);
            console.error('Error stack:', error.stack);
            
            // Retry mechanism
            if (retryCount < 2) {
                console.log(`Retrying module load (attempt ${retryCount + 1})...`);
                setTimeout(() => loadModule(retryCount + 1), 1000);
                return;
            }
            
            // Fallback modal with error message
            const fallbackModalHTML = `
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
                ">
                    <div style="
                        background: var(--modal-bg);
                        border-radius: 20px;
                        padding: 40px;
                        max-width: 600px;
                        width: 90%;
                        text-align: center;
                        border: 1px solid var(--modal-border);
                    ">
                        <h2 style="color: var(--modal-text); margin-bottom: 20px;">${currentLanguage === 'en' ? 'Error Loading Part' : 'خطأ في تحميل الجزء'}</h2>
                        <p style="color: var(--text-light); margin-bottom: 30px;">${currentLanguage === 'en' ? 'Unable to load chapter information. Please try again.' : 'لا يمكن تحميل معلومات الفصول. يرجى المحاولة مرة أخرى.'}</p>
                        <button onclick="closeModal()" style="
                            background: var(--primary-color);
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 500;
                        ">${currentLanguage === 'en' ? 'Close' : 'إغلاق'}</button>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', fallbackModalHTML);
            
            document.getElementById('modal').addEventListener('click', function(e) {
                if (e.target.id === 'modal') {
                    closeModal();
                }
            });
        });
    };
    
    // Start loading the module
    loadModule();
}

// Function to show chapter page
function showChapterPage(partNumber, chapterNumber, chapterTitle) {
    console.log('showChapterPage called with:', partNumber, chapterNumber, chapterTitle);
    console.log('Current language:', currentLanguage);
    console.log('Current theme:', currentTheme);
    
    // First try to get content from the book data
    getChapterContent(partNumber, chapterNumber).then(content => {
        console.log('Content received:', content);
        if (content) {
            console.log('Displaying chapter page with content');
            displayChapterPage(partNumber, chapterNumber, content);
        } else {
            console.log('No content found, showing coming soon message');
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
    console.log('getChapterContent called with:', partNumber, chapterNumber);
    console.log('Current language:', currentLanguage);
    
    // Import the book content data based on language
    const bookDataModule = currentLanguage === 'ar' ? 
        import('./src/data/bookContentArabic.js') : 
        import('./src/data/bookContent.js');
    
    return bookDataModule.then(module => {
        console.log('Module loaded:', module);
        console.log('Module keys:', Object.keys(module));
        
        // Check if the required exports exist
        const bookData = currentLanguage === 'ar' ? module.bookDataArabic : module.bookData;
        const getChapterById = currentLanguage === 'ar' ? module.getChapterByIdArabic : module.getChapterById;
        
        console.log('getChapterById function:', getChapterById);
        console.log('bookData:', bookData);
        
        if (!getChapterById) {
            console.error('getChapterById function not found in module');
            return null;
        }
        
        if (!bookData) {
            console.error('bookData not found in module');
            return null;
        }
        
        // Find the chapter in the book data
        const chapter = getChapterById(chapterNumber);
        console.log('Found chapter:', chapter);
        
        if (chapter) {
            return {
                title: chapter.title,
                content: chapter.content
            };
        }
        
        console.log('No chapter found for ID:', chapterNumber);
        return null;
    }).catch(error => {
        console.error('Error loading chapter content:', error);
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
        return null;
    });
}

// Markdown parser function to convert markdown to HTML with beautiful styling
function parseMarkdown(markdown) {
    if (!markdown) return '';
    
    let html = markdown;
    
    // Convert headers
    html = html.replace(/^### (.*$)/gim, '<h3 style="color: var(--primary-color); margin: 30px 0 15px 0; font-size: 1.4rem; font-weight: 600; border-left: 4px solid var(--primary-color); padding-left: 15px;">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 style="color: var(--primary-color); margin: 35px 0 20px 0; font-size: 1.8rem; font-weight: 700; border-bottom: 2px solid var(--primary-color); padding-bottom: 10px;">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 style="color: var(--primary-color); margin: 40px 0 25px 0; font-size: 2.2rem; font-weight: 800; text-align: center;">$1</h1>');
    
    // Convert code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, language, code) {
        const lang = language || 'text';
        const bgColor = currentTheme === 'dark' ? '#2d3748' : '#f8f9fa';
        const borderColor = currentTheme === 'dark' ? '#4a5568' : '#e9ecef';
        const headerBg = currentTheme === 'dark' ? '#4a5568' : '#e9ecef';
        const headerColor = currentTheme === 'dark' ? '#e2e8f0' : '#495057';
        const textColor = currentTheme === 'dark' ? '#e2e8f0' : '#333';
        
        // Clean up the code by removing leading/trailing whitespace and normalizing indentation
        const cleanCode = code.trim().replace(/^\s+/gm, ''); // Remove leading spaces from each line
        
        return '<div class="code-block" style="background: ' + bgColor + '; border: 1px solid ' + borderColor + '; border-radius: 12px; padding: 20px; margin: 25px 0; overflow-x: auto; position: relative;">' +
               '<div style="background: ' + headerBg + '; color: ' + headerColor + '; padding: 8px 15px; border-radius: 8px 8px 0 0; margin: -20px -20px 15px -20px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">' + lang + '</div>' +
               '<pre style="margin: 0; font-family: \'Fira Code\', \'Consolas\', \'Monaco\', \'Courier New\', monospace; font-size: 0.9rem; line-height: 1.6; color: ' + textColor + '; direction: ltr; text-align: left;"><code>' + cleanCode + '</code></pre>' +
               '</div>';
               
    });
    
    // Convert inline code
    html = html.replace(/`([^`]+)`/g, '<code style="background: ' + (currentTheme === 'dark' ? '#4a5568' : '#f1f3f4') + '; color: ' + (currentTheme === 'dark' ? '#fbbf24' : '#d63384') + '; padding: 2px 6px; border-radius: 4px; font-family: \'Fira Code\', \'Consolas\', \'Monaco\', \'Courier New\', monospace; font-size: 0.9em; font-weight: 600;">$1</code>');
    
    // Convert bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 700; color: var(--text-color);">$1</strong>');
    
    // Convert italic text
    html = html.replace(/\*(.*?)\*/g, '<em style="font-style: italic; color: var(--text-color);">$1</em>');
    
    // Convert blockquotes
    html = html.replace(/^>\s+(.*$)/gim, '<blockquote style="border-left: 4px solid var(--primary-color); margin: 20px 0; padding: 15px 20px; background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%); border-radius: 0 8px 8px 0; font-style: italic; color: var(--text-light);">$1</blockquote>');
    
    // Convert tables (basic support)
    html = html.replace(/\|(.+)\|/g, function(match, row) {
        const cells = row.split('|').map(cell => cell.trim());
        return '<tr>' + cells.map(cell => '<td style="padding: 12px; border-bottom: 1px solid var(--border-color); color: var(--text-color);">' + cell + '</td>').join('') + '</tr>';
    });
    
    // Wrap table rows in table structure
    html = html.replace(/(<tr>.*<\/tr>)/s, '<table style="width: 100%; border-collapse: collapse; margin: 20px 0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px var(--shadow-color);">$1</table>');
    
    // Convert lists
    html = html.replace(/^\s*[-*+]\s+(.*$)/gim, '<li style="margin-bottom: 8px; padding-left: 10px;">$1</li>');
    html = html.replace(/(<li.*<\/li>)/s, '<ul style="margin: 20px 0; padding-left: 25px;">$1</ul>');
    
    // Convert numbered lists
    html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li style="margin-bottom: 8px; padding-left: 10px;">$1</li>');
    html = html.replace(/(<li.*<\/li>)/s, '<ol style="margin: 20px 0; padding-left: 25px;">$1</ol>');
    
    // Convert paragraphs (text that's not already wrapped in HTML tags)
    html = html.replace(/^(?!<[a-z][1-6]?|<div|<pre|<ul|<ol|<li)(.*)$/gim, '<p style="margin-bottom: 20px; line-height: 1.8; text-align: justify;">$1</p>');
    
    // Clean up multiple consecutive paragraph tags
    html = html.replace(/<\/p>\s*<p>/g, '</p><p>');
    
    return html;
}

// Function to display the chapter page with navigation and dark theme support
function displayChapterPage(partNumber, chapterNumber, content) {
    // Get navigation info
    getAllChaptersForLanguage().then(allChapters => {
        const currentIndex = allChapters.findIndex(chapter => 
            chapter.partId === partNumber && chapter.id === chapterNumber
        );
        
        console.log('Navigation debug:', {
            currentIndex,
            totalChapters: allChapters.length,
            currentPart: partNumber,
            currentChapter: chapterNumber,
            allChapters: allChapters.map(ch => ({ id: ch.id, partId: ch.partId, title: ch.title }))
        });
        
        const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;
        const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
        
        console.log('Navigation chapters:', {
            prevChapter: prevChapter ? { id: prevChapter.id, partId: prevChapter.partId, title: prevChapter.title } : null,
            nextChapter: nextChapter ? { id: nextChapter.id, partId: nextChapter.partId, title: nextChapter.title } : null
        });

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
                    ${parseMarkdown(content.content)}
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
                            <button class="nav-btn prev-btn" onclick="navigateToChapter(${prevChapter.partId}, ${prevChapter.id}, '${prevChapter.title.replace(/'/g, "\\'")}')" style="
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
                                ${currentLanguage === 'ar' ? '→' : '←'} ${currentLanguage === 'en' ? 'Previous Chapter' : 'الفصل السابق'}
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
                            <button class="nav-btn next-btn" onclick="navigateToChapter(${nextChapter.partId}, ${nextChapter.id}, '${nextChapter.title.replace(/'/g, "\\'")}')" style="
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
                                ${currentLanguage === 'en' ? 'Next Chapter' : 'الفصل التالي'} ${currentLanguage === 'ar' ? '←' : '→'}
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
                        ${parseMarkdown(content.content)}
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
                <div style="
                    font-size: 4rem;
                    margin-bottom: 30px;
                    color: ${currentTheme === 'dark' ? '#fbbf24' : '#667eea'};
                ">🚧</div>
                <h1 style="
                    font-size: 2rem;
                    margin-bottom: 20px;
                    color: ${currentTheme === 'dark' ? '#e2e8f0' : '#333'};
                ">${currentLanguage === 'en' ? 'Coming Soon!' : 'قريباً!'}</h1>
                <p style="
                    font-size: 1.1rem;
                    margin-bottom: 30px;
                    color: ${currentTheme === 'dark' ? '#a0aec0' : '#666'};
                    line-height: 1.6;
                ">${currentLanguage === 'en' ? 
                    `Chapter ${chapterNumber} of Part ${partNumber} is currently under development. We're working hard to bring you the best content possible.` :
                    `الفصل ${chapterNumber} من الجزء ${partNumber} قيد التطوير حالياً. نحن نعمل بجد لتقديم أفضل محتوى ممكن.`
                }</p>
                <button onclick="goBack()" style="
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='var(--secondary-color)'" onmouseout="this.style.background='var(--primary-color)'">
                    ${currentLanguage === 'en' ? '← Back to Parts' : '← العودة للأجزاء'}
                </button>
            </div>
        </div>
    `;
    
    document.body.innerHTML = comingSoonHTML;
    updateTheme();
}

// Function to get all chapters for current language
function getAllChaptersForLanguage() {
    console.log('getAllChaptersForLanguage called for language:', currentLanguage);
    
    // Import the book content data based on language
    const bookDataModule = currentLanguage === 'ar' ? 
        import('./src/data/bookContentArabic.js') : 
        import('./src/data/bookContent.js');
    
    return bookDataModule.then(module => {
        console.log('Module loaded for getAllChapters:', module);
        console.log('Module keys:', Object.keys(module));
        
        // Check if the required exports exist
        const getAllChapters = currentLanguage === 'ar' ? module.getAllChaptersArabic : module.getAllChapters;
        
        console.log('getAllChapters function:', getAllChapters);
        
        if (!getAllChapters) {
            console.error('getAllChapters function not found in module');
            throw new Error('getAllChapters function not found');
        }
        
        const chapters = getAllChapters();
        console.log('Retrieved chapters:', chapters);
        console.log('Number of chapters:', chapters.length);
        
        // Validate chapter data
        if (chapters && chapters.length > 0) {
            console.log('First chapter:', chapters[0]);
            console.log('Last chapter:', chapters[chapters.length - 1]);
            
            // Check for any chapters with missing data
            const invalidChapters = chapters.filter(ch => !ch.id || !ch.title || !ch.partId);
            if (invalidChapters.length > 0) {
                console.warn('Found chapters with missing data:', invalidChapters);
            }
        }
        
        return chapters;
    }).catch(error => {
        console.error('Error loading chapters:', error);
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
        
        // Fallback to hardcoded chapters if import fails
        if (currentLanguage === 'en') {
            return [
                { partId: 1, id: 1, title: "Beyond the Widget: Understanding Flutter's Three Trees" },
                { partId: 1, id: 2, title: "The Flutter Build Process: From Dart to Native" },
                { partId: 1, id: 3, title: "Flutter SDK Management" },
                { partId: 1, id: 4, title: "Performance and Memory Optimization" },
                { partId: 1, id: 5, title: "Advanced Debugging" },
                { partId: 1, id: 6, title: "Building Advanced Custom Widgets" },
                { partId: 1, id: 7, title: "Advanced State Management" },
                { partId: 1, id: 8, title: "Advanced Application Testing" },
                { partId: 1, id: 9, title: "Advanced Performance Optimization" },
                { partId: 1, id: 10, title: "Deployment and Distribution" },
                { partId: 2, id: 11, title: "Responsive Design and Adaptive UIs" },
                { partId: 2, id: 12, title: "MVVM Architecture in Flutter" },
                { partId: 2, id: 13, title: "Advanced Navigation and Routing" },
                { partId: 2, id: 14, title: "Custom Widgets and Composability" },
                { partId: 2, id: 15, title: "Internationalization and Localization" },
                { partId: 2, id: 16, title: "Security Best Practices" },
                { partId: 2, id: 17, title: "Advanced Animation Techniques" },
                { partId: 3, id: 18, title: "Essential Flutter Packages" },
                { partId: 3, id: 19, title: "Advanced State Management Patterns" },
                { partId: 3, id: 20, title: "Practical Problem-Solving Scenarios" }
            ];
        } else {
            return [
                { partId: 1, id: 1, title: "ما وراء الـ Widget: فهم الأشجار الثلاث لـ Flutter" },
                { partId: 1, id: 2, title: "عملية بناء Flutter: من Dart إلى Native" },
                { partId: 1, id: 3, title: "إدارة إصدارات Flutter SDK" },
                { partId: 1, id: 4, title: "تحسين الأداء والذاكرة" },
                { partId: 1, id: 5, title: "تصحيح الأخطاء المتقدم" },
                { partId: 1, id: 6, title: "بناء Widgets مخصصة متقدمة" },
                { partId: 1, id: 7, title: "إدارة الحالة المتقدمة" },
                { partId: 1, id: 8, title: "اختبار التطبيقات المتقدم" },
                { partId: 1, id: 9, title: "تحسين الأداء المتقدم" },
                { partId: 1, id: 10, title: "النشر والتوزيع" },
                { partId: 2, id: 11, title: "التصميم المتجاوب وواجهات المستخدم التكيفية" },
                { partId: 2, id: 12, title: "هندسة MVVM في Flutter" },
                { partId: 2, id: 13, title: "التنقل المتقدم والتوجيه" },
                { partId: 2, id: 14, title: "العناصر المخصصة والقابلية للتركيب" },
                { partId: 2, id: 15, title: "التدويل والتعريب" },
                { partId: 2, id: 16, title: "أفضل ممارسات الأمان" },
                { partId: 2, id: 17, title: "تقنيات الرسوم المتحركة المتقدمة" },
                { partId: 3, id: 18, title: "الحزم الأساسية لـ Flutter" },
                { partId: 3, id: 19, title: "أنماط إدارة الحالة المتقدمة" },
                { partId: 3, id: 20, title: "سيناريوهات حل المشاكل العملية" }
            ];
        }
    });
}

// Function to navigate to a specific chapter
function navigateToChapter(partNumber, chapterNumber, chapterTitle) {
    console.log('navigateToChapter called with:', partNumber, chapterNumber, chapterTitle);
    console.log('Current language:', currentLanguage);
    console.log('Current theme:', currentTheme);
    
    // Validate parameters
    if (!partNumber || !chapterNumber) {
        console.error('Invalid navigation parameters:', { partNumber, chapterNumber, chapterTitle });
        return;
    }
    
    try {
        showChapterPage(partNumber, chapterNumber, chapterTitle);
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error in navigateToChapter:', error);
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
    }
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