<template>
  <div class="am-content">
    <div v-show="infoUpdate"  style="margin: 30px auto;width: 770px">
       <el-row>
            <!-- <el-col :span="12" class="clearfix">
              <div class="searchTitle fl">一级标题</div>
              <el-select class="fl" v-model="change_oneIDValue" placeholder="请选择" @change="changeOneIdChange">
                <el-option
                  v-for="item in change_oneIdOptions"
                  :key="item.id"
                  :label="item.titleName"
                  :value="item.titleName">
                </el-option>
              </el-select>
            </el-col> -->

            <el-col :span="12" class="clearfix">
              <div class="searchTitle fl">二级标题</div>
              <el-select style="marginLeft:24px" class="fl" v-model="change_twoIDValue" placeholder="请选择" @change="changeTwoIdChange">
                <el-option
                  v-for="item in change_twoIdOptions"
                  :key="item.id"
                  :label="item.titleName"
                  :value="item.titleName">
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row  style="marginTop:10px;">
              <el-col :span="4"><div class="searchTitle">标题</div></el-col>
              <el-col :span="12"><el-input class="" v-model="changeOptions.bodyTitle" placeholder="请输入内容"></el-input></el-col>
          </el-row>

          <el-row  style="marginTop:10px;">
              <el-col :span="4"><div class="searchTitle">作者：</div></el-col>
              <el-col :span="12"><el-input class="" v-model="changeOptions.author" placeholder="请输入内容"></el-input></el-col>
          </el-row>

          <el-row  style="marginTop:10px;">
              <el-col :span="4"><div class="searchTitle">摘要：</div></el-col>
              <el-col :span="12"><el-input class="" v-model="changeOptions.summary" placeholder="请输入内容"></el-input></el-col>
          </el-row>

          <el-row style="marginTop:10px;">
              <el-col :span="4"><div class="searchTitle">关键词：</div></el-col>
              <el-col :span="12"><el-input class="" v-model="changeOptions.keyword" placeholder="请输入内容"></el-input></el-col>
          </el-row>

          <el-row style="marginTop:10px;">
              <el-col :span="4"><div class="searchTitle">缩略图：</div></el-col>
              <el-col :span="12"><el-input :disabled="true" class="" v-model="changeOptions.thumbnailLink" placeholder="请输入内容"></el-input></el-col>
              <el-col :span="2"><el-button type="warning" @click="SearchMedia('smallImg')">查询</el-button></el-col>
          </el-row>
         
          <el-row style="marginTop:10px;">
              <el-col :span="4"><div class="searchTitle">列表图：</div></el-col>
              <el-col :span="12"><el-input :disabled="true" class="" v-model="changeOptions.listViewLink" placeholder="请输入内容"></el-input></el-col>
              <el-col :span="2"><el-button type="warning" @click="SearchMedia('listImg')">查询</el-button></el-col>
          </el-row>

          <el-row style="marginTop:10px;">
              <el-col :span="4"><div class="searchTitle">主视图：</div></el-col>
              <el-col :span="12"><el-input :disabled="true" class="" v-model="changeOptions.frontViewLink" placeholder="请输入内容"></el-input></el-col>
              <el-col :span="2"><el-button type="warning" @click="SearchMedia('mainImg')">查询</el-button></el-col>
          </el-row>
          
          <el-row style="marginTop:10px;">
              <el-col :span="4"><div class="searchTitle">视频：</div></el-col>
              <el-col :span="12"><el-input :disabled="true" class="" v-model="changeOptions.videoLink" placeholder="请输入内容"></el-input></el-col>
              <el-col :span="2"><el-button type="warning" @click="SearchMedia('video')">查询</el-button></el-col>
          </el-row>

        <div style="margin: 30px auto;width:770px">
          <UEditor style="marginTop:10px;" :config=config ref="ueditor"></UEditor>
        </div>
        <div slot="footer" class="dialog-footer" style="marginLeft: 45%; marginTop: 30px;marginBottom: 30px;">
          <el-button @click="closeCreateData">取消</el-button>
          <el-button type="primary" @click="updateData()">发布文章</el-button>
        </div>
    </div>

    <!-- 图片搜索弹窗 -->
    <el-dialog title="新增" :visible.sync="mediaSearchDialog">
      <el-form ref="mediaSearch" :model="temp" label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="预览" prop="img">
          <div v-if="mediaType == '/image'">
            <img v-show="mediaSearchValue" :src="mediaSearchValue" style="height:100px;width: 100px;">
          </div>
          <div v-else>
            <cm-video-player
                v-if="mediaSearchValue"
                :src="mediaSearchValue"
                :width="'200px'"
                :height="'200px'"
            ></cm-video-player>
          </div>
        </el-form-item>

        <el-form-item label="平台名称" prop="title" >
            <el-select 
              v-model="mediaSearchValue"
              :multiple="false"
              :filterable="true"
              :remote="true"
              reserve-keyword
              placeholder="请输入关键词"
              no-data-text="数据库中无此条消息"
              :remote-method="remoteMethod"
              ref="select"
              :loading="loading">
              <el-option
                v-for="item in options4"
                :key="item.id"
                :label="item.name"
                :value="item.path">
              </el-option>
            </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mediaSearchDialog = false">取消</el-button>
        <el-button type="primary" @click="mediaSearchSuccess">确定</el-button>
      </div>
    </el-dialog>
     

    <div v-show="opacityStyle">

      <div>

          <div class="clearfix marginT">
              <div class="clearfix fl marginL">
                  <div class="searchTitle fl">二级标题</div>
                  <el-select class="fl" v-model="twoIdValue" placeholder="请选择" @change="twoIdChange">
                    <el-option
                      class="fl search-input"
                      v-for="item in twoIdOptions"
                      :key="item.id"
                      :label="item.titleName"
                      :value="item.titleName">
                    </el-option>
                  </el-select>
              </div>

              <div class="clearfix fl marginL">
                  <div class="searchTitle fl">作者：</div>
                  <div class="fl search-input">
                    <el-input v-model="searchOptions.author" placeholder="请输入内容"></el-input>
                  </div>
              </div>

              <div class="clearfix fl marginL">
                  <div class="searchTitle fl">关键词：</div>
                  <div class="fl search-input">
                    <el-input class="" v-model="searchOptions.keywords" placeholder="请输入内容"></el-input>
                  </div>
              </div>
          </div>

          <div class="clearfix marginT">
              <div class="clearfix fl marginL">
                  <div class="searchTitle fl">标题</div>
                  <div class="fl search-input">
                    <el-input v-model="searchOptions.bodyTitle" placeholder="请输入内容"></el-input>
                  </div>
              </div>

              <div class="clearfix fl marginL">
                  <el-col :span="8"><div class="searchTitle fl">开始时间：</div></el-col>
                  <el-date-picker
                    class="fl search-input"
                    :span="14"
                    v-model="searchOptions.startTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
              </div>

              <div class="clearfix fl marginL">
                  <div class="searchTitle fl">结束时间：</div>
                  <el-date-picker
                    class="fl search-input"
                    :span="14"
                    v-model="searchOptions.endTime"
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期">
                  </el-date-picker>
              </div>
          </div>

          <div class="clearfix marginT">
              <div class="clearfix fl marginL">
                  <div class="searchTitle fl">状态：</div>
                  <el-select class="fl search-input" v-model="stausValue" placeholder="" @change="statusChange">
                    <el-option
                      v-for="item in stausOptions"
                      :key="item.status"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
              </div>

              <div class="clearfix fl marginL">
                  <el-button type="primary" @click="hangleSearch">查找</el-button>
                  <el-button type="warning" @click="handleCreate({}, 'add')">添加文章</el-button>
              </div>

          </div>


      </div>





        <!-- <el-row :gutter="20"  style="marginTop:10px;">

          <el-col :span="6" class="clearfix">
            <div class="searchTitle fl">二级标题</div>
            <el-select class="fl" v-model="twoIdValue" placeholder="请选择" @change="twoIdChange">
              <el-option
                v-for="item in twoIdOptions"
                :key="item.id"
                :label="item.titleName"
                :value="item.titleName">
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="6">
            <el-row>
                <el-col :span="6"><div class="searchTitle">作者：</div></el-col>
                <el-col :span="18"><el-input class="" v-model="searchOptions.author" placeholder="请输入内容"></el-input></el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row :gutter="20" style="marginTop:10px;">
          <el-col :span="6">
            <el-row>
                <el-col :span="8"><div class="searchTitle">关键词：</div></el-col>
                <el-col :span="16"><el-input class="" v-model="searchOptions.keywords" placeholder="请输入内容"></el-input></el-col>
            </el-row>
          </el-col>

          <el-col :span="6">
            <el-row>
                <el-col :span="6"><div class="searchTitle">标题</div></el-col>
                <el-col :span="18"><el-input class="" v-model="searchOptions.bodyTitle" placeholder="请输入内容"></el-input></el-col>
            </el-row>
          </el-col>

          <el-col :span="8">
            <el-row>
                <el-col :span="8"><div class="searchTitle">开始时间：</div></el-col>
                <el-date-picker
                  :span="14"
                  v-model="searchOptions.startTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </el-row>
          </el-col>

        </el-row>

        <el-row :gutter="20" style="marginTop:10px;">
          <el-col :span="8">
            <el-row>
                <el-col :span="8"><div class="searchTitle">结束时间：</div></el-col>
                <el-date-picker
                  :span="14"
                  v-model="searchOptions.endTime"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期">
                </el-date-picker>
            </el-row>
          </el-col>

          <el-col :span="6" class="clearfix">
            <div class="searchTitle fl">状态：</div>
            <el-select class="fl" v-model="stausValue" placeholder="" @change="statusChange">
              <el-option
                v-for="item in stausOptions"
                :key="item.status"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="6">
            <el-row>
              <el-button type="primary" @click="hangleSearch">查找</el-button>
              <el-button type="warning" @click="handleCreate({}, 'add')">添加文章</el-button>
            </el-row>
          </el-col>

        </el-row> -->


        <el-table :key='tableKey' :data="this.backMsg"  border fit highlight-current-row
          style="width: 100%;marginTop:20px;">
          <el-table-column align="center" label="编号" width="65">
            <template slot-scope="scope">
              <span>{{scope.row.serialNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column label="文章标题" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.bodyTitle}}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="作者" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.author}}</span>
            </template>
          </el-table-column>
          <el-table-column width="150px" align="center" label="更新日期">
            <template slot-scope="scope">
              <span>{{scope.row.updateTime}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="150px" align="center" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">下架</span>
              <span v-else-if="scope.row.status == 1">上架</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button v-if="rootAdmin" type="success" size="mini" @click="handleStatus(scope.row)">上下架</el-button>
              <el-button type="primary" size="mini" @click="handleCreate(scope.row, 'change')">修改</el-button>
              <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>

      <!-- 分页 -->
      <el-pagination
          v-show="opacityStyle"
          style="width: 400px;margin:30px auto;"
          @current-change="handleCurrentChange"
          :current-page.sync="viewOptions.pageNo"
          :page-size="10"
          :background="true"
          layout="total, prev, pager, next"
          :total="pageList.total"
          :page-count="pageList.pages">
        </el-pagination>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import UEditor from '@/components/ueditor/ueditor.vue'
  import CmVideoPlayer from '@/components/am-video/cm-video'

  export default{
      name: 'addver',
      components: {
        UEditor,
        CmVideoPlayer
      },
      computed: {
        ...mapGetters([
          'rootAdmin'
        ]),
      },
      data(){
        return {
          pageList: {

          },

          // 媒体搜索
          options4: [],
          mediaSearchDialog: false,
          mediaSearchValue: '',
          loading: false,
          mediaSearchUrl: '',
          mediaType: '/image',
          _mediaOutput: 'smallImg',

          infoUpdate: false,
          currentPage1: true,
          input: '',
          tableKey: 0,
          rules: {
            type: [{ required: true, message: 'type is required', trigger: 'change' }],
            timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
            title: [{ required: false, message: 'title is required', trigger: 'blur' }]
          },
          viewOptions: {
            "author": "",
            "bodyTitle": "",
            "endTime": "",
            "keywords": "",
            "oneId": "",
            "pageNo": 1,
            "pageSize": 10,
            "startTime": "",
            "status": 1,
            "twoId": ""
          },
          searchOptions: {
            "author": "",
            "bodyTitle": "",
            "endTime": "",
            "keywords": "",
            "oneId": "",
            "pageNo": 1,
            "pageSize": 10,
            "startTime": "",
            "status": 1,
            "twoId": ""
          },
          opacityStyle: '100%',
          changeMode: 'add',
          changeOptions: {
            // "author": "jason",
            // "bodyTitle": "新文章",
            // "frontViewLink": "",     //  主视图的url
            // "id": 0,                       // 文章id   0--首次发布   修改---文章id
            // "keyword": "新文章",
            // "listViewLink": "",      // 列表图的url
            // "mainBody": "<div>我是一个新文章</div>",          // html     
            // "oneId": 2,                   
            // "summary": "新文章",          // 摘要
            // "thumbnailLink": "",    // 缩略图的url
            // "twoId": 1,
            // "videoLink": ""         // 视频 url 
            "author": "",
            "bodyTitle": "",
            "frontViewLink": "",
            "id": 0,
            "keyword": "",
            "listViewLink": "",
            "mainBody": "",
            "oneId": 0,
            "summary": "",
            "thumbnailLink": "",
            "twoId": 0,
            "videoLink": ""
          },
          oneIdOptions: [

          ],
          change_oneIdOptions: [],
          oneIdValue: '',
          oneFilterJson: {},
          change_oneIDValue: '',
          change_oneFilterJson: {},
          twoIdOptions: [

          ],
          change_twoIdOptions: [],
          twoIdValue: '',
          twoFilterJson: {},
          change_twoIDValue: '',
          change_twoFilterJson: {},
          stausOptions: [
            {
              status: 1,
              label: '上架'
            }, {
              status: 0,
              label: '下架'
            }
          ],
          stausValue: '上架',
          backMsg: [],
          list: null,
          temp: {
            id: undefined,
            importance: 1,
            remark: '',
            timestamp: new Date(),
            title: '',
            type: '',
            status: 'published'
          },
          // 修改的弹窗
          dialogFormVisible: false,
          // 添加的弹框
          dialogFormAdd: false,
          dialogStatus: '',
          textMap: {
            update: '修改文章',
            add: '删除文章'
          },

          config: {
            //可以在此处定义工具栏的内容
            toolbars: [
             [
                'source', //源代码
                '|',

                'undo', //撤销
                'redo', //重做
                '|',

                'bold', //加粗
                'italic', //斜体
                'underline', //下划线
                'fontborder', //字符边框
                'strikethrough', //删除线
                'subscript', //下标
                'superscript', //上标
                'removeformat', //清除格式
                'formatmatch', //格式刷 
                'autotypeset', //自动排版
                'blockquote', //引用
                'pasteplain', //纯文本粘贴模式
                '|',

                'forecolor', //字体颜色
                'backcolor', //背景色
                'insertorderedlist', //有序列表
                'insertunorderedlist', //无序列表
                'selectall', //全选
                'cleardoc', //清空文档
                '|',

                'rowspacingtop', //段前距
                'rowspacingbottom', //段后距
                'lineheight', //行间距
                
               ],
               [
                'customstyle', //自定义标题
                'paragraph', //段落格式
                'fontfamily', //字体
                'fontsize', //字号
                'directionalityltr', //从左向右输入
                'directionalityrtl', //从右向左输入
                'indent', //首行缩进
                '|',

                'justifyleft', //居左对齐
                'justifyright', //居右对齐
                'justifycenter', //居中对齐
                'justifyjustify', //两端对齐
                '|',

                'touppercase', //字母大写
                'tolowercase', //字母小写
                '|',

                'link', //超链接
                'unlink', //取消链接
                'anchor', //锚点
                '|',

                'imagenone', //默认
                'imageleft', //左浮动
                'imageright', //右浮动
                'imagecenter', //居中

               ],
               [
                'insertimage', //多图上传
                'emotion', //表情
                'scrawl', //涂鸦
                'attachment', //附件
                // 百度谷歌地图iframe

                'insertcode', //代码语言
                // 百度应用
                'pagebreak', //分页
                'template', //模板
                'background', //背景
                '|',

                'horizontal', //分隔线
                'date', //日期
                'time', //时间
                'spechars', //特殊字符
                'snapscreen', //截图
                'wordimage', //图片转存
                '|',

                'inserttable', //插入表格
                'deletetable', //删除表格
                'insertparagraphbeforetable', //"表格前插入行"
                'insertrow', //前插入行
                'deleterow', //删除行
                'insertcol', //前插入列
                'deletecol', //删除列
                '|',

                // 'edittip ', //编辑提示
                'mergecells', //合并多个单元格
                'mergeright', //右合并单元格
                'mergedown', //下合并单元格
                'splittocells', //完全拆分单元格
                'splittorows', //拆分成行
                'splittocols', //拆分成列
                'charts', // 图表
              ],
              [
                'print', //打印
                'preview', //预览
                'searchreplace', //查询替换
                'help', //帮助
                'drafts', // 从草稿箱加载
                
                
                'fullscreen', //全屏
                
                // 'webapp', //百度应用
                // 'music', //音乐
                // 'deletecaption', //删除表格标题
                // 'inserttitle', //插入标题
                // 'insertframe', //插入Iframe
                // 'simpleupload', //单图上传
                // 'edittable', //表格属性
                // 'edittd', //单元格属性
                // 'map', //Baidu地图
                // 'gmap', //Google地图
                // 'insertvideo', //视频
              ]
            ],
            zIndex: 1000,  // 编辑器的层级
            autoHeightEnabled: false,
            autoFloatEnabled: true,
            initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
            autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
            initialFrameWidth: null,
            initialFrameHeight: 450,
            BaseUrl: '',
            UEDITOR_HOME_URL: 'static/ueditor/'
          },
          addFormVisible: false
        }
      },
      created() {
        // this.$get('/admin/titleList/oneTitleList')
        // .then(res => {
        //   console.log(res)
        //   this.oneIdValue = res.data[0].titleName;
        //   this.oneIdOptions = res.data;
        //   this.oneFilterJson = res.data[0];
        //   this.viewOptions.oneId = res.data[0].id;
        //   this.$post('/admin/titleList/twoTitleList', {
        //     id: res.data[0].id
        //   })
        //   .then( res => {
        //       this.twoIdValue = res.data[0].titleName;
        //       this.twoIdOptions = res.data;
        //       this.twoFilterJson = res.data[0];  
        //       this.viewOptions.twoId = res.data[0].id;

        //       // 添加以及标题和耳机标题下拉框 默认属性
        //       this.change_oneIdOptions = this.oneIdOptions;
        //       this.change_twoIdOptions = this.twoIdOptions;

        //       this.changeViewTab()
        //   })
        //   .catch( error => {
        //       this.$notify.error({
        //         title: '错误',
        //         message: error
        //       });
        //   })
        // })
        // .catch(err => {
        //     this.$notify.error({
        //       title: '错误',
        //       message: err
        //     });
        // })
        this.viewOptions.oneId = 101;
        this.oneFilterJson.id = 101;
        this.$post('/admin/titleList/twoTitleList', {
            id: 101
          })
          .then( res => {
              this.twoIdValue = res.data[0].titleName;
              this.twoIdOptions = res.data;
              this.twoFilterJson = res.data[0];  
              this.viewOptions.twoId = res.data[0].id;

              // 添加以及标题和耳机标题下拉框 默认属性
              this.change_oneIdOptions = this.oneIdOptions;
              this.change_twoIdOptions = this.twoIdOptions;

              this.changeViewTab()
          })
          .catch( error => {
              this.$notify.error({
                title: '错误',
                message: error
              });
          })

      },
      methods: {
        handleCurrentChange(val) {
          this.viewOptions.pageNo = val;
          this.changeViewTab()
        },

        // 图片搜索
        SearchMedia: function(type) {
          // 清除数据
          this.options4 = [];
          this.mediaSearchValue = '';
          if(type != 'video') {
              this.mediaType = '/image';
          }else {
              this.mediaType = '/video';
          }
          // 设置反选属性    _mediaOutput

          switch(type) {
            case 'smallImg':
              this._mediaOutput = 'smallImg';
              break;
            case 'listImg':
              this._mediaOutput = 'listImg';
              break;
            case 'mainImg':
              this._mediaOutput = 'mainImg';
              break;
            case 'video':
              this._mediaOutput = 'video';
              break;
          }

          // 开弹窗
          this.mediaSearchDialog = true;
        },
        remoteMethod(query) {
          if (query !== '') {
              this.loading = true;
              this.$get(`/admin/file${this.mediaType}?type=0&pageNo=1&pageSize=10&name=${query}`)
              .then( res => {
                this.loading = false;
                this.pageList = res.data;
                this.options4 = res.data.list;
                console.log('====>',this.$ref.select)
                let path=this.$refs.select.selectedLabel
                this.$refs.select.$el.children[0].children[1].setAttribute('style','background:url('+ path +') no-repeat;color:#fff');
                console.log(res)
              })
              .catch( err => {
                this.loading = false;
              })
          } else {
              this.options4 = [];
          }
        },
        mediaSearchSuccess: function() {
          // "author": "jason",
            // "bodyTitle": "新文章",
            // "frontViewLink": "",     //  主视图的url
            // "id": 0,                       // 文章id   0--首次发布   修改---文章id
            // "keyword": "新文章",
            // "listViewLink": "",      // 列表图的url
            // "mainBody": "<div>我是一个新文章</div>",          // html     
            // "oneId": 2,                   
            // "summary": "新文章",          // 摘要
            // "thumbnailLink": "",    // 缩略图的url
            // "twoId": 1,
            // "videoLink": ""         // 视频 url 
            switch(this._mediaOutput) {
              case 'smallImg':
                this.changeOptions.thumbnailLink = this.mediaSearchValue; 
                // this._mediaOutput = 'smallImg';
                break;
              case 'listImg':
                this.changeOptions.listViewLink = this.mediaSearchValue; 
                // this._mediaOutput = 'listImg';
                break;
              case 'mainImg':
                this.changeOptions.frontViewLink = this.mediaSearchValue; 
                // this._mediaOutput = 'mainImg';
                break;
              case 'video':
                this.changeOptions.videoLink = this.mediaSearchValue; 
                // this._mediaOutput = 'mainImg';
                break;
            }
            this.mediaSearchDialog =false;
        },
        // 搜索文章
        hangleSearch: function() {
            this.searchOptions.oneId = this.oneFilterJson.id;
            this.searchOptions.twoId = this.twoFilterJson.id;
            if(this.stausValue == '上架') {
                this.searchOptions.status = 1;
            }else {
                this.searchOptions.status = 0;
            }
            console.log(this.searchOptions);

            this.$post('/admin/body/articleSearch', this.searchOptions)
            .then( res => {
              this.backMsg = res.data.list;
            })
            .catch(err => {
                this.$notify.error({
                  title: '错误',
                  message: err
                });
            })
        },
        // 更改一级标题
        oneIdChange: function() {
          let obj = {};
          obj = this.oneIdOptions.find((item)=>{
              return item.titleName == this.oneIdValue;
          });
          this.oneFilterJson = obj
          this.viewOptions.oneId = obj.id;

          this.$post('/admin/titleList/twoTitleList', {
              id: this.oneFilterJson.id
            })
            .then( res => {
                if(res.data.length == 0) {
                    this.twoIdValue = '';
                    this.twoIdOptions = { };
                    this.twoFilterJson = { id: '', titleName: ''};
                    this.viewOptions.twoId = '';
                }else{
                    this.twoIdValue = res.data[0].titleName;
                    this.twoIdOptions = res.data;
                    this.twoFilterJson = res.data[0];
                    this.viewOptions.twoId = res.data[0].id;
                }
            })
            .catch( err => {
                this.$notify.error({
                  title: '错误',
                  message: err
                });
            })
        },
        // 更改二级标题
        twoIdChange: function() {
          let obj = {};
          obj = this.twoIdOptions.find((item)=>{
              return item.titleName == this.twoIdValue;
          });
          this.twoFilterJson = obj
          this.viewOptions.twoId = obj.id;
        },
        // 更改updata的一级标题
        changeOneIdChange: function() {
            let obj = {};
            obj = this.change_oneIdOptions.find((item)=>{
                return item.titleName == this.change_oneIDValue;
            });
            this.change_oneFilterJson = obj
            this.changeOptions.oneId = obj.id;

            this.$post('/admin/titleList/twoTitleList', {
                id: this.change_oneFilterJson.id
              })
              .then( res => {
                if(res.data.length == 0) {
                    this.change_twoIDValue = '';
                    this.change_twoIdOptions = {};
                    this.change_twoFilterJson = { id: '', titleName: ''};
                    this.changeOptions.twoId = '';
                } else {
                    this.change_twoIDValue = res.data[0].titleName;
                    this.change_twoIdOptions = res.data;
                    this.change_twoFilterJson = res.data[0];
                    this.changeOptions.twoId = res.data[0].id;
                }
              })
              .catch( err => {
                  this.$notify.error({
                    title: '错误',
                    message: err
                  });
              })
        },
        // 更改updata的二级标题
        changeTwoIdChange: function() {
            let obj = {};
            obj = this.change_twoIdOptions.find((item)=>{
                return item.titleName == this.change_twoIDValue;
            });
            this.change_twoFilterJson = obj
            this.changeOptions.twoId = obj.id;
        },
        // 更改上下架状态
        statusChange: function() {
          let obj = {};
          obj = this.stausOptions.find((item)=>{
              return item.label == this.stausValue;
          });
          this.viewOptions.status = obj.status;
        },
        // 首次加载或者查询
        changeViewTab: function() {
            this.$post('/admin/body/articleSearch', this.viewOptions)
            .then(res => {
              this.pageList = res.data;
              this.backMsg = res.data.list;
            })
            .catch( err => {
                this.$notify.error({
                  title: '错误',
                  message: err
                });
            })
        },
        // 修改
        handleUpdate(row) {
          this.temp = Object.assign({}, row) // copy obj
          console.log(row)
          this.temp.timestamp = new Date(this.temp.timestamp)
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        },
        resetTemp() {
          this.temp = {
            id: undefined,
            importance: 1,
            remark: '',
            timestamp: new Date(),
            title: '',
            status: 'published',
            type: ''
          }
        },
        /*
        *   定义打开编辑器的方式  新增 （add）或者 修改 （change） 对应data中的 changeMode 字段，默认为 'add'
        *   
        *
        */
        handleEditor: function(data, type) {
          this.changeMode = type;
          if(type == 'change') {

            let articleInfo = {};

            this.$post('/admin/body/searchForUpdate', {
              "articleOrTitleLink": 0,
              "id": data.titleId
            })
            .then(res => {
                articleInfo = res.data;

                this.$refs.ueditor.setContent(articleInfo.body);

                this.changeOptions = {
                  "author": articleInfo.author,
                  "bodyTitle": articleInfo.bodyTitle,
                  "frontViewLink": articleInfo.frontViewUrl,
                  "id": articleInfo.id,
                  "keyword": articleInfo.keywords,
                  "listViewLink": articleInfo.listViewUrl,
                  "mainBody": articleInfo.body,
                  "oneId": articleInfo.oneTitleId,
                  "summary": articleInfo.summary,
                  "thumbnailLink": articleInfo.thumbnailUrl,
                  "twoId": articleInfo.twoTitleId,
                  "videoLink": articleInfo.videoUrl
                }

              // 清空编辑器所有内容     this.$refs.ueditor.execCommand('cleardoc');
              // 查询需要更改的一级标题和二级标题  通过一级标题的id筛选二级标题
              // author: "史蒂夫纳什"
              // bodyTitle: "时间嗲是的风景"
              // createTime: "2018-05-07"
              // oneId: 2
              // serialNumber: 1
              // status: 1
              // titleId: 1
              // twoId: 1
              // updateTime: "2018-05-19"

                  let option = {};
                  option = this.oneIdOptions.find( (item) => {
                    return item.id == data.oneId;
                  })
                  this.change_oneFilterJson = option;
                  this.change_oneIDValue = option.titleName;
                  // this.changeOptions.oneId = option.id;

                  this.$post('/admin/titleList/twoTitleList', {
                    id: this.change_oneFilterJson.id
                  })
                  .then( res => {
                    if(res.data.length == 0) {
                        this.change_twoIDValue = '';
                        this.change_twoIdOptions = {};
                        this.change_twoFilterJson = { id: '', titleName: ''};
                        this.changeOptions.twoId = '';
                    } else {
                        let twoOption = {};
                        twoOption = res.data.find( (item) => {
                          return item.twoId == data.towId;
                        })
                        this.change_twoFilterJson = twoOption;
                        this.change_twoIDValue = twoOption.titleName;
                        // this.changeOptions.twoId = twoOption.twoId;
                    }
                  })
                  .catch( err => {
                    this.$notify.error({
                      title: '错误',
                      message: err
                    });
                  })

              })
              .catch( error => {
                  this.$notify.error({
                    title: '错误',
                    message: error
                  });
              })
          }else{
            // type == 'add' 勾选当前的一级id、二级id
            this.change_oneIDValue = this.oneIdValue;
            this.change_oneFilterJson = this.oneFilterJson;
            this.change_twoIDValue = this.twoIdValue;
            this.change_twoFilterJson = this.twoFilterJson;

            this.changeOptions = {
                "author": "",
                "bodyTitle": "",
                "frontViewLink": "",
                "id": 0,
                "keyword": "",
                "listViewLink": "",
                "mainBody": "",
                "oneId": this.oneFilterJson.id,
                "summary": "",
                "thumbnailLink": "",
                "twoId": this.twoFilterJson.id,
                "videoLink": ""
              }

            // 清空文章内容
            this.$refs.ueditor.setContent('请输入内容');
          }
          // 打开输入页面 隐藏 原页面
          this.infoUpdate = true;
          this.opacityStyle = false;

        },
        // 上下架
        handleStatus:function(data) {
            this.$confirm('是否更换上下架状态？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              console.log(data)
                this.$post('/admin/body/articleStatChenge',{
                    "articleOrTitleLink": 0,
                    "id": data.titleId,
                    "status": data.status
                })
                .then( res => {
                    if(data.status == 1){
                      data.status = 0;
                    }else {
                      data.status = 1;
                    }

                    this.$message({
                      type: 'success',
                      message: '状态更新成功!'
                    });
                })
                .catch( err => {
                  this.$notify.error({
                    title: '错误',
                    message: err
                  });
                })
              
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消更新上下架状态'
              });          
            });
            
        },
        // 添加
        handleCreate(data, type) {
          this.handleEditor(data, type)
        },
        // 关闭添加
        closeCreateData: function() {
          this.infoUpdate = false;
          this.opacityStyle = true;
        },
        // 删除
        handleModifyStatus(row, status) {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.$post('/admin/body/articleStatChenge', {
                    "articleOrTitleLink": 0,
                    "id": row.titleId,
                    "status": 2
                  })
                  .then(res => {
                    this.backMsg = this.backMsg.filter(function(v){
                      return row.titleId !== v.titleId;
                    });
                    this.changeViewTab()
                    this.$message({
                      message: '操作成功',
                      type: 'success'
                    })
                  })
                  .catch( err => {
                    this.$message({
                      message: err,
                      type: '操作失败'
                    })
                  })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
        },
        // andleModifyStatus(row, status) {

        //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        //       confirmButtonText: '确定',
        //       cancelButtonText: '取消',
        //       type: 'warning'
        //     }).then(() => {
        //         this.$post('/admin/body/articleStatChenge', {
        //             "articleOrTitleLink": 1,
        //             "id": row.id,
        //             "status": 2
        //           })
        //           .then(res => {
        //             this.backMsg = this.backMsg.filter(function(v){
        //               return row.id !== v.id;
        //             });
        //             console.log(this.backMsg)
        //             this.$message({
        //               message: '操作成功',
        //               type: 'success'
        //             })
        //           })
        //           .catch( err => {
        //             this.$message({
        //               message: err,
        //               type: '操作失败'
        //             })
        //           })
        //     }).catch(() => {
        //       this.$message({
        //         type: 'info',
        //         message: '已取消删除'
        //       });          
        //     });
        // },
        resetTemp() {
          this.temp = {
            id: undefined,
            importance: 1,
            remark: '',
            timestamp: new Date(),
            title: '',
            status: 'published',
            type: ''
          }
        },
        // 修改 和 发布文章
        updateData() {
           

          this.changeOptions.mainBody = this.$refs.ueditor.getUEContent(); 

          this.$post('/admin/body/articlePublish', this.changeOptions)
          .then( res => {
              if(res.code == '000000') {
                  let addOptions = {
                    "serialNumber": 1,
                    "oneId": 2,
                    "twoId": 1,
                    "titleId": 67,
                    "bodyTitle": "千年腔调 穿越古今 ——走近中国戏剧活化石德江傩戏",
                    "author": "张林",
                    "createTime": "2018-05-27",
                    "updateTime": "2018-05-27",
                    "status": 1,
                    "updateTime": `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
                  };

                  console.log('end===>', addOptions)
                  console.log('up=====>', this.changeOptions)
                  let index = 0;
                  if(this.changeMode == "change") {
                    let obj = {};
                    obj = this.backMsg.find( (item) => {
                      return item.titleId == this.changeOptions.id;
                    })
                    this.changeOptions.serialNumber = obj.serialNumber;
                    this.changeOptions.status = obj.status;
                    this.changeOptions.titleId = obj.titleId;
                    this.changeOptions.updateTime = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
                    console.log('find==>', obj)
                    index = this.backMsg.indexOf(obj);
                    this.backMsg.splice(index, 1, this.changeOptions);
                    console.log('结果====》', this.changeOptions)
                  }else {
                      this.changeOptions.serialNumber = 0;
                      this.changeOptions.status = 1;
                      this.changeOptions.titleId = 0;
                      this.changeOptions.updateTime = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
                      console.log(this.changeOptions)
                      this.backMsg.unshift(this.changeOptions);
                      
                  }

                  this.infoUpdate = false;
                  this.opacityStyle = true;

                  this.changeViewTab();

              }else {
                  this.$message({
                    message: res.msg,
                    type: 'error'
                  })
              }

              
          })
        }
      }
  }

</script>

<style lang="scss">
.am-content{ 
  .searchTitle{
    border: 1px solid #ccc;
    line-height: 34px;
    padding: 0 10px;
  }
  .marginL{
    margin-left: 30px;
  }
  .searchTitle{
    width: 105px;
  }
  .search-input{
    width: 196px;
  }
  .marginT{
    margin: 15px 0;
  }
}
</style>

