//# sourceURL=zzxkYzbChoosedZy.js 
var isWebApp = isPc();
var timer = null;
jQuery(function($){
	$.ajaxSetup({async:false});
	$.post(_path+"/xsxk/zzxkyzb_cxZzxkYzbChoosedDisplay.html",{
		"jg_id":jQuery("#jg_id_1").val(),"zyh_id":jQuery("#zyh_id").val(),
		"njdm_id":jQuery("#njdm_id").val(),"zyfx_id":$("#zyfx_id").val(),"bh_id":$("#bh_id").val(),
		"xkxnm":jQuery("#xkxnm").val(),"xkxqm":jQuery("#xkxqm").val(),"xkly":jQuery("#xkly").val()
	},function(data){
		var currentZy = 0;
		if(data!=null && data.length>0){
			var s_html = [];
			var rightKklxpx = null;
			var rightKchId = null;
			var rightJxbId = null;
			var rightQz= null;
			var rightJxbmc = null;
			var rightSxbj = null;
			var t_jxbmc = null;
			var jxdd = null;
			var sksj = null;
			var isktk = null;
			for(var i=0; i<data.length; i++){
				var modelA = data[i];
				var modelB = null;
				if(i<data.length-1){
					modelB = data[i+1];
				}
				if(modelA.jxbzb!=null){
					$("#jxbzb").val(modelA.jxbzb);
				}
				rightKklxpx = modelA.kklxpx;
				if(rightKchId!=modelA.t_kch_id){
					currentZy = 0;
					rightKchId = modelA.t_kch_id;
					s_html.push("<div id='right_"+rightKchId+"' class='outer_xkxx_list'>");
					s_html.push("<h6>");
					if(modelA.cxbj=="1"){//重修
						s_html.push("<font color='red'>【"+$.i18n.get("msg_cx")+"】</font>");
					}
					if(modelA.xxkbj=="1"){//有先行课
						s_html.push("<font color='red'>【"+$.i18n.get("msg_yxxk")+"】</font>");
					}
					s_html.push("("+modelA.kch+")"+modelA.kcmc+" - "+modelA.xf+" "+$.i18n.get("msg_xf")+"<span class='pull-right'></span></h6>");
					s_html.push("<table class='right_table_head'><thead><td class='h_num'>");
					if(modelA.qz!=null && modelA.qz!=0){
						s_html.push($.i18n.get("msg_qz"));//权重
					}else{
						s_html.push($.i18n.get("msg_zy"));//志愿
					}
					s_html.push("</td>");
					s_html.push("<td class='arraw-px'>"+$.i18n.get("msg_px")+"</td>");//排序
					s_html.push("<td class='h_sxbj'>"+$.i18n.get("msg_xsf")+"</td>");//选上否
					s_html.push("<td class='h_jxb'>"+$.i18n.get("msg_jxbmc")+"</td>");//教学班
					s_html.push("<td class='h_teacher'>"+$.i18n.get("msg_jshzc")+"</td>");//教师/职称
					s_html.push("<td class='h_time'>"+$.i18n.get("msg_sksj")+"</td>");//上课时间
					s_html.push("<td class='h_addr'>"+$.i18n.get("msg_jxdd")+"</td>");//教学地点
					s_html.push("<td  class='h_zixf'>"+$.i18n.get("msg_zxf")+"</td>");//自选否
					s_html.push("<td class='h_cz'>"+$.i18n.get("msg_cz")+"</td>");//操作
					s_html.push("</thead></table>");
					s_html.push("<ul id='right_ul_"+rightKchId+"' class='list-group'>");
					s_html.push("<input type='hidden' name='right_kchid' value='"+rightKchId+"'/>");
					s_html.push("<input type='hidden' id='right_xf_"+rightKchId+"' name='right_xf' value='"+modelA.xf+"'/>");
					s_html.push("<input type='hidden' name='right_kklxpx' value='"+rightKklxpx+"'/>");
					s_html.push("<input type='hidden' name='right_cxbj' value='"+modelA.cxbj+"'/>");
				}
				
				if(rightJxbId != modelA.jxb_id){
					currentZy = parseInt(currentZy)+1;
					rightJxbId = modelA.jxb_id;
					rightJxbmc = modelA.jxbmc;
					t_jxbmc = rightJxbmc.length>3 ? rightJxbmc.substring(0,3)+"…":rightJxbmc;
					var jsxmString = null;
					var jszcString = null;
					var jsxmzcString = null;
					var jsxmzcFull = null; 
					if($.defined(modelA.jsxx)){
						var jsxxArray = modelA.jsxx.split(";");
						for(var m=0; m<jsxxArray.length; m++){
							var tmpArray = jsxxArray[m].split("/");
							if(m==0){
								jsxmString = $.defined(tmpArray[1])?tmpArray[1]:"--";
								jszcString = $.defined(tmpArray[2])?tmpArray[2]:"--";
							}else{
								jsxmString = jsxmString + "、" +($.defined(tmpArray[1])?tmpArray[1]:"--");
								jszcString = jszcString + "、" +($.defined(tmpArray[2])?tmpArray[2]:"--");
							}
						}
					}else{
						jsxmString = "--";
						jszcString = "--";
					}
					jsxmzcFull = jsxmString + "(" + jszcString + ")";
					jsxmString = jsxmString.length>5 ? jsxmString.substring(0,5)+"…":jsxmString;
					jszcString = jszcString.length>5 ? jszcString.substring(0,5)+"…":jszcString;
					jsxmzcString = jsxmzcFull.length>5 ? jsxmzcFull.substring(0,5)+"…":jsxmzcFull;
					
					jxdd = modelA.jxdd==null || modelA.jxdd=="" ? "--" : modelA.jxdd; 
					sksj = modelA.sksj==null || modelA.sksj=="" ? "--" : modelA.sksj;

					var zcxkbj = "1";
					if(modelA.zckz=="1" && modelA.bdzcbj!="2" && modelA.bdzcbj!="3"){
						zcxkbj = "0";
					}
					var isktk = "0";
					//alert("====================="+modelA.sfxkbj);
					if(modelA.sfktk=="1" && parseInt(modelA.yxzrs)>parseInt(modelA.tktjrs) && modelA.isInxksj=="1" && modelA.sfxkbj=="1" && zcxkbj=="1"){
						isktk = "1";
					}
					s_html.push("<li id='right_"+rightJxbId+"' class='list-group-item'>");
					s_html.push("<div class='item' style='cursor: pointer;'>");
					s_html.push("<table width='100%'><tr>");
					s_html.push("<td><p class='num'>");
					if(modelA.qz!=null && modelA.qz!=0){
						s_html.push("<a href='javascript:void(0)' class='qz-block' data-jxb_id='"+rightJxbId+"' data-do_jxb_id='"+modelA.do_jxb_id+"'>"+modelA.qz+"</a>");
					}else{
						s_html.push(currentZy);
					}
					s_html.push("</p></td>");
					s_html.push("<td class='arraw-px'><a class='fa fa-arrow-up padding-lr10' href='javascript:void(0);'></a><br><a class='fa fa-arrow-down padding-lr10' href='javascript:void(0);'></a></td>");
					s_html.push("<td><p class='sxbj'>");
					if(modelA.sxbj=="1"){
						s_html.push("<font color='blue'>"+$.i18n.get("msg_yxs")+"</font>");//已选上
					}else{
						s_html.push("<font color='red'><i>"+$.i18n.get("msg_dsx")+"</i></font>");//待筛选
					}
					s_html.push("</p></td>");
					s_html.push("<td><p class='jxb' title='"+rightJxbmc+"'>"+t_jxbmc+"</p></td>");
					s_html.push("<td>");
					if(parseInt(modelA.jxbzls)>1){
						s_html.push("<p class='teachers popover-demo' title='"+jsxmzcFull+"'><span class='right_jsxmzc'>"+jsxmzcString+"</span></p>");
					}else{
						s_html.push("<p class='teachers popover-demo' title='"+jsxmzcFull+"'><span>"+jsxmString+"</span>"+jszcString+"</p>");
					}
					s_html.push("</td>");
					s_html.push("<td><p class='time'>"+sksj+"</p></td>");
					s_html.push("<td><p class='addr'>"+jxdd+"</p></td>");
					s_html.push("<td nowrap><p class='zixf'>");
					if(modelA.zixf=="1"){
						s_html.push($.i18n.get("msg_zxs"));//自选上
					}else{
						s_html.push($.i18n.get("msg_xttz"));//系统调整
					}
					s_html.push("</p></td>");
					s_html.push("<td><p class='but'>");
					if(isktk=="1"){
						s_html.push("<button class='btn btn-danger btn-sm' onclick=cancelCourseZzxk('rightpage','"+modelA.jxb_id+"','"+modelA.do_jxb_id+"','"+modelA.kch_id+"','"+modelA.jxbzls+"','"+modelA.xkkz_id+"') type='button'>"+$.i18n.get("msg_tx")+"</button>");
					}else{
						s_html.push("<span style='font-size:15px;color:#428BCA;'><b>"+$.i18n.get("txt-yx")+"</b></span>");
					}
					s_html.push("</p></td>");
					s_html.push("</tr>");
					s_html.push("</table>");
					s_html.push("</div>");
					s_html.push("<input type='hidden' name='right_sub_kchid' value='"+modelA.kch_id+"'/>");
					s_html.push("<input type='hidden' name='right_jxb_id' value='"+rightJxbId+"'>");
					s_html.push("<input type='hidden' name='right_qz' value='"+modelA.qz+"'>");
					s_html.push("<input type='hidden' name='right_jxbzls' value='"+modelA.jxbzls+"'/>");
					s_html.push("<input type='hidden' name='right_kklxdm' value='"+modelA.kklxdm+"'/>");
					s_html.push("</li>");
				}
				
				if(modelB==null || modelB.t_kch_id!=modelA.t_kch_id){
					s_html.push("</ul></div>");
					$(".right_div").append(s_html.join(""));
					s_html = [];
				}
			}
			
			//识别终端确定是否显示排志愿的箭头
			if(isWebApp){
				$(".arraw-px").css("display","none");
			}else{
			    $(".arraw-px").css("display","");
			}
		}
	},'json');
	$.ajaxSetup({async:true});
	
	/***浮动框数据加载（开始）***/
	//浮动框中已选中课程数
	yxzkc = $("input[name='right_kchid']").length;
	$("#yxkcs").text(yxzkc);
	//小课表
	//$("#myCourseTableZzxk").load(_path+"/kbcx/xskbcx_cxXskbSimpleIndex.html");
	

	$(".outer_xkxx_list").each(function(index,item){
		if($(item).find("ul li").length>1){
			$(item).find(".pull-right").text($.i18n.get("msg_sbtdpzy"));//鼠标拖动排志愿
		}
	});
	
	//子课程标记的显示
	var jxb_ids = [];
	$(".list-group-item").each(function(index,item){
		var jxbzls = $(item).find("input[name='right_jxbzls']").val();
		if(parseInt(jxbzls)>1){
			jxb_ids.push($(item).find("input[name='right_jxb_id']").val());
		}
	});
	var tmp_html="";
	if(jxb_ids.length>0){
		$.ajaxSetup({async:false});
			$.post(_path+"/xsxk/zzxkyzb_cxZkcZzxkYzb.html",
				{jxb_ids:jxb_ids.join(","),xkkz_id:$("#xkkz_id").val(),bklx_id:$("#bklx_id").val(),kklxdm:$("#kklxdm").val(),rlkz:$("#rlkz").val(),zyh_id:$("#zyh_id").val(),njdm_id:$("#njdm_id").val()},
				function(data){
					if(data!=null && data!="0"){
						var tmp_html = "";
						for(var i=0; i<data.length; i++){
							var current_fjxb_id = data[i].fjxb_id;
						 	var jsxxArray = data[i].jsxx.split(";");
							var s_jsxm = null;
							var s_jszc = null;
							for(var e=0; e<jsxxArray.length; e++){
								var tmpArray = jsxxArray[e].split("/");
								var jgh_id = tmpArray[0];
								var c_jsxm = tmpArray[1];
								var c_jszc = tmpArray[2];
								if(e==0){
									s_jsxm = c_jsxm;
									s_jszc = c_jszc;
								}else{
									s_jsxm = s_jsxm + "、" +c_jsxm;
									s_jszc = s_jszc + "、" +c_jszc;
								}
							}
							var next_fjxb_id = "";
							if(i<data.length-1){
								next_fjxb_id = data[i+1].fjxb_id;
							}

							if(data[i].xsdm=="02"){
								img = "ico_tjxk1";
							}else if(data[i].xsdm=="03"){
								img = "ico_tjxk2";
							}else if(data[i].xsdm=="04"){
								img = "ico_tjxk3";
							}else{
								img = "ico_tjxk1";
							}
							tmp_html = tmp_html + 
									"<a href='javascript:void(0)' class='ico_tjxk "+img+"' title='"+$.i18n.prop("msg_xskcls", [data[i].xsmc])+"："+s_jsxm+"("+s_jszc+")' data-container='body' data-toggle='popover' data-placement='auto' data-content='"+$.i18n.get("msg_sksjdd")+"："+data[i].sksj+" / "+data[i].jxdd+"'><input type='hidden' name='zkc_jxb_id' value='"+data[i].do_jxb_id+"'/></a>";
							if(current_fjxb_id!=next_fjxb_id){
								$("#right_"+$.convertID(current_fjxb_id)).find(".right_jsxmzc").after(tmp_html);
								tmp_html = "";
							}
						}
					}
				},'json');
		$.ajaxSetup({async:true});
	}
	
	//浮动框的宽度及动作设定
	$(".outer").animate({width:"40px"},1000);
	$(".outer_left").unbind("click").click(function(event) {	
		//阻止继续冒泡
		event.stopPropagation();
		if($(".outer").css("width")	==	"40px")
		{
			if($(window).width() > 740)
			{
				$(".outer").animate({width:"740px"},500);
				$(".outer_left .btn-lg").addClass("glyphicon-arrow-right icon-arrow-right");
			}
			else
			{
				$(".outer").animate({width:$(window).width()},500);
				$(".outer_left .btn-lg").addClass("glyphicon-arrow-right icon-arrow-right");
			}
		}
		else
		{
			$(".outer").animate({width:"40px"},500);
			$(".outer_left .btn-lg").removeClass("glyphicon-arrow-right icon-arrow-right");
			
			$(".popover").remove();		//关闭右侧的话关闭掉弹出的内容
		}
	});
	
	//点击三个小图标弹出
	$(".popover-demo").popover({selector: '[data-toggle="popover"]',container: "body",trigger: 'hover'});
	
	//点击页面其他地方右侧内容隐藏
	$(document).unbind("click").click(function (event) {
		try {
			if (!event || $(event.target).size() == 0) {
				return;
			}
			var drag = $(".outer"),
				dragel = $(".outer")[0],
				target = event.target;
			if (dragel !== target && !$.contains(dragel, target)) {
				$(".outer").animate({width:"40px"},500);
				$("#wrapper").mCustomScrollbar("update");
				$(".outer_left .glyphicon").removeClass("glyphicon-arrow-right");
			}
		} catch (e) {
		}
	});
	
	$(document).off("mousedown",'button.btn-tk').on("mousedown",'button.btn-tk',function(event){
		event.stopPropagation();
	}).off("click",'button.btn-tk').on("click",'button.btn-tk',function(event){
		event.stopPropagation();
	}).off("click",".fa-arrow-up").on("click",".fa-arrow-up",function(event){
		event.stopPropagation();
		var curLiObj = $(this).parent().parent().parent().parent().parent().parent();
		var preLiObj = curLiObj.prev();
		if($.founded(preLiObj.html()) && preLiObj.html()!=""){
			preLiObj.before(curLiObj.clone(true));
			curLiObj.remove();
			saveOrder();
			myDragsort();
		}
	}).off("click",".fa-arrow-down").on("click",".fa-arrow-down",function(event){
		event.stopPropagation();
		var curLiObj = $(this).parent().parent().parent().parent().parent().parent();
		var nextLiObj = curLiObj.next();
		if($.founded(nextLiObj.html()) && nextLiObj.html()!=""){
			nextLiObj.after(curLiObj.clone(true));
			curLiObj.remove();
			saveOrder();
			myDragsort();
		}
	}).off("click",".qz-block").on("click",".qz-block",function(event){
		var jxb_id = $(this).data("jxb_id");
		var do_jxb_id = $(this).data("do_jxb_id");
		var syqz = 100;
		var zQz = 0;
		$("input[name='right_qz']").each(function(index,item){
			var t_jxb_id = $(this).parent().find("input[name='right_jxb_id']").val();
			if(jxb_id!=t_jxb_id){
				zQz = parseInt(zQz) + parseInt($(item).val());
			}
		});
		syqz = syqz - zQz;
		$.post(_path+"/xsxk/zzxkyzb_xkJcXgqzqxZzxkYzb.html",{
			jxb_id:do_jxb_id,xnm:$("#xkxnm").val(),xqm:$("#xkxqm").val(),xkkz_id:$("#xkkz_id").val()
		},function(data){
			if(data=="2"){
				$.alert($.i18n.get("msg_bzxksjbkxgqz"));//不在选课时间内，不可修改权重！
				return false;
			}else if(data=="3"){
				$.alert($.i18n.get("msg_xysjxbbkxgqz"));//已选上的教学班不可修改权重！
				return false;
			}else if(data=="4"){
				$.alert($.i18n.get("msg_bsblxkjxbbkxgqz"));//不是本轮选的教学班不可修改权重！
				return false;
			}else if(data=="5"){
				$.alert($.i18n.get("msg_jgfffw"));//警告：你正在非法访问！
				return false;
			}else if(data=="6"){
				$.alert($.i18n.get("msg_fwcs"));//访问超时！您可以尝试刷新页面后，再访问！
				return false;
			}else if(data=="1"){
				jQuery.showDialog(_path +'/xsxk/zzxkyzb_xkZzxkYzbQztx.html?jxb_id='+do_jxb_id+'&syqz='+syqz,$.i18n.get("msg_txqz"),{
					width:"350px",
					modalName:"addModal",
					buttons:{
						success : {
							label : $.i18n.jwglxt["sure"],//确 定
							className : "btn-primary",
							callback : function() {
								if($("#ajaxForm").isValid()){
									var qz = jQuery("#qz").val();
									$.ajaxSetup({async:false});
									$.post(_path+"/xsxk/zzxkyzb_xkBcQzZzxkYzb.html",{
										jxb_id:do_jxb_id,qz:qz
									},function(data){
										if(data=="1"){
											$("#right_"+jxb_id).find(".qz-block").text(qz);
										}else if(data=="2"){
											$.error($.i18n.get("msg_jgfffw"));//警告：您正在非法访问！
											return false;
										}else if(data=="3"){
											$.error($.i18n.get("msg_fwcs"));//访问超时！您可以尝试刷新页面后，再访问！
											return false;
										}else{
											$.error($.i18n.get("msg_wzyclxgly"));//出现未知异常，请与管理员联系！
											return false;
										}
									},'json');
									$.ajaxSetup({async:true});
								}else{
									return false;
								}
							}
						},
						cancel : {
								label : $.i18n.get("msg_cancel"),//取 消
								className : "btn-default",
								callback : function() {}
							}
						}
				});
			}else{
				$.error($.i18n.get("msg_wzyclxgly"));//出现未知异常，请与管理员联系！
				return false;
			}
		},'json');
		
	});
	
	
	var times_1 = 0;
	var interval_1 = window.setInterval(function(){
		if(times_1 >= 10){
			window.clearInterval(interval_1);
		}
		if($.fn.dragsort){
			myDragsort();
			window.clearInterval(interval_1);
		}
		times_1 += 1;
	}, 1000);
	
	var times_2 = 0;
	var interval_2 = window.setInterval(function(){
		if(times_2 >= 10){
			window.clearInterval(interval_2);
		}
		if($.fn.mCustomScrollbar){
			//滚动条
			$(".outer_right_wrapper").mCustomScrollbar({
				axis:"yx",
				scrollbarPosition:"outside",
			});
			window.clearInterval(interval_2);
		}
		times_2 += 1;
	}, 1000);
	
});

function saveOrder() {
	var zypxs = [];
	var jxb_ids = [];
	$(".list-group").each(function(index,item){
		$(item).find("li").each(function(index1,item1){
			if((index1+1)!=parseInt($(item1).find(".num").text()) && $(item1).find("input[name='right_qz']").val()=="0"){
				zypxs.push(index1+1);
				jxb_ids.push($(item1).find("input[name='right_jxb_id']").val());
			}
		});
	});
	$.ajaxSetup({async:false});
	$.post(_path+"/xsxk/zzxkyzb_xkBcZypxZzxkYzb.html",
		{zypxs:zypxs.join(","),jxb_ids:jxb_ids.join(",")},
		function(data){
			setTimeout(function(){
				if(data=="success"){
					reSort();
				}else{
					$.alert($.i18n.get("msg_pzysb"));//排志愿失败！
				}
			},1); 
		},'json');
	$.ajaxSetup({async:true});
}

function reSort(){
	$(".list-group").each(function(index,item){
		$(item).find("li").each(function(index1,item1){
			if((index1+1)!=parseInt($(item1).find(".num").text()) && $(item1).find("input[name='right_qz']").val()=="0"){
				$(item1).find(".num").text(index1+1);
			}
		});
	});
}


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
	//选中志愿数
	var xzzys=$("#right_ul_"+kch_id).find("li").size();
	
    saveCourseAll(trObj,kch_id,jxb_id,do_jxb_id,jxbzls,syqz);
    
}


function saveCourseAll(trObj,kch_id,jxb_id,do_jxb_id,jxbzls,syqz){
	var sfqzxk = $("#sfqzxk").val();

	saveDjxbCourse(trObj,kch_id,jxb_id,do_jxb_id,jxbzls,syqz);

}


function saveQzCourse(trObj,kch_id,jxb_id,do_jxb_id,jxbzls,syqz){
	 //权重选课且无子教学班
	jQuery.showDialog(_path +'/xsxk/zzxkyzb_xkZzxkYzbQztx.html?jxb_id='+do_jxb_id+'&jxbzls='+jxbzls+'&syqz='+syqz,$.i18n.get("msg_txqz"),{
		width:"350px",
		modalName:"addModal",
		buttons:{
			success : {
				label : $.i18n.jwglxt["sure"],
				className : "btn-primary",
				callback : function() {
					if($("#ajaxForm").isValid()){
						var qz = jQuery("#qz").val();
						saveCourse(trObj,jxb_id,do_jxb_id,kch_id,jxbzls,qz);//直接保存选中课程
					}else{
						return false;
					}
				}
			},
			cancel : {
					label : $.i18n.jwglxt["cancel"],
					className : "btn-default",
					callback : function() {}
				}
			}
	});
}

function saveDjxbCourse(trObj,kch_id,jxb_id,do_jxb_id,jxbzls,syqz){
	$.showDialog(_path +'/xsxk/zzxkyzb_xkZyZzxkYzbZjxb.html?jxb_id='+jxb_id+'&do_jxb_id='+do_jxb_id+'&jxbzls='+jxbzls+'&rlkz='+$("#rlkz").val()+'&fxbj='+$("#fxbj_"+kch_id).val()+'&cxbj='+$("#cxbj_"+kch_id).val()+'&rlzlkz='+$("#rlzlkz").val()+'&rwlx='+$("#rwlx").val()+'&syqz='+syqz,$.i18n.get("msg_xzkc"),{
		width:"850px",
		modalName:"addModal",
		buttons:{
			success : {
				label : $.i18n.jwglxt["sure"],
				className : "btn-primary",
				callback : function() {
					if($("#ajaxForm").isValid()){
						var jxb_arr = [];
						$("input[name='select_do_jxb']").each(function(index,item){//根据select_jxb隐藏域的值是否为空来判定各类教学班是否全部选定
							jxb_arr.push($(this).val());
						});
						//var fjxb_id = $("#select_jxb_00").val();
						var tmp_html = "<ul>";
						$("input[name='current_xsdm']").each(function(index,item){
							var current_xsdm = $(item).val();
							var xsmc = $("#xsmc_"+current_xsdm).val();
							var jxb_id = $("#select_jxb_"+current_xsdm).val();
							var do_jxb_id = $("#select_do_jxb_"+current_xsdm).val();
							var subTrObj = $("#sub_tr_"+$.convertID(jxb_id));
							var jsxm = subTrObj.find(".jsxm").text();
							var jszc = subTrObj.find(".jszc").text();
							var sksj = subTrObj.find(".sksj").text();
							var jxdd = subTrObj.find(".jxdd").text();
							tmp_html = tmp_html +				
											"<li>"+
											"<span class='jxb_id_1'>"+jxb_id+"</span>"+
											"<span class='do_jxb_id_1'>"+do_jxb_id+"</span>"+
											"<span class='xsdm_1'>"+current_xsdm+"</span>"+
											"<span class='xsmc_1'>"+xsmc+"</span>"+
											"<span class='jsxm_1'>"+jsxm+"</span>"+
											"<span class='jszc_1'>"+jszc+"</span>"+
											"<span class='sksj_1'>"+sksj+"</span>"+
											"<span class='jxdd_1'>"+jxdd+"</span>"+
											"</li>";
						});
						tmp_html = tmp_html + "</ul>";

						var rlkz = $("#rlkz").val();
						var rlzlkz = $("#rlzlkz").val();
						var sxrlkzlx = $("#sxrlkzlx").val();
						var rwlx = $("#rwlx").val();
						var xxkbj = $("#xxkbj_"+kch_id).val();
						var qz = $("#qz").val();
						var sxbj = "0";
						if(rlkz=="1" || rlzlkz=="1"){
							sxbj = "1";
						}else{
							sxbj = "0";
						}
						$.ajaxSetup({async:false});
						$.post(_path+"/xsxk/zzxkyzb_xkBcZyZzxkYzb.html",{
							kcmc:$("#kcmc_"+kch_id).text(),kch_id:kch_id,jxb_ids:jxb_arr.join(","),rwlx:rwlx,rlkz:rlkz,rlzlkz:rlzlkz,sxbj:sxbj,xxkbj:xxkbj,
							cxbj:$("#cxbj_"+kch_id).val(),kklxdm:$("#kklxdm").val(),xkkz_id:$("#xkkz_id").val(),njdm_id:$("#njdm_id").val(),
							zyh_id:$("#zyh_id").val(),xklc:$("#xklc").val(),xkxnm:$("#xkxnm").val(),xkxqm:$("#xkxqm").val(),qz:$("#qz").val()
						},function(data){
							setTimeout(function(){
								if(data!=null){
									var flag = data.flag;
									if(flag=="1"){
										$("#xkczbj").val("1");//减少课表的刷新频率
										var jxbrs = trObj.find(".rsxx .jxbrs").text();//教学班人数信息
										var jxbrl = trObj.find(".rsxx .jxbrl").text();//教学班人数信息
										trObj.find(".jxbrs").text(parseInt(jxbrs)+1);//已选中人数+1
										setRlxxAddZzxk(trObj,parseInt(jxbrs)+1,jxbrl);//检测是否为已满状态
										$("#tr_"+$.convertID(jxb_id)).find(".zjxbxx").html(tmp_html);
										refreshDataAddZzxk(trObj,jxb_id,do_jxb_id,kch_id,jxbzls,sxbj,qz);
										$.closeModal("addModal");
									}else if(flag=="6"){
										//该教学班已选中，刷新页面可见！
										$.alert($.i18n.get("msg_jxbyxzsxymkj"));
										return false;
									}else if(data.flag=="-1"){//容量超出，重新修改页面上的选课人数信息
										$("#xkczbj").val("1");//减少课表的刷新频率
										var jxbrl = trObj.find(".rsxx .jxbrl").text();//教学班人数信息
										var m_fzjxb = data.msg.split(",")[0];
										var m_jxb_id = data.msg.split(",")[1];
										var m_yxzrs = data.msg.split(",")[2];
										var subTrObj;
										if(m_fzjxb=="0"){
											subTrObj = trObj;
										}else{
											subTrObj = $("#sub_tr_"+$.convertID(m_jxb_id));
										}
										subTrObj.find(".rsxx .jxbrs").text(m_yxzrs);
										setRlxxAddZzxk(trObj,m_yxzrs,jxbrl);//检测是否为已满状态
										//该教学班已无余量，不可选！;
										$.alert($.i18n.get("msg_ywylbkx"));
										return false;
									}else{
										$("#xkczbj").val("1");//减少课表的刷新频率
										if(data.msg!=null && data.msg!=""){
											$.alert(data.msg);
											//$.alert($.i18n.get(data.msg)=="0"?$.i18n.get("msg_xksb"):$.i18n.get(data.msg));
										}
										return false;
									}
								}
							},1); 
						},'json');
						$.ajaxSetup({async:true});
					}
					return false;
				}
			},
			cancel : {
				label : $.i18n.jwglxt["cancel"],
				className : "btn-default",
				callback : function() {}
			}
		}
	});
}

function saveCourse(trObj,jxb_id,do_jxb_id,kch_id,jxbzls,qz){
	var kcmc = $("#kcmc_"+kch_id).text();
	var rlkz = $("#rlkz").val();
	var rlzlkz = $("#rlzlkz").val();
	var sxrlkzlx = $("#sxrlkzlx").val();
	var rwlx = $("#rwlx").val();
	var xxkbj = $("#xxkbj_"+kch_id).val();
	var sxbj = "0";
	if(rlkz=="1" || rlzlkz=="1"){
		sxbj = "1";
	}else{
		sxbj = "0";
	}
	$.ajaxSetup({async:false});
	$.post(_path+"/xsxk/zzxkyzb_xkBcZyZzxkYzb.html",{
		jxb_ids:do_jxb_id,kch_id:kch_id,kcmc:kcmc,rwlx:rwlx,rlkz:rlkz,rlzlkz:rlzlkz,sxbj:sxbj,xxkbj:xxkbj,qz:qz,
		cxbj:$("#cxbj_"+kch_id).val(),xkkz_id:$("#xkkz_id").val(),njdm_id:$("#njdm_id").val(),zyh_id:$("#zyh_id").val(),
		kklxdm:$("#kklxdm").val(),xklc:$("#xklc").val(),xkxnm:$("#xkxnm").val(),xkxqm:$("#xkxqm").val()
	},function(data){
			setTimeout(function(){
				if(data!=null){
					var flag = data.flag;
					if(flag=="1" || flag=="6"){
						$("#xkczbj").val("1");//减少课表的刷新频率
						var rsxx = trObj.find(".rsxx .jxbrs").text();//教学班人数信息
						var jxbrl = trObj.find(".rsxx .jxbrl").text();//教学班人数信息
						trObj.find(".rsxx .jxbrs").text(parseInt(rsxx)+1);//将余量-1
						setRlxxAddZzxk(trObj,parseInt(rsxx)+1,jxbrl);//检测是否为已满状态
						refreshDataAddZzxk(trObj,jxb_id,do_jxb_id,kch_id,jxbzls,sxbj,qz);
					}else if(data.flag=="-1"){//容量超出，重新修改页面上的选课人数信息
						var jxbrl = trObj.find(".rsxx .jxbrl").text();//教学班人数信息
						var m_yxzrs = data.msg.split(",")[2];
						trObj.find(".rsxx .jxbrs").text(m_yxzrs);
						setRlxxAddZzxk(trObj,m_yxzrs,jxbrl);//检测是否为已满状态
						//该教学班已无余量，不可选！
						$.alert($.i18n.get("msg_ywylbkx"));
						return false;
					}else{//检测不通过且未成功选课时，需要将页面显示的占位信息去掉
						if(data.msg!=null && data.msg!=""){
							$.alert(data.msg);
						}
						return false;
					}
				}
			},1); 
		},'json');
	$.ajaxSetup({async:true});
}

function refreshDataAddZzxk(trObj,jxb_id,do_jxb_id,kch_id,jxbzls,sxbj,qz){
	var zdzys = $("#zdzys").val();
	var sfktk = $("#sfktk").val();
	var tktjrs = $("#tktjrs").val();
	var rlzlkz = $("#rlzlkz").val();
	var rlkz = $("#rlkz").val();
	var xkkz_id = $("#xkkz_id").val();
	var yxkcs = $("#yxkcs").text();//已选课程数
	var yxxfs = $("#yxxfs").text();//已选学分数
	var tykpzykg = $("#tykpzykg").val();//体育课多志愿开关
	var jxbrs = trObj.find(".jxbrs").text();//已选中人数
	var kcxzzt = $("#kcxzzt_"+kch_id).val(); //课程选中状态
	var jxbzb = trObj.find(".jxbzb").text();
	var kklxdm = trObj.find(".kklxdm").text();
	var kcmc = $("#kcmc_"+kch_id).text();
	var kcxx = kcmc.split("-");
	var kcxf = kcxx[kcxx.length-1];
	var t_kch_id = kch_id;
	//$("#xkczbj").val("1");
	trObj.find("input[name='hidsfxz']").val("1");//将教学班对应的是否选中状态置为1
	if(sfktk=="1" && parseInt(tktjrs)<parseInt(jxbrs)){
		trObj.find(".an").html("<button type='button' class='btn btn-danger btn-sm' onclick=cancelCourseZzxk('leftpage','"+jxb_id+"','"+do_jxb_id+"','"+kch_id+"','"+jxbzls+"','"+xkkz_id+"')>"+$.i18n.get("msg_tx")+"</button>");//退选
	}else{
		trObj.find(".an").html("<span style='font-size:15px;color:#428BCA;'><b>"+$.i18n.get("txt-yx")+"</b></span>");//已选
	}
	if(tykpzykg=="1" && kklxdm=="05"){
		kcmc = $.i18n.get("msg_tyk")+" -"+kcxf;//体育课
		t_kch_id = "sports";
	}
	var len = $("#right_ul_"+t_kch_id).find("li").length;
	var add_html = [];
	var zypx = 0;
	if(len==0){
		var zkcs= $("#zkcs").val();
		var zxfs= $("#zxfs").val();
		var lnzkcs= $("#lnzkcs").val();
		var lnzxfs= $("#lnzxfs").val();
		var dqxf = $("#xf_"+kch_id).text(); 
		var cxbj = $("#cxbj_"+kch_id).val();
		$("#zkcs").val(parseInt(zkcs)+1);
		$("#zxfs").val(parseFloat(zxfs)+parseFloat(dqxf));
		$("#lnzkcs").val(parseInt(lnzkcs)+1);
		$("#lnzxfs").val(parseFloat(lnzxfs)+parseFloat(dqxf));
		var xxkbj = $("#xxkbj_"+kch_id).val();
		if(xxkbj=="1"){
			kcmc = "<font color='red'>【"+$.i18n.get("msg_yxxk")+"】</font>"+kcmc;
		}
		if(cxbj=="1"){
			kcmc = "<font color='red'>【"+$.i18n.get("msg_cx")+"】</font>"+kcmc;
		}
		
		add_html.push("<div class='outer_xkxx_list' id='right_"+t_kch_id+"'><h6>" + kcmc);
		if(parseInt(zdzys)>1){
			add_html.push("<span class='pull-right'></span>");
		}
		add_html.push("</h6>");
		add_html.push("<table class='right_table_head'><thead><td class='h_num'>");
		if(qz=="0"){
			add_html.push($.i18n.get("msg_zy"));//志愿
		}else{
			add_html.push($.i18n.get("msg_qz"));//权重
		}
		add_html.push("</td><td class='arraw-px'");
		if(isWebApp){
			add_html.push("style='display:none'");
		}
		add_html.push(">"+$.i18n.get("msg_px")+"</td><td class='h_sxbj'>"+$.i18n.get("msg_xsf")+"</td><td class='h_jxb'>"+$.i18n.get("msg_jxbmc")+"</td><td class='h_teacher'>"+$.i18n.get("msg_jshzc")+"</td><td class='h_time'>"+$.i18n.get("msg_sksj")+"</td><td class='h_addr'>"+$.i18n.get("msg_jxdd")+"</td><td  class='h_zixf'>"+$.i18n.get("msg_zxf")+"</td><td class='h_cz'>"+$.i18n.get("msg_cz")+"</td></thead></table>");
		add_html.push("<ul class='list-group' id='right_ul_"+t_kch_id+"'>");
		add_html.push("<input type='hidden' name='right_kchid' value='"+t_kch_id+"'/>");
		add_html.push("<input type='hidden' id='right_xf_"+t_kch_id+"' name='right_xf' value='"+dqxf+"'/>");
		add_html.push("<input type='hidden' name='right_kklxpx' value='"+$("#kklxpx").val()+"'/>");
		add_html.push("<input type='hidden' name='right_cxbj' value='"+cxbj+"'/>");
		$("#yxkcs").text(parseInt(yxkcs)+1);
		$("#yxxfs").text(parseFloat(yxxfs)+parseFloat(dqxf));
	}
	$("#kcxzzt_"+kch_id).val("1");
	$("#zt_txt_"+kch_id).html($.i18n.get("msg_zt")+"：<b>"+$.i18n.get("txt-yx")+"</b>");
	$("#kcxzzt_"+kch_id).parent().attr("style","background-color:#C1FFC1;");
	var jsxm = trObj.find(".jsxm").text();
	var jszc = trObj.find(".jszc").text();
	var sksj = trObj.find(".sksj").html();
	var jxdd = trObj.find(".jxdd").html();
	var jxbmc = trObj.find(".jxbmc").text();
	//var t_jxb_id = jxb_id.replace("(","").replace(")","");
	zypx = len+1;
	add_html.push("<li class='list-group-item' id='right_"+jxb_id+"'>");
	add_html.push("<div class='item'><table width='100%'><tr><td><p class='num'>");
	if(qz=="0"){
		add_html.push(zypx);
	}else{
		add_html.push("<a href='javascript:void(0)' class='qz-block' data-jxb_id='"+jxb_id+"' data-do_jxb_id='"+do_jxb_id+"'>"+qz+"</a>");
	}
	add_html.push("</p></td>");
	add_html.push("<td class='arraw-px' ");
	if(isWebApp){
		add_html.push("style='display:none'");
	}
	add_html.push("><a class='fa fa-arrow-up padding-lr10' href='javascript:void(0);'></a><br><a class='fa fa-arrow-down padding-lr10' href='javascript:void(0);'></a></td>");
	if(sxbj=="1"){
		add_html.push("<td><p class='sxbj'><font color='blue'>"+$.i18n.get("msg_yxs")+"</font></p></td>");
	}else{
		add_html.push("<td><p class='sxbj'><font color='red'><i>"+$.i18n.get("msg_dsx")+"</i></font></p></td>");
	}
	var t_jxbmc = jxbmc.length>3 ? jxbmc.substring(0,3)+"…" : jxbmc;
	add_html.push("<td><p class='jxb' title='"+jxbmc+"'>"+t_jxbmc+"</p></td>");
	if(jxbzls>1){
		var jsxmzc = jsxm+"("+jszc+")";
		var t_jsxmzc = jsxmzc.length>5?jsxmzc.substring(0,5)+"…":jsxmzc;
		add_html.push("<td><p class='teachers popover-demo' title='"+jsxmzc+"'>"+"<span>"+t_jsxmzc+"</span>");
		var currentTdObj = $("#tr_"+$.convertID(jxb_id)).find(".zjxbxx");
		$(currentTdObj).find("li").each(function(index,item){
			var s_do_jxb_id = $(item).find(".do_jxb_id_1").text();
			var s_xsdm = $(item).find(".xsdm_1").text();
			var s_xsmc = $(item).find(".xsmc_1").text();
			var s_jsxm = $(item).find(".jsxm_1").text();
			var s_jszc = $(item).find(".jszc_1").text();
			var s_sksj = $(item).find(".sksj_1").text();
			var s_jxdd = $(item).find(".jxdd_1").text();
			var img = "";
			if(s_xsdm=="02"){
				img = "ico_tjxk1";
			}else if(s_xsdm=="03"){
				img = "ico_tjxk2";
			}else if(s_xsdm=="04"){
				img = "ico_tjxk3";
			}else{
				img = "ico_tjxk1";
			}
			add_html.push("<a href='javascript:void(0)' class='ico_tjxk "+img+"' title='"+$.i18n.prop("msg_xskcls",[s_xsmc])+"："+s_jsxm+"("+s_jszc+")' data-container='body' data-toggle='popover' data-placement='auto' data-content='"+$.i18n.get("msg_sksjdd")+"："+s_sksj+" / "+s_jxdd+"'><input type='hidden' name='zkc_jxb_id' value='"+s_do_jxb_id+"'/></a>");
		});
	}else{
		var jsxmzc = jsxm+"("+jszc+")";
		var t_jsxm = jsxm.length>5?jsxm.substring(0,5)+"…":jsxm;
		var t_jszc = jszc.length>5?jszc.substring(0,5)+"…":jszc;
		add_html.push("<td><p class='teachers popover-demo' title='"+jsxmzc+"'>"+"<span>"+t_jsxm+"</span>"+t_jszc);
	}

	add_html.push("</p></td>");
	add_html.push("<td><p class='time'>"+sksj+"</p></td>");
	add_html.push("<td><p class='addr'>"+jxdd+"</p></td>");
	add_html.push("<td><p class='zixf'>"+$.i18n.get("msg_zxs")+"</p></td>");
	add_html.push("<td><p class='but'>");
	if(sfktk=="1" && parseInt(tktjrs)<parseInt(jxbrs)){
		add_html.push("<button type='button' class='btn btn-danger btn-sm' onclick=cancelCourseZzxk('rightpage','"+jxb_id+"','"+do_jxb_id+"','"+kch_id+"','"+jxbzls+"','"+xkkz_id+"')>"+$.i18n.get("msg_tx")+"</button>");//退选
	}else{
		add_html.push("<span style='font-size:15px;color:#428BCA;'><b>"+$.i18n.get("txt-yx")+"</b></span>");
	}
	add_html.push("</p></td></tr></table></div>");
	add_html.push("<input type='hidden' name='right_sub_kchid' value='"+kch_id+"'/>");
	add_html.push("<input type='hidden' name='right_jxb_id' value='"+jxb_id+"'/>"); 
	add_html.push("<input type='hidden' name='right_qz' value='"+qz+"'/>"); 
	add_html.push("<input type='hidden' name='right_jxbzls' value='"+jxbzls+"'/>");
	add_html.push("<input type='hidden' name='right_kklxdm' value='"+kklxdm+"'/>");
	add_html.push("</li>");
		
		
	if(len==0){
		add_html.push("</ul></div>");
	}
	if(len==0){//该课程结点不存在
		var beforeLastSelectKcJd = "0";	//选中教学班对应课程前面最近一个被选中的课程
		var afterFirstSelectKcJd = "0";	//选中教学班对应课程后面最近一个被选中的课程
		$("input[name='right_kchid']").each(function(index,item){
			var currentKchid = $(item).val();
			if(currentKchid < kch_id){
				beforeLastSelectKcJd = currentKchid;
			}
			if(currentKchid > kch_id && afterFirstSelectKcJd == 0){
				afterFirstSelectKcJd = currentKchid;
			}
		});
		if(beforeLastSelectKcJd != 0){//表示前面有被选中的课程，可以在此课程后添加新的课程结点
			$("#right_" + beforeLastSelectKcJd).after(add_html.join(""));
		}else if(afterFirstSelectKcJd != 0){//由于学分结点存在，故一定存在课程，如果该课程不在当前被选中课程的前面，就一定在当前被选中课程的后面
			$("#right_" + afterFirstSelectKcJd).before(add_html.join(""));
		}else{
			$(".right_div").html(add_html.join(""));
		}

	}else{//课程下已有被选中的教学班，由于此时有志愿排序的需要，故此时只需要将该记录放在课程下教学班的最后面即可
		$("#right_ul_"+t_kch_id).append(add_html.join(""));
		$("#right_"+t_kch_id).find(".pull-right").text($.i18n.get("msg_sbtdpzy"));
	}
	
	if($.defined(jxbzb) && $("#jxbzb").val()=="" && $("#jxbzbkg").val()=="1"){
		$("#jxbzb").val(jxbzb);
		$("button[name='query']").trigger("click");
	}
	
	if($.fn.dragsort){
		myDragsort();
	}
	$(".popover-demo").popover({selector: '[data-toggle="popover"]',container: "body",trigger: 'hover'});
}



function cancelCourseZzxk(wz,jxb_id,do_jxb_id,kch_id,jxbzls,xkkz_id){
	if($("#confirmModal").size() > 0 ){
		return;
	}
	var isContinue = "1";
	var isExist = "1";
	//检测是否在选课时间内，是否有超过最大志愿数
	$.ajaxSetup({async:false});
	$.post(_path+"/xsxk/zzxkyzb_xkJcInXksjZzxkYzb.html",
		{xkkz_id:xkkz_id,jxb_id:do_jxb_id,kch_id:kch_id,xnm:$("#xkxnm").val(),xqm:$("#xkxqm").val()},
		function(data){
			if(data=="0"){
				isExist = "0";//该课程之前在其他页面已退掉
			}else if(data!="1"){
				$.alert(data);
				isContinue = "0";
			}
			/*if(data.ISZCFW=="0"){
				$.alert($.i18n.get("msg_jgfffw"));//警告：您正在非法访问！
				isContinue = "0";
			}else if(data.ISFWWCS=="0"){
				$.alert($.i18n.get("msg_fwcs"));//访问超时！您可以刷新页面后，再尝试该操作！
				isContinue = "0";
			}else if(data.INXKSJ=="0"){
				$.alert($.i18n.get("msg_yggdsjbktk"));//已过规定时间，不可退课！
				isContinue = "0";
			}else if(data.ISBLXK=="0"){
				$.alert($.i18n.get("msg_bsblxkbktk"));//不是本轮选的课，不可退课！
				isContinue = "0";					
			}else if(data.GPKSFKT == "0" && data.ISGPKC == "0"){
				$.alert($.i18n.get("msg_glypkbkt"));//该教学班由管理员配课生成，不可退！
				isContinue = "0";
			}else if(data.ISEXIST=="0"){
				isExist = "0";
			}*/
		},'json');
	$.ajaxSetup({async:true});
	
	//检测该课程是否已经缴费
	/*$.ajaxSetup({async:false});
	$.post(_path+"/xsxk/zzxkyzb_chexkXksfyjf.html",
		{xkxnm:$("#xkxnm").val(),xkxqm:$("#xkxqm").val(),jxb_id:do_jxb_id},
		function(data){
			if(data!=null){
				if(data.SFJF=="1"){
					$.alert($.i18n.get("msg_jfkcbkt"));//该课程已经缴费，不可退课！
					isContinue = "0";
				}
			}
		},'json');
	$.ajaxSetup({async:true});*/
	
	if(isContinue=="0"){
		return false;
	}
	
	var trObj = $("#tr_"+$.convertID(jxb_id));

	if(isExist=="0"){
		refreshDataDelZzxk(trObj,jxb_id,do_jxb_id,kch_id,jxbzls,wz);
	}else{
		var tkdxyzms = $.defined($("#tkdxyzms").val())?$("#tkdxyzms").val():"0";
		if(parseInt(tkdxyzms)>0){
			if($("#sjhm").val()=="w"){
				$.alert($.i18n.get("msg_dxyzwsjhm"));//退课需要短信验证，我们未找到您的手机号码，如有疑问，请与相关管理人员联系！
				return false;
			}
			 //退选验证
			jQuery.showDialog(_path +'/xkgl/common_cxXsxkDxyz.html?jxb_id='+jxb_id+'&sjhm='+$("#sjhm").val(),$.i18n.get("msg_txyz"),{
				width:"350px",
				modalName:"addModal",
				buttons:{
					success : {
						label : $.i18n.jwglxt["sure"],
						className : "btn-primary",
						callback : function() {
							if($("#ajaxForm").isValid()){
								$.ajaxSetup({async:false});
								$.post(_path+"/xkgl/common_cxCheckXsxkYzm.html",{jxb_id:$("#jxb_id_dxyz").val(),"dxyzm":$("#yzm").val()},function(data){
									if(data=="2"){
										$("#err-hint").text($.i18n.get("msg_dxyzmcw"));//短信验证码错误！
									}else if(data=="3"){
										$("#err-hint").text($.i18n.get("msg_dxyzmsx"));//短信验证码失效！
									}else{
										delCourse(trObj,kch_id,jxb_id,do_jxb_id,jxbzls,wz);
										$.closeModal("addModal");
									}
								},'json');
								$.ajaxSetup({async:true});
							}
							return false;
						}
					},
					cancel : {
							label : $.i18n.jwglxt["cancel"],
							className : "btn-default",
							callback : function() {}
					}
				}
			});
			return false;
		}else{
			$.confirm($.i18n.get("msg_qdytdkc"),function(isBoolean){//您确定要退掉该课程吗？
				if(isBoolean){
					delCourse(trObj,kch_id,jxb_id,do_jxb_id,jxbzls,wz);
				}
			 });
		}
	}
}

function delCourse(trObj,kch_id,jxb_id,do_jxb_id,jxbzls,wz){
	var jxb_ids = [];
	jxb_ids.push(do_jxb_id);
	if(jxbzls>1){
		$("#right_"+$.convertID(jxb_id)).find("a.ico_tjxk").each(function(index,item){
			jxb_ids.push($(item).find("input[name='zkc_jxb_id']").val());
		});
	}
	$.ajaxSetup({async:false});
	$.post(_path+"/xsxk/zzxkyzb_tuikBcZzxkYzb.html",
		{kch_id:kch_id,kcmc:$("#kcmc_"+kch_id).text(),jxb_ids:jxb_ids.join(","),rwlx:$("#rwlx").val(),rlkz:$("#rlkz").val(),rlzlkz:$("#rlzlkz").val(),xklc:$("#xklc").val(),xkxnm:$("#xkxnm").val(),xkxqm:$("#xkxqm").val(),txbsfrl:$("#txbsfrl").val()},
		function(data){
			setTimeout(function(){
				if(data=="1"){
					refreshDataDelZzxk(trObj,jxb_id,do_jxb_id,kch_id,jxbzls,wz);
				}else if(data=="2"){
					$.alert($.i18n.get("msg_tksbfwqm"));//退课失败！服务器繁忙！
				}else if(data=="3"){
					$.alert($.i18n.get("msg_tksbcxwzyc"));//退课失败！出现未知异常！
				}else if(data=="4"){
					$.alert($.i18n.get("msg_jgfffw"));//警告：你正在非法访问！
				}else if(data=="5"){
					$.alert($.i18n.get("msg_fwcs"));//校验不通过，您可以刷新本网页后重试！
				}
			},1); 
		},'json');
	$.ajaxSetup({async:true});
}


function refreshDataDelZzxk(trObj,jxb_id,do_jxb_id,kch_id,jxbzls,wz){
	var txbsfrl = $("#txbsfrl").val();
	var sfkxk = $("#sfkxk").val();
	var jzxkf = $("#jzxkf").val();
	var rwlx = $("#rwlx").val();
	var rlzlkz = $("#rlzlkz").val();
	var rlkz = $("#rlkz").val();
	var yxkcs = $("#yxkcs").text();//已选课程数
	var yxxfs = $("#yxxfs").text();//已选学分数
	var tykpzykg = $("#tykpzykg").val();//体育课多志愿开关
	var kcxzzt = $("#kcxzzt_"+kch_id).val(); //课程选中状态
	var cxbj = $("#right_ul_"+kch_id).find("input[name='right_cxbj']").val();
	var kklxdm = $("#right_"+$.convertID(jxb_id)).find("input[name='right_kklxdm']").val();
	var t_kch_id = kch_id;
	if(tykpzykg=="1" && kklxdm=="05"){
		t_kch_id = "sports";
	}
	var dqxf = $("#right_xf_"+t_kch_id).val();
	$("#xkczbj").val("1");
	var jxbrs = trObj.find(".rsxx .jxbrs").text();
	var jxbrl = trObj.find(".rsxx .jxbrl").text();
	if(txbsfrl == '0'){
		trObj.find(".rsxx .jxbrs").text(parseInt(jxbrs)-1);
		setRlxxSubtractZzxk(trObj,parseInt(jxbrs)-1,jxbrl);//检测是否为已满状态
	}
	
	trObj.find("input[name='hidsfxz']").val("0");//将教学班对应的是否选中状态置为0
	if(sfkxk=="1" && jzxkf=="0"){
		trObj.find(".an").html("<button type='button' class='btn btn-primary btn-sm' onclick=chooseCourseZzxk('"+jxb_id+"','"+do_jxb_id+"','"+kch_id+"','"+jxbzls+"')>"+$.i18n.get("msg_xk")+"</button>");//选课
	}else{
		trObj.find(".an").html("<span style='font-size:15px;color:red;'><b>"+$.i18n.get("msg_jx")+"</b></span>");//禁选
	}
	//var t_jxb_id = jxb_id.replace("(","").replace(")","");
	$("#right_"+$.convertID(jxb_id)).remove();//移除浮动框中的对应教学班
	
	if($("#right_ul_"+t_kch_id).find("li").length==0){//如果指定课程不存在被选中的教学班
		var zkcs= $("#zkcs").val();
		var zxfs= $("#zxfs").val();
		var lnzkcs= $("#lnzkcs").val();
		var lnzxfs= $("#lnzxfs").val();
		$("#zkcs").val(parseInt(zkcs)-1);//将总课程数减一
		$("#zxfs").val(parseFloat(zxfs)-parseFloat(dqxf));//总学分数在原有基础上减去当前课程的学分
		$("#lnzkcs").val(parseInt(lnzkcs)-1);//将总课程数减一
		$("#lnzxfs").val(parseFloat(lnzxfs)-parseFloat(dqxf));//总学分数在原有基础上减去当前课程的学分
		/*$("#kcxzzt_"+kch_id).val("0");//将课程的选中状态置为0
		$("#zt_txt_"+kch_id).html("状态：未选");
		if(cxbj=="1"){
			$("#kcxzzt_"+kch_id).parent().attr("style","background-color:#fff7b2;");
		}else{
			$("#kcxzzt_"+kch_id).parent().attr("style","background-color:#d9edf7;");
		}*/
		$("#yxkcs").text(parseInt(yxkcs)-1);//将已选课信息减一
		$("#yxxfs").text(parseFloat(yxxfs)-parseFloat(dqxf));//将已选课信息减一
		$("#right_"+t_kch_id).remove();//浮动框中课程结点移除
	}else if($("#right_ul_"+t_kch_id).find("li").length==1){
		$("#right_"+t_kch_id).find(".pull-right").text("");
	}
	
	var exists = 0;
	$(".right_div").find("input[name='right_sub_kchid']").each(function(index,item){
		if($(this).val()==kch_id){
			exists = 1;
			return false;
		}
	});
	if(exists==0){
		$("#kcxzzt_"+kch_id).val("0");//将课程的选中状态置为0
		$("#zt_txt_"+kch_id).html($.i18n.get("msg_zt")+"："+$.i18n.get("txt-wx"));
		if(cxbj=="1"){
			$("#kcxzzt_"+kch_id).parent().attr("style","background-color:#fff7b2;");
		}else{
			$("#kcxzzt_"+kch_id).parent().attr("style","background-color:#d9edf7;");
		}
	}
	
	if($(".right_div").find(".outer_xkxx_list").length==0 && $("#jxbzbkg").val()=="1"){
		$("#jxbzb").val("");
		$("button[name='query']").trigger("click");
	}
	
	if(parseInt(jxbzls)>1){
		trObj.find(".zjxbxx").html("");
	}
	saveOrder();
	if(wz=="rightpage"){
		reLoadKb();
	}
}

function reLoadKb(){
	if($("#xkczbj").val()=="1"){
		$("#myCourseTableZzxk").load(_path+"/kbcx/xskbcx_cxXskbBestSimpleIndex.html");
		$("#xkczbj").val("0");
	}
}

function rebackJxbrsZzxk(){
	var rwlx = $("#rwlx").val();
	var rlkz = $("#rlkz").val();
	var rlzlkz = $("#rlzlkz").val();
	var jxb_id = $("#select_jxb_00").val();
	var rwlx = $("#rwlx").val();
	var trObj = $("#tr_"+$.convertID(jxb_id));
	var jxbrs = trObj.find(".rsxx .jxbrs").text();
	var jxbrl = trObj.find(".rsxx .jxbrl").text();
	jxbrs = parseInt(jxbrs)-1;
	trObj.find(".rsxx .jxbrs").text(jxbrs);
	setRlxxSubtractZzxk(trObj,jxbrs,jxbrl);//检测是否为已满状态
}

function myDragsort(){
	$(".list-group").each(function(){
		$(this).dragsort("destroy");
		$(this).dragsort({
			dragSelector: "li", 
			dragBetween: false, 
			dragEnd: saveOrder, 
			placeHolderTemplate: "<li class='list-group-item'><div></div></li>",
			scrollSpeed: 5
		});
	});	
}

//客户端类型识别(是否是PC机)
function isPc(){
	var isPc = true;
	var sUserAgent= navigator.userAgent.toLowerCase(); 
	var bIsIpad= sUserAgent.match(/ipad/i) == "ipad"; 
	var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os"; 
	var bIsMidp= sUserAgent.match(/midp/i) == "midp"; 
	var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"; 
	var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb"; 
	var bIsAndroid= sUserAgent.match(/android/i) == "android"; 
	var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile"; 
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) { 
		isPc = false; 
	}
	return isPc;
}