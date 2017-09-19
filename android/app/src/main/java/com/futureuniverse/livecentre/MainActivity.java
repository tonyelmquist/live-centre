package com.futureuniverse.livecentre;

import com.futureuniverse.livecentre.R;

import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import android.view.KeyEvent;
import android.view.Window;
import android.webkit.HttpAuthHandler;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.util.Log;

public class MainActivity extends Activity {
    private WebView mWebView;
            JavascriptBridge mJavascriptBridge;

    private static final String LogTag = "MyMessage";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().requestFeature(Window.FEATURE_NO_TITLE);
        mWebView = new WebView(this);
        mJavascriptBridge = new JavascriptBridge(this, mWebView);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            mWebView.setWebContentsDebuggingEnabled(true);
        }

        mWebView.setWebContentsDebuggingEnabled(true);
        
        //mWebView.loadUrl("http://mediacenter.futureuniverse.com");
        mWebView.loadUrl("file:///android_asset/index.html");
        mWebView.setWebViewClient(new WebViewClient () {

            @Override
            public void onReceivedHttpAuthRequest(WebView view,
                                                  HttpAuthHandler handler, String host, String realm) {

                handler.proceed("tfg-stage", "-0KvcgbqOWTX");
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }

        });
        mWebView.getSettings().setJavaScriptEnabled(true);

        this.setContentView(mWebView);
    }

    @Override
    protected void onResume() {
        super.onResume();
        mJavascriptBridge.onResume();
        Log.i(LogTag, "On Resume");
    }

    @Override
    protected void onPause() {
        super.onPause();
        mJavascriptBridge.onPause();
        Log.i(LogTag, "On pause");

    }

    @Override
    public boolean onKeyDown(final int keyCode, final KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && mWebView.canGoBack()) {
            mWebView.goBack();
            return true;
        }
        Log.i(LogTag, "On key down");
        return super.onKeyDown(keyCode, event);
    }

    @Override
    public void onBackPressed() {
        Log.i(LogTag, "On back pressed");
        mJavascriptBridge.onBackPressed();
        //super.onBackPressed();
    }


}
