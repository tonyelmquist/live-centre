//
//  JavascriptBridge.swift
//
//  Created by Adam Minchinton on 11/06/16.
//  Copyright © 2017 The Future Group. All rights reserved.
//

import UIKit
import Foundation

class JavascriptBridge {
    let webView: FLWebViewProvider!
    
    init(webView: FLWebViewProvider) {
        self.webView = webView
    }
    
    func isWebViewLoaded(active: @escaping (Bool) -> ()) -> Void {
        // Inject javascript call to check for isActive jsBridge function then call it
        let javascriptString = "(function(){ if (window.jsBridge && window.jsBridge.isActive) { return window.jsBridge.isActive(); } else { return false; }})();";
        
        webView.evaluateJS(javascriptString: javascriptString) { (result, error) in
            if (error == nil && result != nil) {
                active(result as! Bool)
            }
            else {
                active(false)
            }
        }
    }
    
    func isNotificationShowing(visible: @escaping (Bool) -> ()) -> Void {
        let javascriptString = "window.jsBridge.isNotificationShowing()";
        
        webView.evaluateJS(javascriptString: javascriptString) { (result, error) in
            if (error == nil) {
                let retVal = result as! String
                let dataDictionary = retVal.decodedDictionary;
                
                visible(dataDictionary["visible"] as! Bool)
            }
        }
    }
    
    func setLocation(latitude: Double, longitude: Double) -> Void {
        let data = ["lat": latitude, "long": longitude]
        
        let javascriptString = "window.jsBridge.setLocation(\"\(data.EncodedJSONString)\")";
        
        webView.evaluateJS(javascriptString: javascriptString) { (obj, error) in }
    }
    
    func willEnterBackground() -> Void {
        let javascriptString = "window.jsBridge.onPause()";
        
        webView.evaluateJS(javascriptString: javascriptString) { (obj, error) in }
    }
    
    func willEnterForeground() -> Void {
        let javascriptString = "window.jsBridge.onResume()";
        
        webView.evaluateJS(javascriptString: javascriptString) { (obj, error) in }
    }
    
    func nativeCall(encodedString: String) {
        let dataDictionary = encodedString.decodedDictionary
        
        let functionName = dataDictionary["func"] as? String
        
        if (functionName != nil) {
            var returnDictionary: [String: AnyObject]? = nil;
            if (functionName!.caseInsensitiveCompare("getVersion") == ComparisonResult.orderedSame) {
                returnDictionary = ["version": SwiftUtils.getAppVersion() as AnyObject]
            } else if (functionName!.caseInsensitiveCompare("setStatusbarStyle") == ComparisonResult.orderedSame) {
                let lightContent = dataDictionary["lightContent"] as? Bool
                if (lightContent != nil) {
                    let statusBarStyle = lightContent! ? UIStatusBarStyle.lightContent : UIStatusBarStyle.default

                    // Persist the setting by default
                    let persist = dataDictionary["persist"] as? Bool
                    if (persist == nil || persist!) {
                        TFGDefaults.setInt(value: statusBarStyle.rawValue, key: TFGDefaults.statusBarStyle)
                    }
                    UIApplication.shared.setStatusBarStyle(statusBarStyle, animated: false)
                }
            } else if (functionName!.caseInsensitiveCompare("getStatusbarStyle") == ComparisonResult.orderedSame) {
                returnDictionary = ["lightContent": (UIApplication.shared.statusBarStyle == UIStatusBarStyle.lightContent ? true : false) as AnyObject]
            } else if (functionName!.caseInsensitiveCompare("resetStatusbarStyle") == ComparisonResult.orderedSame) {
                UIApplication.shared.setStatusBarStyle(UIStatusBarStyle(rawValue: TFGDefaults.getInt(key: TFGDefaults.statusBarStyle, defaultValue: UIStatusBarStyle.default.rawValue))!, animated: false)
            }
        
            // Send the callback if one was sent and data is to be returned
            let callbackId = dataDictionary["callbackId"] as? String
            if (returnDictionary != nil && callbackId != nil && callbackId!.characters.count > 0) {
                let javascriptString = "window.jsBridge.callback(\"\(callbackId!)\", \"\(returnDictionary!.EncodedJSONString)\")";
                
                webView.evaluateJS(javascriptString: javascriptString, completionHandler: { (result, error) in })
            }
        }
        else {
            TFGLog.i("nativeCall made with missing or unknow function call")
        }
    }
    
    
}
