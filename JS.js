document.addEventListener('DOMContentLoaded', () => {
  // 獲取所有帶有 trigger-modal 的圖片
  const triggerImages = document.querySelectorAll('.trigger-modal');

  // 綁定點擊事件給每張圖片
  triggerImages.forEach(image => {
    image.addEventListener('click', () => handleImageClick(image));
  });

  // 處理圖片點擊事件
  function handleImageClick(image) {
    // 獲取自定義數據
    const title = image.getAttribute('data-title');
    const description = image.getAttribute('data-description');
    const imageUrl = image.getAttribute('data-image');
    const ingredients = image.getAttribute('data-ingredients');
    const steps = image.getAttribute('data-steps');

    // 更新模態框內容
    updateModalContent(imageUrl, title, description, ingredients, steps);

    // 顯示模態框
    const recipeModal = new bootstrap.Modal(document.getElementById('recipeModal'));
    recipeModal.show();
  }

  // 更新模態框的內容
  function updateModalContent(imageUrl, title, description, ingredients, steps) {
    document.getElementById('modalImage').src = imageUrl; // 更新左側圖片
    document.getElementById('modalContent').innerHTML = `
      <h4>${title}</h4>
      <p>${description}</p>
    `;
    // 暫存備料和做法數據，切換按鈕時使用
    document.getElementById('modalContent').setAttribute('data-ingredients', ingredients);
    document.getElementById('modalContent').setAttribute('data-steps', steps);

    // 預設高亮按鈕為 "備料食材"
    setActiveButton('ingredientsButton');
    showIngredients(); // 預設顯示備料食材內容
  }

  // 顯示備料食材內容
  function showIngredients() {
    const ingredients = document
      .getElementById('modalContent')
      .getAttribute('data-ingredients')
      .split('、'); // 按 "、" 分割為列表
    const ingredientList = ingredients
      .map((item, index) => `<li data-index="${index + 1}">${item.trim()}</li>`) // 為每項內容添加序號
      .join('');
    document.getElementById('modalContent').innerHTML = `
      <h4>備料食材</h4>
      <ul>${ingredientList}</ul>
    `;
  }

  // 顯示料理做法內容
  function showSteps() {
    const steps = document
      .getElementById('modalContent')
      .getAttribute('data-steps')
      .split('。') // 按 "。" 分割為列表
      .filter(step => step.trim() !== ''); // 過濾掉空白項
    const stepsList = steps
      .map((step, index) => `<li data-index="${index + 1}">${step.trim()}</li>`) // 為每步添加序號
      .join('');
    document.getElementById('modalContent').innerHTML = `
      <h4>料理做法</h4>
      <ul>${stepsList}</ul>
    `;
  }

  // 切換按鈕內容功能
  document.getElementById('ingredientsButton').addEventListener('click', () => {
    showIngredients();
    setActiveButton('ingredientsButton');
  });

  document.getElementById('stepsButton').addEventListener('click', () => {
    showSteps();
    setActiveButton('stepsButton');
  });

  // 函數：更新按鈕的 active 樣式
  function setActiveButton(activeButtonId) {
    const buttons = document.querySelectorAll('.modal-buttons .btn');
    buttons.forEach(button => {
      if (button.id === activeButtonId) {
        button.classList.add('active'); // 添加 active 樣式
      } else {
        button.classList.remove('active'); // 移除 active 樣式
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const skipButton = document.getElementById('skip-button');
  const introAnimation = document.getElementById('intro-animation');
  const mainContent = document.getElementById('main-content');

  // 自動結束動畫
  setTimeout(() => {
      introAnimation.style.display = 'none';
      mainContent.style.display = 'block';
  }, 10000); // 總動畫時長延長至 X 秒

  // SKIP 按鈕功能
  skipButton.addEventListener('click', () => {
      introAnimation.style.display = 'none'; // 立刻隱藏動畫
      mainContent.style.display = 'block'; // 顯示主內容
  });
});
// -------------------------------
document.addEventListener('DOMContentLoaded', () => {
const links = document.querySelectorAll('.category-link');

links.forEach(link => {
    link.addEventListener('click', (event) => {
        const targetId = event.target.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offset = 150; // 調整滾動偏移量
            const targetPosition = targetElement.offsetTop;
            window.scrollTo({
                top: targetPosition - offset,
                behavior: 'smooth'
            });
        }
    });
});
});
// ----------------------------------------------
document.querySelector('.hamburger-menu').addEventListener('click', function () {
this.classList.toggle('open');
document.querySelector('.navbar-subtitles').classList.toggle('open');
});
document.addEventListener("DOMContentLoaded", () => {
const sections = document.querySelectorAll("section"); // 目標區塊
const navLinks = document.querySelectorAll(".category-link"); // 導航按鈕

// 建立 Intersection Observer
const observerOptions = {
  root: null,
  threshold: 0.6, // 當區塊 60% 可見時觸發
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const targetId = entry.target.id;

      // 移除所有按鈕的高亮
      navLinks.forEach((link) => link.classList.remove("active"));

      // 找到對應的按鈕並添加高亮
      const activeLink = document.querySelector(
        `.category-link[data-target="${targetId}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
}, observerOptions);

// 監測每個 section
sections.forEach((section) => observer.observe(section));

// 點擊滾動到指定位置
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.getElementById(link.dataset.target);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 150, // 保持導航欄高度的間距
        behavior: "smooth",
      });
    }
  });
});
});
// JavaScript 文件中新增
function navigateToStorage() {
window.location.href = 'storage.html'; // 跳轉至食材倉庫頁面
}