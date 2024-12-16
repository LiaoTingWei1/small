document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    body.classList.add('fade-in'); // 頁面加載後添加淡入效果
});

function navigateToHome() {
    window.location.href = 'new.html'; // 返回主頁
}
document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    body.classList.add('fade-in'); // 頁面加載後添加淡入效果
});
document.addEventListener("DOMContentLoaded", function () {
    const fridgePanel = document.getElementById("fridgePanel");
    const openFridgeButton = document.getElementById("openFridge");
    const closeFridgeButton = document.getElementById("closeFridge");
    const fridgeContent = document.getElementById("fridgeContent");
    const fridgeBody = document.getElementById("fridgeBody");

    // 使用 localStorage 保存食材
    let fridgeItems = JSON.parse(localStorage.getItem("fridgeItems")) || {};

    // 打開冰箱
    openFridgeButton.addEventListener("click", () => {
        fridgePanel.classList.add("open");
        renderFridge();
    });

    // 關閉冰箱
    closeFridgeButton.addEventListener("click", () => {
        fridgePanel.classList.remove("open");
    });

    // 渲染冰箱內容
    function renderFridge() {
        fridgeBody.innerHTML = ""; // 清空內容

        if (Object.keys(fridgeItems).length === 0) {
            fridgeBody.innerHTML = `
                <tr>
                    <td colspan="3" class="empty-message">目前冰箱是空的，快來添加食材！</td>
                </tr>`;
        } else {
            Object.keys(fridgeItems).forEach((itemName) => {
                const quantity = fridgeItems[itemName]; // 取得數量

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${itemName}</td>
                    <td>
                        <input type="number" class="item-quantity" value="${quantity}" min="1" data-name="${itemName}">
                    </td>
                    <td>
                        <button class="delete-btn" data-name="${itemName}">&times;</button>
                    </td>
                `;
                fridgeBody.appendChild(row);
            });

            // 綁定輸入框事件：更改數量
            document.querySelectorAll(".item-quantity").forEach((input) => {
                input.addEventListener("change", (e) => {
                    const itemName = e.target.dataset.name;
                    const newQuantity = parseInt(e.target.value, 10);
                    if (newQuantity > 0) {
                        fridgeItems[itemName] = newQuantity;
                    } else {
                        delete fridgeItems[itemName];
                    }
                    saveFridge(); // 保存到 localStorage
                    renderFridge();
                });
            });

            // 綁定刪除按鈕事件
            document.querySelectorAll(".delete-btn").forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    const itemName = e.target.dataset.name;
                    delete fridgeItems[itemName];
                    saveFridge(); // 保存到 localStorage
                    renderFridge();
                });
            });
        }
    }

    // 保存冰箱內容到 localStorage
    function saveFridge() {
        localStorage.setItem("fridgeItems", JSON.stringify(fridgeItems));
    }

    // 處理拖曳放入冰箱
    window.allowDrop = function (event) {
        event.preventDefault();
    };

    window.drag = function (event) {
        event.dataTransfer.setData("text", event.target.dataset.name);
    };

    window.drop = function (event) {
        event.preventDefault();
        const itemName = event.dataTransfer.getData("text");

        if (itemName) {
            if (fridgeItems[itemName]) {
                fridgeItems[itemName] += 1; // 如果已存在，數量+1
            } else {
                fridgeItems[itemName] = 1; // 新增食材數量為1
            }
            saveFridge();
            renderFridge();
        }
    };

    renderFridge(); // 初始化冰箱內容
});
