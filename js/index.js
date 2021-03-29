var that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        this.fsection = this.main.querySelector('.tabscon');
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        this.init();
    }

    init() {
            this.updateNode();
            this.add.onclick = this.addTab;
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
                this.spans[i].onclick = this.removeTab;
                this.spans1[i].ondblclick = this.editTab;
                this.sections[i].ondblclick = this.editTab;
            }

        }
        //新添加更新
    updateNode() {
            this.sections = this.main.querySelectorAll('section');
            this.lis = this.main.querySelectorAll('li');
            this.spans = this.main.querySelectorAll('.fisrstnav li span:last-child');
            this.spans1 = this.main.querySelectorAll('.fisrstnav ul li span:first-child');

        }
        //清除其他
    clearcss() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }
        // 切换
    toggleTab() {
            that.clearcss();
            this.className = "liactive";
            that.sections[this.index].className = "conactive";
            // console.log(this.index);

        }
        // 添加
    addTab() {
            // console.log(11);
            var random = Math.random();
            that.clearcss();
            var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
            that.ul.insertAdjacentHTML('beforeend', li);
            var section = '<section class="conactive">测试 ' + random + '</section>';
            that.fsection.insertAdjacentHTML('beforeend', section);
            that.init();
        }
        // 删除
    removeTab(e) {
            // alert(11);

            e.stopPropagation();
            var index = this.parentNode.index;
            console.log(index);
            // console.log(index);
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();
            // 当我们删除的不是选中状态的li 的时候,原来的选中状态li保持不变
            if (document.querySelector('.liactive')) return;
            // 当我们删除了选中状态的这个li 的时候, 让它的前一个li 处于选定状态
            index--;
            // 手动调用我们的点击事件  不需要鼠标触发
            that.lis[index] && that.lis[index].click();
        }
        //修改
    editTab() {
        var str = this.innerHTML;
        // console.log(11);
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        input.select();
        // 当我们离开文本框就把文本框里面的值给span 
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        }
        input.onkeyup = function(e) {
            if (e.keyCode == 13) {
                input.blur();
            }
        }

    }
}
new Tab('#tab');