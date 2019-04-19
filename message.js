!function () {

    var model = {
        init: function () {
            var APP_ID = '0u5LPTJV8vlEvUBL1bT3TYX5-gzGzoHsz';
            var APP_KEY = '6vLBnNjah3UoR2JQcRgpTJpy';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        fecth: function(){  //获取数据
            var query = new AV.Query('Message')
            return query.find()     //Promise对象
        },
        save: function(name,content){   //存储数据
            var Message = AV.Objectexteng('Message')
            var message = new Message()
            return message.save({   //Promise对象
                'name':name,
                'content':content
            })
        }
    }

    var view = document.querySelector('section.message')

    var controller = {
        view: null,     // 先把元素获取好
        messageList: null,
        init: function (view) {
            this.view = view
            this.model = model
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('#form')
            this.model.init()   //初始化函数
            this.loadMessages() //获取对象
            this.bindEvents()   //绑定事件
        },
        loadMessages: function () {
            //获取所有对象
            this.model.fecth().then((messages) => {
                //   console.log(messages[0].attributes.content)
                //   console.log(messages[1].attributes.content)
                //获取每一个留言对应的文本内容
                let array = messages.map((item) => item.attributes)
                //将留的言作为 li 元素插入到 message 里面
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name}: ${item.content}`
                    this.messageList.appendChild(li)
                })
            })
        },
        bindEvents: function () {
            //监听form中的submit时间就可以知道用户点击了提交按钮
            this.form.addEventListener('submit',  (e) => { // 箭头函数不会犯贱改你的this
                e.preventDefault()  //阻止默认事件，否则会自动刷新页面
                this.saveMessage()
            })
        },
        saveMessage: function(){
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            //创建 TestObject 表
            //在表中创建一行数据
            //数据内容储存为 words: 'Hello World!'
            //如果保存成功就运行 alert()
            this.model.save(name,content).then(function (object) {
                alert('留言成功!');
                // window.location.reload();，不刷新页面，直接将这个留言添加进去
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')   //使用局部变量，效果其实是一样的
                messageList.append(li)
                //但添加后输入框里面的内容还会在，所以需要清空
                myForm.querySelector('input[name=content]').value = ''
                myForm.querySelector('input[name=name]').value = ''
            })
        }
    }

    controller.init(view,model)     //初始化，一定要加这一句

}.call();

/*
//创建 TestObject 表
var TestObject = AV.Object.extend('Living');
//在表中创建一行数据
var testObject = new TestObject();
//数据内容储存为 words: 'Hello World!'
//如果保存成功就运行 alert()
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})
*/