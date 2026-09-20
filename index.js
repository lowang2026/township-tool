// ==================== 商品数据 ====================
const itemsData = [
    { name: "小麦", price: 1 }, { name: "玉米", price: 3 },
    { name: "胡萝卜", price: 5 }, { name: "甘蔗", price: 7 },
    { name: "棉花", price: 9 }, { name: "草莓", price: 11 },
    { name: "番茄", price: 13 }, { name: "松树", price: 15 },
    { name: "土豆", price: 17 }, { name: "可可", price: 19 },
    { name: "橡胶树", price: 29 }, { name: "丝绸树", price: 33 },
    { name: "辣椒", price: 20 }, { name: "水稻", price: 16 },
    { name: "玫瑰", price: 29 }, { name: "茉莉", price: 39 },
    { name: "牛奶", price: 7 }, { name: "鸡蛋", price: 10 },
    { name: "羊毛", price: 15 }, { name: "糖", price: 14 },
    { name: "糖浆", price: 29 }, { name: "焦糖", price: 45 },
    { name: "奶油", price: 12 }, { name: "奶酪", price: 25 },
    { name: "黄油", price: 39 }, { name: "酸奶", price: 53 },
    { name: "冻酸奶", price: 87 }, { name: "面包", price: 5 },
    { name: "曲奇饼干", price: 44 }, { name: "玛芬", price: 68 },
    { name: "马铃薯面包", price: 158 }, { name: "棉布", price: 37 },
    { name: "毛线", price: 61 }, { name: "衬衫", price: 45 },
    { name: "毛衣", price: 76 }, { name: "外套", price: 125 },
    { name: "米花", price: 12 }, { name: "米片", price: 19 },
    { name: "麦片", price: 29 }, { name: "薯片", price: 69 },
    { name: "奶昔", price: 30 }, { name: "汉堡", price: 57 },
    { name: "明治", price: 80 }, { name: "薯条", price: 88 }
];

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