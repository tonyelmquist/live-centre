package com.futureuniverse.livecentre;

import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;

import org.xwalk.core.JavascriptInterface;
import org.xwalk.core.XWalkPreferences;
import org.xwalk.core.XWalkView;

import com.futureuniverse.livecentre.R;

public class MainActivity extends FragmentActivity {
    KeyboardAwareLinearLayout mainView;
    XWalkView mXview;
    JavascriptBridge mJavascriptBridge;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mainView = (KeyboardAwareLinearLayout)findViewById(R.id.main);
        mainView.setOnKeyboardChangedListener(new KeyboardAwareLinearLayout.OnKeyboardChangedListener() {
            @Override
            public void onClosed() {
                int azlh = 0;
            }

            @Override
            public void onOpened() {
                int azlh = 0;
            }
        });

        setXView();
    }

    private void setXView(){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            XWalkPreferences.setValue(XWalkPreferences.REMOTE_DEBUGGING, true);
        }
        XWalkPreferences.setValue(XWalkPreferences.ALLOW_UNIVERSAL_ACCESS_FROM_FILE, true);

        mXview = (XWalkView)findViewById(R.id.x_walk_view);

        mXview.addJavascriptInterface(this, "tfgNative");
        mJavascriptBridge = new JavascriptBridge(this, mXview);

        mXview.load("file:///android_asset/index.html", null);
//        mXview.load("file:///android_asset/kitchen-sink-material/index.html", null);

/*
        VideoView videoview = (VideoView)findViewById(R.id.videoView);
        videoview.setMediaController(new MediaController(this));
        videoview.setVideoURI(Uri.parse("url://video"));
        videoview.requestFocus();
        videoview.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
            public void onPrepared(MediaPlayer mp) {
                mp.start();

                int seekForwardTime = 59000;
                if (mp != null) {
                    int currentPosition = mp.getCurrentPosition();
                    if (currentPosition + seekForwardTime <= mp.getDuration()) {
                        mp.seekTo(currentPosition + seekForwardTime);
                    } else {
                        mp.seekTo(mp.getDuration());
                    }
                }


                //mp.seekTo(59000);
            }
        });
*/

    }

    @Override
    protected void onPause() {
        super.onPause();
        mJavascriptBridge.onPause();
        if (mXview != null) {
            mXview.pauseTimers();
            mXview.onHide();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        mJavascriptBridge.onResume();
        if (mXview != null) {
            mXview.resumeTimers();
            mXview.onShow();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mXview != null) {
            mXview.onDestroy();
        }
    }

    @Override
    public void onBackPressed() {
        //super.onBackPressed();
        mJavascriptBridge.onBackPressed();
    }

    @JavascriptInterface
    public boolean jsBridge(final String requestString) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                final String urlPrefix = "tfg://";
                if (requestString.startsWith(urlPrefix)) {
                    mJavascriptBridge.callNative(requestString.substring(urlPrefix.length()));
                }
            }
        });
        return true;
    }
}
