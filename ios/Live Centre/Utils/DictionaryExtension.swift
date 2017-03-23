//
//  DictionaryExtension.swift
//
//  Created by Adam Minchinton on 12/06/16.
//  Copyright © 2017 The Future Group. All rights reserved.
//

import Foundation

extension Dictionary {
    mutating func merge<K, V>(dict: [K: V]){
        for (k, v) in dict {
            self.updateValue(v as! Value, forKey: k as! Key)
        }
    }
    
    var JSONString: String {
        var dictionary: [String: AnyObject] = [:]
        
        for (key, value) in self {
            dictionary["\(key)"] = value as AnyObject?
        }

        do {
            let nsData = try JSONSerialization.data(withJSONObject: dictionary, options: [])
            return String(data: nsData, encoding: String.Encoding.utf8)!
        } catch {
            TFGLog.i("Dictionary extension JSON parsing error: \(error)")
        }
        
        return ""
    }

    var EncodedJSONString: String {
        var string = self.JSONString
 
        string = string.replaceAll(target: "\\", withString: "\\\\")
        string = string.replaceAll(target: "\"", withString: "\\\"")
        string = string.replaceAll(target: "\'", withString: "\\\'")
        string = string.replaceAll(target: "\n", withString: "\\n")
        string = string.replaceAll(target: "\r", withString: "\\r")
        string = string.replaceAll(target: "\u{000C}", withString: "\\u{000C}")
        string = string.replaceAll(target: "\u{2028}", withString: "\\u{2028}")
        string = string.replaceAll(target: "\u{2029}", withString: "\\u{2029}")
        
        return string
    }

}

