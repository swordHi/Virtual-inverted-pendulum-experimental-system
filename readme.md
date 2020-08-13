### node.js环境搭建
安装教程：https://www.runoob.com/nodejs/nodejs-install-setup.html
***
### Python环境搭建
安装教程：https://www.runoob.com/python/python-install.html

模块安装：https://docs.python.org/zh-cn/3.7/installing/index.html

系统需要引入的Python模块有：socketio、numpy、cv2、json、scipy.integrate
***
### 操作步骤
1.使用cmd命令行（快捷键win+R，调出运行命令窗口，并输入CMD），进入主目录。

![CMD命令行示例图](./readme-picture/1.jpg)

Tip：亦可使用Powershell工具，在主目录下的空白处使用shift+右键，选择在此处打开Powershell窗口，直接进入主目录。

![Powershell命令行示例图](./readme-picture/2.jpg)

2.启动nodejs服务端，成功后显示`server started on port 3000`。

`node Pendulum.js`
![启动node服务端](./readme-picture/3.jpg)

3.同上，启动Python计算端，成功后显示`connection established`。

`Python Calculator.py`
![启动Python计算端](./readme-picture/4.jpg)

4.滑动控制器页面：新建浏览器页面，URL地址栏输入`http://localhost:3000/static/controler.html`。

![连接滑动控制器](./readme-picture/5.jpg)

5.参数设置页面：新建浏览器页面，URL地址栏输入`http://localhost:3000/dist/index.html`。

![参数设置](./readme-picture/6.jpg)

6.设置完参数后，选择确定，即开始实验。

7.在滑动控制器页面选择启动，则倒立摆每间隔3秒会获得相应控制力，并作出响应。（橙色模块可切换+、-，即控制力的方向）