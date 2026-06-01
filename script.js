function downloadPoster() {
    const element = document.getElementById('capture-area');
    const btn = document.getElementById('generate-btn');
// 获取元素
const fileInput = document.getElementById('ootd-file');
const previewImg = document.getElementById('preview-img');
const placeholder = document.getElementById('upload-placeholder');
const uploadWrapper = document.querySelector('.upload-wrapper');

// 监听文件选择变化
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        // 创建 FileReader 读取文件
        const reader = new FileReader();

        reader.onload = function(event) {
            // 设置图片源
            previewImg.src = event.target.result;
            // 显示图片，隐藏占位符
            previewImg.style.display = 'block';
            placeholder.style.display = 'none';
            // 改变边框样式表示已上传
            uploadWrapper.style.border = '1px solid #0082c9';
        }

        reader.readAsDataURL(file);
    }
});

// 点击图片可以重新选择（可选）
previewImg.addEventListener('click', function() {
    fileInput.click();
});
    // 1. 临时隐藏按钮（虽然按钮不在 capture-area 里，但为了保险）
    btn.innerText = "生成中...";

    // 2. 预处理：为了防止 html2canvas 无法捕获 input/div 的文字
    // 我们给所有 contenteditable 的元素加上一个临时的 text-shadow 或者强制重绘
    const editables = document.querySelectorAll('[contenteditable]');
    editables.forEach(el => {
        el.style.textShadow = 'none'; // 移除可能的干扰
    });

    // 使用 html2canvas 截图
    html2canvas(element, {
        useCORS: true, // 允许跨域图片（如果 bg.jpg 是本地则不需要，如果是网络图需要）
        scale: 2,      // 提高清晰度（2倍图）
        backgroundColor: null // 保持透明背景
    }).then(canvas => {
        // 创建下载链接
        const link = document.createElement('a');
        link.download = 'decathlon-poster.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // 恢复按钮状态
        btn.innerText = "生成海报";
    }).catch(err => {
        console.error("生成失败:", err);
        alert("生成图片失败，请检查控制台报错");
        btn.innerText = "生成海报";
    });
}