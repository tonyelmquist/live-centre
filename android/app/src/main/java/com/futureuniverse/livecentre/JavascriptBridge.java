package com.futureuniverse.livecentre;

import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Handler;
import android.util.Log;
import android.webkit.ValueCallback;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Created by minch on 12/06/16.
 *
 */
public class JavascriptBridge {
    Activity mainActivity;
    WebView mWebView;

    public JavascriptBridge(Activity activity, WebView webview) {
        mainActivity = activity;
        mWebView = webview;
    }

    public void isWebViewLoaded(final ValueCallback<Boolean> callback) {
        // Inject javascript call to check for isActive jsBridge function then call it
        String javascriptString = "(function(){ if (window.jsBridge && window.jsBridge.isActive) { return window.jsBridge.isActive(); } else { return false; }})();";
        sendJS(javascriptString, new ValueCallback<String>() {
            @Override
            public void onReceiveValue(String value) {
                callback.onReceiveValue(isTrue(value));
            }
        });
    }

    public void isNotificationShowing(final ValueCallback<Boolean> callback) {
        String javascriptString = "window.jsBridge.isNotificationShowing()";
        sendJS(javascriptString, new ValueCallback<String>() {
            @Override
            public void onReceiveValue(String value) {
                try {
                    final String key = "visible";

                    JSONObject jsonObject = new JSONObject(value);
                    if (jsonObject.has(key)) {
                        callback.onReceiveValue(jsonObject.getBoolean(key));
                        return;
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                callback.onReceiveValue(false);
            }
        });
    }

    public void setLocation(Double latitude, Double longitude) {
        try {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("lat", latitude);
            jsonObject.put("long", longitude);

            String javascriptString = "window.jsBridge.setLocation(\"" + encodeJSONObject(jsonObject) + "\")";
            sendJS(javascriptString, null);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void onPause() {
        String javascriptString = "window.jsBridge.onPause()";
        sendJS(javascriptString, null);
    }

    public void onResume() {
        String javascriptString = "window.jsBridge.onResume()";
        sendJS(javascriptString, null);
    }

    public void onBackPressed() {
        String javascriptString = "window.jsBridge.onBackPressed()";

        sendJS(javascriptString, new ValueCallback<String>() {
            @Override
            public void onReceiveValue(String s) {
                String test = new String("\"moveTaskToBack\"");

                if (test.equals(s)) {
                    mainActivity.moveTaskToBack(true);
                }
            }
        });
    }

    public void showToast(String toast) {
        Toast.makeText(getContext(), toast, Toast.LENGTH_SHORT).show();
    }

    private Boolean isTrue(String booleanString) {
        Boolean boolValue = null;

        if (booleanString.equalsIgnoreCase("true") || booleanString.equals("1")) {
            boolValue = true;
        }
        else if (booleanString.equalsIgnoreCase("false") || booleanString.equals("0")) {
            boolValue = false;
        }

        return boolValue;
    }

    private void sendJS(final String javascriptString, final ValueCallback<String> callback) {
        new Handler().post(new Runnable() {
            @Override
            public void run() {
                mWebView.evaluateJavascript("javascript:" + javascriptString, callback);
            }
        });
    }


    public void callNative(String encodedString) {
        try {
            JSONObject jsonObject = new JSONObject(encodedString);

            if (jsonObject.has("func")) {
                JSONObject returnJsonObject = null;

                String command = jsonObject.getString("func");
                if (command.compareToIgnoreCase("getVersion") == 0) {
                    PackageManager manager = getContext().getPackageManager();
                    try {
                        PackageInfo info = manager.getPackageInfo(getContext().getPackageName(), 0);
                        returnJsonObject = new JSONObject();
                        returnJsonObject.put("version", info.versionName + "." + info.versionCode);
                    } catch (PackageManager.NameNotFoundException e) {
                       // MyLog("Package name: " + getContext().getPackageName() + " not found" + e.getMessage());
                    }
                } else if (command.compareToIgnoreCase("exitApp") == 0) {
                    // finish() is too brutal and kills the app, moveTaskToBack just drops it to the background
                    mainActivity.moveTaskToBack(true);
                }

                // If the call has a callback send it
                if (returnJsonObject != null && jsonObject.has("callbackId")) {
                    String callbackId = jsonObject.getString("callbackId");

                    if (callbackId.length() > 0) {
                        String javascriptString = "window.jsBridge.callback(\"" + callbackId + "\", \"" + encodeJSONObject(returnJsonObject) + "\")";
                        sendJS(javascriptString, null);
                    }
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    private String encodeJSONObject(JSONObject jsonObject) {
        String jsonString = jsonObject.toString();

        jsonString = jsonString.replaceAll("\\\\", "\\\\\\\\");
        jsonString = jsonString.replaceAll("\"", "\\\\\"");
        jsonString = jsonString.replaceAll("\'", "\\\\\'");
        jsonString = jsonString.replaceAll("\n", "\\\\n");
        jsonString = jsonString.replaceAll("\r", "\\\\r");
        jsonString = jsonString.replaceAll("\t", "\\\\t");

        return jsonString;
    }

    private Context getContext() {
        return mWebView.getContext();
    }
}
