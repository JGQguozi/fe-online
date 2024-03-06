function debounce<T>(fn: T, time: number = 5000) {
    // 4.创建一个标记用来存放定时器的返回值
    let timeout = null;
    return function () {
        let that = this
        let args = arguments
        // 5.每当用户触发input事件  把前一个 setTimeout 清楚掉
        if (time){
            clearTimeout(timeout);
        }

        // 6.然后又创建一个新的 setTimeout, 这样就能保证输入字符后等待的间隔内 还有字符输入的话，就不会执行 setTimeout里面的内容
        timeout = setTimeout(() => {
            // 7.这里进行防抖的内容
            fn.apply(that,args);
        }, time);
    };
   
}
export default debounce