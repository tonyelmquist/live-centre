package com.futureuniverse.livecentre;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.LinearLayout;

/**
 *
 *
 */
public class KeyboardAwareLinearLayout extends LinearLayout {

    private OnKeyboardChangedListener listener;

    public KeyboardAwareLinearLayout(Context context) {
        super(context);
    }

    public KeyboardAwareLinearLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public KeyboardAwareLinearLayout(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public void setOnKeyboardChangedListener(OnKeyboardChangedListener listener) {
        this.listener = listener;
    }

    public interface OnKeyboardChangedListener {
        void onClosed();
        void onOpened();
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        if (listener == null) {
            super.onMeasure(widthMeasureSpec, heightMeasureSpec);
            return;
        }

        final int proposedheight = MeasureSpec.getSize(heightMeasureSpec);
        final int actualHeight = getHeight();

        if (actualHeight > proposedheight){
            listener.onOpened();
        } else {
            listener.onClosed();
        }

        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }
}
