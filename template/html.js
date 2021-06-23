module.exports = function(data){
    let dom = '';
    let style = '';

    let sp = (count) => {
        let space = ' ';
        for(let i=0; i<count; i++){
            space += ' ';
        }
        return space;
    }

    for(let i=0; i<data.length; i++){
        let item = data[i];

        //列举样式项
        let styleItem = '';
        for(let j in item.style){
            styleItem += `${sp(15)}${j}:${item.style[j]};\r\n`;
        }

        style += `${sp(11)}.${item.name}-${i+1} {\r\n${styleItem}\r\n${sp(11)}}\r\n`;

        //列举属性项
        let attrItem = '';
        for(let n in item.attributes){
            console.log(typeof item.attributes[n]);
            if(typeof item.attributes[n] === 'boolean'){
                attrItem += `:${n}="${item.attributes[n]}" `;
            }else if(item.attributes[n] !== '' && item.attributes[n] !== null){
                attrItem += `${n}="${item.attributes[n]}" `;
            }
        }

        //元素是div
        if(item.value === 1){
            dom += `${sp(11)}<div class="${item.name}-${i+1}"></div>\r\n`;
            continue;
        }
        dom += `${sp(11)}<div class="${item.name}-${i+1}">\r\n`;
        switch(item.value){
            case 2:
                dom += `${sp(15)}<el-${item.name} ${attrItem}>${item.attributes.value}</el-${item.name}>\r\n`;
                break;
            default: 
                dom += `${sp(15)}<el-${item.name} ${attrItem}></el-${item.name}>\r\n`;
                break;
        }
        dom += `${sp(11)}</div>\r\n`;
    }

    return (
`<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/element-plus/lib/theme-chalk/index.css">
        <script src="https://cdn.bootcdn.net/ajax/libs/vue/3.1.0/vue.global.min.js"></script>
        <script src="https://unpkg.com/element-plus/lib/index.full.js"></script>
        <title>标题</title>
        <style>
${style}
        </style>
    </head>
    <body>
        <div id="app">
${dom}
        </div>
        <script>
            const { createApp, ref, reactive, toRefs } = Vue;
            const message = ref('hello');
            const app = createApp({
                setup() {
                    return {
                        message
                    }
                }
            });
            app.use(ElementPlus, { size: 'small'});
            app.mount("#app");
        </script>
    </body>
</html>`
    )
}
