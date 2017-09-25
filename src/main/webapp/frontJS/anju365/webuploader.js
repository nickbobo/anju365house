 $(function (){
        var uploader = uploadImage({
            wrap: jQuery("#uploader"), //包裹整个上传控件的元素，必须。可以传递dom元素、选择器、jQuery对象
            /*预览图片的宽度，可以不传，如果宽高都不传则为包裹预览图的元素宽度，高度自动计算*/
            //width: "160px",
            height: 50,//预览图片的高度
            auto: false, //是否自动上传
            method: "POST",//上传方式，可以有POST、GET
            sendAsBlob: false,//是否以二进制流的形式发送
            viewImgHorizontal: true,//预览图是否水平垂直居中
            fileVal: "file", // [默认值：'file'] 设置文件上传域的name。
            btns: {//必须
                uploadBtn: $("#upload_now"), //开始上传按钮，必须。可以传递dom元素、选择器、jQuery对象
                retryBtn: null, //用户自定义"重新上传"按钮
                chooseBtn: '#choose_file',//"选折图片"按钮，必须。可以传递dom元素、选择器、jQuery对象
                chooseBtnText: "选择图片" //选择文件按钮显示的文字
            },
            pictureOnly: false,//只能上传图片
            datas: {
                "uuid": new Date().getTime()
            }, //上传的参数,如果有参数则必须是一个对象
            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！false为不压缩
            resize: false,
            //是否可以重复上传，即上传一张图片后还可以再次上传。默认是不可以的，false为不可以，true为可以
            duplicate: false,
            multiple: true, //是否支持多选能力
            swf: "Uploader.swf", //swf文件路径，必须
            url: "index2.html", //图片上传的路径，必须
            maxFileNum: 20, //最大上传文件个数
            maxFileTotalSize: 10485760, //最大上传文件大小，默认10M
            maxFileSize: 2097152, //单个文件最大大小，默认2M
            showToolBtn: true, //当鼠标放在图片上时是否显示工具按钮,
            onFileAdd: null, //当有图片进来后所处理函数
            onDelete: null, //当预览图销毁时所处理函数
            /*当单个文件上传失败时执行的函数，会传入当前显示图片的包裹元素，以便用户操作这个元素*/
            uploadFailTip: null,
            onError: null, //上传出错时执行的函数
            notSupport: null, //当浏览器不支持该插件时所执行的函数
            /*当上传成功（此处的上传成功指的是上传图片请求成功，并非图片真正上传到服务器）后所执行的函数，会传入当前状态及上一个状态*/
            onSuccess: null
        });
        /*如果按钮开始是隐藏的，经过触发后才显示，则可以用这个方法重新渲染下*/
        //uploader.refresh();//该方法可以重新渲染选择文件按钮
        //uploader.upload();//调用该方法可以直接上传图片
        //uploader.retry();//调用该方法可以重新上传图片
        console.log(uploader);


        var uploader2 = uploadImage({
            wrap: "#uploader2", //包裹整个上传控件的元素，必须。可以传递dom元素、选择器、jQuery对象
            /*预览图片的宽度，可以不传，如果宽高都不传则为包裹预览图的元素宽度，高度自动计算*/
            //width: "160px",
            height: 120,//预览图片的高度
            fileVal: "file", // [默认值：'file'] 设置文件上传域的name。
            btns: {//必须
                uploadBtn: $("#upload_now2"), //开始上传按钮，必须。可以传递dom元素、选择器、jQuery对象
                retryBtn: "#retry_upload", //用户自定义"重新上传"按钮
                chooseBtn: '#choose_file2',//"选折图片"按钮，必须。可以传递dom元素、选择器、jQuery对象
                chooseBtnText: "选择图片" //选择文件按钮显示的文字
            },
            pictureOnly: true,//只能上传图片
            resize: false,
            //是否可以重复上传，即上传一张图片后还可以再次上传。默认是不可以的，false为不可以，true为可以
            duplicate: true
        });
    });

