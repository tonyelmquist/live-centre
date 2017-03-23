import UIKit

extension UIWebView: FLWebViewProvider {

    // A simple convenience initializer, this allows for UIWebView(delegateView:) initialization
    convenience init(delegateView: UIWebViewDelegate) {
        self.init()
        self.delegate = delegateView
    }
    
    // UIWebView has one delegate method so this is pretty straight forward
    func setDelegateViews(viewController: ViewController) {
        delegate = viewController
    }
    
    func canNavigateBackward() -> Bool {
        return self.canGoBack
    }
    
    func canNavigateForward() -> Bool {
        return self.canGoForward
    }
    
    // A quick method for loading requests based on strings in a URL format
    func loadRequestFromString(urlNameAsString: String!) {
        loadRequest(URLRequest(url: URL(fileURLWithPath: urlNameAsString)))
    }
    
    func currentURL() -> URL? {
        return self.request?.url
    }
    
    func evaluateJS(javascriptString: String!, completionHandler: @escaping (Any?, Error?) -> ()) {
        // Have the WebView evaluate the javascript string
        let string = stringByEvaluatingJavaScript(from: javascriptString);
        
        // Convert any boolean return value to Bool
        var boolValue: Bool? = nil
        if (string != nil) {
            if (string!.caseInsensitiveCompare("true") == ComparisonResult.orderedSame || string! == "1") {
                boolValue = true;
            }
            else if (string!.caseInsensitiveCompare("false") == ComparisonResult.orderedSame || string! == "0") {
                boolValue = false;
            }
        }
        
        // Call the completion handler from there
        if (boolValue == nil) {
            completionHandler(string! as AnyObject?, nil)
        }
        else {
            completionHandler(boolValue as AnyObject?, nil)
        }
    }
    
    func setScalesPageToFit(setPages: Bool!) {
        self.scalesPageToFit = setPages
    }
    
    func setBounces(bounces: Bool) {
        self.scrollView.bounces = bounces
    }
    
}
