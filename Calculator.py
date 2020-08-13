import socketio
import numpy as np
import cv2
import json

from scipy.integrate import solve_ivp

# Y : [ x, x_dot, theta, theta_dot] 即y[0]为小车位置，y[1]为速度，y[2]为摆杆角度，y[3]为角速度
def func3( t, y ):
    g = 9.8 # 万有引力常数
    L = 1.5 # 摆杆长度
    m = 1.0   #摆杆质量 (kg)
    M = 5.0   #小车质量 (kg)

    x_ddot = -u(t) - m*L*y[3]*y[3] * np.cos( y[2] ) + m*g*np.cos(y[2]) * np.sin(y[2])
    x_ddot = x_ddot / ( M+m-m* np.sin(y[2]) * np.sin(y[2]) )

    theta_ddot = -g/L * np.cos( y[2] ) - 1./L * np.sin( y[2] ) * x_ddot	#theta_ddot为角加速度

    damping_theta =  - 0.5*y[3]	#角速度阻尼项
    damping_x =  - 1.0*y[1]		#速度阻尼项

    return [ y[1], x_ddot + damping_x, y[3], theta_ddot + damping_theta ]

sio = socketio.Client()

@sio.event
def connect():
    print('connection established')

@sio.on('message')
def my_message(data):
    data = str(data).replace('\'', '\"')
    s = json.loads(str(data))
    global u
    def u(t):
      return 0
    ssol = solve_ivp(func3, [0, 0.05], [0, 0, s["theta"], 0.], t_eval=np.linspace(0, 0.05, 2))
    sio.emit('message', {'theta': ssol.y[2].tolist(),'s':ssol.y[0].tolist(),'a':ssol.y[1].tolist(),'ta':ssol.y[3].tolist()})

@sio.on('change')
def my_change(data):
    data = str(data).replace('\'', '\"')
    st = json.loads(str(data))
    global u
    def u(t):
      if( t < 0.05 ):
          return int(st["ss"])
      else:
          return 0.
    ssol = solve_ivp(func3, [0, 0.05], [st["s"], st["a"], st["t"], st["ta"]], t_eval=np.linspace(0, 0.05, 2))
    sio.emit('change', {'theta': ssol.y[2].tolist(),'s':ssol.y[0].tolist(),'a':ssol.y[1].tolist(),'ta':ssol.y[3].tolist()})


@sio.event
def disconnect():
    print('disconnected from server')

sio.connect('http://localhost:3000')
sio.wait()