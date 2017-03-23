//
//  StringExtension.swift
//
//  Created by Adam Minchinton on 12/06/16.
//  Copyright © 2017 The Future Group. All rights reserved.
//

import Foundation

extension String
{
    func replaceAll(target: String, withString: String) -> String
    {
        return self.replacingOccurrences(of: target, with: withString)
    }
    
    var decodedDictionary: [String: AnyObject] {
        let dataString = self.removingPercentEncoding
        let dataNSData = dataString?.data(using: String.Encoding.utf8)
        var dataDictionary: AnyObject!
        do {
            dataDictionary = try JSONSerialization.jsonObject(with: dataNSData!, options: []) as? NSDictionary
        } catch {
            TFGLog.i("String extension JSON parsing error: \(error)")
        }

        return dataDictionary as! [String : AnyObject]
    }
}
