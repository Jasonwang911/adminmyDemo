webpackJsonp([57],{IMG8:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("bOdI"),n=s.n(a),l=(s("viA7"),{props:{type:Object},data:function(){return n()({options4:[],value9:"",loading:!1,stausOptions:[{status:1,label:"在用"},{status:0,label:"注销"}],stausValue:"在用",viewOptions:{pageNo:0,pageSize:0,status:1,userType:0,username:""},userStatus:1,dialogFormVisible:!1,addUserInfo:{phone:"",username:"",password:""},list:[],listQuery:{page:1,limit:5,type:this.type,sort:"+id"}},"loading",!1)},filters:{statusFilter:function(t){return{published:"success",draft:"info",deleted:"danger"}[t]}},created:function(){console.log(this.type.userType),this.viewOptions.userType=this.type.userType,this.getList()},methods:{searchName:function(){this.getList()},addUser:function(){this.dialogFormVisible=!0},formAddUser:function(){var t=this;this.$post("/admin/register",this.addUserInfo).then(function(e){"000000"==e.code?(t.$message({message:"操作成功",type:"success"}),t.list.unshift(t.addUserInfo)):t.$message({message:e.msg,type:"操作失败"}),t.dialogFormVisible=!1}).catch(function(e){t.$message({message:e,type:"操作失败"})})},delUser:function(t){var e=this;this.$confirm("此操作将永久删除该用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$post("/admin/del",{id:t.id}).then(function(s){e.list=e.list.filter(function(e){return t.titleId!==e.titleId}),e.$message({message:"操作成功",type:"success"})}).catch(function(t){e.$message({message:t,type:"操作失败"})})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},remoteMethod:function(t){},statusChange:function(){var t,e=this;t=this.stausOptions.find(function(t){return t.label==e.stausValue}),this.viewOptions.status=t.status,this.getList()},getList:function(){var t=this;this.loading=!0,"在用"==this.stausValue?this.viewOptions.status=1:this.viewOptions.status=0,this.$post("/admin/user/userListSearch",this.viewOptions).then(function(e){t.list=e.data.list,t.loading=!1}).catch(function(t){})}}}),o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-row",{staticStyle:{margin:"30px 0"},attrs:{gutter:20}},[s("el-col",{attrs:{span:6}},[s("el-row",{attrs:{gutter:5}},[s("el-col",{attrs:{span:8}},[s("div",{staticClass:"searchTitle"},[t._v("状态：")])]),t._v(" "),s("el-col",{attrs:{span:12}},[s("el-select",{attrs:{placeholder:""},on:{change:t.statusChange},model:{value:t.stausValue,callback:function(e){t.stausValue=e},expression:"stausValue"}},t._l(t.stausOptions,function(t){return s("el-option",{key:t.status,attrs:{label:t.label,value:t.label}})}))],1)],1)],1),t._v(" "),s("el-col",{attrs:{span:18}},[s("el-row",{attrs:{gutter:10}},[s("el-col",{attrs:{span:8}},[s("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.viewOptions.username,callback:function(e){t.$set(t.viewOptions,"username",e)},expression:"viewOptions.username"}})],1),t._v(" "),s("el-col",{attrs:{span:8}},[s("el-button",{attrs:{type:"primary"},on:{click:t.searchName}},[t._v("搜索")])],1),t._v(" "),1==t.type.userType?s("el-col",{attrs:{span:8}},[s("el-button",{attrs:{type:"warning"},on:{click:t.addUser}},[t._v("添加")])],1):t._e()],1)],1)],1),t._v(" "),s("el-dialog",{attrs:{title:"新增用户",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[s("el-form",[s("el-form-item",{attrs:{label:"用户名","label-width":"120px"}},[s("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addUserInfo.userName,callback:function(e){t.$set(t.addUserInfo,"userName",e)},expression:"addUserInfo.userName"}})],1)],1),t._v(" "),s("el-form",[s("el-form-item",{attrs:{label:"手机号","label-width":"120px"}},[s("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addUserInfo.phone,callback:function(e){t.$set(t.addUserInfo,"phone",e)},expression:"addUserInfo.phone"}})],1)],1),t._v(" "),s("el-form",[s("el-form-item",{attrs:{label:"登录密码","label-width":"120px"}},[s("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addUserInfo.password,callback:function(e){t.$set(t.addUserInfo,"password",e)},expression:"addUserInfo.password"}})],1)],1),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:t.formAddUser}},[t._v("确 定")])],1)],1),t._v(" "),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""}},[s("el-table-column",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{align:"center",label:"用户名",width:"65","element-loading-text":"请给我点时间！"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.username))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"头像"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("img",{staticStyle:{width:"40px",height:"40px",margin:"5px auto"},attrs:{src:t.row.headUrl,alt:""}})]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"手机号"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.phone))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"qq"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.qq))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"微信"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.weiXin))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"邮箱",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.email))])]}}])}),t._v(" "),s("el-table-column",{attrs:{"class-name":"status-col",label:"性别",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.sex?s("span",[t._v("男")]):t._e(),t._v(" "),1==e.row.sex?s("span",[t._v("女")]):t._e()]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"操作",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"danger"},on:{click:function(s){t.delUser(e.row)}}},[t._v("删除")])]}}])})],1)],1)},staticRenderFns:[]},i=s("VU/8")(l,o,!1,null,null,null);e.default=i.exports}});