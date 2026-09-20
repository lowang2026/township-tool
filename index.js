fetch('item.json');
// ==================== 新增一行 ====================
function addRow() {
    const tbody = document.getElementById('tableBody');
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>
            <div class="search-select-wrapper">
                <input type="text" class="search-input" placeholder="输入名称查找..."
                       oninput="filterOptions(this)" onfocus="showOptions(this)" autocomplete="off">
                <input type="hidden" class="item-price" value="0">
                <div class="options-list"></div>
            </div>
        </td>
        <td>
            <input type="number" class="qty-input" min="0" value="1" oninput="updateRowTotal(this)">
        </td>
        <td class="row-total">0</td>
        <td>
            <button class="btn-del" onclick="deleteRow(this)">删除</button>
        </td>
    `;

    tbody.appendChild(tr);
}

// ==================== 显示下拉选项 ====================
function showOptions(input) {
    document.querySelectorAll('.options-list').forEach(el => el.style.display = 'none');
    const list = input.closest('.search-select-wrapper').querySelector('.options-list');
    renderOptions(list, itemsData, input);
    list.style.display = 'block';
}

// ==================== 按关键字过滤 ====================
function filterOptions(input) {
    const list = input.closest('.search-select-wrapper').querySelector('.options-list');
    const keyword = input.value.trim().toLowerCase();

    const filtered = itemsData.filter(item =>
        item.name.toLowerCase().includes(keyword)
    );

    renderOptions(list, filtered, input);
    list.style.display = 'block';
}

// ==================== 渲染下拉列表 ====================
function renderOptions(listElement, data, inputElement) {
    listElement.innerHTML = '';

    if (data.length === 0) {
        listElement.innerHTML = '<div class="no-result">未找到匹配商品</div>';
        return;
    }

    data.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.name} (${item.price} 金币)`;
        div.onclick = function (e) {
            e.stopPropagation();
            inputElement.value = item.name;
            inputElement.closest('.search-select-wrapper').querySelector('.item-price').value = item.price;
            listElement.style.display = 'none';
            updateRowTotal(inputElement);
        };
        listElement.appendChild(div);
    });
}

// ==================== 更新单行总价 ====================
function updateRowTotal(element) {
    const tr = element.closest('tr');
    const price = parseFloat(tr.querySelector('.item-price').value) || 0;
    const qty = parseInt(tr.querySelector('.qty-input').value) || 0;
    tr.querySelector('.row-total').textContent = price * qty;
}

// ==================== 删除一行 ====================
function deleteRow(button) {
    button.closest('tr').remove();
}

// ==================== 计算总价 ====================
function calculateTotal() {
    let grandTotal = 0;
    document.querySelectorAll('#tableBody tr').forEach(row => {
        grandTotal += parseFloat(row.querySelector('.row-total').textContent) || 0;
    });
    document.getElementById('resultBox').textContent = `总价：${grandTotal} 金币`;
}

// ==================== 绑定事件 & 初始化 ====================
document.addEventListener('DOMContentLoaded', function () {
    // 点击页面其他地方，收起所有下拉列表
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.search-select-wrapper')) {
            document.querySelectorAll('.options-list').forEach(el => el.style.display = 'none');
        }
    });

    // 按钮事件
    document.getElementById('btnAdd').addEventListener('click', addRow);
    document.getElementById('btnCalc').addEventListener('click', calculateTotal);

    // 默认添加一行
    addRow();
});