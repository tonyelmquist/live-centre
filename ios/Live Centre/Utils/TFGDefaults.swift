//
//  TFGDefaults.swift
//
//  Created by Adam Minchinton on 22/11/15.
//  Copyright © 2017 The Future Group. All rights reserved.
//

import Foundation


@objc class TFGDefaults : NSObject {
    static let statusBarStyle = "status-bar-tint"

    class func get(key: String) -> String? {
        return UserDefaults.standard.string(forKey: key)
    }
    
    class func getBool(key: String) -> Bool {
        return UserDefaults.standard.bool(forKey: key)
    }

    class func getDouble(key: String) -> Double {
        return UserDefaults.standard.double(forKey: key)
    }

    class func getInt(key: String, defaultValue: Int) -> Int {
        let value = UserDefaults.standard.object(forKey: key)
        return value == nil ? defaultValue : value as! Int
    }

    class func getObject(key: String) -> Any? {
        return UserDefaults.standard.object(forKey: key)
    }

    class func set(value: AnyObject, forKey: String, synchronize: Bool=false) -> Void {
        UserDefaults.standard.set(value, forKey: forKey)
        if (synchronize) {
            UserDefaults.standard.synchronize()
        }
    }
    
    class func setBool(value: Bool, key: String, synchronise: Bool=false) -> Void {
        UserDefaults.standard.set(value, forKey: key)
        if (synchronise) {
            UserDefaults.standard.synchronize()
        }
    }
    
    class func setDouble(value: Double, key: String, synchronise: Bool=false) -> Void {
        UserDefaults.standard.set(value, forKey: key)
        if (synchronise) {
            UserDefaults.standard.synchronize()
        }
    }

    class func setInt(value: Int, key: String, synchronise: Bool=false) -> Void {
        UserDefaults.standard.set(value, forKey: key)
        if (synchronise) {
            UserDefaults.standard.synchronize()
        }
    }

    class func clear(key: String) -> Void {
        UserDefaults.standard.removeObject(forKey: key)
    }

}
