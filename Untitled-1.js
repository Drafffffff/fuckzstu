function queryCourse(a_element, kklxdm, xkkz_id) {
    $("#nav_tab").find("li").removeClass("active");
    $(a_element).parent().addClass("active");
    $("#kklxdm").val(kklxdm);
    $("#xkkz_id").val(xkkz_id);
    $("#displayBox").load(_path + "/xsxk/zzxkyzb_cxZzxkYzbDisplay.html", {
        "xkkz_id": $("#xkkz_id").val(),
        "xszxzt": jQuery("#xszxzt").val(),
        "kspage": 0,
        "jspage": 0
    }, function () {
        //if(checkSlct()){
        //$("#searchBox").trigger("searchResult");
        //}
        setTimeout("$('#searchBox').trigger('searchResult')", 100); //延迟加载，避免参数未加载完就执行了查询，否则有较小概率出现A页签下显示了B页签的课程
    });
}



queryCourse(this,'12','98FFE79B644A88B3E0530100007F8859')

clickMenu('N253512','/xsxk/zzxkyzb_cxZzxkYzbIndex.html','自主选课','null'); return false;

../xsxk/zzxkyzb_cxZzxkYzbIndex.html&gnmkdm=N253512&layout=default

/xtgl/index_cxBczjsygnmk.html


function chooseCourseZzxk(jxb_id,do_jxb_id,kch_id,jxbzls){
	var trObj = $("#tr_"+$.convertID(jxb_id));
	var zdzys = $("#zdzys").val();
	var sfqzxk  = $("#sfqzxk").val();
	var xkzgmc = $("#xkzgmc").val();//其他选课规则设置中设置的最高选课门次
	var bxqzgxkmc = $("#bxqzgxkmc").val();//基本选课规则设置中设置的最高选课门次
	var xkzgxf = $("#xkzgxf").val();//其他选课规则设置中设置的最高选课学分
	var bxqzgxkxf = $("#bxqzgxkxf").val();//基本选课规则设置中设置的最高选课学分
	var lnzgxkxf = $("#lnzgxkxf").val();//基本选课规则设置中设置的历学期最高选课学分
	var lnzgxkmc = $("#lnzgxkmc").val();//基本选课规则设置中设置的历学期最高选课学分
	var lnzkcs = $("#lnzkcs").val();//历学期总课程数
	var lnzxfs = $("#lnzxfs").val();//历学期总学分数
	var zkcs = $("#zkcs").val();
	var zxfs = $("#zxfs").val();
	var tableObj = trObj.parent();
	var syqz = 100;
	var zQz = 0;
	var dqkcxf = 0;
	$("input[name='right_qz']").each(function(index,item){
		zQz = parseInt(zQz) + parseInt($(item).val());
	});
	syqz = syqz - zQz;
	var xzzys=$("#right_ul_"+kch_id).find("li").size();
	if(sfqzxk!="1" && xzzys >= parseInt(zdzys)){
		$.alert($.i18n.prop("msg_ymkzdkxzys", [zdzys]));//"一门课程最多可选"+zdzys+"个志愿！"
		return false;
	}else if(sfqzxk=="1" && xzzys > 0){
		$.alert($.i18n.get("msg_ymkznxygjxb"));//"一门课程只能选一个教学班！"
		return false;
    }

	if(xzzys==0){
		zkcs = parseInt(zkcs)+1;
		zxfs = parseFloat(zxfs)+parseFloat($("#xf_"+kch_id).text());
		lnzkcs = parseInt(lnzkcs)+1;
		lnzxfs = parseFloat(lnzxfs)+parseFloat($("#xf_"+kch_id).text());
		dqkcxf = $("#xf_"+kch_id).text();
	}
	if(parseFloat(bxqzgxkxf)>0 || parseFloat(bxqzgxkmc)>0){
		var kklxzxfs = 0;
		var kklxzkcs = 0;
		$("input[name='right_kklxpx']").each(function(index,item){
			if($(item).val()==$("#kklxpx").val()){
				kklxzxfs = parseFloat(kklxzxfs) + parseFloat($(item).prev().val());
				kklxzkcs++;
			}
		});
		var c_kklxzxfs = parseFloat(kklxzxfs)+parseFloat(dqkcxf);
		var c_kklxzkcs = parseInt(kklxzkcs) + 1;
		if(parseFloat(bxqzgxkxf)>0 && parseFloat(bxqzgxkxf)<parseFloat(c_kklxzxfs) && xzzys==0){
			//"本学期本类型课程选课最高学分要求为"+bxqzgxkxf+"，当前本学期本类型课程选课总学分为("+kklxzxfs+"+"+$("#xf_"+kch_id).text()+"="+c_kklxzxfs+")，超出选课最高学分要求，不可选！"
			$.alert($.i18n.prop("msg-ccbxqblxzgxkxfyq", [bxqzgxkxf,kklxzxfs,$("#xf_"+kch_id).text(),c_kklxzxfs]));
			return false;
		}

		if(parseFloat(bxqzgxkmc)>0 && parseInt(c_kklxzkcs)>parseInt(bxqzgxkmc) && xzzys==0){
			//"本学期本类型课程选课最高门次要求为"+bxqzgxkmc+"，不可选！"
			$.alert($.i18n.prop("msg-ccbxqblxzgxkmcyq", [bxqzgxkmc]));
			return false;
		}
    }
    
	if(sfqzxk == "1" && parseFloat(syqz) <= 0){
		//"已无权重，不可再选！"
		$.alert($.i18n.get("msg_ywqzbkzx"));
		return false;
	}
	
	if($("#sfktk").val()!="1"){ //不可退课时，给出提示
		$.confirm($.i18n.get("msg-qdxzmk"),function(isBoolean){//选中之后将不可退，您确定要选这门课吗？
			if(isBoolean){
				$.closeModal("confirmModal");
				saveCourseAll(trObj,kch_id,jxb_id,do_jxb_id,jxbzls,syqz);
			}
		});
	}else{
		saveCourseAll(trObj,kch_id,jxb_id,do_jxb_id,jxbzls,syqz);
	}
}




//提交选课信息
jxb_ids: 881d707694efe67aa1221e7d0139a50c4dc759c94dadfcb433640fd3c7f0efd599f24b3ae030fe62200f1794438198fa4ad317443213a14d98f03b4dee615439ca59174cd85813143bb31c07786b380d7cd38ac6f8fcc41ccb9524670f749efc8164a04495dc07ccfbb1d209a2aacfc02e542105f6adcc19146e4da38959dd6d
kch_id: 00278
kcmc: (00278)出纳实务 - 2.0 学分
rwlx: 2
rlkz: 0
rlzlkz: 1
sxbj: 1
xxkbj: 0
qz: 0
cxbj: 0
xkkz_id: 98FEEA0D4A0124B5E0530100007F5FD7
njdm_id: 2018
zyh_id: 3395
kklxdm: 10
xklc: 2
xkxnm: 2019
xkxqm: 12


	//子课程标记的显示
	var jxb_ids = [];
	$(".list-group-item").each(function(index,item){
		var jxbzls = $(item).find("input[name='right_jxbzls']").val();
		if(parseInt(jxbzls)>1){
			jxb_ids.push($(item).find("input[name='right_jxb_id']").val());
		}
	});