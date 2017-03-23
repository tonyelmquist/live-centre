//
//  TFGLog.swift
//
//  Created by Adam Minchinton on 06/11/15.
//  Copyright © 2017 The Future Group. All rights reserved.
//

import UIKit
import Async

@objc class TFGLog: NSObject {
    internal static let TFGLogFileName = "TFGLog.txt"
    
    class func getLogfilePath() -> URL? {
        return URL(fileURLWithPath: SwiftUtils.getDocumentsFolder(), isDirectory: true).appendingPathComponent(TFGLog.TFGLogFileName)
    }
    
    class func logFileExists() -> Bool {
        guard let logfilePath = TFGLog.getLogfilePath() else {
            return false
        }
        return FileManager.default.fileExists(atPath: logfilePath.path);
    }

    class func withoutFormat(message: String) -> Void {
        let string = TFGLog.getNowDateTimeString() + " " + message
        
#if CONFIGURATION_DEBUG
            NSLog(string)
#endif // CONFIGURATION_DEBUG
        
        Async.background {
            SwiftUtils.synchronized(lock: self, block: {
                guard let logfileName = TFGLog.getLogfilePath() else {
                    return
                }
                
                // Create the file if it doesn't exist
                if (!TFGLog.logFileExists()) {
                    FileManager.default.createFile(atPath: logfileName.path, contents: nil, attributes: nil)
                }
                
                // Append text to file (you'll probably want to add a newline every write)
                let content = string + "\n"
                
                let file = FileHandle(forUpdatingAtPath: logfileName.path)
                file?.seekToEndOfFile()
                file?.write(content.data(using: String.Encoding.utf8)!)
                file?.closeFile()
            })
        }
    }
    
    class func withoutFormatNSLog(message: String) -> Void {
        let string = TFGLog.getNowDateTimeString() + " " + message
        
#if CONFIGURATION_DEBUG
            NSLog(string)
#endif // CONFIGURATION_DEBUG
    }
    
    class func i(_ format: String, _ args: CVarArg...) -> Void {
        TFGLog.withoutFormat(message: String(format: format, arguments: args))
    }
    
    class func d(_ format: String, _ args: CVarArg...) -> Void {
        TFGLog.withoutFormatNSLog(message: String(format: format, arguments: args))
    }
    
    private class func getNowDateTimeString() -> String {
        let todaysDate = Date()
        let dateFormatter = DateFormatter()
        // Force English so the log file is always the same
        dateFormatter.locale = Locale(identifier: "en_US")
        dateFormatter.dateFormat = "dd. MMM yyyy HH:mm:ss.SSS"
        
        return dateFormatter.string(from: todaysDate)
    }
    
    
}
