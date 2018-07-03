
登录(鉴权):
http://118.190.152.1:8084/auth

模拟:
①获取token
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"username":"admin","password":"admin"}' 'http://118.190.152.1:8084/auth'

②调用接口
curl -X GET --header 'Accept: application/json' --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTUyNzQyODI1MywiaWF0IjoxNTI2ODIzNDUzfQ.VbZJovQzJ8iZ2pXDWEWpgT-9buf_4cyNxePT5KkUkj7TbqLTt_U1DIK7a1Jcl6-8c8969yKLCM9gu-B5AUSwjQ' 'http://118.190.152.1:8082/admin/titleList/oneTitleList'



{ "code": "000000", "data": { "pageNum": 1, "pageSize": 2, "size": 2, "startRow": 0, "endRow": 1, "total": 2, "pages": 1, "list": [ { "serialNumber": 2, "id": 3, "name": "测试首页广告", "url": "http://e.hiphotos.baidu.com/image/pic/item/8601a18b87d6277fca09b19924381f30e924fc7c.jpg", "img_url": null, "createTime": "2018-05-19", "updateTime": "2018-05-19", "location": 1, "status": 0 }, { "serialNumber": 3, "id": 4, "name": "测试专题策划广告", "url": "http://e.hiphotos.baidu.com/image/pic/item/8601a18b87d6277fca09b19924381f30e924fc7c.jpg", "img_url": null, "createTime": "2018-05-19", "updateTime": "2018-05-19", "location": 2, "status": 0 } ], "prePage": 0, "nextPage": 0, "isFirstPage": true, "isLastPage": true, "hasPreviousPage": false, "hasNextPage": false, "navigatePages": 8, "navigatepageNums": [ 1 ], "navigateFirstPage": 1, "navigateLastPage": 1, "firstPage": 1, "lastPage": 1 }, "msg": "操作成功", "successFlag": true }



//当前页
private int pageNum;
//每页的数量
private int pageSize;
//当前页的数量
private int size;

//由于startRow和endRow不常用，这里说个具体的用法
//可以在页面中"显示startRow到endRow 共size条数据"

//当前页面第一个元素在数据库中的行号
private int startRow;
//当前页面最后一个元素在数据库中的行号
private int endRow;
//总记录数
private long total;
//总页数
private int pages;
//结果集
private List<T> list;

//前一页
private int prePage;
//下一页
private int nextPage;

//是否为第一页
private boolean isFirstPage = false;
//是否为最后一页
private boolean isLastPage = false;
//是否有前一页
private boolean hasPreviousPage = false;
//是否有下一页
private boolean hasNextPage = false;
//导航页码数
private int navigatePages;
//所有导航页号
private int[] navigatepageNums;
//导航条上的第一页
private int navigateFirstPage;
//导航条上的最后一页
private int navigateLastPage;