# coding=utf-8

import os
import requests
import base64
import rsa
from bs4 import BeautifulSoup as bs

yhm = ''  # 学号
mm = ''.encode(encoding='utf-8')  # 密码
gnmkdm = ''
xkkz_id = ''
url = 'http://jwxt.cumt.edu.cn/jwglxt/xtgl/login_slogin.html'
key_url = 'http://jwxt.cumt.edu.cn/jwglxt/xtgl/login_getPublicKey.html'
xunke_url = 'http://jwxt.cumt.edu.cn/jwglxt/xsxk/zzxkyzb_cxZzxkYzbPartDisplay.html?gnmkdm=%s&su=%s' % gnmkdm % yhm
ke_list = 'http://jwxt.cumt.edu.cn/jwglxt/xsxk/zzxkyzb_cxZzxkYzbIndex.html?gnmkdm=%s&layout=default&su=%s' % gnmkdm % yhm
xuanke_url = 'http://jwxt.cumt.edu.cn/jwglxt/xsxk/zzxkyzb_xkBcZyZzxkYzb.html?gnmkdm=%s&su=%s' % gnmkdm % yhm
session = requests.Session()
session.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'


def login():
    # 获取公钥需要的参数
    publickey = session.get(key_url).json()
    b_modulus = base64.b64decode(publickey['modulus'])  # 将base64解码转为bytes
    b_exponent = base64.b64decode(publickey['exponent'])  # 将base64解码转为bytes

    # 公钥生成,python3从bytes中获取int:int.from_bytes(bstring,'big')
    mm_key = rsa.PublicKey(int.from_bytes(b_modulus, 'big'),
                           int.from_bytes(b_exponent, 'big'))

    # 利用公钥加密,bytes转为base64编码
    rsa_mm = base64.b64encode(rsa.encrypt(mm, mm_key))
    page = session.get(url)
    soup = bs(page.text, "html.parser")

    # 获取认证口令csrftoken
    csrftoken = soup.find(id="csrftoken").get("value")
    postdata = {'csrftoken': csrftoken, 'yhm': yhm, 'mm': rsa_mm}

    rq = session.post(url, data=postdata)


def xunke(name, kklxdm):
    data = {
        'filter_list[0]': name,
        'rwlx': 3,
        # 'xkly': 0,
        # 'bklx_id': 0,
        'xh_id': yhm,
        # 'xqh_id': 2,
        # 'jg_id': '08',
        # 'zyh_id': '0810',
        # 'zyfx_id': 'wfx',
        'njdm_id': 2016,
        # 'bh_id': 161081003,
        # 'xbm': 1,
        # 'xslbdm': 421,
        # 'ccdm': 3,
        # 'xsbj': 4294967296,
        # 'sfkknj': 0,
        # 'sfkkzy': 0,
        # 'sfznkx': 0,
        # 'zdkxms': 0,
        # 'sfkxq': 0,
        # 'sfkcfx': 0,
        # 'kkbk': 0,
        # 'kkbkdj': 0,
        # 'sfkgbcx': 0,
        # 'sfrxtgkcxd': 1,
        # 'tykczgxdcs': 10,
        'xkxnm': 2018,
        'xkxqm': 3,
        'kklxdm': kklxdm,
        'njdmzyh': '',
        'kspage': 1,
        'jspage': 10
    }
    # courses_list = session.post(ke_list, data=data)
    courses_api = session.post(xunke_url, data=data)
    # courses_soup = bs(courses_list.text, "html.parser")
    print(courses_api.text)
    courses_api = courses_api.json()
    if len(courses_api['tmpList']) > 0:
        first_course = courses_api['tmpList'][0]
        kch_id = first_course['kch_id']
        jxb_id = first_course['jxb_id']
        kch = first_course['kch']
        kcmc = first_course['kcmc']
        xsbxf = first_course['xsbxf']
        xxkbj = first_course['xxkbj']
        xf = first_course['xf']
        choose_data = {
            'jxb_ids': jxb_id,
            'kch_id': kch_id,
            'xsbxfs': xsbxf,
            'xkkz_id': xkkz_id,
        }
        choose_data['kcmc'] = "("+kch+")"+kcmc+" - "+xf+"学分"
        req_xun = session.post(xuanke_url, choose_data) 
        if 'flag' in req_xun.text:
            return req_xun.json()
        return 0
    else:
        return 0


if __name__ == '__main__':
    login()
    check = True
    # name_list = ['武术','散打']
    # kklxdm_list = ['01','10'] #主修课程01 通识选修10
    # for name in name_list:
    #     for kklxdm in kklxdm_list:
    #         flag = xunke(name,kklxdm)
    #         if flag==0:
    #             print(name+'未选上')
    #         elif flag['flag']==1:
    #             check = False
    #             print(name+'已选上')
    #         else:
    #             msg = flag['msg'].split(',')
    #             print(name+'未选上')
    #             print('课程信息:\n'+'已选人数'+msg[3]+' 总需人数'+msg[2])
    name = '武术'
    kklxdm = '06'
    flag = xunke(name, kklxdm)
    if flag == 0:
        print(name+'未选上')
    elif flag['flag'] == 1:
        check = False
        print(name+'已选上')
    else:
        msg = flag['msg'].split(',')
        print(msg)
        print(name+'未选上')
