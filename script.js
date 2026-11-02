(() => {
  const search = document.getElementById('search');
  const cards = [...document.querySelectorAll('.font-card')];
  const filters = [...document.querySelectorAll('.filter')];
  const count = document.getElementById('count');
  const empty = document.getElementById('empty');
  let active = 'all';
  function update() {
    const q = (search?.value || '').trim().toLocaleLowerCase('ar'); let shown=0;
    cards.forEach(card => { const name=(card.dataset.name||'').toLocaleLowerCase('ar'); const cats=(card.dataset.category||'').split(' '); const ok=(active==='all'||cats.includes(active))&&name.includes(q); card.hidden=!ok; if(ok)shown++; });
    if(count) count.textContent=shown+' خط'; if(empty) empty.hidden=shown!==0;
  }
  filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');active=btn.dataset.filter;update();}));
  search?.addEventListener('input',update);
  document.querySelectorAll('[data-jump]').forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.jump;filters.forEach(b=>b.classList.toggle('active',b.dataset.filter===active));update();document.getElementById('fonts')?.scrollIntoView({behavior:'smooth'});}));
  const nav=document.getElementById('nav'); document.getElementById('menu')?.addEventListener('click',()=>nav?.classList.toggle('open')); document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
  const year=document.getElementById('year'); if(year)year.textContent=new Date().getFullYear();
  const panel=document.getElementById('topSearchPanel'); document.getElementById('topSearch')?.addEventListener('click',()=>{panel?.classList.toggle('open');if(panel?.classList.contains('open'))search?.focus();}); document.getElementById('closeSearch')?.addEventListener('click',()=>panel?.classList.remove('open'));
  function closeLogin(){modal?.classList.remove('open');modal?.setAttribute('aria-hidden','true');} document.getElementById('loginClose')?.addEventListener('click',closeLogin); modal?.addEventListener('click',e=>{if(e.target===modal)closeLogin();});
  document.getElementById('loginForm')?.addEventListener('submit',e=>{e.preventDefault();const m=document.getElementById('loginMessage');if(m)m.textContent='تسجيل الدخول الحقيقي يحتاج ربط فونتريكس بخدمة حسابات آمنة. لم يتم إنشاء حساب في هذه النسخة.';});
  const settings=document.getElementById('settingsModal'); const openSettings=()=>{settings?.classList.add('open');settings?.setAttribute('aria-hidden','false');}; const closeSettings=()=>{settings?.classList.remove('open');settings?.setAttribute('aria-hidden','true');}; document.getElementById('settingsOpen')?.addEventListener('click',openSettings); document.getElementById('settingsClose')?.addEventListener('click',closeSettings); settings?.addEventListener('click',e=>{if(e.target===settings)closeSettings();});
  const theme=document.getElementById('themeSelect'), size=document.getElementById('previewSize'), motion=document.getElementById('motionToggle');
  function applyPrefs(){const t=localStorage.getItem('fontira-theme')||'dark';const z=localStorage.getItem('fontira-size')||'normal';const r=localStorage.getItem('fontira-motion')==='true';document.body.classList.toggle('light-theme',t==='light');document.body.classList.toggle('preview-size-large',z==='large');document.body.classList.toggle('reduce-motion',r);if(theme)theme.value=t;if(size)size.value=z;if(motion)motion.checked=r;}
  theme?.addEventListener('change',()=>{localStorage.setItem('fontira-theme',theme.value);applyPrefs();}); size?.addEventListener('change',()=>{localStorage.setItem('fontira-size',size.value);applyPrefs();}); motion?.addEventListener('change',()=>{localStorage.setItem('fontira-motion',String(motion.checked));applyPrefs();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeSettings();}}); applyPrefs(); update();
})();
