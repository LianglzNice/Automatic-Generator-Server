module.exports = function(data){
    let dom = '';
    let style = '';
    let script = '';
    //计算空格
    let sp = (count) => {
        let space = ' ';
        for(let i=0; i<count; i++){
            space += ' ';
        }
        return space;
    }
    //列举嵌套组件属性项
    let getChildAttrs = (attrs, i) => {
        let childAttrItem = '';
        if(attrs){ 
            for(let k=0; k<attrs.length; k++){
                childAttrItem += `:${attrs[k]}="${i}" `;
            }
        }
        return childAttrItem;
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

        let model = item.hasModel ? `v-model="${item.name + (i+1)}"` : '';

        dom += `${sp(11)}<div class="${item.name}-${i+1}">\r\n`;
        switch(item.value){
            case 2: case 3: case 4:
                if(item.original.children){
                    dom += `${sp(15)}<${item.original.name} ${attrItem} ${model}>\r\n`;
                    for(let m=0; m<2; m++){
                        let tag = item.attributes.shapeType ? item.attributes.shapeType : item.original.children.name;
                        dom += `${sp(19)}<${tag} ${getChildAttrs(item.original.children.childAttrs, m+1)}>${item.label+(m+1)}</${tag}>\r\n`;
                    }
                    dom += `${sp(15)}</${item.original.name}>\r\n`;

                }else{
                    dom += `${sp(15)}<${item.original.name} ${attrItem} ${model}>${item.attributes.value}</${item.original.name}>\r\n`;
                }
                break;

            default: 
                dom += `${sp(15)}<${item.original.name} ${attrItem} ${model}></${item.original.name}>\r\n`;
                break;
        }
        dom += `${sp(11)}</div>\r\n`;

        //列举script
        if(item.hasModel){
            if(item.value === 4){
                script += `${sp(23)}${item.name + (i+1)} : [1],\r\n`;
            }else{
                script += `${sp(23)}${item.name + (i+1)} : '',\r\n`;
            }
        }
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
            const app = createApp({
                setup() {
                    const data = reactive({
${script}
                    });

                    return {
                        ...toRefs(data)
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
