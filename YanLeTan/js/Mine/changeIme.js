//拍照
function getImage() {
    var cmr = plus.camera.getCamera();
    cmr.captureImage( function (p) {
    	f1.splice(0, f1.length);
        plus.io.resolveLocalFileSystemURL( p, function ( entry ) {    
            var localurl = entry.toLocalURL();//
            mui("#popover").popover("toggle");
            cutImg(localurl);
        });
    });
}
//相册选取
function appendByGallery(){
    plus.gallery.pick( function(e){
    	f1.splice(0, f1.length);
         mui("#popover").popover("toggle");
         cutImg(e.files[0]);
    }, function ( e ) {
        //outSet( "取消选择图片" );
    },{filter:"image",multiple:true});
}
var f1=[];
function cutImg(url){  
    // 兼容以“file:”开头的情况
    if (0 != url.toString().indexOf("file://")) {
        url = "file://" + url;
    }
    var _img_ = new Image();
    _img_.src = url; // 传过来的图片路径在这里用。
        _img_.onclick = function() {
                plus.runtime.openFile(url);
            };
    _img_.onload = function() {
        var tmph = _img_.height;
        var tmpw = _img_.width;
        var isHengTu = tmpw > tmph;
        var max = Math.max(tmpw, tmph);
        var min = Math.min(tmpw, tmph);
        var bili = min / max;
        if (max > 1200) {
            max = 1200;
            min = Math.floor(bili * max);
        }
        tmph = isHengTu ? min : max;
        tmpw = isHengTu ? max : min;
        _img_.onload = null;
        plus.io.resolveLocalFileSystemURL(url, function(entry) {
                entry.file(function(file) {
                    console.log(file.size + '--' + file.name);
                    canvasResize(file, {
                        width: tmpw,
                        height: tmph,
                        crop: false,
                        quality: 50, //压缩质量
                        rotate: 0,
                        callback: function(data, width, height) {
                        	console.log(file.size)
                            f1.push(data);
                            console.log(f1);
                            document.getElementById("userimg").src = data;
                            imgupgrade(f1)
                        }
                    });
                });
            },
            function(e) {
                plus.nativeUI.closeWaiting();
                console.log(e.message);
            });
    };
};


