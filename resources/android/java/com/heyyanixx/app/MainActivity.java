package com.heyyanixx.app;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Message;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebChromeClient;
import org.json.JSONObject;

/**
 * HEYYANIXX shell.
 * Links that open a new window (target=_blank / window.open) from the app or from the
 * HEYYANIXX websites shown inside it are routed here:
 *  - *.sites.tab.bot pages open inside the app's hub viewer (keeps the HEYYANIXX header + back)
 *  - everything else (Instagram, YouTube, mail, "open in browser") opens outside the app.
 */
public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        final WebView web = getBridge().getWebView();
        web.getSettings().setSupportMultipleWindows(true);
        web.setWebChromeClient(new BridgeWebChromeClient(getBridge()) {
            @Override
            public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
                final WebView popup = new WebView(view.getContext());
                popup.setWebViewClient(new WebViewClient() {
                    private boolean handled = false;

                    private void take(WebView v, Uri uri) {
                        if (handled) return;
                        handled = true;
                        route(uri);
                        v.stopLoading();
                        v.post(v::destroy);
                    }

                    @Override
                    public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest request) {
                        take(v, request.getUrl());
                        return true;
                    }

                    @Override
                    public void onPageStarted(WebView v, String url, Bitmap favicon) {
                        if (url != null && !url.equals("about:blank")) take(v, Uri.parse(url));
                    }
                });
                WebView.WebViewTransport transport = (WebView.WebViewTransport) resultMsg.obj;
                transport.setWebView(popup);
                resultMsg.sendToTarget();
                return true;
            }
        });
    }

    private void route(Uri uri) {
        if (uri == null) return;
        String host = uri.getHost() == null ? "" : uri.getHost();
        String scheme = uri.getScheme() == null ? "" : uri.getScheme();
        boolean inApp = scheme.startsWith("http") && host.endsWith(".sites.tab.bot") && uri.getQueryParameter("hxext") == null;
        if (inApp) {
            final String js = "window.hxOpenUrl && window.hxOpenUrl(" + JSONObject.quote(uri.toString()) + ")";
            final WebView web = getBridge().getWebView();
            web.post(() -> web.evaluateJavascript(js, null));
            return;
        }
        Uri out = uri;
        if (uri.getQueryParameter("hxext") != null) {
            Uri.Builder b = uri.buildUpon().clearQuery();
            for (String name : uri.getQueryParameterNames()) {
                if (name.equals("hxext")) continue;
                for (String val : uri.getQueryParameters(name)) b.appendQueryParameter(name, val);
            }
            out = b.build();
        }
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, out));
        } catch (Exception ignored) {
        }
    }
}
