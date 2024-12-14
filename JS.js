document.addEventListener('DOMContentLoaded', () => {
    // 获取所有触发模态框的图片
    const triggerImages = document.querySelectorAll('.trigger-modal');
  
    // 动态绑定点击事件
    triggerImages.forEach(image => {
      image.addEventListener('click', function () {
        // 获取图片的自定义数据
        const title = this.getAttribute('data-title');
        const description = this.getAttribute('data-description');
        const imageUrl = this.getAttribute('data-image');
  
        // 动态填充模态框内容
        document.getElementById('modalImage').src = imageUrl; // 更新左侧图片
        document.getElementById('modalContent').innerHTML = `
          <h4>${title}</h4>
          <p>${description}</p>
        `;
  
        // 设置默认高亮按键为 "備料食材"
        setActiveButton('ingredientsButton');
  
        // 显示模态框
        const recipeModal = new bootstrap.Modal(document.getElementById('recipeModal'));
        recipeModal.show();
      });
    });
  
    // 切换内容按键功能
    document.getElementById('ingredientsButton').addEventListener('click', function () {
      document.getElementById('modalContent').innerHTML = `
        <h4>備料食材</h4>
        <p>例如：排骨500克、蘋果2顆、醬油50毫升等。</p>
      `;
      setActiveButton('ingredientsButton');
    });
  
    document.getElementById('stepsButton').addEventListener('click', function () {
      document.getElementById('modalContent').innerHTML = `
        <h4>料理做法</h4>
        <p>1. 將排骨清洗乾淨，切成小塊。</p>
        <p>2. 蘋果去皮切塊，加入鍋中與排骨一起翻炒。</p>
        <p>3. 加入醬油和其他調料，燉煮20分鐘。</p>
        <p>4. 出鍋裝盤即可享用！</p>
      `;
      setActiveButton('stepsButton');
    });
  
    // 函数：更新按键的 active 样式
    function setActiveButton(activeButtonId) {
      const buttons = document.querySelectorAll('.modal-buttons .btn');
      buttons.forEach(button => {
        if (button.id === activeButtonId) {
          button.classList.add('active'); // 添加 active 样式
        } else {
          button.classList.remove('active'); // 移除 active 样式
        }
      });
    }
  });
  