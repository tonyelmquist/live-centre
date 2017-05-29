//
//  Live_CentreTests.swift
//  Live CentreTests
//
//  Created by Adam Minchinton on 23/03/2017.
//  Copyright © 2017 The Future Group. All rights reserved.
//

import XCTest
@testable import Live_Centre

class Live_CentreTests: XCTestCase {
    
    override func setUp() {
        super.setUp()
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testExample() {
        // This is an example of a functional test case.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
    }
    
    func testCheckIndexPathBundle() {
        
        // Live Centre App WebBundle
        let indexPath = Bundle.main.path(forResource: "index", ofType: "html", inDirectory: "html")
        XCTAssertNotNil(indexPath)
        
    }
    
    func testTFGLog() {
        
        // TFG Log tests
        XCTAssertFalse(TFGLog.logFileExists())
        XCTAssertNotNil(TFGLog.getLogfilePath)
        
    }
    
    func testPerformanceExample() {
        // This is an example of a performance test case.
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }
    
}
