module.exports = function(data){
    let dom = '';
    let style = '';
    for(let i=0; i<data.length; i++){
        if(data[i].value === 1){
            dom += `        <div class="${data[i].name}-${i}"></div>\r\n`;
        }

        let styleItem = '';
        for(let j in data[i].style){
            styleItem += `                ${j}:${data[i].style[j]};\r\n`
        }

        style += `            .${data[i].name}-${i} {
${styleItem}
            }\r\n`;
    }

    return (
`<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>标题</title>
        <style>
${style}
        </style>
    </head>
    <body>
${dom}
    </body>
</html>`
    )
}
