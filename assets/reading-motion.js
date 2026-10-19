/* Keep proposed actions in plain language the applicant can explain. */
(() => {
 const root=document.querySelector('#premortem');if(!root)return;
 const decision=root.querySelector('#risk-stockout .risk-decision p');
 if(decision)decision.textContent='잘 팔리는 컬러·사이즈의 재고가 부족해지는지 확인합니다. 고객이 찾는 상품이 없으면 다른 매장에서 받을 수 있는지와 언제 도착하는지를 확인합니다.';
 const follow=root.querySelector('#risk-stockout .risk-response li:last-child p');
 if(follow)follow.textContent='같은 상품을 찾는 고객이 계속 있는지 매장에 확인하고, 본사에 추가 입고가 가능한지 문의합니다. 입고 일정이 정해지면 매장에 전달하고 실제 도착 여부를 확인합니다.';
 const substitutions=[['SKU·컬러·사이즈별','상품·컬러·사이즈별'],['SKU·옵션','상품·컬러·사이즈'],['이동 경제성','이동 시 확인할 점'],['체류 기간','팔리지 않고 남아 있는 기간'],['체류 재고','팔리지 않고 남은 재고'],['소요일','걸리는 시간'],['구매 전환','구매로 이어지는 비율'],['옵션 가용성','컬러·사이즈별 재고 유무'],['옵션 부재','원하는 컬러·사이즈 부족'],['집행 비용','사용한 비용'],['상신합니다','본사에 보고합니다']];
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;
 while(node=walker.nextNode()){let t=node.nodeValue;substitutions.forEach(([a,b])=>t=t.split(a).join(b));node.nodeValue=t;}
})();
/* Interview correction confirmed by the interviewer; Rodeo transcript 00:08–00:09 says visits are rare. */
(() => {
 const answers=document.querySelectorAll('#interview-hq .scene-answer');
 const g=answers[0]?.querySelector(':scope > p');
 if(g)g.textContent='판매 직원 기준으로 본사와의 주요 소통은 매니저가 담당한다고 답했습니다. 인터뷰 확인 내용에 따르면 본사 영업 담당자는 대전 갤러리아 매장을 방문하지 않습니다.';
 const r=answers[1]?.querySelector(':scope > p');
 if(r)r.textContent='인터뷰 확인 내용에 따르면 본사 영업 담당자는 대전 로데오 매장을 방문하지 않습니다. 본사 영업부·영업MD와는 수시로 통화하며 매출뿐 아니라 직원 운영, 매장 환경 변화와 상품 반응을 공유한다고 설명했습니다.';
})();
/* Compact interview and pre-mortem readers. */
(() => {
'use strict';
const style=document.createElement('style');
style.textContent=`
#interviewStory.deck-ready{padding:48px 0;margin-top:48px}
.deck-ready .interview-intro{padding-top:0;padding-bottom:20px;min-height:0}
.deck-ready .interview-intro h3,.deck-ready .premortem-opening h3{font-size:clamp(28px,3vw,42px);margin:10px 0;line-height:1.2}
.deck-ready .interview-intro h3 br,.deck-ready .premortem-opening h3 br{display:none}
.deck-ready .interview-intro p,.deck-ready .risk-lead{font-size:15px;line-height:1.65;margin:10px 0;max-width:800px}
.deck-ready .story-scroll-hint,.deck-ready .interview-progress,.deck-ready .scene-next,.deck-ready .risk-reading-index,.deck-ready .risk-reading-guide{display:none!important}
#premortem.deck-ready{padding:48px 0}
.deck-ready .premortem-opening{margin:0 0 24px;padding:0;min-height:0}
.deck-ready .risk-future{font-size:14px;margin:0}
.deck-ready .risk-scope{font-size:12px;line-height:1.6;margin:12px 0;padding:10px 14px}
.compact-deck{--deck-bg:#faf9f7;--deck-fg:#252321;--deck-line:#dedad5;color:var(--deck-fg);background:var(--deck-bg);border:1px solid var(--deck-line);border-radius:20px;overflow:clip;scroll-margin-top:90px}
#premortem .compact-deck{--deck-bg:#1d1c1b;--deck-fg:#f8f6f3;--deck-line:#504b46}
.deck-toolbar{position:sticky;top:64px;z-index:8;background:var(--deck-bg);border-bottom:1px solid var(--deck-line);padding:18px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.deck-label{font-size:17px;font-weight:750}.deck-hint{font-size:12px;opacity:.75;margin-top:5px}
.deck-controls{display:flex;align-items:center;gap:10px;flex-shrink:0}
.compact-deck button{font:inherit;cursor:pointer}
.deck-controls button{min-height:44px;min-width:46px;padding:8px 14px;border:1px solid var(--deck-line);border-radius:30px;background:transparent;color:inherit}
.deck-controls .deck-next{background:#d6cabe;color:#24201d;border-color:#d6cabe;font-weight:700}
.deck-controls button:disabled{opacity:.35;cursor:default}
.deck-count{font-size:13px;min-width:48px;text-align:center;font-variant-numeric:tabular-nums}
.deck-topics{display:flex;gap:8px;padding:14px 24px;flex-wrap:wrap;border-bottom:1px solid var(--deck-line)}
.deck-topics button{padding:9px 13px;border:1px solid var(--deck-line);border-radius:24px;background:transparent;color:inherit;font-size:13px;min-height:40px}
.deck-topics button[aria-pressed=true]{background:var(--deck-fg);color:var(--deck-bg);border-color:var(--deck-fg)}
.compact-deck :focus-visible{outline:3px solid #8f8176;outline-offset:3px}
.deck-stage{overflow-anchor:none;min-height:445px;touch-action:pan-y pinch-zoom}
.compact-deck .interview-scene,.compact-deck .risk-case{padding:24px;min-height:0;margin:0;border:0;display:block;scroll-margin-top:200px}
.compact-deck [hidden]{display:none!important}
.compact-deck .scene-heading,.compact-deck .risk-case-heading{display:flex;gap:18px;align-items:center;margin:0 0 20px;padding:0}
.compact-deck .scene-number,.compact-deck .risk-case-number{font-size:34px;color:inherit;min-width:48px;line-height:1}
.compact-deck .scene-heading h4,.compact-deck .risk-case h4{font-size:clamp(22px,2.6vw,32px);margin:6px 0 0;line-height:1.35}
.compact-deck .scene-heading h4 br{display:none}
.compact-deck .scene-answers{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.compact-deck .scene-answer{padding:20px;border:1px solid var(--deck-line);border-radius:14px;background:#fff}
.compact-deck .scene-store{font-size:13px;margin-bottom:12px}
.compact-deck .scene-store span{font-size:12px}
.compact-deck .scene-answer>p{font-size:16px;line-height:1.65;margin:12px 0}
.compact-deck .scene-takeaway{padding:16px;margin:18px 0 0;gap:16px;border-radius:12px;background:#efedea}
.compact-deck .scene-takeaway p{font-size:14px;line-height:1.65}
.compact-deck .scene-takeaway span{font-size:11px}
.deck-detail{margin-top:14px;border-top:1px solid var(--deck-line);padding-top:12px}
.deck-detail summary{font-size:13px;font-weight:650;cursor:pointer;min-height:32px}
.deck-detail .scene-evidence{margin:12px 0;padding:12px;font-size:14px}
.deck-detail p,.deck-detail blockquote{font-size:14px!important;line-height:1.7!important}
.risk-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.risk-summary section{padding:20px;background:#292623;border:1px solid var(--deck-line);border-radius:14px}
.risk-summary strong{display:block;font-size:14px;color:#d6cabe;margin-bottom:14px}
.risk-summary p{font-size:16px;line-height:1.65;color:#f8f6f3;margin:0}
.compact-deck .risk-cause{padding:14px 0;margin:0 0 18px}
.compact-deck .risk-cause p{font-size:14px;line-height:1.65}
.compact-deck .risk-basis,.compact-deck .risk-decision,.compact-deck .risk-review{margin:18px 0;padding:18px}
.compact-deck .risk-response-grid{margin:18px 0}
.compact-deck .risk-response-grid>section{padding:20px}
.deck-end{display:block;border-top:1px solid var(--deck-line);padding:13px 24px;font-size:12px;opacity:.8}
@media(max-width:640px){
.deck-toolbar{padding:14px;top:56px;flex-wrap:wrap;gap:10px}.deck-label{font-size:15px}.deck-controls{margin-left:auto}.deck-hint{font-size:11px}
.deck-topics{padding:10px 14px;gap:6px}.deck-topics button{font-size:12px;padding:7px 10px}
.compact-deck .interview-scene,.compact-deck .risk-case{padding:18px 14px}
.compact-deck .scene-answers,.risk-summary{grid-template-columns:1fr;gap:10px}
.compact-deck .scene-answer,.risk-summary section{padding:14px}
.compact-deck .scene-answer>p,.risk-summary p{font-size:14px;margin:7px 0}
.compact-deck .scene-takeaway{display:block}.compact-deck .scene-takeaway span{display:block;margin-bottom:8px}
.compact-deck .scene-heading,.compact-deck .risk-case-heading{gap:12px}
.deck-stage{min-height:590px}.risk-summary strong{margin-bottom:6px}
}
@media print{.compact-deck [hidden]{display:block!important}.deck-toolbar,.deck-topics{display:none}.deck-stage{min-height:0}}
`;
document.head.append(style);
document.querySelectorAll('.interview-intro h3 br,.premortem-opening h3 br,.scene-heading h4 br').forEach(br=>br.replaceWith(document.createTextNode(' '))); 
const topics=['👥 고객','📞 본사 소통','📦 상품 공급','🚚 재고 이동','👗 진열 기준'];
const answers=[
['50–70대 중심 · 40대와 모녀 고객도 방문','40–60대 중심 · 단골 고객 비중이 높음'],
['매니저가 본사 소통 담당 · 대전 매장 방문 없음','대전 매장 방문 없음 · 영업·영업MD와 수시 통화'],
['시즌에 맞춰 입고 · 부족하면 타 매장 재고 활용','컬러·사이즈 분산 공급 · 인기 상품 리오더 논의'],
['매장 간 수평 이동 · 입출고 내역 전산 반영','매장별 판매 차이에 맞춰 상품 로테이션'],
['매니저 중심으로 매장 디스플레이 운영','본사 참고 가이드 + 현장 스타일링 자율성']
];
const riskTopics=['📦 옵션 결품','🎯 채널 차이','📡 정보 지연','⚖️ 재고 편중','🌱 신규 고객'];
const riskSummary=[
['잘 팔리는 컬러·사이즈의 재고가 부족해지는지 확인','옵션별 판매·문의와 이동 가능한 재고를 사전 점검','실재고 확인 → 이동·대체 상품 협의 → 리오더 검토'],
['방문은 유지되는데 구매 전환이 떨어지는지 확인','매장별 구매·미구매 사유 기록, 추천 방식 소규모 시험','이탈 지점 확인 → 한 요소 변경 → 같은 조건으로 비교'],
['같은 문제가 반복되거나 담당자·확인일이 없는지 확인','변화·영향·지원·담당·확인일을 짧게 공유','사실 확인 → 담당·기한 확정 → 현장에서 해결 확인'],
['같은 옵션이 한 매장엔 남고 다른 매장엔 부족한지 확인','옵션별 판매·재고 비교, 이동 승인·입고 절차 정리','양쪽 실재고 확인 → 판매 가능성 비교 → 이동 후 판매 추적'],
['신규 고객 비중과 실제 구매자 수를 함께 확인','신규·기존 고객과 유입 경로 기록, 작은 접점 실험','유입·전환 원인 구분 → 접점 보완 → 재방문·비용 확인']
];
function disclosure(label,nodes){
 const d=document.createElement('details'),s=document.createElement('summary');d.className='deck-detail';s.textContent=label;d.append(s,...nodes);return d;
}
document.querySelectorAll('.interview-scene').forEach((slide,i)=>{
 slide.querySelector('.scene-number').textContent=topics[i].split(' ')[0];
 slide.querySelectorAll('.scene-answer').forEach((answer,j)=>{
  const original=answer.querySelector(':scope > p'),evidence=answer.querySelector('.scene-evidence');
  const summary=document.createElement('p');summary.textContent=answers[i][j];original.before(summary);
  answer.append(disclosure('인터뷰 원문·근거 펼치기',[original,evidence].filter(Boolean)));
 });
 slide.querySelector('.scene-next')?.remove();
});
document.querySelectorAll('.risk-case').forEach((slide,i)=>{
 slide.querySelector('.risk-case-number').textContent=riskTopics[i].split(' ')[0];
 const summary=document.createElement('div');summary.className='risk-summary';
 ['🔎 조기 신호','🛡️ 사전 예방','⚡ 발생 시 대응'].forEach((label,j)=>{
 const section=document.createElement('section'),h=document.createElement('strong'),p=document.createElement('p');
 h.textContent=label;p.textContent=riskSummary[i][j];section.append(h,p);summary.append(section);
 });
 const nodes=Array.from(slide.children).filter(n=>!n.matches('.risk-case-heading,.risk-cause'));
 slide.append(summary,disclosure('현장 근거·변수·상세 대응 계획 펼치기',nodes));
});
function setup(rootSelector,slideSelector,labels,title){
 const root=document.querySelector(rootSelector),slides=Array.from(root?.querySelectorAll(slideSelector)||[]);
 if(!root||!slides.length)return;
 root.classList.add('deck-ready');
 const deck=document.createElement('section');deck.className='compact-deck';deck.setAttribute('aria-label',title+' 슬라이드');deck.setAttribute('aria-roledescription','캐러셀');
 const toolbar=document.createElement('div');toolbar.className='deck-toolbar';
 toolbar.innerHTML='<div><div class="deck-label"></div><div class="deck-hint">화살표로 넘기거나 좌우로 스와이프하세요</div></div><div class="deck-controls"><button type="button" class="deck-prev">←</button><span class="deck-count" aria-live="polite" aria-atomic="true"></span><button type="button" class="deck-next">다음 →</button></div>';
 toolbar.querySelector('.deck-label').textContent=title;
 const prev=toolbar.querySelector('.deck-prev'),next=toolbar.querySelector('.deck-next'),count=toolbar.querySelector('.deck-count');
 prev.setAttribute('aria-label',title+' 이전 슬라이드');next.setAttribute('aria-label',title+' 다음 슬라이드');
 const nav=document.createElement('nav');nav.className='deck-topics';nav.setAttribute('aria-label',title+' 주제 선택');
 const stage=document.createElement('div');stage.className='deck-stage';stage.id=root.id+'-slides';stage.tabIndex=0;stage.setAttribute('aria-label',title+' 내용. 좌우 방향키로 이동');
 prev.setAttribute('aria-controls',stage.id);next.setAttribute('aria-controls',stage.id);
 const end=document.createElement('span');end.className='deck-end';
 slides[0].before(deck);deck.append(toolbar,nav,stage,end);stage.append(...slides);
 let active=0;
 const buttons=labels.map((label,i)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.setAttribute('aria-controls',slides[i].id);b.addEventListener('click',()=>show(i));nav.append(b);return b;});
 function show(index,animate=true){
 const old=active, scrollBefore=window.scrollY;active=Math.max(0,Math.min(slides.length-1,index));
 slides.forEach((slide,i)=>{slide.hidden=i!==active;slide.setAttribute('aria-label',(i+1)+' / '+slides.length+' · '+labels[i]);buttons[i].setAttribute('aria-pressed',String(i===active));if(i!==active)slide.querySelectorAll('details').forEach(d=>d.open=false);});
 prev.disabled=active===0;next.disabled=active===slides.length-1;
 count.textContent=String(active+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
 end.textContent=active===slides.length-1?'마지막 카드입니다 · 아래에서 다음 섹션을 이어 보세요':'다음 카드 · '+labels[active+1]+' →';
 if(animate&&old!==active)window.scrollTo({top:scrollBefore,behavior:'instant'});
 if(animate&&old!==active&&!matchMedia('(prefers-reduced-motion: reduce)').matches)slides[active].animate([{opacity:.3,transform:'translateX('+((active>old?1:-1)*22)+'px)'},{opacity:1,transform:'translateX(0)'}],{duration:240,easing:'ease-out'});
 }
 prev.addEventListener('click',()=>show(active-1));next.addEventListener('click',()=>show(active+1));
 deck.addEventListener('keydown',e=>{if(e.target.closest('details,input,textarea,select'))return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();show(active+(e.key==='ArrowRight'?1:-1));} });
 let start=null;
 stage.addEventListener('touchstart',e=>{start=e.touches.length===1?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null;},{passive:true});
 stage.addEventListener('touchcancel',()=>start=null,{passive:true});
 stage.addEventListener('touchend',e=>{if(!start||!e.changedTouches.length)return;const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;start=null;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)show(active+(dx<0?1:-1));},{passive:true});
 function hash(){const i=slides.findIndex(s=>'#'+s.id===location.hash);if(i>=0){show(i,false);deck.scrollIntoView({block:'start'});}}
 addEventListener('hashchange',hash);show(0,false);if(slides.some(s=>'#'+s.id===location.hash))requestAnimationFrame(hash);
}
setup('#interviewStory','.interview-scene',topics,'인터뷰 · 다섯 가지 질문');
setup('#premortem','.risk-case',riskTopics,'프리모텀 · 다섯 가지 리스크');
})();

(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const definitions = [
    ['.workshop','ZARA · 함께 배운 매장 운영'],
    ['.experience-workmap-intro','ZARA · 업무 흐름과 실무 역할'],
    ['.field-hero','01 · 영업의 시선으로 매장 방문'],
    ['.field-visit','01 · 두 매장의 현장 기록'],
    ['.compare-section','01 · 같은 브랜드, 다른 고객'],
    ['#interviewStory','인터뷰 · 다섯 가지 질문'],
    ['.findings','04 · 현장에서 확인한 세 가지'],
    ['#researchToAction','현장 조사에서 예방·대응 보고서로'],
    ['#premortem','프리모텀 · 가정에서 대응으로'],
    ['#project02','02 · Inventory Response Simulator'],
    ['#project03','03 · Sales & Inventory Dashboard'],
    ['#monthlyReport','03 · 월별 매장 운영 보고서'],
    ['#project04','04 · Musinsa Standard Womens'],
    ['#whyme','WHY ME · SPA 경험이 경쟁력이 되는 시점']
  ];
  const chapters = definitions.map(([selector,label],i) => {
    const element=document.querySelector(selector);
    if(!element) return null;
    if(!element.id) element.id=`reading-chapter-${i+1}`;
    element.classList.add('story-chapter');
    return {element,label};
  }).filter(Boolean);
  if(!chapters.length) return;

  const dock=document.createElement('nav');
  dock.className='reading-dock';
  dock.setAttribute('aria-label','포트폴리오 읽기 진행과 장 이동');
  dock.hidden=true;
  dock.innerHTML=`<div class="reading-menu" id="readingMenu" hidden></div>
    <div class="reading-controls"><span class="reading-position"></span>
    <button class="reading-current" type="button" aria-controls="readingMenu" aria-expanded="false"><strong></strong><small>목차 열기</small></button>
    <button class="reading-arrow reading-prev" type="button" aria-label="이전 장으로 이동">↑</button>
    <button class="reading-arrow reading-next" type="button" aria-label="다음 장으로 이동">↓</button></div>
    <div class="reading-meter" role="progressbar" aria-label="현재 장 읽기 진행률" aria-valuemin="0" aria-valuemax="100"><i></i></div>`;
  document.body.append(dock);
  const menu=dock.querySelector('.reading-menu'), toggle=dock.querySelector('.reading-current');
  const prev=dock.querySelector('.reading-prev'), next=dock.querySelector('.reading-next');
  const meter=dock.querySelector('.reading-meter'), fill=meter.firstElementChild;
  let current=0, pending=false;
  function closeMenu(){ menu.hidden=true; toggle.setAttribute('aria-expanded','false'); }
  function go(index){
    const chapter=chapters[index];
    if(!chapter) return;
    closeMenu();
    chapter.element.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
  }
  const links=chapters.map((chapter,index)=>{
    const link=document.createElement('a');
    link.href='#'+chapter.element.id;
    const number=document.createElement('span');
    number.textContent=String(index+1).padStart(2,'0');
    link.append(number,document.createTextNode(chapter.label));
    link.addEventListener('click',event=>{event.preventDefault();go(index);toggle.focus({preventScroll:true});});
    menu.append(link);
    return link;
  });
  toggle.addEventListener('click',()=>{menu.hidden=!menu.hidden;toggle.setAttribute('aria-expanded',String(!menu.hidden));});
  dock.addEventListener('keydown',event=>{if(event.key==='Escape'){closeMenu();toggle.focus({preventScroll:true});}});
  prev.addEventListener('click',()=>go(current-1));
  next.addEventListener('click',()=>go(current+1));
  document.querySelectorAll('.scene-next').forEach((node,index)=>{
    const scenes=Array.from(document.querySelectorAll('.interview-scene'));
    const target=scenes[index+1] || document.querySelector('.findings');
    if(!target) return;
    const link=document.createElement('a');
    link.className='story-next'; link.href='#'+target.id; link.textContent=node.textContent.replace(/↓/g,'').trim();
    link.addEventListener('click',event=>{event.preventDefault();target.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});});
    node.replaceChildren(link);
  });
  const riskLinks=Array.from(document.querySelectorAll('.risk-reading-index a'));
  function update(){
    pending=false;
    const tops=chapters.map(c=>c.element.getBoundingClientRect().top+scrollY);
    const line=scrollY+innerHeight*.3;
    current=0;
    tops.forEach((top,i)=>{if(top<=line)current=i;});
    dock.hidden=line<tops[0];
    if(dock.hidden)closeMenu();
    const end=tops[current+1] || document.documentElement.scrollHeight;
    const progress=Math.max(0,Math.min(1,(line-tops[current])/Math.max(1,end-tops[current])));
    fill.style.transform=`scaleX(${progress})`;
    meter.setAttribute('aria-valuenow',String(Math.round(progress*100)));
    dock.querySelector('.reading-position').textContent=`${String(current+1).padStart(2,'0')} / ${chapters.length}`;
    toggle.querySelector('strong').textContent=chapters[current].label;
    const phases=chapters[current].element.classList.contains('deck-ready')?[]:chapters[current].element.querySelectorAll('.risk-basis,.risk-variable-grid,.risk-decision,.risk-response-grid,.risk-review');
    let phase='목차 열기';
    phases.forEach((el,i)=>{if(el.getBoundingClientRect().top<innerHeight*.5)phase=['현장 근거','변수 확인','판단 기준','사전 예방 · 발생 시 대응','결과 확인'][i]+' · 목차 열기';});
    toggle.querySelector('small').textContent=phase;
    prev.disabled=current===0; next.disabled=current===chapters.length-1;
    chapters.forEach((c,i)=>{
      c.element.classList.toggle('is-reading',i===current);
      if(i===current)links[i].setAttribute('aria-current','step');else links[i].removeAttribute('aria-current');
    });
    riskLinks.forEach(link=>{if(link.hash==='#'+chapters[current].element.id)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current');});
  }
  function schedule(){if(!pending){pending=true;requestAnimationFrame(update);}}
  addEventListener('scroll',schedule,{passive:true}); addEventListener('resize',schedule); addEventListener('load',schedule);
  if('ResizeObserver' in window)new ResizeObserver(schedule).observe(document.body);
  update();

  // Animate readable blocks as they enter; the full text always remains in the document.
  const selectors=['.workshop-header','.workshop-photo','.experience-workmap-intro','.experience-column-header','.job-card',
    '.field-hero-copy','.field-intro-grid','.field-stat','.field-visit-head','.store-card','.compare-title','.compare-item',
    '.interview-intro','.scene-heading','.scene-answer','.scene-takeaway','.premortem-opening',
    '.finding','.research-bridge-copy > .eyebrow','.research-bridge-copy > h3','.research-bridge-description','.research-bridge-flow > li',
    '.risk-case-heading','.risk-basis','.risk-cause','.risk-variable-grid > div','.risk-decision',
    '.risk-response-grid > section','.risk-review','.risk-conclusion','.project-topline',
    '.operation-story > section','.operation-learning','.report-metrics > *','.report-findings > *'];
  const targets=Array.from(document.querySelectorAll(selectors.join(','))).filter(node=>!node.closest('.deck-ready'));
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      observer.unobserve(entry.target);
      if(reduced.matches || !entry.target.animate)return;
      const siblings=Array.from(entry.target.parentElement.children);
      const delay=Math.min(siblings.indexOf(entry.target),3)*70;
      entry.target.animate([{opacity:0,transform:'translateY(36px)'},{opacity:1,transform:'translateY(0)'}],
        {duration:800,delay,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
    });
  },{threshold:.08,rootMargin:'0px 0px -5% 0px'});
  targets.forEach(node=>observer.observe(node));
})();

/* Editorial refinement: visual roles, neutral palette and project evidence. */
(() => {
 const set=(q,t)=>{const e=document.querySelector(q);if(e)e.textContent=t;};
 set('.risk-conclusion h4','문제를 발견하면, 대응과 해결 여부까지 확인합니다.');
 set('.experience-workmap-intro h3','실제 맡은 업무들.');
 const css=document.createElement('style');
 css.textContent=`
 .job-card .job-icon{display:block!important;font-size:30px;line-height:1.2;margin:12px 0;filter:none}
 .compare-pictogram{display:block;font-size:32px;line-height:1.2;margin-bottom:18px}
 .project-visual-intro{min-width:0;display:flex;flex-direction:column;gap:24px}
 .project-visual-intro .project-summary{max-width:none;font-size:16px;line-height:1.75;margin:0}
 .project-evidence{border:1px solid #5c5650;border-radius:16px;padding:26px;background:#22201e;color:#f8f6f3;margin:0}
 .project-evidence figcaption{font-size:12px;letter-spacing:.06em;color:#d6cabe;margin-bottom:24px}
 .response-flow{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;list-style:none;padding:0;margin:0}
 .response-flow li{position:relative;padding:18px 10px;background:#302c28;border-radius:10px;text-align:center}
 .response-flow li:not(:last-child):after{content:'→';position:absolute;right:-11px;top:48%;z-index:1;color:#d6cabe}
 .response-flow span{display:block;font-size:30px;margin-bottom:16px}
 .response-flow strong{display:block;font-size:15px;margin-bottom:8px}
 .response-flow small{font-size:12px;line-height:1.6;color:#d5d0ca;display:block}
 .evidence-note{display:block;font-size:11px;line-height:1.7;color:#c7c0b9;margin-top:20px}
 .attainment-row{display:grid;grid-template-columns:82px 1fr 54px;align-items:center;gap:10px;margin:18px 0;font-size:12px}
 .attainment-track{height:14px;background:#49433e;position:relative}
 .attainment-track:after{content:'';position:absolute;left:83.333%;top:-5px;bottom:-5px;border-left:1px dashed #fff}
 .attainment-fill{display:block;height:100%;background:#d6cabe}
 .attainment-row b{text-align:right;font-variant-numeric:tabular-nums}
 .project-story-details{margin:30px 0 48px;border-top:1px solid #7776;border-bottom:1px solid #7776;padding:18px 0}
 .project-story-details>summary{cursor:pointer;font-size:15px;font-weight:650;min-height:28px}
 .project-story-details .operation-story{margin-top:28px}
 @media(max-width:640px){.project-evidence{padding:18px}.response-flow{gap:9px}.response-flow li{padding:16px 6px}.response-flow strong{font-size:13px}.response-flow small{font-size:11px}.attainment-row{grid-template-columns:76px 1fr 48px;gap:8px}.job-card .job-icon{font-size:26px;margin:8px 0}}
 `;
 document.head.append(css);
 document.querySelectorAll('.job-icon').forEach(e=>e.setAttribute('aria-hidden','true'));
 document.querySelectorAll('.compare-item').forEach((e,i)=>{
   const icon=document.createElement('span');icon.className='compare-pictogram';icon.setAttribute('aria-hidden','true');
   icon.textContent=['👩‍👧','✨','🏬','👥','🤝','🔁'][i%6];e.prepend(icon);
 });
 const make=(id,copy,html)=>{
  const head=document.querySelector(id+' .project-topline'),p=head?.querySelector('.project-summary');if(!p)return;
  p.textContent=copy;const box=document.createElement('div');box.className='project-visual-intro';p.before(box);box.append(p);
  const fig=document.createElement('figure');fig.className='project-evidence';fig.innerHTML=html;box.append(fig);
 };
 make('#project02','품절로 생기는 판매 공백. 재고 확인부터 대체 상품 판단까지 연결하는 매장 운영 시뮬레이터를 만들었습니다.',
 '<figcaption>판매 공백에 대응하는 세 단계</figcaption><ol class="response-flow"><li><span aria-hidden="true">📦</span><strong>품절 확인</strong><small>진열·재고 상태 파악</small></li><li><span aria-hidden="true">🔎</span><strong>대안 비교</strong><small>판매 가능한 상품 검토</small></li><li><span aria-hidden="true">👗</span><strong>진열 복구</strong><small>보충·대체 상품 교체</small></li></ol><small class="evidence-note">구현한 대응 흐름 · 가상 데이터 기반 시연<br>판매 공백 감소 효과를 실제 매장에서 검증한 결과는 아닙니다.</small>');
 const rows=[['파르나스몰',105.5],['엔터식스천호',85.0],['양재직영점',89.2],['선릉직영점',90.0]];
 make('#project03','매출 성장과 목표 달성은 다릅니다. 매장·상품별 신호를 찾아 현장 질문과 월별 보고서로 연결했습니다.',
 '<figcaption>매장별 목표 달성률 · 2026.09</figcaption>'+rows.map(([name,v])=>'<div class="attainment-row"><span>'+name+'</span><div class="attainment-track" aria-hidden="true"><i class="attainment-fill" style="width:'+(v/120*100)+'%"></i></div><b>'+v.toFixed(1)+'%</b></div>').join('')+'<small class="evidence-note">점선: 목표 100% · 공통 축: 0–120%<br>아래 월별 보고서의 가상 데이터 · 실제 매장 실적이 아닙니다.</small>');
 set('#project04 .project-summary','브랜드 분석을 타깃·상품·고객 경험으로 연결한 27SS 기획, FRUITS LAYERED. 한국의류학회 상품기획 컨테스트 입선작입니다.');
 ['#project02','#project03','#project04'].forEach(id=>{
 const story=document.querySelector(id+' .operation-story');if(!story)return;
 const details=document.createElement('details'),summary=document.createElement('summary');
 details.className='project-story-details';summary.textContent='기획 배경과 제작 과정 자세히 보기';
 story.before(details);details.append(summary,story);
 });
})();

/* Centered closing statement with a one-time cinematic reveal. */
(() => {
 const block=document.querySelector('#whyme .wm-closing-copy'),heading=block?.querySelector('h2');if(!heading)return;
 const style=document.createElement('style');style.textContent=`
 #whyme .wm-closing-copy{text-align:center;padding:100px 28px 90px;position:relative;isolation:isolate}
 #whyme .wm-closing-copy:before{content:'';position:absolute;inset:0;z-index:-1;background:radial-gradient(ellipse at 50% 38%,#ffffff0b,transparent 65%)}
 #whyme .wm-closing-copy h2{font-size:clamp(36px,5.4vw,80px);line-height:1.22;letter-spacing:-.055em;font-weight:800;max-width:1400px;margin:30px auto 42px;text-align:center;text-wrap:balance}
 #whyme .closing-statement-line{display:block}
 #whyme .closing-statement-line+.closing-statement-line{margin-top:16px}
 #whyme .closing-statement-line:first-child{color:#bcb7b1;font-size:.76em}
 #whyme .closing-statement-line:last-child{color:#fff}
 #whyme .wm-closing-copy p{max-width:940px;margin-left:auto;margin-right:auto;text-align:center}
 #whyme .closing-rule{width:90px;height:3px;background:#d6cabe;margin:0 auto 36px;transform-origin:center}
 #whyme .closing-replay{background:transparent;border:1px solid #666;color:#ccc;border-radius:24px;padding:10px 18px;min-height:44px;margin-top:30px;cursor:pointer;font:inherit;font-size:12px}
 #whyme .closing-replay:focus-visible{outline:2px solid white;outline-offset:4px}
 @media(max-width:700px){#whyme .wm-closing-copy{padding:72px 20px 60px}#whyme .wm-closing-copy h2{font-size:clamp(34px,8.8vw,52px);line-height:1.3;margin:25px auto 32px}}
 `;document.head.append(style);
 heading.replaceChildren();
 ['SPA 현장을 아는 실무자에서,','매장의 성장을 이끄는 영업담당자로.'].forEach(text=>{const span=document.createElement('span');span.className='closing-statement-line';span.textContent=text;heading.append(span);});
 const rule=document.createElement('div');rule.className='closing-rule';rule.setAttribute('aria-hidden','true');heading.after(rule);
 const button=document.createElement('button');button.type='button';button.className='closing-replay';button.textContent='다시 보기 ↻';button.setAttribute('aria-label','마지막 포부 문구 애니메이션 다시 보기');block.append(button);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let animations=[];
 function play(){
 animations.forEach(a=>a.cancel());animations=[];if(reduced.matches)return;
 heading.querySelectorAll('span').forEach((line,i)=>animations.push(line.animate([{opacity:0,transform:'translateY(48px) scale(.94)',filter:'blur(9px)'},{opacity:1,transform:'translateY(0) scale(1)',filter:'blur(0)'}],{duration:1100,delay:i*350,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'})));
 animations.push(rule.animate([{transform:'scaleX(0)',opacity:0},{transform:'scaleX(1)',opacity:1}],{duration:900,delay:700,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}));
 block.querySelectorAll('p').forEach((p,i)=>animations.push(p.animate([{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],{duration:750,delay:900+i*130,fill:'backwards',easing:'ease-out'})));
 }
 button.addEventListener('click',play);reduced.addEventListener('change',()=>{if(reduced.matches)animations.forEach(a=>a.cancel());});
 const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){play();observer.disconnect();}},{threshold:.3});observer.observe(heading);
})();

/* Clearly identify the dashboard and report as a synthetic-data exercise. */
(() => {
 const root=document.querySelector('#project03');if(!root)return;
 const style=document.createElement('style');style.textContent=`
 #project03 .demo-data-notice{padding:20px 24px;margin:18px 0 24px;border:1px solid #b8aea3;border-left:5px solid #6d6054;background:#f2eee8;color:#24201d;text-align:left;border-radius:8px}
 #project03 .demo-data-notice strong{display:block;font-size:18px;line-height:1.5;letter-spacing:-.025em}
 #project03 .demo-data-notice p{font-size:14px;line-height:1.7;color:#51483f;margin:8px 0 0;max-width:none}
 #project03 .demo-data-badge{display:inline-block;font-size:12px;font-weight:750;line-height:1.5;padding:6px 10px;background:#e9e3dc;color:#302820;border:1px solid #b8aea3;border-radius:5px;margin-bottom:14px;letter-spacing:0}
 #project03 .embedded-project-heading{flex-wrap:wrap}
 @media(max-width:640px){#project03 .demo-data-notice{padding:16px}#project03 .demo-data-notice strong{font-size:16px}}
 `;document.head.append(style);
 function notice(before,title,copy){if(!before)return;const n=document.createElement('aside');n.className='demo-data-notice';n.setAttribute('aria-label','가상 데이터 안내');const h=document.createElement('strong'),p=document.createElement('p');h.textContent=title;p.textContent=copy;n.append(h,p);before.before(n);}
 notice(root.querySelector('.project-topline'),'가상 데이터로 만든 매장 분석 프로젝트','매출·목표·상품·재고 수치는 분석 연습을 위해 만든 가상 데이터입니다. 실제 매장 실적이나 회사 내부 자료가 아닙니다.');
 const chart=root.querySelector('.project-evidence figcaption');if(chart)chart.textContent='가상 데이터 예시 · 매장별 목표 달성률 · 2026.09';
 const frame=root.querySelector('#retailDashboardEmbed');
 notice(frame,'이 대시보드의 매출·재고 수치는 모두 가상입니다.','매장명은 화면 구성에 사용했으며, 표시된 수치와 매장명은 실제 영업 성과를 나타내지 않습니다. 날씨는 외부 기상 자료를 별도로 사용합니다.');
 const report=root.querySelector('#monthlyReport');
 notice(report?.querySelector(':scope > :first-child'),'가상 데이터 분석 보고서 · 연습용 초안','아래 실적 비교와 대응 제안은 위 대시보드의 가상 수치를 바탕으로 작성했습니다. 실제 매장의 성과 평가나 실행 결과가 아닙니다.');
 if(frame){
  const doc=new DOMParser().parseFromString(frame.srcdoc,'text/html');
  const banner=doc.createElement('div');banner.setAttribute('role','note');banner.textContent='가상 데이터 시연 · 매출·목표·상품·재고는 실제 매장 자료가 아닙니다.';
  banner.setAttribute('style','position:sticky;top:0;z-index:100;background:#eee8df;color:#302820;border-bottom:2px solid #8b7c6b;padding:12px 18px;font:700 14px/1.6 sans-serif;text-align:center');
  doc.body.prepend(banner);frame.srcdoc='<!doctype html>'+doc.documentElement.outerHTML;
 }
})();
