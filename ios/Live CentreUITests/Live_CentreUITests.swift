//
//  Live_CentreUITests.swift
//  Live CentreUITests
//
//  Created by Robinson Presotto on 10/05/2017.
//  Copyright © 2017 The Future Group. All rights reserved.
//

import XCTest

class Live_CentreUITests: XCTestCase {
        
    override func setUp() {
        super.setUp()
        
        let app = XCUIApplication()
        setupSnapshot(app)
        app.launch()
        
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testExample() {
        // Use recording to get started writing UI tests.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
    }
    
}
