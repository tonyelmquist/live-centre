//
//  SwiftUtils.swift
//
//  Created by Adam Minchinton on 25/08/15.
//  Copyright © 2017 The Future Group. All rights reserved.
//

import Foundation
import UIKit
import ReachabilitySwift
#if WATCH
#else
import SystemConfiguration

public extension UIDevice {
    var modelName: String {
        var size = 0
        sysctlbyname("hw.machine", nil, &size, nil, 0)
        var machine = [CChar](repeating: 0, count: Int(size))
        sysctlbyname("hw.machine", &machine, &size, nil, 0)
        return String(cString: machine)
    }
    
}
#endif


@objc class SwiftUtils : NSObject {
    class func getDocumentsFolder() -> String {
        return NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0]
    }
    
    class func getAppStateString() -> String {
        let state = UIApplication.shared.applicationState
        return (state == UIApplicationState.active) ? "foreground" : "background"
    }
    
    class func getUserAgent() -> String {
        return "Live-Centre-App Mozilla/5.0 (iPhone; CPU iPhone OS 9_0 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A340 Safari/601.1"
    }

    class func getProductName() -> String {
        let bundle = Bundle.main
        let info = bundle.infoDictionary as NSDictionary?
        if (info != nil) {
            let prodName = info?.object(forKey: "CFBundleDisplayName") as? String
            
            if (prodName != nil && !prodName!.isEmpty) {
                return prodName!
            }
        }
       
        // Just in case it breaks
        return "Live Centre"
    }
    
    class func synchronized(lock: AnyObject, block: () -> ()) {
        objc_sync_enter(lock)
        defer {
            objc_sync_exit(lock)
        }
        
        block()
    }
    
    class func initFirstRun() -> Bool {
        let lastVersionSeenKey = "LastVersionSeen"
        
        let currentVersionString = Bundle.main.object(forInfoDictionaryKey: kCFBundleVersionKey as String) as! String
        let currentVersion = Int(currentVersionString)!
        
        var lastVersion = 0
        let lastVersionString = UserDefaults.standard.object(forKey: lastVersionSeenKey) as! String?
        if (lastVersionString != nil) {
            lastVersion = Int(lastVersionString!)!
        }
        
        TFGLog.i("Last seen version: %d, New version: %d", lastVersion, currentVersion);
        
        if (currentVersion > lastVersion) {
            TFGLog.i("First run detected");
            
            UserDefaults.standard.set(currentVersionString, forKey: lastVersionSeenKey)
            UserDefaults.standard.synchronize()
            
            return true
        }
        
        return false
    }
    
    class func getAppVersion() -> String {
        let dictionary = Bundle.main.infoDictionary!
        let version = dictionary["CFBundleShortVersionString"] as! String
        let build = dictionary[kCFBundleVersionKey as String] as! String
        return "\(version).\(build)"
    }
}

