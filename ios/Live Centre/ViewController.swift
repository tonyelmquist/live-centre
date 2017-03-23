//
//  ViewController.swift
//  Live Centre
//
//  Created by Adam Minchinton on 23/03/2017.
//  Copyright © 2017 The Future Group. All rights reserved.
//

import UIKit

import UIKit
import WebKit

class ViewController: UIViewController, UIWebViewDelegate, WKNavigationDelegate, WKUIDelegate  {
    
    var webView: FLWebViewProvider?
    var javascriptBridge: JavascriptBridge?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        // Check if WKWebView is available
        if #available(iOS 9.0, *) {
            let w = WKWebView(delegateView: self)
            w.frame = CGRect(x: self.view.frame.origin.x, y: self.view.frame.origin.y,
                             width: self.view.frame.size.width, height: self.view.frame.size.height + 1)
            self.webView = w
            self.view.addSubview(self.webView as! WKWebView)
        } else {
            // In this case we have to fall back on UIWebView
            let w = UIWebView(delegateView: self)
            w.frame = CGRect(x: self.view.frame.origin.x, y: self.view.frame.origin.y,
                             width: self.view.frame.size.width, height: self.view.frame.size.height + 1)
            self.webView = w
            self.view.addSubview(self.webView as! UIWebView)
        }
        self.webView?.setBounces(bounces: false)
        javascriptBridge = JavascriptBridge(webView: self.webView!)
        
        let path = Bundle.main.path(forResource: "index", ofType: "html", inDirectory: "html")
        if path != nil {
            self.webView?.loadRequestFromString(urlNameAsString: path)
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func isWebViewLoaded(active: @escaping (Bool) -> ()) -> Void {
        if (javascriptBridge == nil) {
            active(false)
        }
        else {
            javascriptBridge!.isWebViewLoaded(active: active)
        }
    }
    
    /*    override func shouldAutorotate() -> Bool {
     return false
     }
     */
    @available(iOS 8.0, *)
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        nativeCallForRequest(request: navigationAction.request)
        
        decisionHandler(.allow)
    }
    
    func webView(_ webView: UIWebView, shouldStartLoadWith request: URLRequest, navigationType: UIWebViewNavigationType) -> Bool {
        nativeCallForRequest(request: request)
        
        return true;
    }
    
    private func nativeCallForRequest(request: URLRequest) {
        if (request.url!.absoluteString.hasPrefix("tfg://")) {
            //NSLog("request: %@", request.URL!.absoluteString)
            let components = request.url!.absoluteString.components(separatedBy: "://")
            
            javascriptBridge?.nativeCall(encodedString: components[1]);
        }
    }
    
}
