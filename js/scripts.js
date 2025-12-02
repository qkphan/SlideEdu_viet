(async function(){
  const modules = [
    ['#header','modules/header.html'],
    ['#hero','modules/hero.html'],
    ['#main-content','modules/main-content.html'],
    // ['#main-content','modules/section_intro.html'],
    // ['#main-content','modules/section_install.html'],
    // ['#main-content','modules/section_ui.html'],
    // ['#main-content','modules/section_usage.html'],
    // ['#main-content','modules/section_tips.html'],
    // ['#main-content','modules/section_flow.html'],
    ['#footer','modules/footer.html']
    // ['#footer','modules/section_contact.html']
  ];

  async function loadModule(selector,url){
    const res = await fetch(url);
    const html = await res.text();
    document.querySelector(selector).innerHTML += html;
  }

  for(const [sel,url] of modules) await loadModule(sel,url);

  // === DARK/LIGHT MODE ===
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const THEME_KEY = 'slideedu_theme';
  const saved = localStorage.getItem(THEME_KEY);
  if(saved) root.classList.toggle('dark', saved==='dark');

  toggle?.addEventListener('click', ()=>{
    root.classList.toggle('dark');
    const theme = root.classList.contains('dark')?'dark':'light';
    localStorage.setItem(THEME_KEY,theme);
    toggle.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:260,easing:'ease-out'});
  });

  // === Hamburger ===
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  hamburger?.addEventListener('click', ()=>{ navLinks.classList.toggle('open'); });

  navLinks?.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click',()=>navLinks.classList.remove('open'));
  });

  document.addEventListener('keydown',(e)=>{
    if(e.key==='Escape') navLinks?.classList.remove('open');
  });

  // === WebView warning ===
  const ua = navigator.userAgent.toLowerCase();
  if(ua.includes("zalo")||ua.includes("fbav")||ua.includes("instagram")||ua.includes("webview")||ua.includes("telegram")||ua.includes("line")){
    const w = document.getElementById('webview-warning');
    w.style.display='block';
    w.innerHTML = `⚠️ Bạn đang mở trong WebView. Vui lòng mở bằng Chrome/Edge/Firefox.<br><br>
      <a href="https://slideedu-viet.onrender.com/" target="_blank" class="btn-download">Mở bằng Chrome</a>`;
  }

  // === Reveal on scroll ===
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('revealed'); io.unobserve(e.target); }
    });
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(r=>io.observe(r));
})();
