export var mediaSearch = {
    data: function() {
        return {
            // 媒体搜索
          options4: [],
          mediaSearchDialog: false,
          mediaSearchValue: '',
          mediaType: '/image',
          mediaSearchUrl: '',
          loading: false
        }
    },
    mounted: {
        // 图片搜索
        SearchMedia: function(type) {
            // 清除数据
            this.options4 = [];
            this.mediaSearchValue = '';
            if(type == 'video') {
                this.mediaType = '/video'
            }
            // switch(type) {
            //   case 'smallImg':
            //     this.mediaType = ''
            //     break;
            //   case 'listImg':
            //     this.mediaType = ''
            //     break;
            //   case 'mainImg':
  
            //     break;
            //   case 'video':
  
            //     break;
            //   default:
  
            //     break;
  
            // }
  
            // 开弹窗
            this.mediaSearchDialog = true;
          },
          remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                this.$get(`/admin/file/image?type=0&pageNo=1&pageSize=1000&name=${query}`)
                .then( res => {
                  this.loading = false;
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
          getMediaList: function() {
              this.$get(`/admin/file${this.mediaType}?type=0&pageNo=1&pageSize=1000&name=`)
              .then( res => {
                  this.options4 = res.data.list;
                  let path=this.$refs.select.selectedLabel
                  this.$refs.select.$el.children[0].children[1].setAttribute('style','background:url('+ mediaSearchValue +') no-repeat;color:#fff');
              })
              .catch( err => {
  
              })
          },
          mediaSearchSuccess: function() {
  
          },
    }
}