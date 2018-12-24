package com.rnative;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.StrictMode;
import android.provider.MediaStore;
import android.support.annotation.RequiresApi;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReadableArray;

import org.json.JSONObject;

import java.io.File;
import java.util.ArrayList;


public class RNShareModule extends ReactContextBaseJavaModule {

    private  ReactContext mContext;
    private WritableMap response = Arguments.createMap();

    public RNShareModule(ReactApplicationContext reactContext) {
        super(reactContext);
        // android 7.0系统解决拍照的问题
        StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
        StrictMode.setVmPolicy(builder.build());
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
            builder.detectFileUriExposure();
        }
        this.mContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNShareModule";
    }

    @ReactMethod
    public void shareToTimeLine(String imgPath, String desc, final Callback callback){
        if(!isInsatllWeChat()){
//            Toast.makeText(this.mContext.getApplicationContext(),"没有安装微信", Toast.LENGTH_LONG).show();
            response.putString("code","FAILED");
            response.putString("msg", "未检测到微信，请先安装微信");
            invokeResponse(callback);
            return;
        }

        try{
            ArrayList<Uri> imageList = new ArrayList<>();
            Uri uri = Uri.parse(imgPath);
            imageList.add(uri);

            // imgArray ReadableArray
//             for (int i = 0; i < imgArray.size() ; i++ ) {
//                 Uri uri = Uri.parse(imgArray.getString(i));
//                 imageList.add(uri);
//             }
//            File file = new File(imgPath).getAbsoluteFile();
//            if(Build.VERSION.SDK_INT < Build.VERSION_CODES.N){// 24以下  android 7.0以下
//                uri = Uri.fromFile(file);
//            } else { // android 7.0 以上
//                uri = Uri.parse(MediaStore.Images.Media.insertImage(this.mContext.getContentResolver(), file.getAbsolutePath(), file.getName(),null));
//            }

            Intent weChatIntent = new Intent();
            //com.tencent.mm.ui.tools.ShareImgUI 是分享到微信好友
            // com.tencent.mm.ui.tools.ShareToTimeLineUI 是分享到微信朋友圈，最多可以分享九张图到微信朋友圈 系统只支持分享一张到朋友圈
            weChatIntent.setComponent(new ComponentName("com.tencent.mm", "com.tencent.mm.ui.tools.ShareToTimeLineUI"));
            weChatIntent.setAction(Intent.ACTION_SEND_MULTIPLE);
            weChatIntent.setType("image/*");
            weChatIntent.putExtra(Intent.EXTRA_STREAM, imageList);
            weChatIntent.putExtra("Kdescription", desc);

            this.mContext.startActivity(weChatIntent);

            response.putString("code","SUCCESS");
            response.putString("msg", "分享成功");
            invokeResponse(callback);
        } catch (Exception e){
//            Toast.makeText(this.mContext.getApplicationContext(),"分享失败", Toast.LENGTH_LONG).show();
            response.putString("code","FAILED");
            response.putString("msg", "分享失败");
            invokeResponse(callback);
            e.printStackTrace();
        }
    }

    private  boolean isInsatllWeChat(){
        PackageInfo packageInfo = null;
        try {
            packageInfo = this.mContext.getPackageManager().getPackageInfo("com.tencent.mm", 0);
        } catch (PackageManager.NameNotFoundException e) {
            packageInfo = null;
            e.printStackTrace();
        }

        return  packageInfo != null;
    }

    private void invokeResponse(Callback callback){
        if(callback != null){
            callback.invoke(response);
            callback = null;
            response = Arguments.createMap();
        }
    }
}