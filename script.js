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
    { taskType:'dotprobe-img', leftStim:'photo_point_detection/n13.jpg', rightStim:'photo_point_detection/e2.jpg',  dotPosition:'L', expectedKey:'A',
          isFormal:false },
    { taskType:'dotprobe-img', leftStim:'photo_point_detection/e3.jpg',  rightStim:'photo_point_detection/n14.jpg', dotPosition:'R', expectedKey:'L',
          isFormal:false },
    { taskType:'dotprobe-img', leftStim:'photo_point_detection/n15.jpg', rightStim:'photo_point_detection/e6.jpg',  dotPosition:'L', expectedKey:'A',
          isFormal:false },
    { taskType:'dotprobe-img', leftStim:'photo_point_detection/e9.jpg',  rightStim:'photo_point_detection/n16.jpg', dotPosition:'R', expectedKey:'L',
          isFormal:false },
    { taskType:'dotprobe-img', leftStim:'photo_point_detection/n17.jpg', rightStim:'photo_point_detection/e10.jpg', dotPosition:'L', expectedKey:'A',
          isFormal:false },
    { taskType:'dotprobe-img', leftStim:'photo_point_detection/e11.jpg', rightStim:'photo_point_detection/n18.jpg', dotPosition:'R', expectedKey:'L',
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
    'photo_point_detection/n13.jpg', 'photo_point_detection/e2.jpg',
    'photo_point_detection/e3.jpg', 'photo_point_detection/n14.jpg',
    'photo_point_detection/n15.jpg', 'photo_point_detection/e6.jpg',
    'photo_point_detection/e9.jpg', 'photo_point_detection/n16.jpg',
    'photo_point_detection/n17.jpg', 'photo_point_detection/e10.jpg',
    'photo_point_detection/e11.jpg', 'photo_point_detection/n18.jpg'
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

startBtn.addEventListener('click', () => {
    subjectId = inputId.value.trim();
    if (!subjectId) { alert('請輸入受試者編號！'); return; }
    screenLogin.style.display = 'none'; showTimelineItem();
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

    setTimeout(() => {
        fixation.style.display = 'none';
        setTimeout(() => {
            if (isImg) {
                leftImgStim.src = `images/${trial.leftStim}`; rightImgStim.src = `images/${trial.rightStim}`;
                leftImgStim.style.display = 'block'; rightImgStim.style.display = 'block';
            } else {
                leftWordStim.textContent = trial.leftStim; rightWordStim.textContent = trial.rightStim;
                leftWordStim.style.display = 'block'; rightWordStim.style.display = 'block';
            }

            setTimeout(() => {
                if (isImg) { leftImgStim.style.display = 'none'; rightImgStim.style.display = 'none'; }
                else { leftWordStim.style.display = 'none'; rightWordStim.style.display = 'none'; }

                // 精準替換點出現的位置座標
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
    setTimeout(() => {
        ampFixation.style.display = 'none';
        ampPrime.src = `images/${trial.primeImage}`; ampPrime.style.display = 'block';
        setTimeout(() => {
            ampPrime.style.display = 'none';
            setTimeout(() => {
                ampHebrew.src = `images/${trial.hebrewImage}`; ampHebrew.style.display = 'block';
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
    
    // 顯示上傳中的畫面，避免受試者提早關閉網頁
    screenEnd.innerHTML = '<h2>資料上傳中，請稍候...</h2>';
    screenEnd.style.display = 'flex';

    // 排序資料
    imgDotResults.sort((a, b) => a.category - b.category);
    wordDotResults.sort((a, b) => a.category - b.category);
    ampResults.sort((a, b) => a.category - b.category);

    // 🛑 在這裡貼上你剛剛部署的 Google Apps Script 網址 🛑
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzmTo9GISjhx2DPIKp58-iRbNro1VHP3drYCtFIG-2GdlnO7yioDY35v6Xx7D9p9-5_/exec';

    // 準備要傳送的資料包
    const payload = {
        subjectId: subjectId,
        imgDotResults: imgDotResults,
        wordDotResults: wordDotResults,
        ampResults: ampResults
    };

    fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            screenEnd.innerHTML = '<h2>測驗結束，謝謝您的參與！</h2><p>您的資料已成功上傳，請通知實驗者或關閉本網頁。</p>';
        } else {
            screenEnd.innerHTML = `<h2>資料上傳失敗</h2><p>錯誤代碼：${data.message}</p><p>請截圖此畫面並通知實驗者。</p>`;
        }
    })
    .catch(error => {
        screenEnd.innerHTML = '<h2>網路連線異常，資料上傳失敗</h2><p>請檢查您的網路連線，或截圖通知實驗者。</p>';
        console.error('Fetch Error:', error);
    });
}


