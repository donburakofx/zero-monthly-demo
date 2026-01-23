// ==========================================================================
//  階層判定ロジック
//  HTML側で window.rootPath が指定されていればそれを使う、なければ空文字（同階層）
// ==========================================================================
const root = window.rootPath || '';

// ==========================================================================
//  共通パーツ定義 (Header & Footer)
//  ※すべてのリンク（href, src）の前に ${root} を付けています
// ==========================================================================

const headerContent = `
    <div class="container header-inner">
        <h1 class="logo"><a href="${root}index.html">Standard Corp.</a></h1>
        
        <button class="hamburger">
            <span class="bar"></span><span class="bar"></span><span class="bar"></span>
        </button>

        <nav class="nav-menu">
            <a href="${root}index.html" class="nav-link">Home</a>
            <a href="${root}services.html" class="nav-link">Service</a>
            <a href="${root}about.html" class="nav-link">About</a>
            <a href="${root}contact.html" class="btn btn-primary nav-btn">Contact Us</a>
        </nav>
    </div>
`;

const footerContent = `
    <div class="container">
        <div class="footer-grid">
            <div class="footer-col">
                <span class="footer-logo">Standard Corp.</span>
                <p class="footer-info">
                    東京都千代田区大手町 1-1-1<br>
                    スタンダードビル 5F<br>
                    Tel: 03-1234-5678
                </p>
            </div>
            
            <div class="footer-col">
                <h4 class="footer-heading">Links</h4>
                <ul class="footer-links">
                    <li><a href="${root}index.html">ホーム</a></li>
                    <li><a href="${root}services.html">サービス</a></li>
                    <li><a href="${root}about.html">会社概要</a></li>
                    <li><a href="${root}contact.html">お問い合わせ</a></li>
                </ul>
            </div>
            
            <div class="footer-col">
                <h4 class="footer-heading">Legal</h4>
                <ul class="footer-links">
                    <li><a href="${root}privacy.html">プライバシーポリシー</a></li>
                    <li><a href="${root}law.html">特定商取引法に基づく表記</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Standard Corp. All Rights Reserved.</p>
        </div>
    </div>
`;

// ==========================================================================
//  書き出し処理
// ==========================================================================

// ヘッダーの書き出し
const headerElem = document.querySelector('.header');
if (headerElem) {
    headerElem.innerHTML = headerContent;
    
    // 現在地ハイライト処理
    // 下層ページにいる場合、ファイル名だけで判定するのが難しいため
    // URLの末尾とリンク先が一致するかどうかで簡易判定します
    const currentPath = window.location.pathname;
    const navLinks = headerElem.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // リンク先のファイル名を取得 (例: services.html)
        const linkHref = link.getAttribute('href').replace(root, '');
        
        // 現在のURLにそのファイル名が含まれているか、
        // またはトップページ(index.html)かつルートパス("/")の場合
        if (currentPath.endsWith(linkHref) || (linkHref === 'index.html' && currentPath.endsWith('/'))) {
            // 下層ページ(info/)にいる時はハイライトさせない、などの調整も可能ですが
            // 今回はシンプルにファイル名一致で判定します
            link.style.color = 'var(--accent)';
            link.style.borderBottom = '2px solid var(--accent)';
        }
    });
}

// フッターの書き出し
const footerElem = document.querySelector('.footer');
if (footerElem) {
    footerElem.innerHTML = footerContent;
}

// ==========================================================================
//  Color Switcher (デモ用：全ページに自動挿入)
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
    
    // スイッチャーのHTML定義
    const switcherHTML = `
        <div class="color-switcher">
            <span class="color-label">COLOR:</span>
            <div class="color-btn" data-theme="" title="Pattern A: Standard Navy"></div>
            <div class="color-btn" data-theme="theme-b" title="Pattern B: Trust Blue"></div>
            <div class="color-btn" data-theme="theme-c" title="Pattern C: Fresh Green"></div>
            <div class="color-btn" data-theme="theme-d" title="Pattern D: Passion Red"></div>
            <div class="color-btn" data-theme="theme-e" title="Pattern E: Modern Dark"></div>
        </div>
    `;

    // bodyの末尾に追加
    document.body.insertAdjacentHTML('beforeend', switcherHTML);

    // クリックイベントの設定
    const buttons = document.querySelectorAll('.color-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            
            // bodyのクラスを一旦リセット
            document.body.className = '';
            
            // 選択されたテーマクラスを追加（空ならデフォルト）
            if (theme) {
                document.body.classList.add(theme);
            }
        });
    });
});