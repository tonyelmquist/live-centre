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
        
        let app = XCUIApplication()
        let element = app.webViews.otherElements["IMR"].children(matching: .other).element(boundBy: 2)
        
        let usernameTextfield = element.children(matching: .other).element(boundBy: 0).children(matching: .textField).element
        tapElementAndWaitForKeyboardToAppear(element: usernameTextfield)
        usernameTextfield.typeText("test@futureuniverse.com")
        
        let secureTextField = element.children(matching: .other).element(boundBy: 1).children(matching: .secureTextField).element
        tapElementAndWaitForKeyboardToAppear(element: secureTextField)
        secureTextField.typeText("password")
        
        snapshot("Login")
        
    }
    
    func tapElementAndWaitForKeyboardToAppear(element: XCUIElement) {
        let keyboard = XCUIApplication().keyboards.element
        while (true) {
            element.tap()
            if keyboard.exists {
                break;
            }
            RunLoop.current.run(until: NSDate(timeIntervalSinceNow: 0.5) as Date)
        }
    }
    
}
