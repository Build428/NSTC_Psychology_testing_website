// (一) 圖片點偵測
const deathImg   = ['e2.jpg','e3.jpg','e4.jpg','e6.jpg','e9.jpg','e10.jpg', 'e11.jpg','e12.jpg','e13.jpg','e14.jpg','e21.jpg','e22.jpg'].map(s =>
         'photo_point_detection/' + s);
const neutralImg = ['n1.jpg','n2.jpg','n3.jpg','n4.jpg','n5.jpg','n6.jpg', 'n7.jpg','n8.jpg','n9.jpg','n10.jpg','n11.jpg','n12.jpg'].map(s =>
         'photo_point_detection/' + s);

// (二) 文字點偵測
const deathWords   = ['死亡','去世','逝世','長眠','亡故','喪命','安息','夭折','斷氣','悼亡','歸西','斃命'];                     
const neutralWords = ['回答','告知','招商','松林','英吋','整地','現出','吹拂','起事','作飯','報單','捕貨'];

// 文字練習題素材
const practiceWordsA = ['蘋果','西瓜','鉛筆','桌子','白雲','跑步'];
const practiceWordsB = ['香蕉','橘子','橡皮','椅子','微風','走路'];

// (三) AMP
const ampDeathImg   = ['d1.jpg','d3.jpg','d4.jpg','d5.jpg','d6.jpg','d7.jpg', 'd9.jpg','d10.jpg','d11.jpg','d13.jpg','d14.jpg','d15.jpg'].map(s => 'AMP/' + s);
const ampNegImg     = ['e2.jpg','e3.jpg','e4.jpg','e6.jpg','e9.jpg','e10.jpg', 'e11.jpg','e12.jpg','e13.jpg','e14.jpg','e21.jpg','e22.jpg'].map(s => 'AMP/' +
         s);
const ampPosImg     = ['p1.jpg','p2.jpg','p3.jpg','p5.jpg','p6.jpg','p7.jpg', 'p8.jpg','p10.jpg','p11.jpg','p12.jpg','p13.jpg','p14.jpg'].map(s => 'AMP/' + s);
const ampNeutralImg = ['n1.jpg','n2.jpg','n3.jpg','n4.jpg','n5.jpg','n6.jpg', 'n7.jpg','n8.jpg','n9.jpg','n10.jpg','n11.jpg','n12.jpg'].map(s => 'AMP/' + s);
const hebrewImgs    = Array.from({length: 48}, (_, i) => 'Hebrew_alphabet/H' + String(i + 1).padStart(2, '0') + '.jpg');

const ampPracticeImg = ['n13.jpg','n14.jpg','n15.jpg', 'n16.jpg','n17.jpg','n18.jpg'].map(s => 'photo_point_detection/' + s);
const hebrewPractice = ['H01.jpg','H02.jpg','H03.jpg', 'H34.jpg','H35.jpg','H36.jpg'].map(s => 'Hebrew_alphabet/' + s);

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function generateDotProbeTrials(targetPool, neutralPool, taskType) {
    const trials = [];
    
    let t1 = shuffleArray(targetPool); let n1 = shuffleArray(neutralPool);
    for (let i = 0; i < 12; i++) {
        trials.push({ taskType, category: 1, leftStim: t1[i], rightStim: n1[i], dotPosition: 'L', expectedKey: 'A', isFormal: true });
    }
    
    let t2 = shuffleArray(targetPool); let n2 = shuffleArray(neutralPool);
    for (let i = 0; i < 12; i++) {
        trials.push({ taskType, category: 2, leftStim: n2[i], rightStim: t2[i], dotPosition: 'R', expectedKey: 'L', isFormal: true });
    }
    
    let t3 = shuffleArray(targetPool); let n3 = shuffleArray(neutralPool);
    for (let i = 0; i < 12; i++) {
        trials.push({ taskType, category: 3, leftStim: t3[i], rightStim: n3[i], dotPosition: 'R', expectedKey: 'L', isFormal: true });
    }
    
    let t4 = shuffleArray(targetPool); let n4 = shuffleArray(neutralPool);
    for (let i = 0; i < 12; i++) {
        trials.push({ taskType, category: 4, leftStim: n4[i], rightStim: t4[i], dotPosition: 'L', expectedKey: 'A', isFormal: true });
    }
    
    return trials;
}

function generateAMPTrials() {
    const allPrimes = [
        ...ampDeathImg.map(img   => ({ primeImage: img, category: 1 })),
        ...ampNegImg.map(img     => ({ primeImage: img, category: 2 })),
        ...ampPosImg.map(img     => ({ primeImage: img, category: 3 })),
        ...ampNeutralImg.map(img => ({ primeImage: img, category: 4 }))
    ];
    const shuffledHebrew = shuffleArray(hebrewImgs);
    return allPrimes.map((p, i) => ({
        taskType:    'amp',
        primeImage:  p.primeImage,
        hebrewImage: shuffledHebrew[i],
        category:    p.category,
        isFormal:    true
    }));
}

const INSTRUCTIONS = {
    dotProbeImg: `
        <h2>(一)</h2>
        <p>本研究想要了解你做出簡單快速判斷的能力。</p>
        <p>一開始你會在螢幕上看到一個凝視點,然後你會看到兩張圖片同時出現,當圖片消失時,會有一個點出現在其中一張圖片的位置上,當你看到這個點時,請你盡快按下按鍵。</p>
        <p>點出現在左方的圖片位置時,按下A鍵<br>
        點出現在右方的圖片位置時,按下L鍵</p>`,

    dotProbeImgPractice: `
        <p style="text-align: center;">本研究一開始先有6個練習嘗試,總共由6組中性圖片組成。</p>`,

    dotProbeImgFormal: `
        <div style="text-align: center;">
            <h2>接著進入正式測驗</h2>
            <p>正式實驗開始。</p>
            <p>點出現在左方的圖片位置時,按下A鍵<br>
            點出現在右方的圖片位置時,按下L鍵</p>
        </div>`,
    
    dotProbeWord: `
        <h2>(二)</h2>
        <p>本研究想要了解你做出簡單快速判斷的能力。</p>
        <p>一開始你會在螢幕上看到一個凝視點,然後你會看到2個詞語同時出現,當詞語消失時,會有一個點出現在其中一個詞語的位置上,當你看到這個點時,請你盡快按下按鍵。</p>
        <p>點出現在左方的詞語位置時,按下A鍵<br>
        點出現在右方的詞語位置時,按下L鍵</p>`,

    dotProbeWordPractice: `
        <p style="text-align: center;">正式測驗前,請先進行6個練習嘗試。</p>`,

    dotProbeWordFormal: `
        <div style="text-align: center;">
            <h2>接著進入正式測驗</h2>
            <p>正式實驗開始。</p>
            <p>點出現在左方的詞語位置時,按下A鍵<br>
            點出現在右方的詞語位置時,按下L鍵</p>
        </div>`,
    
    amp: `
        <h2>(三)</h2>
        <p>本研究想要了解你做出簡單快速判斷的能力。</p>
        <p>一開始你會在螢幕上看到一個凝視點,之後會出現一張真實生活的圖片作為提醒的訊號,然後會出現一個文字符號。請你注意這個文字符號,針對這個文字符號作出判斷,決定這個文字符號令你感到愉快或不愉快。</p>
        <p style="text-align: center;">愉快就按下M鍵<br>
        不愉快就按下Z鍵</p>`,

    ampPractice: `
        <p>本研究一開始先有6個練習嘗試,這6個練習嘗試的促發項圖片都是中性的,如書本、紙張…等。</p>`,

    ampFormal: `
        <div style="text-align: center;">
            <h2>接著進入正式測驗</h2>
            <p>正式實驗開始。</p>
            <p>愉快就按下M鍵<br>
            不愉快就按下Z鍵</p>
        </div>`
};

const practiceImgTrials = [
    { taskType:'dotprobe-img', leftStim:'photo_point_detection/n13.jpg', rightStim:'photo_point_detection/n14.jpg',  dotPosition:'L', expectedKey:'A',
          isFormal:false },
    { taskType:'dotprobe-img', leftStim:'photo_point_detection/n15.jpg',  rightStim:'photo_point_detection/n16.jpg', dotPosition:'R', expectedKey:'L',
          isFormal:false },
    { taskType:'dotprobe-img', leftStim:'photo_point_detection/n17.jpg', rightStim:'photo_point_detection/n18.jpg',  dotPosition:'L', expectedKey:'A',
          isFormal:false },
    { taskType:'dotprobe-img', leftStim:'photo_point_detection/n14.jpg',  rightStim:'photo_point_detection/n13.jpg', dotPosition:'R', expectedKey:'L',
          isFormal:false },
    { taskType:'dotprobe-img', leftStim:'photo_point_detection/n16.jpg', rightStim:'photo_point_detection/n15.jpg', dotPosition:'L', expectedKey:'A',
          isFormal:false },
    { taskType:'dotprobe-img', leftStim:'photo_point_detection/n18.jpg', rightStim:'photo_point_detection/n17.jpg', dotPosition:'R', expectedKey:'L',
          isFormal:false }
];

const practiceWordTrials = practiceWordsA.map((word, i) => ({
    taskType:'dotprobe-word', leftStim: word, rightStim: practiceWordsB[i], 
    dotPosition: i % 2 === 0 ? 'L' : 'R', expectedKey: i % 2 === 0 ? 'A' : 'L', isFormal:false 
}));

const ampPracticeTrials = ampPracticeImg.map((img, i) => ({
    taskType: 'amp', primeImage: img, hebrewImage: hebrewPractice[i], category: 0, isFormal: false
}));

let timeline = [];

timeline.push({ type: 'instruction', text: INSTRUCTIONS.dotProbeImg });
timeline.push({ type: 'instruction', text: INSTRUCTIONS.dotProbeImgPractice });
timeline = timeline.concat(practiceImgTrials);
timeline.push({ type: 'instruction', text: INSTRUCTIONS.dotProbeImgFormal });
timeline = timeline.concat(shuffleArray(generateDotProbeTrials(deathImg, neutralImg, 'dotprobe-img')));

// 2. 文字點偵測流程
timeline.push({ type: 'instruction', text: INSTRUCTIONS.dotProbeWord });
timeline.push({ type: 'instruction', text: INSTRUCTIONS.dotProbeWordPractice });
timeline = timeline.concat(practiceWordTrials);
timeline.push({ type: 'instruction', text: INSTRUCTIONS.dotProbeWordFormal });
timeline = timeline.concat(shuffleArray(generateDotProbeTrials(deathWords, neutralWords, 'dotprobe-word')));

// 3. AMP 流程
timeline.push({ type: 'instruction', text: INSTRUCTIONS.amp });
timeline.push({ type: 'instruction', text: INSTRUCTIONS.ampPractice });
timeline = timeline.concat(ampPracticeTrials);
timeline.push({ type: 'instruction', text: INSTRUCTIONS.ampFormal });
timeline = timeline.concat(shuffleArray(generateAMPTrials()));

let currentIndex = 0;
let imgDotResults = [], wordDotResults = [], ampResults = [];
let isWaitingForDot = false, isWaitingForAMP = false;
let dotStartTime = 0, ampStartTime = 0, subjectId = "";

const screenLogin = document.getElementById('login-screen'), startBtn = document.getElementById('start-btn'), inputId = document.getElementById('subject-id');
const screenInst = document.getElementById('instruction-screen'), contentInst = document.getElementById('instr-content');
const screenStim = document.getElementById('stimulus-area'), ampArea = document.getElementById('amp-area'), screenEnd = document.getElementById('end-screen');

const fixation = document.getElementById('fixation'), dot = document.getElementById('dot');

// === 圖片預載邏輯 (Image Preloading) ===
const allImagesToPreload = [
    ...deathImg, ...neutralImg,
    ...ampDeathImg, ...ampNegImg, ...ampPosImg, ...ampNeutralImg,
    ...hebrewImgs,
    ...ampPracticeImg, ...hebrewPractice,
    'photo_point_detection/n13.jpg', 'photo_point_detection/n14.jpg',
    'photo_point_detection/n15.jpg', 'photo_point_detection/n16.jpg',
    'photo_point_detection/n17.jpg', 'photo_point_detection/n18.jpg'
];
const uniqueImagesToPreload = [...new Set(allImagesToPreload)];
let imagesLoaded = 0;

// 初始化按鈕狀態
startBtn.disabled = true;
startBtn.textContent = '載入中... (0%)';
startBtn.style.backgroundColor = '#e0e0e0';
startBtn.style.color = '#666';
startBtn.style.cursor = 'not-allowed';

uniqueImagesToPreload.forEach(src => {
    const img = new Image();
    img.onload = img.onerror = () => {
        imagesLoaded++;
        const percent = Math.floor((imagesLoaded / uniqueImagesToPreload.length) * 100);
        if (imagesLoaded < uniqueImagesToPreload.length) {
            startBtn.textContent = `載入中... (${percent}%)`;
        } else {
            startBtn.textContent = '開始測驗';
            startBtn.disabled = false;
            startBtn.style.backgroundColor = '#fff';
            startBtn.style.color = '#000';
            startBtn.style.cursor = 'pointer';
        }
    };
    img.src = `images/${src}`;
});
// ======================================
const leftImgStim = document.getElementById('left-img-stimulus'), rightImgStim = document.getElementById('right-img-stimulus');
const leftWordStim = document.getElementById('left-word-stimulus'), rightWordStim = document.getElementById('right-word-stimulus');

const ampFixation = document.getElementById('amp-fixation'), ampPrime = document.getElementById('amp-prime'), ampHebrew = document.getElementById('amp-hebrew'), ampMask = document.getElementById('amp-mask');

const screenConsent = document.getElementById('consent-screen');
const consentSubmitBtn = document.getElementById('consent-submit-btn');

startBtn.addEventListener('click', () => {
    subjectId = inputId.value.trim();
    if (!subjectId) { alert('請輸入受試者編號！'); return; }
    
    // 隱藏登入畫面，改為「顯示同意書畫面」
    screenLogin.style.display = 'none'; 
    screenConsent.style.display = 'block';
});

consentSubmitBtn.addEventListener('click', () => {
    const selected = document.querySelector('input[name="consent"]:checked');
    
    if (!selected) {
        alert("請選擇是否同意參與研究。");
        return;
    }

    if (selected.value === 'agree') {
        screenConsent.style.display = 'none';
        showTimelineItem(); 
    } else if (selected.value === 'disagree') {
        const confirmQuit = confirm("確定不同意?");
        if (confirmQuit) {
            screenConsent.style.display = 'none';
            screenEnd.innerHTML = '<h2>測驗結束</h2><p>您已選擇不同意參與本研究，謝謝您的時間！</p>';
            screenEnd.style.display = 'flex';
        }
    }
});
inputId.addEventListener('keydown', (e) => { if (e.key === 'Enter') startBtn.click(); });

document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    const item = timeline[currentIndex];
    if (!item) return;

    if (item.type === 'instruction' && key === ' ' && screenInst.style.display !== 'none') {
        currentIndex++; showTimelineItem(); return;
    }

    if (isWaitingForDot && (key === 'A' || key === 'L')) {
        if (key !== item.expectedKey) return; 
        isWaitingForDot = false;
        const rt = Math.round(performance.now() - dotStartTime);

        if (item.isFormal) {
            const resultData = { category: item.category, leftStim: item.leftStim, rightStim: item.rightStim, expectedKey: item.expectedKey, rt: rt };
            if (item.taskType === 'dotprobe-img') imgDotResults.push(resultData);
            else if (item.taskType === 'dotprobe-word') wordDotResults.push(resultData);
        }

        dot.style.display = 'none';
        currentIndex++;
        setTimeout(showTimelineItem, 1000); 
        return;
    }

    if (isWaitingForAMP && (key === 'M' || key === 'Z')) {
        isWaitingForAMP = false;
        ampMask.style.display = 'none';
        if (item.isFormal) ampResults.push({ category: item.category, primeImage: item.primeImage, hebrewImage: item.hebrewImage, keyPressed: key, rt: Math.round(performance.now() - ampStartTime) });
        currentIndex++; showTimelineItem();
        return;
    }
});

function showTimelineItem() {
    if (currentIndex >= timeline.length) { endExperiment(); return; }
    const item = timeline[currentIndex];

    if (item.type === 'instruction') {
        screenStim.style.display = 'none'; ampArea.style.display = 'none';
        screenInst.style.display = 'flex'; contentInst.innerHTML = item.text;
    } else if (item.taskType === 'amp') {
        screenInst.style.display = 'none'; screenStim.style.display = 'none';
        ampArea.style.display = 'block'; runAMPTrial(item);
    } else {
        screenInst.style.display = 'none'; ampArea.style.display = 'none';
        screenStim.style.display = 'block'; runDotTrial(item);
    }
}

function runDotTrial(trial) {
    fixation.style.display = 'block';
    leftImgStim.style.display = 'none'; rightImgStim.style.display = 'none';
    leftWordStim.style.display = 'none'; rightWordStim.style.display = 'none';
    dot.style.display = 'none';

    const isImg = trial.taskType === 'dotprobe-img';

    if (isImg) {
        leftImgStim.src = `images/${trial.leftStim}`; 
        rightImgStim.src = `images/${trial.rightStim}`;
    } else {
        leftWordStim.textContent = trial.leftStim; 
        rightWordStim.textContent = trial.rightStim;
    }

    setTimeout(() => {
        fixation.style.display = 'none';
        
        setTimeout(() => {
            if (isImg) {
                leftImgStim.style.display = 'block'; 
                rightImgStim.style.display = 'block';
            } else {
                leftWordStim.style.display = 'block'; 
                rightWordStim.style.display = 'block';
            }

            setTimeout(() => {
                if (isImg) { leftImgStim.style.display = 'none'; rightImgStim.style.display = 'none'; }
                else { leftWordStim.style.display = 'none'; rightWordStim.style.display = 'none'; }

                if (isImg) {
                    dot.style.left = trial.dotPosition === 'L' ? 'calc(50% - 2.5cm - 125px)' : 'calc(50% + 2.5cm + 125px)';
                } else {
                    dot.style.left = trial.dotPosition === 'L' ? 'calc(50% - 3.5cm - 12px)' : 'calc(50% + 3.5cm + 12px)';
                }
                dot.style.display = 'block';

                dotStartTime = performance.now();
                isWaitingForDot = true;
            }, 1000);
        }, 200);
    }, 500);
}

function runAMPTrial(trial) {
    ampFixation.style.display = 'block'; ampPrime.style.display = 'none'; ampHebrew.style.display = 'none'; ampMask.style.display = 'none';
    
    ampPrime.src = `images/${trial.primeImage}`;
    ampHebrew.src = `images/${trial.hebrewImage}`;

    setTimeout(() => {
        ampFixation.style.display = 'none';
        ampPrime.style.display = 'block';
        setTimeout(() => {
            ampPrime.style.display = 'none';
            setTimeout(() => {
                ampHebrew.style.display = 'block';
                setTimeout(() => {
                    ampHebrew.style.display = 'none';
                    ampMask.style.display = 'block';
                    ampStartTime = performance.now();
                    isWaitingForAMP = true;
                }, 100);
            }, 125);
        }, 100);
    }, 1000);
}

function endExperiment() {
    screenStim.style.display = 'none'; 
    ampArea.style.display = 'none'; 

    startQuestionnaires();
}

let questionnaireResults = {};

// 1. DAPR 題目資料
const daprData = [
    { id: 'Ex1', text: '對於「死亡」，你覺得', options: [{v:1, l:'1非常不愉快'}, {v:2, l:'2'}, {v:3, l:'3'}, {v:4, l:'4'}, {v:5, l:'5'}, {v:6, l:'6'}, {v:7, l:'7非常愉快'}] },
    { id: 'Ex2', text: '對於「死亡」，你覺得', options: [{v:1, l:'1非常恐懼'}, {v:2, l:'2'}, {v:3, l:'3'}, {v:4, l:'4'}, {v:5, l:'5'}, {v:6, l:'6'}, {v:7, l:'7完全不恐懼'}] },
    { id: 'Ex3', text: '對於「死亡」，你覺得', options: [{v:1, l:'1非常焦慮'}, {v:2, l:'2'}, {v:3, l:'3'}, {v:4, l:'4'}, {v:5, l:'5'}, {v:6, l:'6'}, {v:7, l:'7完全不焦慮'}] },
    { id: 'Ex4', text: '你是否有宗教信仰？', options: [{v:1, l:'是'}, {v:2, l:'否'}] },
    { id: 'Ex5', text: '你是否有在祭拜祖先？', options: [{v:1, l:'是'}, {v:2, l:'否'}] },
    { id: 'Ex6', text: '你是否相信有靈魂或轉世？', options: [{v:1, l:'是'}, {v:2, l:'否'}] },
    { id: 'Ba1', text: '你的生理性別是？', options: [{v:1, l:'男'}, {v:2, l:'女'}] },
    { id: 'Ba2', text: '你的年齡是？', options: [{v:1, l:'18-22'}, {v:2, l:'23-27'}, {v:3, l:'28以上'}] }
];

const daprItems = [
    "死亡無疑是一種陰森恐怖的經驗", "想到自己的死亡，我會焦慮不安", "我會盡量可能避免去想到自己的死亡", "我相信自己死後會到天堂/天國/極樂世界去", "死亡將會結束我所有的煩惱", "死亡應該被視為一種自然、無可否認又無法避免的事", "我很困擾於「人一定會死亡」的這個宿命", "我覺得死亡是通往快樂天堂/天國/極樂世界的入口", "死亡可以讓我從這個糟糕的世界逃脫", "一但有死亡的想法進入我的腦海，我會試著將它趕走", "死亡是悲痛與苦難的解脫", "我總是試著讓自己不要想到死亡這件事", "我相信死後的世界會比現世的世界更好", "我覺得死亡是生命中自然的一部分", "我覺得死亡是一種與上蒼(上帝神佛)及永恆至樂的結合", "死亡可以帶來一個全新燦爛的希望", "我並不害怕死亡但也不歡迎它的到來", "我對死亡有強烈的恐懼感", "我完全避免將死亡與自己連結在一起", "我經常困擾於死後是否有來生", "死亡意味著今生一切的結束，這樣的想法讓我感到害怕", "我期望死後可以和我愛的人團聚", "我將死亡視為今生一切痛苦的結束", "死亡只是生命過程的一部分", "我視死亡為一個通往永恆幸福的路徑", "我會盡量避開任何與死亡有關的事物", "我覺得死亡為靈魂提供了最好的解脫", "當我相信死後仍有生命，這是我面對死亡時最寬慰的事", "我視死亡為放下今生重擔的方式", "死亡既不是好事也不是壞事", "我對死後的生命有所期待", "對於死後的不確定性，讓我感到憂心"
];
daprItems.forEach((q, i) => {
    daprData.push({
        id: `Dap${i+1}`,
        text: q,
        options: [{v:5, l:'5非常同意'}, {v:4, l:'4同意'}, {v:3, l:'3普通'}, {v:2, l:'2不同意'}, {v:1, l:'1非常不同意'}]
    });
});

// 2. BHS 題目資料
const bhsItems = [
    "我抱著希望及熱情期待將來。", "我想放棄算了，因為我沒辦法讓自己更好。", "當事情變糟的時候，我若想到情況不可能永遠如此，我就會好受點。", "我不能想像10年後我會過什麼生活。", "我有足夠的時間去完成我想做的事。", "在將來我期待能順利完成我最關心的事。", "我的將來似乎很灰暗。", "我特別幸運，而我期待在生命中仍會比一般人遇到更多好事。", "我就是碰不到好運，而也沒有理由想我將來能碰到好運。", "我過去的經驗讓我能好好面對將來。", "擺在我的眼前，全都是不愉快的事，一點樂趣也沒有。", "我並不期待會得到我真正想要的。", "當我展望將來，我期待我會比現在快樂。", "事情總是不如我意。", "我對將來有很大的信心。", "我從來不能得到想要的東西，所以想要擁有任何東西是愚蠢的。", "我不可能會在將來得到任何真正的滿足。", "我的將來是一片模糊和不確定。", "我期待將來如意的日子比不如意的多。", "因為我可能不會得到它，所以真正去追求任何東西也沒有用。"
];
const bhsData = bhsItems.map((q, i) => ({
    id: `BH${i+1}`, text: q, options: [{v:1, l:'是'}, {v:2, l:'否'}]
}));

// 3. AMHS 題目資料
const amhsItems = [
    "我最近有頭痛的問題。", "我最近有腸胃的毛病。", "我最近覺得肩膀痠痛僵硬。", "我最近覺得身體非常疲倦。", "我最近的胃口變差。", "我最近睡眠的狀況不好。", "我對許多事感到莫名的擔心。", "我對未來感到煩惱憂慮。", "當我自己獨處時，我會覺得焦慮不安。", "我覺得煩躁不安。", "我擔心不幸的事情會發生。", "我不知道該如何和周遭的人建立關係。", "在人多的地方，和人談話會讓我感到手足無措。", "我害怕和人有太親密的交往。", "在社交場合，我很難主動和他人互動。", "要向別人表達我內心真正感受是件很困難的事。", "我很難了解別人的想法或感受。", "我最近對許多事都感到沒興趣。", "我覺得我活在世上是多餘的。", "我不知道自己為甚麼而活。", "我最近有想死的念頭。", "我覺得這個世界很黑暗。", "我覺得自己是一個很有能力的人。", "我覺得我的生活自在又快樂。", "我覺得很多困難是可以解決的。", "我認為我是一個努力進取的人。", "我能獨自完成許多事。", "每一天的日子都讓我充滿了期待。"
];
const amhsData = amhsItems.map((q, i) => ({
    id: `AMH${i+1}`, text: q, options: [{v:5, l:'總是這樣'}, {v:4, l:'經常這樣'}, {v:3, l:'偶而這樣'}, {v:2, l:'極少這樣'}, {v:1, l:'從未這樣'}]
}));

// 渲染問卷 HTML
function renderQuestions(containerId, questions) {
    const container = document.getElementById(containerId);
    let html = '';
    questions.forEach(q => {
        html += `<div class="question-block">
                    <div class="q-title">${q.id}. ${q.text}</div>
                    <div class="q-options">`;
        q.options.forEach(opt => {
            html += `<label><input type="radio" name="${q.id}" value="${opt.v}"> ${opt.l}</label>`;
        });
        html += `</div></div>`;
    });
    container.innerHTML = html;
}

// 驗證是否全部作答
function validateForm(questions) {
    let missing = [];
    questions.forEach(q => {
        if (!document.querySelector(`input[name="${q.id}"]:checked`)) {
            missing.push(q.id);
        }
    });
    if (missing.length > 0) {
        alert(`請回答所有問題！尚未作答題目：${missing.slice(0, 3).join(', ')} ${missing.length > 3 ? '...' : ''}`);
        return false;
    }
    return true;
}

// 收集作答資料 (轉換為整數)
function collectData(questions) {
    let data = {};
    questions.forEach(q => {
        const selected = document.querySelector(`input[name="${q.id}"]:checked`);
        data[q.id] = selected ? parseInt(selected.value) : null;
    });
    return data;
}

// 控制問卷顯示流程
function startQuestionnaires() {
    document.getElementById('questionnaire-screen').style.display = 'block';
    renderQuestions('dapr-questions', daprData);
    renderQuestions('bhs-questions', bhsData);
    renderQuestions('amhs-questions', amhsData);
}

document.getElementById('start-q-btn').addEventListener('click', () => {
    document.getElementById('q-intro').style.display = 'none';
    document.getElementById('q-dapr-container').style.display = 'block';
});

document.getElementById('next-bhs-btn').addEventListener('click', () => {
    if (!validateForm(daprData)) return;
    questionnaireResults.dapr = collectData(daprData);
    document.getElementById('q-dapr-container').style.display = 'none';
    document.getElementById('q-bhs-container').style.display = 'block';
    document.getElementById('questionnaire-screen').scrollTop = 0;
});

document.getElementById('next-amhs-btn').addEventListener('click', () => {
    if (!validateForm(bhsData)) return;
    questionnaireResults.bhs = collectData(bhsData);
    document.getElementById('q-bhs-container').style.display = 'none';
    document.getElementById('q-amhs-container').style.display = 'block';
    document.getElementById('questionnaire-screen').scrollTop = 0;
});

// 最後提交所有資料
document.getElementById('submit-all-btn').addEventListener('click', () => {
    if (!validateForm(amhsData)) return;
    questionnaireResults.amhs = collectData(amhsData);
    uploadAllData();
});

// 負責執行最終的 fetch API
function uploadAllData() {
    document.getElementById('questionnaire-screen').style.display = 'none';
    screenEnd.innerHTML = '<h2>資料上傳中，請稍候...</h2>';
    screenEnd.style.display = 'flex';

    imgDotResults.sort((a, b) => a.category - b.category);
    wordDotResults.sort((a, b) => a.category - b.category);
    ampResults.sort((a, b) => a.category - b.category);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzmTo9GISjhx2DPIKp58-iRbNro1VHP3drYCtFIG-2GdlnO7yioDY35v6Xx7D9p9-5_/exec';

    const payload = {
        subjectId: subjectId,
        imgDotResults: imgDotResults,
        wordDotResults: wordDotResults,
        ampResults: ampResults,
        questionnaires: questionnaireResults // 新增的問卷資料
    };

    fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            // 資料上傳成功後，放回原來的結尾畫面
            screenEnd.innerHTML = '<h2>問卷結束，謝謝您參與</h2><p>您的資料已成功上傳，請通知實驗者或關閉本網頁。</p>';
        } else {
            screenEnd.innerHTML = `<h2>資料上傳失敗</h2><p>錯誤代碼：${data.message}</p><p>請截圖此畫面並通知實驗者。</p>`;
        }
    })
    .catch(error => {
        screenEnd.innerHTML = '<h2>網路連線異常，資料上傳失敗</h2><p>請檢查您的網路連線，或截圖通知實驗者。</p>';
        console.error('Fetch Error:', error);
    });
}


