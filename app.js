/**
 * 今天吃什麼？Daily Food Wheel - 智慧食物決策轉盤
 * 115-1 商業設計系 自然科學與人工智慧 期末專題
 * 第 19 組：陳巧芮、紀語芊、蔡沛恩、鄭家嫈
 */

// ==================== 1. 預設資料庫 (Preset Database) ====================
const PRESET_CATEGORIES = [
  { id: 'lunch', name: '🍱 中午下課吃什麼 (午餐)', shortName: '下課午餐', desc: '12點下課別再互問，轉盤一秒決定！' },
  { id: 'dinner', name: '🍲 下班下課犒賞 (晚餐)', shortName: '晚餐犒賞', desc: '整天辛苦了，好好吃頓豐富的' },
  { id: 'dessert', name: '🍰 姐妹揪團下午茶 (甜點)', shortName: '下午茶手搖', desc: '糖分給予身心最高療癒' },
  { id: 'noodles', name: '🍜 吸溜麵食特輯', shortName: '麵食精選', desc: '吸溜吸溜，濃郁湯頭與彈牙麵條' },
  { id: 'breakfast', name: '🌅 晨光早八元氣 (早餐)', shortName: '早八早餐', desc: '早起的第一份美好儀式' },
  { id: 'late_night', name: '🌙 深夜放縱隨選 (宵夜)', shortName: '罪惡宵夜', desc: '深夜放縱，罪惡又快樂' }
];

const DEFAULT_FOOD_ITEMS = {
  breakfast: [
    { id: 'bf_1', name: '鮪魚玉米蛋餅', icon: '🌯', tags: ['經典酥脆', '平價必點'], active: true },
    { id: 'bf_2', name: '古早味紫米飯糰', icon: '🍙', tags: ['份量超足', '傳統中式'], active: true },
    { id: 'bf_3', name: '鐵板黑椒麵加蛋', icon: '🍳', tags: ['熱騰騰', '香辣開胃'], active: true },
    { id: 'bf_4', name: '美式早午餐大拼盤', icon: '🥞', tags: ['儀式感', '炒蛋培根'], active: true },
    { id: 'bf_5', name: '招牌起司肉蛋吐司', icon: '🥪', tags: ['濃郁起司', '現烤現做'], active: true },
    { id: 'bf_6', name: '燒餅夾蔥蛋油條', icon: '🥟', tags: ['外酥內軟', '豆漿絕配'], active: true },
    { id: 'bf_7', name: '希臘優格燕麥碗', icon: '🫐', tags: ['清爽低卡', '健康少負擔'], active: true },
    { id: 'bf_8', name: '超商熱壓吐司鮮食', icon: '☕', tags: ['快速便利', '趕時間首選'], active: true }
  ],
  lunch: [
    { id: 'lu_1', name: '酥炸厚切排骨便當', icon: '🍱', tags: ['三菜一蛋', '經典台式'], active: true },
    { id: 'lu_2', name: '濃郁日式豚骨拉麵', icon: '🍜', tags: ['炙燒叉燒', '濃醇高湯'], active: true },
    { id: 'lu_3', name: '招牌酥脆鍋貼水餃', icon: '🥟', tags: ['酸辣湯絕配', '飽足感'], active: true },
    { id: 'lu_4', name: '韓式石鍋拌飯', icon: '🥘', tags: ['香脆鍋巴', '甜辣開胃'], active: true },
    { id: 'lu_5', name: '奶油白醬培根義大利麵', icon: '🍝', tags: ['奶香濃郁', '義式風情'], active: true },
    { id: 'lu_6', name: '紅燒半筋半肉牛肉麵', icon: '🥩', tags: ['大塊軟嫩', '湯頭甘甜'], active: true },
    { id: 'lu_7', name: '星馬海南雞飯', icon: '🍗', tags: ['嫩滑多汁', '香蔥薑醬'], active: true },
    { id: 'lu_8', name: '舒肥雞胸低卡健康餐盒', icon: '🥗', tags: ['高蛋白', '少油少鹽'], active: true },
    { id: 'lu_9', name: '經典古早味滷肉飯', icon: '🍚', tags: ['滿滿膠質', '銅板美食'], active: true }
  ],
  dinner: [
    { id: 'di_1', name: '暖心個人小火鍋', icon: '🍲', tags: ['暖胃首選', '菜盤豐富'], active: true },
    { id: 'di_2', name: '日式居酒屋串燒', icon: '🍢', tags: ['炭火香氣', '下班放鬆'], active: true },
    { id: 'di_3', name: '熱鬧台式百元熱炒', icon: '🍤', tags: ['鑊氣十足', '白飯殺手'], active: true },
    { id: 'di_4', name: '重慶道地麻辣燙', icon: '🌶️', tags: ['香麻帶勁', '自選好料'], active: true },
    { id: 'di_5', name: '韓式洋釀炸雞配披薩', icon: '🍕', tags: ['酥脆多汁', '大口滿足'], active: true },
    { id: 'di_6', name: '壽喜燒和牛吃到飽', icon: '🥩', tags: ['甜鹹醬汁', '滑順蛋液'], active: true },
    { id: 'di_7', name: '炙燒厚切鐵板牛排', icon: '🥩', tags: ['滋滋作響', '黑椒蘑菇'], active: true },
    { id: 'di_8', name: '炙燒焦糖鮭魚丼飯', icon: '🍣', tags: ['油脂豐厚', '入口即化'], active: true },
    { id: 'di_9', name: '越式鮮牛肉生河粉', icon: '🍜', tags: ['清爽高湯', '九層塔檸檬'], active: true }
  ],
  dessert: [
    { id: 'de_1', name: '黑糖珍珠鮮奶茶', icon: '🧋', tags: ['Q彈嚼勁', '手搖第一'], active: true },
    { id: 'de_2', name: '古早味綜合豆花粉圓', icon: '🥣', tags: ['滑嫩豆香', '糖水冰涼'], active: true },
    { id: 'de_3', name: '焦糖肉桂捲佐冰淇淋', icon: '🧁', tags: ['肉桂濃郁', '冷熱交織'], active: true },
    { id: 'de_4', name: '小山園濃抹茶戚風蛋糕', icon: '🍰', tags: ['微苦回甘', '蓬鬆綿密'], active: true },
    { id: 'de_5', name: '草莓卡士達法式可麗餅', icon: '🥞', tags: ['酸甜果香', '少女心噴發'], active: true },
    { id: 'de_6', name: '脆皮爆漿紅豆奶油餅', icon: '🥧', tags: ['現烤香氣', '外脆內餡爆'], active: true },
    { id: 'de_7', name: '義式手作濃醇霜淇淋', icon: '🍦', tags: ['絲滑細緻', '純濃乳香'], active: true },
    { id: 'de_8', name: '法式經典蘭姆可麗露', icon: '🍮', tags: ['天使之鈴', '焦香脆殼'], active: true }
  ],
  noodles: [
    { id: 'no_1', name: '私房紅燒半筋半肉牛肉麵', icon: '🍜', tags: ['酸菜必加', '牛骨熬製'], active: true },
    { id: 'no_2', name: '博多濃醇豚骨叉燒拉麵', icon: '🍜', tags: ['細麵偏硬', '蒜泥滿滿'], active: true },
    { id: 'no_3', name: '沙茶海鮮鍋燒意麵', icon: '🍲', tags: ['意麵吸汁', '鮮蝦蛤蜊'], active: true },
    { id: 'no_4', name: '四川椒麻老北京炸醬麵', icon: '🥢', tags: ['黃瓜爽脆', '肉醬香濃'], active: true },
    { id: 'no_5', name: '胡麻雞絲涼麵加辣', icon: '🥗', tags: ['夏日救星', '香濃芝麻'], active: true },
    { id: 'no_6', name: '蒜香白酒蛤蜊義大利麵', icon: '🍝', tags: ['鮮味滿溢', '橄欖油清炒'], active: true },
    { id: 'no_7', name: '讚岐豆皮溫玉烏龍麵', icon: '🍜', tags: ['Q彈有嚼勁', '柴魚清湯'], active: true },
    { id: 'no_8', name: '重慶麻辣酸辣紅薯粉', icon: '🌶️', tags: ['酸辣爽口', '酥炸黃豆'], active: true }
  ],
  late_night: [
    { id: 'ln_1', name: '特酥鹽酥雞配九層塔', icon: '🍗', tags: ['甜不辣必點', '炸蒜頭'], active: true },
    { id: 'ln_2', name: '熱騰騰清粥小菜', icon: '🥣', tags: ['暖胃解酒', '肉鬆豆乳'], active: true },
    { id: 'ln_3', name: '港式XO醬炒公仔麵', icon: '🥡', tags: ['鑊氣四溢', '深夜重口味'], active: true },
    { id: 'ln_4', name: '炭火炭烤串燒拼盤', icon: '🍢', tags: ['特調醬汁', '七味唐辛子'], active: true },
    { id: 'ln_5', name: '柴魚高湯日式關東煮', icon: '🍢', tags: ['蘿蔔吸飽湯', '甜辣沾醬'], active: true },
    { id: 'ln_6', name: '脆皮現炸臭豆腐配泡菜', icon: '🥢', tags: ['外酥內多汁', '蒜蓉醬'], active: true },
    { id: 'ln_7', name: '辛拉麵加蛋加雙倍起司', icon: '🍜', tags: ['深夜罪惡', '濃郁湯頭'], active: true },
    { id: 'ln_8', name: '冰豆漿配現蒸小籠湯包', icon: '🥟', tags: ['湯汁噴發', '薑絲黑醋'], active: true }
  ]
};

// 輪盤精選清新柔和配色表
const WHEEL_PALETTE = [
  '#FF7E67', '#FFA45B', '#FFD166', '#06D6A0', 
  '#118AB2', '#7209B7', '#F72585', '#4CC9F0',
  '#48CAE4', '#52B788', '#FB8500', '#8338EC'
];

// ==================== 2. 全域狀態管理 (State Management) ====================
class FoodWheelApp {
  constructor() {
    this.currentCategory = 'lunch';
    this.foodData = this.loadFoodData();
    this.history = this.loadHistory();
    this.soundEnabled = localStorage.getItem('food_wheel_sound') !== 'false';
    this.spinSpeed = 'normal'; // fast (3s), normal (5s), slow (8s)

    // 轉盤動畫狀態
    this.canvas = document.getElementById('wheelCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.currentAngle = 0; // 當前轉盤旋轉角度（弧度）
    this.isSpinning = false;
    this.lastTickedIndex = -1;

    // 音頻合成器
    this.audioCtx = null;

    // 初始化應用
    this.initElements();
    this.bindEvents();
    this.renderCategoryNav();
    this.renderCurrentList();
    this.renderWheel();
    this.updateSoundUI();
    this.updateHistoryBadge();
  }

  // 讀取 LocalStorage 資料
  loadFoodData() {
    try {
      const saved = localStorage.getItem('food_wheel_data_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('載入暫存資料失敗，使用預設值', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_FOOD_ITEMS));
  }

  // 儲存資料至 LocalStorage
  saveFoodData() {
    try {
      localStorage.setItem('food_wheel_data_v2', JSON.stringify(this.foodData));
    } catch (e) {
      console.error('儲存至 LocalStorage 失敗', e);
    }
  }

  loadHistory() {
    try {
      const saved = localStorage.getItem('food_wheel_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('載入歷史失敗', e);
    }
    return [];
  }

  saveHistory() {
    try {
      localStorage.setItem('food_wheel_history', JSON.stringify(this.history));
      this.updateHistoryBadge();
    } catch (e) {
      console.error('儲存歷史紀錄失敗', e);
    }
  }

  // ==================== 3. 音頻合成系統 (Web Audio API) ====================
  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playTickSound() {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800 + Math.random() * 200, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.audioCtx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.035);
    } catch (err) {
      // 忽略音效微小例外
    }
  }

  playWinSound() {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.1);

        gain.gain.setValueAtTime(0, this.audioCtx.currentTime + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.15, this.audioCtx.currentTime + idx * 0.1 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.1 + 0.4);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(this.audioCtx.currentTime + idx * 0.1);
        osc.stop(this.audioCtx.currentTime + idx * 0.1 + 0.45);
      });
    } catch (err) {
      // 忽略音效例外
    }
  }

  // ==================== 4. DOM 元素與綁定 ====================
  initElements() {
    this.categoryNav = document.getElementById('categoryNav');
    this.currentCategoryTitle = document.getElementById('currentCategoryTitle');
    this.categorySubBadge = document.getElementById('categorySubBadge');
    this.activeCountSummary = document.getElementById('activeCountSummary');
    this.currentItemsList = document.getElementById('currentItemsList');
    this.spinBtn = document.getElementById('spinBtn');
    this.soundToggleBtn = document.getElementById('soundToggleBtn');
    this.soundIcon = document.getElementById('soundIcon');

    // 彈窗與抽屜元素
    this.winnerModal = document.getElementById('winnerModal');
    this.winnerModalCard = document.getElementById('winnerModalCard');
    this.crudModal = document.getElementById('crudModal');
    this.crudDrawerCard = document.getElementById('crudDrawerCard');
    this.historyModal = document.getElementById('historyModal');
    this.historyModalCard = document.getElementById('historyModalCard');

    // CRUD 相關元素
    this.manageDataBtn = document.getElementById('manageDataBtn');
    this.closeCrudModalBtn = document.getElementById('closeCrudModalBtn');
    this.doneCrudBtn = document.getElementById('doneCrudBtn');
    this.newFoodCategory = document.getElementById('newFoodCategory');
    this.crudCategoryFilter = document.getElementById('crudCategoryFilter');
    this.addFoodForm = document.getElementById('addFoodForm');
    this.crudItemsList = document.getElementById('crudItemsList');
    this.resetAllToDefaultBtn = document.getElementById('resetAllToDefaultBtn');
    this.totalItemsCountLabel = document.getElementById('totalItemsCountLabel');

    // 快捷按鈕
    this.quickAddBtn = document.getElementById('quickAddBtn');
    this.toggleAllBtn = document.getElementById('toggleAllBtn');
    this.resetCategoryBtn = document.getElementById('resetCategoryBtn');
    this.historyModalBtn = document.getElementById('historyModalBtn');
    this.closeHistoryModalBtn = document.getElementById('closeHistoryModalBtn');
    this.closeHistoryBottomBtn = document.getElementById('closeHistoryBottomBtn');
    this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
  }

  bindEvents() {
    // 點擊開始旋轉
    this.spinBtn.addEventListener('click', () => {
      this.initAudio();
      this.spinWheel();
    });

    // 速度選擇
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active-speed'));
        e.currentTarget.classList.add('active-speed');
        this.spinSpeed = e.currentTarget.getAttribute('data-speed');
      });
    });

    // 音效切換
    this.soundToggleBtn.addEventListener('click', () => {
      this.initAudio();
      this.soundEnabled = !this.soundEnabled;
      localStorage.setItem('food_wheel_sound', this.soundEnabled);
      this.updateSoundUI();
    });

    // 開關 CRUD 管理抽屜
    this.manageDataBtn.addEventListener('click', () => this.openCrudDrawer());
    this.quickAddBtn.addEventListener('click', () => this.openCrudDrawer());
    this.closeCrudModalBtn.addEventListener('click', () => this.closeCrudDrawer());
    this.doneCrudBtn.addEventListener('click', () => this.closeCrudDrawer());
    this.crudModal.addEventListener('click', (e) => {
      if (e.target === this.crudModal) this.closeCrudDrawer();
    });

    // CRUD 分類過濾切換
    this.crudCategoryFilter.addEventListener('change', (e) => {
      this.renderCrudItems(e.target.value);
    });

    // 表單新增食物 (Create)
    this.addFoodForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddFood();
    });

    // 恢復所有預設值
    this.resetAllToDefaultBtn.addEventListener('click', () => {
      if (confirm('確定要將所有分類的食物菜單重設為原廠精選預設值嗎？自訂新增的項目將會被重設。')) {
        this.foodData = JSON.parse(JSON.stringify(DEFAULT_FOOD_ITEMS));
        this.saveFoodData();
        this.renderCategoryNav();
        this.renderCurrentList();
        this.renderCrudItems(this.crudCategoryFilter.value);
        this.renderWheel();
      }
    });

    // 當前類別全選/全取消
    this.toggleAllBtn.addEventListener('click', () => {
      const items = this.foodData[this.currentCategory] || [];
      const anyActive = items.some(i => i.active);
      items.forEach(i => i.active = !anyActive);
      this.saveFoodData();
      this.renderCurrentList();
      this.renderWheel();
    });

    // 重設當前分類預設值
    this.resetCategoryBtn.addEventListener('click', () => {
      if (confirm(`確定要將【${this.getCurrentCategoryObj().name}】重設為預設項目嗎？`)) {
        this.foodData[this.currentCategory] = JSON.parse(JSON.stringify(DEFAULT_FOOD_ITEMS[this.currentCategory] || []));
        this.saveFoodData();
        this.renderCurrentList();
        this.renderWheel();
      }
    });

    // 中獎彈窗按鈕
    document.getElementById('closeWinnerModalBtn').addEventListener('click', () => this.closeWinnerModal());
    document.getElementById('spinAgainBtn').addEventListener('click', () => {
      this.closeWinnerModal();
      setTimeout(() => this.spinWheel(), 300);
    });
    document.getElementById('acceptWinnerBtn').addEventListener('click', () => {
      this.closeWinnerModal();
    });
    document.getElementById('copyShareBtn').addEventListener('click', () => {
      if (!this.currentWinner) return;
      const cat = this.getCurrentCategoryObj();
      const text = `🎡 今天吃什麼？命運轉盤幫我們決定了！\n✨ 今日首選：【${this.currentWinner.name}】${this.currentWinner.icon || '🍽️'}\n📍 時段分類：${cat.name}\n💬 12點下課別再互問了，馬上出發吃美食囉！`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          const textSpan = document.getElementById('copyShareText');
          const original = textSpan.textContent;
          textSpan.textContent = '✅ 已複製！快去貼到 LINE 群組揪團！';
          setTimeout(() => { textSpan.textContent = original; }, 2500);
        }).catch(() => {
          alert(`已選出美食：【${this.currentWinner.name}】！快揪大家去吃！`);
        });
      } else {
        alert(`已選出美食：【${this.currentWinner.name}】！快揪大家去吃！`);
      }
    });
    this.winnerModal.addEventListener('click', (e) => {
      if (e.target === this.winnerModal) this.closeWinnerModal();
    });

    // 歷史紀錄彈窗
    this.historyModalBtn.addEventListener('click', () => this.openHistoryModal());
    this.closeHistoryModalBtn.addEventListener('click', () => this.closeHistoryModal());
    this.closeHistoryBottomBtn.addEventListener('click', () => this.closeHistoryModal());
    this.clearHistoryBtn.addEventListener('click', () => {
      if (confirm('確定清空所有歷史抽籤紀錄嗎？')) {
        this.history = [];
        this.saveHistory();
        this.renderHistoryList();
      }
    });
    this.historyModal.addEventListener('click', (e) => {
      if (e.target === this.historyModal) this.closeHistoryModal();
    });

    // 視窗縮放重繪
    window.addEventListener('resize', () => this.renderWheel());
  }

  // ==================== 5. 畫面渲染邏輯 ====================
  getCurrentCategoryObj() {
    return PRESET_CATEGORIES.find(c => c.id === this.currentCategory) || PRESET_CATEGORIES[0];
  }

  getActiveItems() {
    const list = this.foodData[this.currentCategory] || [];
    return list.filter(item => item.active);
  }

  renderCategoryNav() {
    this.categoryNav.innerHTML = '';
    PRESET_CATEGORIES.forEach(cat => {
      const count = (this.foodData[cat.id] || []).filter(i => i.active).length;
      const btn = document.createElement('button');
      const isActive = cat.id === this.currentCategory;
      btn.className = `category-pill snap-start whitespace-nowrap px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 ${
        isActive ? 'active' : 'inactive'
      }`;
      btn.innerHTML = `
        <span>${cat.name}</span>
        <span class="text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-500'}">${count}</span>
      `;
      btn.addEventListener('click', () => {
        if (this.isSpinning) return;
        this.currentCategory = cat.id;
        this.renderCategoryNav();
        this.renderCurrentList();
        this.renderWheel();
      });
      this.categoryNav.appendChild(btn);
    });

    // 同步更新管理抽屜中的下拉選單
    this.newFoodCategory.innerHTML = '';
    this.crudCategoryFilter.innerHTML = '';
    PRESET_CATEGORIES.forEach(cat => {
      const opt1 = new Option(cat.name, cat.id, false, cat.id === this.currentCategory);
      const opt2 = new Option(`📁 ${cat.name}`, cat.id, false, cat.id === this.currentCategory);
      this.newFoodCategory.add(opt1);
      this.crudCategoryFilter.add(opt2);
    });
  }

  renderCurrentList() {
    const cat = this.getCurrentCategoryObj();
    this.currentCategoryTitle.textContent = cat.name;
    this.categorySubBadge.textContent = cat.shortName;

    const allItems = this.foodData[this.currentCategory] || [];
    const activeItems = allItems.filter(i => i.active);
    this.activeCountSummary.textContent = `候選項目：${activeItems.length} / ${allItems.length} 項`;

    this.currentItemsList.innerHTML = '';

    if (allItems.length === 0) {
      this.currentItemsList.innerHTML = `
        <div class="py-8 text-center text-stone-400 text-xs">
          此類別尚無食物，請點擊上方「新增項目」建立美食選項！
        </div>
      `;
      return;
    }

    allItems.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'food-item-row flex items-center justify-between py-2 px-2.5 rounded-xl transition cursor-pointer select-none';
      
      div.innerHTML = `
        <div class="flex items-center gap-2.5 min-w-0">
          <input type="checkbox" ${item.active ? 'checked' : ''} class="w-4 h-4 rounded text-brand-500 focus:ring-brand-400 border-stone-300">
          <span class="text-base">${item.icon || '🍽️'}</span>
          <div class="truncate">
            <span class="text-xs font-semibold ${item.active ? 'text-stone-800' : 'text-stone-400 line-through'}">${item.name}</span>
            ${item.tags && item.tags.length ? `<span class="hidden sm:inline-block text-[10px] text-stone-400 ml-1.5 bg-stone-50 px-1.5 py-0.2 rounded border border-stone-100">${item.tags[0]}</span>` : ''}
          </div>
        </div>
        <div class="flex items-center gap-1">
          <button data-action="edit" class="text-stone-300 hover:text-stone-700 text-xs p-1" title="修改此項目">✏️</button>
        </div>
      `;

      // 點擊勾選或列切換狀態
      const checkbox = div.querySelector('input[type="checkbox"]');
      div.addEventListener('click', (e) => {
        if (e.target.closest('button[data-action="edit"]')) return;
        item.active = !item.active;
        checkbox.checked = item.active;
        this.saveFoodData();
        this.renderCategoryNav();
        this.renderCurrentList();
        this.renderWheel();
      });

      // 快速編輯
      const editBtn = div.querySelector('button[data-action="edit"]');
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openCrudDrawer();
        this.crudCategoryFilter.value = this.currentCategory;
        this.renderCrudItems(this.currentCategory);
      });

      this.currentItemsList.appendChild(div);
    });
  }

  // ==================== 6. Canvas 轉盤繪製核心 ====================
  renderWheel() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 20;

    this.ctx.clearRect(0, 0, width, height);

    const items = this.getActiveItems();
    const count = items.length;

    if (count === 0) {
      // 繪製空轉盤提示
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = '#F5F5F4';
      this.ctx.fill();
      this.ctx.strokeStyle = '#D6D3D1';
      this.ctx.lineWidth = 10;
      this.ctx.stroke();

      this.ctx.fillStyle = '#78716C';
      this.ctx.font = 'bold 32px "Noto Sans TC", sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('請至少勾選一項美食 🍽️', centerX, centerY);
      this.ctx.restore();
      return;
    }

    const sliceAngle = (2 * Math.PI) / count;

    this.ctx.save();
    this.ctx.translate(centerX, centerY);
    this.ctx.rotate(this.currentAngle);

    // 繪製扇形
    for (let i = 0; i < count; i++) {
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.arc(0, 0, radius, startAngle, endAngle);
      this.ctx.closePath();

      // 色彩填充
      this.ctx.fillStyle = WHEEL_PALETTE[i % WHEEL_PALETTE.length];
      this.ctx.fill();

      // 分隔線
      this.ctx.strokeStyle = '#FFFFFF';
      this.ctx.lineWidth = 4;
      this.ctx.stroke();

      // 繪製文字與圖示
      this.ctx.save();
      this.ctx.rotate(startAngle + sliceAngle / 2);
      this.ctx.textAlign = 'right';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillStyle = '#FFFFFF';

      // 依扇形數量自適應字體大小
      const fontSize = count > 12 ? 22 : count > 8 ? 26 : 30;
      this.ctx.font = `bold ${fontSize}px "Noto Sans TC", Outfit, sans-serif`;
      this.ctx.shadowColor = 'rgba(0,0,0,0.35)';
      this.ctx.shadowBlur = 6;

      const item = items[i];
      const displayText = `${item.icon || '🍽️'} ${item.name}`;
      
      // 截斷過長文字以利排版
      const maxLen = count > 10 ? 8 : 11;
      const cleanText = displayText.length > maxLen ? displayText.slice(0, maxLen) + '…' : displayText;

      this.ctx.fillText(cleanText, radius - 35, 0);
      this.ctx.restore();
    }

    // 繪製最外層裝飾金邊環
    this.ctx.beginPath();
    this.ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    this.ctx.lineWidth = 14;
    this.ctx.stroke();

    // 繪製外圈鉚釘點綴點
    const pinCount = Math.max(count * 2, 16);
    for (let p = 0; p < pinCount; p++) {
      const pinAngle = (p * 2 * Math.PI) / pinCount;
      const px = (radius - 7) * Math.cos(pinAngle);
      const py = (radius - 7) * Math.sin(pinAngle);
      this.ctx.beginPath();
      this.ctx.arc(px, py, 4, 0, 2 * Math.PI);
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.fill();
    }

    this.ctx.restore();
  }

  // ==================== 7. 轉盤旋轉物理運算 ====================
  spinWheel() {
    if (this.isSpinning) return;

    const items = this.getActiveItems();
    if (items.length < 1) {
      alert('請先在清單中勾選至少 1 個想吃的候選項目喔！');
      return;
    }

    if (items.length === 1) {
      // 只有一個直接中獎
      this.onSpinComplete(items[0]);
      return;
    }

    this.isSpinning = true;
    this.spinBtn.disabled = true;
    this.spinBtn.classList.add('opacity-80', 'scale-95');

    // 速度配置 (時長與旋轉圈數)
    let duration = 5000;
    let minRotations = 7;
    if (this.spinSpeed === 'fast') {
      duration = 3200;
      minRotations = 5;
    } else if (this.spinSpeed === 'slow') {
      duration = 8000;
      minRotations = 10;
    }

    // 隨機選定中獎項目
    const count = items.length;
    const sliceAngle = (2 * Math.PI) / count;
    const winningIndex = Math.floor(Math.random() * count);
    const winningItem = items[winningIndex];

    // 指針固定在正上方 (角度為 3 * PI / 2 即 -PI / 2)
    // 轉盤停止時，中獎扇形的正中間需要對準正上方
    const sliceCenterAngle = winningIndex * sliceAngle + sliceAngle / 2;
    const targetPointerAngle = (3 * Math.PI) / 2; // 正上方
    
    // 計算目標總旋轉弧度
    const currentModulo = this.currentAngle % (2 * Math.PI);
    let deltaAngle = (targetPointerAngle - sliceCenterAngle - currentModulo) % (2 * Math.PI);
    if (deltaAngle < 0) deltaAngle += 2 * Math.PI;

    const totalRotation = this.currentAngle + minRotations * 2 * Math.PI + deltaAngle;
    const startAngle = this.currentAngle;
    const startTime = performance.now();

    // 物理緩動曲線 (Cubic Easing Out)
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3.2);

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      this.currentAngle = startAngle + (totalRotation - startAngle) * easedProgress;

      // 檢查指針劃過扇形，發出喀噠 Tick 音效
      const relativeAngle = ((3 * Math.PI) / 2 - (this.currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      const currentHoverIndex = Math.floor(relativeAngle / sliceAngle) % count;

      if (currentHoverIndex !== this.lastTickedIndex) {
        this.playTickSound();
        this.lastTickedIndex = currentHoverIndex;
      }

      this.renderWheel();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        this.spinBtn.disabled = false;
        this.spinBtn.classList.remove('opacity-80', 'scale-95');
        this.onSpinComplete(winningItem);
      }
    };

    requestAnimationFrame(animate);
  }

  onSpinComplete(winner) {
    this.playWinSound();

    // 慶祝彩帶特效
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 200);
    }

    // 紀錄進歷史
    const historyItem = {
      id: Date.now(),
      name: winner.name,
      icon: winner.icon || '🍽️',
      category: this.getCurrentCategoryObj().name,
      time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' })
    };
    this.history.unshift(historyItem);
    if (this.history.length > 50) this.history.pop();
    this.saveHistory();

    // 顯示中獎 Modal
    this.openWinnerModal(winner);
  }

  // ==================== 8. 中獎彈窗與地圖 ====================
  openWinnerModal(winner) {
    this.currentWinner = winner;
    const cat = this.getCurrentCategoryObj();
    document.getElementById('winnerIcon').textContent = winner.icon || '🎉';
    document.getElementById('winnerName').textContent = winner.name;
    document.getElementById('winnerCategoryBadge').textContent = `${cat.name} 出爐`;

    const tagsContainer = document.getElementById('winnerTags');
    tagsContainer.innerHTML = '';
    const tags = winner.tags || ['人氣首選', '絕不踩雷'];
    tags.forEach(t => {
      const span = document.createElement('span');
      span.className = 'text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-medium';
      span.textContent = `✨ ${t}`;
      tagsContainer.appendChild(span);
    });

    // 產生 Google 地圖尋找附近美食連結
    const mapQuery = encodeURIComponent(winner.name);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
    const mapBtn = document.getElementById('winnerMapBtn');
    mapBtn.href = mapUrl;

    this.winnerModal.classList.remove('opacity-0', 'pointer-events-none');
    this.winnerModalCard.classList.remove('scale-95');
    this.winnerModalCard.classList.add('scale-100');
  }

  closeWinnerModal() {
    this.winnerModalCard.classList.remove('scale-100');
    this.winnerModalCard.classList.add('scale-95');
    this.winnerModal.classList.add('opacity-0', 'pointer-events-none');
  }

  // ==================== 9. CRUD 資料管理中心 (加分重頭戲) ====================
  openCrudDrawer() {
    this.crudModal.classList.remove('opacity-0', 'pointer-events-none');
    this.crudDrawerCard.classList.remove('translate-x-full');
    this.crudCategoryFilter.value = this.currentCategory;
    this.renderCrudItems(this.currentCategory);
  }

  closeCrudDrawer() {
    this.crudDrawerCard.classList.add('translate-x-full');
    this.crudModal.classList.add('opacity-0', 'pointer-events-none');
    this.renderCategoryNav();
    this.renderCurrentList();
    this.renderWheel();
  }

  handleAddFood() {
    const catId = this.newFoodCategory.value;
    const nameInput = document.getElementById('newFoodName');
    const iconInput = document.getElementById('newFoodIcon');
    const tagsInput = document.getElementById('newFoodTags');

    const name = nameInput.value.trim();
    if (!name) return;

    const icon = iconInput.value.trim() || '🍽️';
    const tags = tagsInput.value.trim() 
      ? tagsInput.value.split(/[,，]/).map(t => t.trim()).filter(Boolean)
      : ['自訂美食'];

    const newItem = {
      id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: name,
      icon: icon,
      tags: tags,
      active: true
    };

    if (!this.foodData[catId]) this.foodData[catId] = [];
    this.foodData[catId].push(newItem);
    this.saveFoodData();

    // 清空輸入框
    nameInput.value = '';
    iconInput.value = '';
    tagsInput.value = '';

    // 重新渲染清單
    this.crudCategoryFilter.value = catId;
    this.renderCrudItems(catId);
    this.renderCategoryNav();
    this.renderCurrentList();
    this.renderWheel();
  }

  renderCrudItems(catId) {
    const items = this.foodData[catId] || [];
    this.crudItemsList.innerHTML = '';

    // 計算總數
    let totalCount = 0;
    Object.values(this.foodData).forEach(arr => totalCount += arr.length);
    this.totalItemsCountLabel.textContent = `此分類 ${items.length} 項 (全站共 ${totalCount} 項)`;

    if (items.length === 0) {
      this.crudItemsList.innerHTML = `
        <div class="p-6 text-center text-stone-400 text-xs border border-dashed border-stone-200 rounded-xl">
          此分類目前沒有菜色項目，可使用上方表單進行新增 (Create)。
        </div>
      `;
      return;
    }

    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'bg-white p-3 rounded-xl border border-stone-200/80 shadow-sm flex items-center justify-between gap-3 text-xs';
      
      card.innerHTML = `
        <div class="flex items-center gap-2.5 min-w-0 flex-1">
          <span class="text-lg flex-shrink-0 cursor-pointer" title="更換圖示" data-action="change-icon">${item.icon || '🍽️'}</span>
          <div class="min-w-0 flex-1">
            <div class="font-bold text-stone-900 truncate item-name-display">${item.name}</div>
            <div class="text-[10px] text-stone-400 truncate">${(item.tags || []).join(' · ')}</div>
          </div>
        </div>
        <div class="flex items-center gap-1.5 flex-shrink-0">
          <button data-action="edit" class="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 transition" title="編輯名稱與標籤">
            ✏️
          </button>
          <button data-action="delete" class="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition" title="刪除此項目">
            🗑️
          </button>
        </div>
      `;

      // 編輯功能 (Update)
      card.querySelector('button[data-action="edit"]').addEventListener('click', () => {
        const newName = prompt('請輸入新的美食名稱：', item.name);
        if (newName !== null && newName.trim() !== '') {
          item.name = newName.trim();
          const newTags = prompt('請輸入標籤（以逗號分隔）：', (item.tags || []).join(', '));
          if (newTags !== null) {
            item.tags = newTags.split(/[,，]/).map(t => t.trim()).filter(Boolean);
          }
          this.saveFoodData();
          this.renderCrudItems(catId);
          this.renderCurrentList();
          this.renderWheel();
        }
      });

      // 刪除功能 (Delete)
      card.querySelector('button[data-action="delete"]').addEventListener('click', () => {
        if (confirm(`確定刪除「${item.name}」嗎？`)) {
          this.foodData[catId].splice(index, 1);
          this.saveFoodData();
          this.renderCrudItems(catId);
          this.renderCategoryNav();
          this.renderCurrentList();
          this.renderWheel();
        }
      });

      // 快速換 Emoji
      card.querySelector('[data-action="change-icon"]').addEventListener('click', () => {
        const newEmoji = prompt('請輸入代表此美食的 Emoji：', item.icon || '🍽️');
        if (newEmoji !== null && newEmoji.trim() !== '') {
          item.icon = newEmoji.trim();
          this.saveFoodData();
          this.renderCrudItems(catId);
          this.renderCurrentList();
          this.renderWheel();
        }
      });

      this.crudItemsList.appendChild(card);
    });
  }

  // ==================== 10. 抽籤歷史紀錄 ====================
  openHistoryModal() {
    this.renderHistoryList();
    this.historyModal.classList.remove('opacity-0', 'pointer-events-none');
    this.historyModalCard.classList.remove('scale-95');
    this.historyModalCard.classList.add('scale-100');
  }

  closeHistoryModal() {
    this.historyModalCard.classList.remove('scale-100');
    this.historyModalCard.classList.add('scale-95');
    this.historyModal.classList.add('opacity-0', 'pointer-events-none');
  }

  renderHistoryList() {
    const list = document.getElementById('historyListContainer');
    list.innerHTML = '';

    if (this.history.length === 0) {
      list.innerHTML = `
        <div class="py-10 text-center text-stone-400">
          尚未有任何抽籤紀錄，快去轉一次轉盤吧！
        </div>
      `;
      return;
    }

    this.history.forEach(item => {
      const row = document.createElement('div');
      row.className = 'flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-100';
      row.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="text-base">${item.icon}</span>
          <div>
            <div class="font-bold text-stone-800">${item.name}</div>
            <div class="text-[10px] text-stone-400">${item.category}</div>
          </div>
        </div>
        <div class="text-[11px] text-stone-400 font-medium">${item.date} ${item.time}</div>
      `;
      list.appendChild(row);
    });
  }

  updateHistoryBadge() {
    const badge = document.getElementById('historyCountBadge');
    if (this.history.length > 0) {
      badge.textContent = this.history.length;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  updateSoundUI() {
    this.soundIcon.textContent = this.soundEnabled ? '🔊' : '🔇';
    const label = this.soundToggleBtn.querySelector('span:last-child');
    if (label) {
      label.textContent = this.soundEnabled ? '音效開啟' : '靜音中';
    }
  }
}

// 頁面載入完成後啟動應用
document.addEventListener('DOMContentLoaded', () => {
  window.foodWheel = new FoodWheelApp();
});
