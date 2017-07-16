### 一、提出问题
* 1、在我们做项目中一般点击列表页面到详细页面需要把当前点击的列表`id`传递到详细页面
* 2、详细页面根据列表页面传递过来的id获取具体内容
![QQ图片20170716215949.png](http://img.blog.csdn.net/20170716222930523?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQva3VhbmdzaHAxMjg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast "")

### 二、处理方式
* 1、`query`查询方式在详细页面的`url?id=xxx`这样的方式

    ![QQ图片20170716221518.png](http://img.blog.csdn.net/20170716222945879?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQva3VhbmdzaHAxMjg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast "")
* 2、静态文件处理(更适合`SEO`搜索引擎)`url/xx`

    ![QQ图片20170716221348.png](http://img.blog.csdn.net/20170716223011525?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQva3VhbmdzaHAxMjg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast "")

### 三、`query`查询方式处理代码
* 1、前端代码(`ejs`模板文件)

    ```html
    <% for(let index in data){%>
        <div class="col-md-3">
            <div class="thumbnail">
                <img src="upload/<%= data[index].filename%>" style="width:200px;height: 200px;">
                <div class="caption">
                    <h4><%= data[index].type%></h4>
                    <p>
                        <a href="/list?id=<%= data[index].id %>" class="btn btn-primary" role="button">详细页面</a>
                    </p>
                </div>
            </div>
        </div>
    <% } %>
    ```
    
* 2、`nodejs`后端获取传递过来的参数代码

    ```javascript
    router.get("/list",(req,res)=>{
        let id = req.query.id;
        res.locals.id = id;
        res.render("list.ejs");
    })
    ```
    
* 3、说明`res.locals.xx`是传递参数到一个页面中,页面中直接`<%= xx %>`就可以显示

### 四、使用静态文件的处理方式
* 1、前端模板文件(`ejs`文件)

    ```html
    <% for(let index in data){%>
        <div class="col-md-3">
            <div class="thumbnail">
                <img src="upload/<%= data[index].filename%>" style="width:200px;height: 200px;">
                <div class="caption">
                    <h4><%= data[index].type%></h4>
                    <p>
                        <a href="/list/<%= data[index].id %>" class="btn btn-primary" role="button">详细页面</a>
                    </p>
                </div>
            </div>
        </div>
    <% } %>
    ```
    
* 2、`nodejs`后端获取传递过来的参数代码(注意是用`req.params`获取)

    ```javascript
    router.get("/list/:id",(req,res)=>{
        let id = req.params.id;
        res.locals.id = id;
        res.render("list.ejs");
    })
    ```
    
### 五、补充说明，关于返回错误页面时候状态码的修改
* 1、使用`status`函数设置状态码

    ```javascript
    router.get("/list/:id",(req,res)=>{
        let id = req.params.id;
        res.locals.id = id;
        res.status(500).render("list.ejs");
    })
    ```
    
* 2、上面代码仅仅是一个测试代码,不表示当前页面就是500
