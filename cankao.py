import requests
import base64
import rsa
from bs4 import BeautifulSoup as bs

yhm='2018334450221'
url='http://10.11.247.52/xtgl/login_slogin.html'
mm=('dragonfly000308')
session = requests.Session()

#获取公钥需要的参数
publickey = session.get('http://10.11.247.52/xtgl/login_getPublicKey.html').json()
b_modulus=base64.b64decode(publickey['modulus'])#将base64解码转为bytes
b_exponent=base64.b64decode(publickey['exponent'])#将base64解码转为bytes

#公钥生成,python3从bytes中获取int:int.from_bytes(bstring,'big')
mm_key = rsa.PublicKey(int.from_bytes(b_modulus,'big'),int.from_bytes(b_exponent,'big'))

#利用公钥加密,bytes转为base64编码
rsa_mm = base64.b64encode(rsa.encrypt(mm, mm_key))
page = session.get(url)
soup = bs(page.text,"html.parser")

#获取认证口令csrftoken
csrftoken = soup.find(id="csrftoken").get("value")
postdata={'csrftoken':csrftoken,'yhm':yhm,'mm':rsa_mm}

f = open('test.html','wb')
rq=session.post(url,data=postdata)
f.write(rq.content)
f.close()