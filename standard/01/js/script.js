document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================================
    // 1. ハンバーガーメニュー (スマホ用)
    // ===============================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if(hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // メニューリンクをクリックしたら閉じる
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // ===============================================
    // 2. スムーススクロール
    // ===============================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // ヘッダー分調整
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===============================================
    // 3. FAQ アコーディオン
    // ===============================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if(question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });

    // ===============================================
    // 4. トップへ戻るボタン & ふわっと表示 (修正版)
    // ===============================================
    const scrollTopBtn = document.querySelector('.scroll-top');
    const fadeElements = document.querySelectorAll('.fade-in');

    // 表示判定を行う関数
    const checkFade = () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // 画面の下から100pxくらい入ったら表示
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    // スクロール時の動作
    window.addEventListener('scroll', function() {
        // A. トップへ戻るボタン
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
        // B. フェードイン判定
        checkFade();
    });

    checkFade();

    // トップへ戻るボタンクリック
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});