# -*- coding=utf-8 -*-
import requests
import time
from lxml import etree
from hex2b64 import HB64
import RSAJS


class Longin():

    def __init__(self, user, password):
        # 初始化程序数据
        self.counter = 1
        self.pyCounter =1
        self.Username = user
        self.gnmkdm = 'N253512'
        self.Password = password
        def nowTime(): return str(round(time.time()*1000))
        self.now_time = nowTime()
        self.login_url = "http://10.11.247.52/jwglxt/xtgl/login_slogin.html?language=zh_CN&_t="
        self.login_Key = "http://10.11.247.52/jwglxt/xtgl/login_getPublicKey.html?time="
        self.lesson_url = " http://10.11.247.52/jwglxt/xsxk/zzxkyzb_cxZzxkYzbPartDisplay.html?gnmkdm=%s&su=%s" % (
            self.gnmkdm, self.Username)

        self.chooseLesson_url = "http://10.11.247.52/jwglxt/xsxk/zzxkyzb_xkBcZyZzxkYzb.html?gnmkdm=%s&su=%s" % (
            self.gnmkdm, self.Username)

        self.lesson_check = {
            '漆艺': 32,
            '设计名作赏析': 100,
            '速写': 35,
            '雕塑': 35,
            '经典广告欣赏(双语)': 90

        }

        self.lessonData = {
            'rwlx': 2,
            'xkly': 0,
            'bklx_id': 0,
            'xqh_id': 1,
            'jg_id': 'N',
            'zyh_id': 3395,
            'zyfx_id': 'wfx',
            'njdm_id': 2018,
            'bh_id': 'N183952',
            'xbm': 1,
            'xslbdm': '06',
            'ccdm': 3,
            'xsbj': 4294967296,
            'sfkknj': 0,
            'sfkkzy': 0,
            'sfznkx': 0,
            'zdkxms': 0,
            'sfkxq': 0,
            'sfkcfx': 0,
            'kkbk': 0,
            'kkbkdj': 0,
            'sfkgbcx': 0,
            'sfrxtgkcxd': 0,
            'tykczgxdcs': 0,
            'xkxnm': 2019,
            'xkxqm': 12,
            'kklxdm': 12,
            'rlkz': 0,
            'kspage': 1,
            'jspage': 10
        }

    lesson_detail_info = {

    }

    def Get_indexHtml(self):
        # 获取教务系统网站
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "max-age=0",
            "Connection": "keep-alive",
            "Referer": self.login_url + self.now_time,
            "Upgrade-Insecure-Requests": "1"
        })
        self.response = self.session.get(
            self.login_url + self.now_time).content.decode("utf-8")

    def Get_csrftoken(self):
        # 获取到csrftoken
        lxml = etree.HTML(self.response)
        self.csrftoken = lxml.xpath("//input[@id='csrftoken']/@value")[0]

    def Get_PublicKey(self):
        # 获取到加密公钥
        key_html = self.session.get(self.login_Key + self.now_time)
        key_data = key_html.json()
        self.modulus = key_data["modulus"]
        self.exponent = key_data["exponent"]

    def Get_RSA_Password(self):
        # 生成RSA加密密码
        rsaKey = RSAJS.RSAKey()
        rsaKey.setPublic(HB64().b642hex(self.modulus),
                         HB64().b642hex(self.exponent))
        self.enPassword = HB64().hex2b64(rsaKey.encrypt(self.Password))

    def Longin_Home(self):
        # 登录信息门户,成功返回session对象
        self.Get_indexHtml()
        self.Get_csrftoken()
        self.Get_PublicKey()
        self.Get_RSA_Password()
        login_data = [("csrftoken", self.csrftoken), ("yhm", self.Username),
                      ("mm", self.enPassword), ("mm", self.enPassword)]
        login_html = self.session.post(
            self.login_url + self.now_time, data=login_data)
        # 当提交的表单是正确的，url会跳转到主页，所以此处根据url有没有跳转来判断是否登录成功
        if login_html.url.find("login_slogin.html") == -1:  # -1没找到，说明已经跳转到主页
            print("登录成功")
            return self.session
        else:
            print("用户名或密码不正确，登录失败")
            exit()

    def get_lesson(self):
        lessonInfo = self.session.post(self.lesson_url, data=self.lessonData)
        with open('log.txt', 'a', encoding='utf-8') as file:
            file.write('==============' +
                    time.asctime(time.localtime(time.time()))+'=============='+'\n')
            file.write('                   第'+str(self.counter)+'次检查\n')
            file.write('====================================================\n')
            for item in lessonInfo.json()['tmpList']:
                lessonName = item['kcmc']
                lessonPeopleNum = int(item['yxzrs'])
                lessonEnable = False
                if(lessonPeopleNum < self.lesson_check[lessonName]):
                    lessonEnable = True
                    self.pyCounter += 1
                    self.lesson_detail_info['kch_id'] = item['kch_id']
                    self.lesson_detail_info['jxb_id'] = item['jxb_id']
                    self.lesson_detail_info['kch'] = item['kch']
                    self.lesson_detail_info['kcmc'] = item['kcmc']
                    self.lesson_detail_info['xxkbj'] = item['xxkbj']
                    self.lesson_detail_info['xf'] = item['xf']
                    self.lesson_detail_info['kcmc'] = "("+self.lesson_detail_info['kch']+")" + \
                        self.lesson_detail_info['kcmc'] + \
                        " - "+self.lesson_detail_info['xf']+"学分"
                file.write('课程名称：'+lessonName+'   已选人数：' +
                           item['yxzrs']+'   是否可选：'+str(lessonEnable)+'\n')
            file.write('\n\n\n')
        self.counter+=1
        return lessonEnable

    def logout(self):
        logoutdata = self.session.get(
            "http://10.11.247.52/jwglxt/logout?t=1576806088941&login_type=")
        print(logoutdata)


class TimeTable():
    def __init__(self, session, table_url):
        data = {"xnm": 2019, "xqm": 12, "xqh_id": 1}
        table_info = session.post(table_url, data=data).json()
        for each in table_info["kbList"]:
            plt = r'{} | {:<8s} | {:<13s} | {:<15s} | {:<22s}'
            print(plt.format(each["xqjmc"], each["jc"],
                             each["cdmc"], each["zcd"], each["kcmc"]))


if __name__ == "__main__":
    # 登录主页url

    # 登录后的课表URL
    table_url = "http://10.11.247.52/jwglxt/kbcx/xskbcx_cxXsKb.html?gnmkdm=N2151"

    zspt = Longin("2018334450245", "leonardo990727")
    response_cookies = zspt.Longin_Home()
    # table = TimeTable(response_cookies, table_url)
    while(1):
        print(str(time.asctime(time.localtime(time.time())))+'     第%d次检查！！'%zspt.counter)

        if(zspt.get_lesson()):
            print('抓住PY交易！'+str(zspt.pyCounter))
        time.sleep(0.2)

    zspt.logout()
